import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface Position {
  x: number
  y: number
}

interface BankGhost {
  id: number
  position: Position
  bank: 'mbank' | 'ing'
  direction: { x: number; y: number }
  mode: 'chase' | 'scatter' | 'frightened'
  message: string
  showMessage: boolean
  messageTimer: number
}

interface Dot {
  x: number
  y: number
  collected: boolean
  type: 'normal' | 'power'
}

const GRID_SIZE = 30
const GAME_WIDTH = 600  // 20 * 30 - znacznie mniejsza mapa
const GAME_HEIGHT = 600 // 20 * 30
const COLS = 20
const ROWS = 20

// Kompaktowa mapa - znacznie mniej kropek
const PACMAN_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 3, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 3, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
  [0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 1],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

function Level12Page() {
  const navigate = useNavigate()
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver' | 'victory'>('menu')
  const [pacman, setPacman] = useState<Position>({ x: 10, y: 15 })
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 })
  const [nextDirection, setNextDirection] = useState<Position>({ x: 0, y: 0 })
  const [ghosts, setGhosts] = useState<BankGhost[]>([])
  const [dots, setDots] = useState<Dot[]>([])
  const [score, setScore] = useState(0)
  const [powerMode, setPowerMode] = useState(false)
  const [powerTimer, setPowerTimer] = useState(0)
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})

  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const messageTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const bankMessages = {
    mbank: [
      "Hey, do you already have an mBank account?",
      "Open an account via the app!",
      "mBank is the best choice!",
      "Get a free 50 PLN!"
    ],
    ing: [
      "ING Bank Śląski invites you!",
      "No-fee account at ING!",
      "Join millions of ING customers!",
      "Get a free 50 PLN!"
    ]
  }

  const initGame = useCallback(() => {
    setPacman({ x: 10, y: 15 })
    setDirection({ x: 0, y: 0 })
    setNextDirection({ x: 0, y: 0 })
    setScore(0)
    setPowerMode(false)
    setPowerTimer(0)

    const newDots: Dot[] = []
    for (let y = 0; y < PACMAN_MAP.length; y++) {
      for (let x = 0; x < PACMAN_MAP[y].length; x++) {
        if (PACMAN_MAP[y][x] === 2) {
          newDots.push({ x, y, collected: false, type: 'normal' })
        } else if (PACMAN_MAP[y][x] === 3) {
          newDots.push({ x, y, collected: false, type: 'power' })
        }
      }
    }
    setDots(newDots)

    const newGhosts: BankGhost[] = [
      {
        id: 1,
        position: { x: 8, y: 9 },
        bank: 'mbank',
        direction: { x: 1, y: 0 },
        mode: 'chase',
        message: bankMessages.mbank[0],
        showMessage: false,
        messageTimer: 0
      },
      {
        id: 2,
        position: { x: 10, y: 9 },
        bank: 'ing',
        direction: { x: -1, y: 0 },
        mode: 'chase',
        message: bankMessages.ing[0],
        showMessage: false,
        messageTimer: 0
      },
      {
        id: 3,
        position: { x: 12, y: 9 },
        bank: 'ing', // ZMIENIONE z 'mbank' na 'ing'
        direction: { x: 0, y: 1 },
        mode: 'chase',
        message: bankMessages.ing[1], // ZMIENIONE z bankMessages.mbank[1]
        showMessage: false,
        messageTimer: 0
      },
      {
        id: 4,
        position: { x: 9, y: 11 }, // Nowa pozycja
        bank: 'mbank',
        direction: { x: -1, y: 0 },
        mode: 'chase',
        message: bankMessages.mbank[1],
        showMessage: false,
        messageTimer: 0
      }
    ]
    setGhosts(newGhosts)
  }, [])

  const canMove = (x: number, y: number): boolean => {
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return false
    return PACMAN_MAP[y][x] !== 1
  }

  // WSAD sterowanie
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }))
  }, [])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }))
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  // Obsługa kierunków na podstawie WSAD
  useEffect(() => {
    if (gameState !== 'playing') return

    if (keys['w']) {
      setNextDirection({ x: 0, y: -1 })
    } else if (keys['s']) {
      setNextDirection({ x: 0, y: 1 })
    } else if (keys['a']) {
      setNextDirection({ x: -1, y: 0 })
    } else if (keys['d']) {
      setNextDirection({ x: 1, y: 0 })
    }

    if (keys['escape']) {
      setGameState('paused')
    }
  }, [keys, gameState])

  // Timer dla wiadomości duchów - rzadziej
  useEffect(() => {
    if (gameState === 'playing') {
      messageTimerRef.current = setInterval(() => {
        setGhosts(prevGhosts =>
          prevGhosts.map(ghost => {
            if (!ghost.showMessage && Math.random() < 0.003) { // Jeszcze rzadziej
              const messages = bankMessages[ghost.bank]
              return {
                ...ghost,
                message: messages[Math.floor(Math.random() * messages.length)],
                showMessage: true,
                messageTimer: 100 // 2 sekundy
              }
            } else if (ghost.showMessage && ghost.messageTimer > 0) {
              return {
                ...ghost,
                messageTimer: ghost.messageTimer - 1
              }
            } else if (ghost.showMessage && ghost.messageTimer <= 0) {
              return {
                ...ghost,
                showMessage: false
              }
            }
            return ghost
          })
        )
      }, 50)
    } else {
      if (messageTimerRef.current) {
        clearInterval(messageTimerRef.current)
        messageTimerRef.current = null
      }
    }

    return () => {
      if (messageTimerRef.current) {
        clearInterval(messageTimerRef.current)
        messageTimerRef.current = null
      }
    }
  }, [gameState])

  // Power mode timer
  useEffect(() => {
    if (powerMode && powerTimer > 0) {
      const timer = setTimeout(() => {
        setPowerTimer(prev => prev - 1)
      }, 100)
      return () => clearTimeout(timer)
    } else if (powerMode && powerTimer <= 0) {
      setPowerMode(false)
    }
  }, [powerMode, powerTimer])

  // Główna pętla gry
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(() => {
        // Ruch Pacmana
        setPacman(prevPacman => {
          let newDirection = direction

          // Sprawdź czy można zmienić kierunek
          const nextX = prevPacman.x + nextDirection.x
          const nextY = prevPacman.y + nextDirection.y
          if (canMove(nextX, nextY)) {
            newDirection = nextDirection
            setDirection(newDirection)
          }

          const newX = prevPacman.x + newDirection.x
          const newY = prevPacman.y + newDirection.y

          // Tunnel effect na lewej/prawej krawędzi
          if (newX < 0) return { x: COLS - 1, y: prevPacman.y }
          if (newX >= COLS) return { x: 0, y: prevPacman.y }

          if (canMove(newX, newY)) {
            return { x: newX, y: newY }
          }
          return prevPacman
        })

        // Ruch duchów - prostsze AI
        setGhosts(prevGhosts =>
          prevGhosts.map(ghost => {
            const possibleMoves = [
              { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }
            ].filter(move =>
              canMove(ghost.position.x + move.x, ghost.position.y + move.y)
            )

            if (possibleMoves.length === 0) return ghost

            let newDirection = ghost.direction

            // Prosta AI - czasem kieruj się w stronę gracza
            if (Math.random() < 0.3) {
              const dx = pacman.x - ghost.position.x
              const dy = pacman.y - ghost.position.y

              if (Math.abs(dx) > Math.abs(dy)) {
                newDirection = { x: dx > 0 ? 1 : -1, y: 0 }
              } else {
                newDirection = { x: 0, y: dy > 0 ? 1 : -1 }
              }

              if (!canMove(ghost.position.x + newDirection.x, ghost.position.y + newDirection.y)) {
                newDirection = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
              }
            } else {
              newDirection = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
            }

            const newX = ghost.position.x + newDirection.x
            const newY = ghost.position.y + newDirection.y

            return {
              ...ghost,
              position: { x: newX, y: newY },
              direction: newDirection
            }
          })
        )
      }, 120)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }
  }, [gameState, direction, nextDirection, pacman])

  // Sprawdź kolizje i zbieranie kropek
  useEffect(() => {
    if (gameState === 'playing') {
      // Zbieranie kropek
      setDots(prevDots => {
        const newDots = prevDots.map(dot => {
          if (!dot.collected && dot.x === pacman.x && dot.y === pacman.y) {
            if (dot.type === 'power') {
              setPowerMode(true)
              setPowerTimer(80) // 8 sekund
              setScore(prev => prev + 50)
            } else {
              setScore(prev => prev + 10)
            }
            return { ...dot, collected: true }
          }
          return dot
        })

        // Sprawdź zwycięstwo
        if (newDots.every(dot => dot.collected)) {
          setGameState('victory')
        }

        return newDots
      })

      // Kolizje z duchami - POPRAWIONA LOGIKA
      ghosts.forEach(ghost => {
        if (ghost.position.x === pacman.x && ghost.position.y === pacman.y) {
          if (powerMode) {
            // W trybie mocy - zjedz ducha i zdobądź punkty
            setScore(prev => prev + 200)
            // Reset pozycji ducha do centrum
            setGhosts(prevGhosts =>
              prevGhosts.map(g =>
                g.id === ghost.id
                  ? { ...g, position: { x: 10, y: 9 } }
                  : g
              )
            )
          } else {
            // Bez trybu mocy - koniec gry
            setGameState('gameOver')
          }
        }
      })
    }
  }, [pacman, ghosts, gameState, powerMode])


  const startGame = () => {
    initGame()
    setGameState('playing')
  }

  if (gameState === 'menu') {
    return <MenuScreen onStart={startGame} />
  }

  if (gameState === 'paused') {
    return <PauseScreen onResume={() => setGameState('playing')} />
  }

  if (gameState === 'gameOver') {
    return <GameOverScreen score={score} onRestart={startGame} />
  }

  if (gameState === 'victory') {
    return <VictoryScreen score={score} onContinue={() => navigate('/ending')} onRestart={startGame} />
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">

      {/* HUD */}
      <div className="mb-4 flex gap-8 text-white font-mono text-xl">
        <div className="bg-neutral-600 px-4 py-2 rounded">
          Score: {score}
        </div>
        {powerMode && (
          <div className="bg-yellow-600 px-4 py-2 rounded animate-pulse">
            POWER: {Math.ceil(powerTimer / 10)}s
          </div>
        )}
      </div>

      {/* Plansza gry - kwadratowa i kompaktowa */}
      <div
        className="relative bg-neutral-900"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {/* Mapa */}
        {PACMAN_MAP.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`absolute ${cell === 1 ? 'bg-blue-600 border border-blue-400' : 'bg-gray-800'
                }`}
              style={{
                left: x * GRID_SIZE,
                top: y * GRID_SIZE,
                width: GRID_SIZE,
                height: GRID_SIZE,
              }}
            />
          ))
        )}

        {/* Kropki */}
        {dots.map((dot, index) =>
          !dot.collected && (
            <div
              key={index}
              className={`absolute ${dot.type === 'power'
                ? 'text-lg animate-pulse'
                : 'bg-yellow-500 w-2 h-2 rounded-full'
                }`}
              style={{
                left: dot.x * GRID_SIZE + (dot.type === 'power' ? 8 : 13),
                top: dot.y * GRID_SIZE + (dot.type === 'power' ? 5 : 13),
              }}
            >
              {dot.type === 'power' && '🍺'}
            </div>
          )
        )}

        {/* Pacman */}
        <div
          className="absolute bg-yellow-400 rounded-full border-1 border-red-300 transition-all duration-100"
          style={{
            left: pacman.x * GRID_SIZE + 3,
            top: pacman.y * GRID_SIZE + 3,
            width: GRID_SIZE - 6,
            height: GRID_SIZE - 6,
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-black font-bold text-lg">
            🧑‍🎓
          </div>
        </div>

        {/* Duchy banków - LOGO POKRYWA CAŁY KSZTAŁT */}
        {ghosts.map(ghost => (
          <div key={ghost.id} className="relative">
            <div
              className={`absolute transition-all duration-150 ${powerMode
                ? 'bg-blue-500 border-2 border-blue-300 rounded-t-full'
                : ''
                }`}
              style={{
                left: ghost.position.x * GRID_SIZE + 3,
                top: ghost.position.y * GRID_SIZE + 3,
                width: GRID_SIZE - 6,
                height: GRID_SIZE - 6,
                ...(powerMode ? {} : {
                  background: `url(${ghost.bank === 'mbank' ? '/images/mbank.jpg' : '/images/ing.webp'}) center/cover`,
                  WebkitMask: `radial-gradient(ellipse at center top, white 70%, transparent 70%), 
                              linear-gradient(to bottom, white 85%, transparent 85%)`,
                  mask: `radial-gradient(ellipse at center top, white 70%, transparent 70%), 
                         linear-gradient(to bottom, white 85%, transparent 85%)`,
                  WebkitMaskComposite: 'intersect',
                  maskComposite: 'intersect',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '50% 50% 0 0'
                })
              }}
            >
              {/* Tryb power - emoji */}
              {powerMode && (
                <div className="w-full h-full flex items-center justify-center text-white text-lg">
                  😱
                </div>
              )}

              {/* Fallback dla starszych przeglądarek */}
              {!powerMode && (
                <div className="w-full h-full opacity-0 hover:opacity-100 flex items-center justify-center text-xs font-bold bg-black/50 text-white transition-opacity">
                  {ghost.bank === 'mbank' ? 'mB' : 'ING'}
                </div>
              )}
            </div>

            {/* Message bubble - POPRAWIONY */}
            {ghost.showMessage && (
              <div
                className="absolute bg-black/40 border border-gray-500/30 rounded-lg p-2 text-xs text-white font-medium z-10 shadow-xl backdrop-blur-sm"
                style={{
                  left: ghost.position.x * GRID_SIZE - 60, // Więcej miejsca na lewo
                  top: ghost.position.y * GRID_SIZE - 40,
                  minWidth: '80px',
                  maxWidth: '140px', // Zwiększona maksymalna szerokość
                  fontSize: '9px',
                  lineHeight: '1.2',
                  textAlign: 'center',
                  wordWrap: 'break-word', // Łamanie długich słów
                  hyphens: 'auto' // Automatyczne dzielenie słów
                }}
              >
                <div className="break-words">
                  {ghost.message}
                </div>
                {/* Strzałka wskazująca na duszka */}
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: '4px solid rgba(0,0,0,0.4)'
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Instrukcje */}
      <div className="mt-4 text-center text-white font-mono">
        <div className="text-sm">
          🕹️ Controls: W A S D | ESC: Pause | 🍺 = POWER MODE!
        </div>
        <div className="text-xs text-yellow-400 mt-1">
          Collect all dots while avoiding bank employees!
        </div>
      </div>
    </div>
  )
}

function MenuScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center">
        <div className="bg-neutral-900 backdrop-blur-sm rounded-lg p-8 border border-neutral-700 shadow-2xl">
          <h1 className="text-4xl font-bold text-neutral-200 mb-4 font-mono">
            LEVEL 12: BANK PAC-MAN
          </h1>

          <p className="text-neutral-100 text-lg mb-6 font-mono">
            Final challenge! <br /> Collect all the dots (and beers) while avoiding intrusive bank employees.
          </p>

          <div className="bg-neutral-800 rounded-lg p-6 mb-8 border border-gray-600 font-mono">
            <h3 className="text-lg font-bold text-gray-400 mb-4">KEYMAP:</h3>
            <div className="text-center space-y-2 text-yellow-200">
              <div>W - Up</div>
              <div>A - Left</div>
              <div>S - Down</div>
              <div>D - Right</div>
              <div>ESC - Pause</div>
            </div>
          </div>

          <button
            onClick={onStart}
            className="bg-neutral-700 hover:bg-neutral-800 text-neutral-100 px-8 py-4 text-xl font-bold rounded-lg border border-neutral-600 transition-all duration-200 transform hover:scale-105"
          >
            START
          </button>
        </div>
      </div>
    </div>
  )
}

function PauseScreen({ onResume }: { onResume: () => void }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-700 text-center">
        <h2 className="text-3xl font-bold text-neutral-200 mb-6 font-mono">GAME PAUSED</h2>
        <div className="space-y-4">
          <button
            onClick={onResume}
            className="block w-full bg-neutral-700 hover:bg-neutral-800 border border-neutral-600 text-white px-6 py-3 rounded-lg font-bold"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  )
}

function GameOverScreen({ score, onRestart }: {
  score: number,
  onRestart: () => void,
}) {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-neutral-900 rounded-lg p-8 border border-red-500">

          <div className="text-6xl mb-6">💀</div>

          <h1 className="text-4xl font-bold text-red-400 mb-4 font-mono">
            You've been caught!
          </h1>

          <div className="bg-red-900/30 border border-red-600 rounded-lg p-6 mb-6">
            <p className="text-red-300 text-lg">
              A bank employee got you!<br />
              Now you'll have to listen to a presentation about accounts....
            </p>
          </div>

          <p className="text-gray-300 text-lg mb-6 font-mono">
            Score: <span className="text-neutral-100 font-bold">{score}</span>
          </p>

          <div className="space-y-4">
            <button
              onClick={onRestart}
              className="block w-full bg-neutral-700 hover:bg-neutral-800 border border-neutral-600 text-white px-6 py-3 rounded-lg font-bold font-mono"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function VictoryScreen({ score, onContinue, onRestart }: {
  score: number,
  onContinue: () => void,
  onRestart: () => void
}) {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-neutral-900 rounded-lg p-8 border border-yellow-500">

          <div className="text-6xl mb-6">🏆</div>

          <h1 className="text-4xl font-bold text-default-200 mb-4 font-mono">
            MISSION ACCOMPLISHED!
          </h1>

          <div className="bg-green-900/30 border border-green-600 rounded-lg p-6 mb-6">
            <p className="text-green-300 text-lg font-mono">
              Congratulations! <br />
              You managed to collect all the dots
              avoiding bank employees!<br />
              Your financial independence has been preserved!
            </p>
          </div>

          <p className="text-gray-300 text-lg mb-6 font-mono">
            Score: <span className="text-yellow-400 font-bold">{score}</span>
          </p>

          <div className="space-y-4">
            <button
              onClick={onContinue}
              className="block w-full bg-neutral-700 hover:bg-neutral-800 border border-neutral-600 text-white px-6 py-4 text-xl rounded-lg font-bold font-mono"
            >
              END JOURNEY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level12Page
