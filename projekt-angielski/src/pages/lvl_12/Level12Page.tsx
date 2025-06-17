import GameOverScreen from '@/components/lvl_12/GameOverScreen'
import MenuScreen from '@/components/lvl_12/MenuScreen'
import PauseScreen from '@/components/lvl_12/PauseScreen'
import VictoryScreen from '@/components/lvl_12/VictoryScreen'
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
const GAME_WIDTH = 600
const GAME_HEIGHT = 600
const COLS = 20
const ROWS = 20

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
        bank: 'ing',
        direction: { x: 0, y: 1 },
        mode: 'chase',
        message: bankMessages.ing[1],
        showMessage: false,
        messageTimer: 0
      },
      {
        id: 4,
        position: { x: 9, y: 11 },
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

  // WSAD
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

  useEffect(() => {
    if (gameState === 'playing') {
      messageTimerRef.current = setInterval(() => {
        setGhosts(prevGhosts =>
          prevGhosts.map(ghost => {
            if (!ghost.showMessage && Math.random() < 0.003) {
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


  // Gierka
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(() => {
        setPacman(prevPacman => {
          let newDirection = direction

          const nextX = prevPacman.x + nextDirection.x
          const nextY = prevPacman.y + nextDirection.y
          if (canMove(nextX, nextY)) {
            newDirection = nextDirection
            setDirection(newDirection)
          }

          const newX = prevPacman.x + newDirection.x
          const newY = prevPacman.y + newDirection.y

          if (newX < 0) return { x: COLS - 1, y: prevPacman.y }
          if (newX >= COLS) return { x: 0, y: prevPacman.y }

          if (canMove(newX, newY)) {
            return { x: newX, y: newY }
          }
          return prevPacman
        })

        setGhosts(prevGhosts =>
          prevGhosts.map(ghost => {
            const possibleMoves = [
              { x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }
            ].filter(move =>
              canMove(ghost.position.x + move.x, ghost.position.y + move.y)
            )

            if (possibleMoves.length === 0) return ghost

            let newDirection = ghost.direction

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

  // Kolizje
  useEffect(() => {
    if (gameState === 'playing') {
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

        if (newDots.every(dot => dot.collected)) {
          setGameState('victory')
        }

        return newDots
      })

      ghosts.forEach(ghost => {
        if (ghost.position.x === pacman.x && ghost.position.y === pacman.y) {
          if (powerMode) {
            setScore(prev => prev + 200)
            setGhosts(prevGhosts =>
              prevGhosts.map(g =>
                g.id === ghost.id
                  ? { ...g, position: { x: 10, y: 9 } }
                  : g
              )
            )
          } else {
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
    return <VictoryScreen score={score} onContinue={() => navigate('/ending')} />
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">

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

      <div
        className="relative bg-neutral-900"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
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
              {powerMode && (
                <div className="w-full h-full flex items-center justify-center text-white text-lg">
                  😱
                </div>
              )}

              {!powerMode && (
                <div className="w-full h-full opacity-0 hover:opacity-100 flex items-center justify-center text-xs font-bold bg-black/50 text-white transition-opacity">
                  {ghost.bank === 'mbank' ? 'mB' : 'ING'}
                </div>
              )}
            </div>

            {ghost.showMessage && (
              <div
                className="absolute bg-black/40 border border-gray-500/30 rounded-lg p-2 text-xs text-white font-medium z-10 shadow-xl backdrop-blur-sm"
                style={{
                  left: ghost.position.x * GRID_SIZE - 60,
                  top: ghost.position.y * GRID_SIZE - 40,
                  minWidth: '80px',
                  maxWidth: '140px',
                  fontSize: '9px',
                  lineHeight: '1.2',
                  textAlign: 'center',
                  wordWrap: 'break-word',
                  hyphens: 'auto'
                }}
              >
                <div className="break-words">
                  {ghost.message}
                </div>
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

export default Level12Page
