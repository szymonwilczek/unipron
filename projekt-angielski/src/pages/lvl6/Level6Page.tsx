import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface Lever {
  id: string
  unit: string
  symbol: string
  position: { x: number; y: number }
  isActivated: boolean
  isBomb: boolean
}

interface Quest {
  id: string
  message: string
  expectedSequence: string[]
  formula: string
  completed: boolean
}

function Level6Page() {
  const [levers, setLevers] = useState<Lever[]>([])
  const [currentQuest, setCurrentQuest] = useState(0)
  const [gateOpen, setGateOpen] = useState(false)
  const [currentSequence, setCurrentSequence] = useState<string[]>([])
  const [error, setError] = useState('')
  const [allQuestsComplete, setAllQuestsComplete] = useState(false)
  const [explosion, setExplosion] = useState(false)
  const navigate = useNavigate()

  const quests: Quest[] = [
    {
      id: 'resistance',
      message: "Show some true RESISTANCE, warrior! The path requires the fundamental law - what EQUALS what divided by what?",
      expectedSequence: ['Ω', 'V', 'A'], // R = U/I
      formula: 'R = U/I',
      completed: false
    },
    {
      id: 'power_basic',
      message: "Excellent! Now demonstrate your POWER! When VOLTAGE meets CURRENT, what energy emerges?",
      expectedSequence: ['W', 'V', 'A'], // P = U*I
      formula: 'P = U×I',
      completed: false
    },
    {
      id: 'power_current',
      message: "Impressive! But true mastery requires knowing POWER through CURRENT alone. When electrons flow SQUARED through resistance...",
      expectedSequence: ['W', 'A', 'A', 'Ω'], // P = I²×R
      formula: 'P = I²×R',
      completed: false
    },
    {
      id: 'power_voltage',
      message: "Almost there, electrical knight! Final test - harness POWER through VOLTAGE alone. When potential SQUARED meets its opposition...",
      expectedSequence: ['W', 'V', 'V', 'Ω'], // P = U²/R
      formula: 'P = U²/R',
      completed: false
    }
  ]

  useEffect(() => {
    // 24 dźwignie z prawdziwymi jednostkami + pułapki
    const allUnits = [
      // Podstawowe jednostki SI
      { unit: 'Ohm', symbol: 'Ω', isBomb: false },
      { unit: 'Volt', symbol: 'V', isBomb: false },
      { unit: 'Ampere', symbol: 'A', isBomb: false },
      { unit: 'Watt', symbol: 'W', isBomb: false },
      { unit: 'Volt', symbol: 'V', isBomb: false }, // Duplikaty dla wzorów
      { unit: 'Ampere', symbol: 'A', isBomb: false },
      { unit: 'Ohm', symbol: 'Ω', isBomb: false },
      { unit: 'Volt', symbol: 'V', isBomb: false },

      // Inne jednostki elektryczne (pułapki)
      { unit: 'Farad', symbol: 'F', isBomb: true },
      { unit: 'Henry', symbol: 'H', isBomb: true },
      { unit: 'Tesla', symbol: 'T', isBomb: true },
      { unit: 'Weber', symbol: 'Wb', isBomb: true },
      { unit: 'Coulomb', symbol: 'C', isBomb: true },
      { unit: 'Siemens', symbol: 'S', isBomb: true },
      { unit: 'Joule', symbol: 'J', isBomb: true },
      { unit: 'Newton', symbol: 'N', isBomb: true },

      // Jeszcze więcej pułapek
      { unit: 'Pascal', symbol: 'Pa', isBomb: true },
      { unit: 'Hertz', symbol: 'Hz', isBomb: true },
      { unit: 'Kelvin', symbol: 'K', isBomb: true },
      { unit: 'Candela', symbol: 'cd', isBomb: true },
      { unit: 'Mole', symbol: 'mol', isBomb: true },
      { unit: 'Lumen', symbol: 'lm', isBomb: true },
      { unit: 'Lux', symbol: 'lx', isBomb: true },
      { unit: 'Becquerel', symbol: 'Bq', isBomb: true }
    ]

    const leverPositions = [
      { x: 15, y: 62.75 }, { x: 15, y: 71.25 }, { x: 15, y: 79.75 },
      { x: 23, y: 62.75 }, { x: 23, y: 71.25 }, { x: 23, y: 79.75 },
      { x: 31, y: 62.75 }, { x: 31, y: 71.25 }, { x: 31, y: 79.75 },
      { x: 39, y: 62.75 }, { x: 39, y: 71.25 }, { x: 39, y: 79.75 },

      { x: 61, y: 62.75 }, { x: 61, y: 71.25}, { x: 61, y: 79.75 },
      { x: 69, y: 62.75 }, { x: 69, y: 71.25}, { x: 69, y: 79.75 },
      { x: 77, y: 62.75 }, { x: 77, y: 71.25}, { x: 77, y: 79.75 },
      { x: 85, y: 62.75 }, { x: 85, y: 71.25}, { x: 85, y: 79.75 }
    ]

    // Shuffle units for randomness
    const shuffledUnits = [...allUnits].sort(() => Math.random() - 0.5)

    const initialLevers: Lever[] = shuffledUnits.map((unit, index) => ({
      id: `lever_${index}`,
      unit: unit.unit,
      symbol: unit.symbol,
      position: leverPositions[index],
      isActivated: false,
      isBomb: unit.isBomb
    }))

    setLevers(initialLevers)
  }, [])

  const playExplosionSound = () => {
    // Simple explosion sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(150, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5)

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const handleLeverPull = (leverId: string) => {
    const lever = levers.find(l => l.id === leverId)
    if (!lever || allQuestsComplete) return

    // Check if it's a bomb
    if (lever.isBomb) {
      // EXPLOSION!
      setExplosion(true)
      playExplosionSound()

      setTimeout(() => {
        // Reset everything
        setCurrentQuest(0)
        setCurrentSequence([])
        resetLevers()
        setExplosion(false)
        setError('💥 BOOM! Back to the beginning, warrior!')

        setTimeout(() => setError(''), 3000)
      }, 1000)

      return
    }

    const quest = quests[currentQuest]
    if (!quest || quest.completed) return

    // Add to current sequence
    const newSequence = [...currentSequence, lever.symbol]
    setCurrentSequence(newSequence)

    // Activate lever temporarily
    setLevers(prev => prev.map(l =>
      l.id === leverId ? { ...l, isActivated: true } : l
    ))

    // ZMIANA: Walidacja tylko po wprowadzeniu pełnej sekwencji
    const expectedSequence = quest.expectedSequence

    if (newSequence.length === expectedSequence.length) {
      // Sprawdź dopiero teraz całą sekwencję
      if (JSON.stringify(newSequence) === JSON.stringify(expectedSequence)) {
        // Correct sequence!
        setTimeout(() => {
          setCurrentQuest(prev => prev + 1)
          setCurrentSequence([])
          resetLevers()

          if (currentQuest === quests.length - 1) {
            // All quests completed
            setAllQuestsComplete(true)
            setTimeout(() => {
              setGateOpen(true)
            }, 2000)
          }
        }, 1500)

        setError('')
      } else {
        // Wrong sequence - reset po pełnej sekwencji
        setError(`Incorrect formula! The knight shakes his head... Try again!`)
        setTimeout(() => {
          setCurrentSequence([])
          resetLevers()
          setError('')
        }, 2000)
      }
    } else if (newSequence.length > expectedSequence.length) {
      // Zabezpieczenie przed przekroczeniem długości
      setError('Too many units! Sequence reset.')
      setTimeout(() => {
        setCurrentSequence([])
        resetLevers()
        setError('')
      }, 1500)
    }
  }

  const resetLevers = () => {
    setLevers(prev => prev.map(l => ({ ...l, isActivated: false })))
  }

  const handleEnterCastle = () => {
    if (gateOpen) {
      navigate('/circuits/advanced/theory')
    }
  }

  const currentQuestData = quests[currentQuest]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-gray-900 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-purple-900"></div>

      {explosion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="text-9xl animate-ping">💥</div>
          <div className="absolute inset-0 bg-red-500/30 animate-pulse"></div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-yellow-400 mb-4">
            🏰 The Fortress of Electrical Laws 🏰
          </h1>
          <p className="text-gray-300 text-lg">
            Choose wisely - some levers hide explosive surprises!
          </p>
        </div>

        <div className="relative mx-auto mb-6" style={{ maxWidth: '900px', height: '600px' }}>
          <ElectricalCastle
            levers={levers}
            onLeverPull={handleLeverPull}
            gateOpen={gateOpen}
            onEnterCastle={handleEnterCastle}
            allQuestsComplete={allQuestsComplete}
            explosion={explosion}
          />

          <KnightOnCastle
            message={currentQuestData?.message || ''}
            questNumber={currentQuest + 1}
            totalQuests={quests.length}
            isComplete={allQuestsComplete}
          />
        </div>

        <SequenceDisplay
          currentSequence={currentSequence}
          expectedLength={currentQuestData?.expectedSequence.length || 0}
          questComplete={allQuestsComplete}
        />

        <div className="mt-6 text-center">
          {error && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-4">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {gateOpen && (
            <div className="bg-green-900/50 border border-green-500 rounded-lg p-6">
              <h3 className="text-3xl font-bold text-green-300 mb-4">
                🎉 THE GATES HAVE OPENED! 🎉
              </h3>
              <p className="text-green-200 text-lg mb-4">
                The electrical knight bows in respect! You have mastered all the fundamental laws!
              </p>
              <Button
                onClick={handleEnterCastle}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 text-xl font-bold animate-pulse"
              >
                🚪 Enter the Sacred Halls 🚪
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600 inline-block">
            <span className="text-2xl font-bold text-yellow-400">
              {allQuestsComplete ? '4/4' : `${currentQuest}/${quests.length}`}
            </span>
            <p className="text-gray-300 text-sm mt-1">Quests Completed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function KnightOnCastle({ message, questNumber, totalQuests, isComplete }: {
  message: string
  questNumber: number
  totalQuests: number
  isComplete: boolean
}) {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
      {message && (
        <div className="mb-4 relative">
          <div className="bg-white rounded-lg p-4 shadow-lg max-w-md">
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>

            <div className="text-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-sm text-blue-800">
                  Sir Electrical Knight
                </h3>
                <span className="text-xs text-gray-600">
                  {questNumber}/{totalQuests}
                </span>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <img
          src="/professor-knight.png"
          alt="Electrical Knight"
          className="w-16 h-16 rounded-full border-4 border-yellow-500 shadow-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            target.nextElementSibling?.classList.remove('hidden')
          }}
        />
        <div className="hidden w-16 h-16 rounded-full border-4 border-yellow-500 bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center">
          <span className="text-white font-bold text-xl">⚡</span>
        </div>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-yellow-400 text-lg">
          👑
        </div>

        {isComplete && (
          <div className="absolute -top-1 -right-1 text-green-400 text-lg animate-bounce">
            ✨
          </div>
        )}
      </div>
    </div>
  )
}

function ElectricalCastle({ levers, onLeverPull, gateOpen, onEnterCastle, allQuestsComplete, explosion }: {
  levers: Lever[]
  onLeverPull: (leverId: string) => void
  gateOpen: boolean
  onEnterCastle: () => void
  allQuestsComplete: boolean
  explosion: boolean
}) {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 900 600" className="w-full h-full">
        <rect x="50" y="200" width="800" height="400" fill="#4a5568" stroke="#2d3748" strokeWidth="3" />

        <rect x="0" y="150" width="100" height="450" fill="#4a5568" stroke="#2d3748" strokeWidth="3" />
        <rect x="800" y="150" width="100" height="450" fill="#4a5568" stroke="#2d3748" strokeWidth="3" />

        <polygon points="0,150 50,80 100,150" fill="#2d3748" />
        <polygon points="800,150 850,80 900,150" fill="#2d3748" />

        <rect x="400" y="350" width="100" height="250" fill="#2d3748" stroke="#1a202c" strokeWidth="3" />

        <rect
          x="410"
          y={gateOpen ? "580" : "360"}
          width="80"
          height={gateOpen ? "20" : "230"}
          fill="#8b4513"
          stroke="#654321"
          strokeWidth="2"
          className={`transition-all duration-3000 ease-in-out ${explosion ? 'animate-pulse' : ''}`}
        />

        {!gateOpen && (
          <>
            <line x1="425" y1="370" x2="425" y2="580" stroke="#654321" strokeWidth="2" />
            <line x1="440" y1="370" x2="440" y2="580" stroke="#654321" strokeWidth="2" />
            <line x1="455" y1="370" x2="455" y2="580" stroke="#654321" strokeWidth="2" />
            <line x1="470" y1="370" x2="470" y2="580" stroke="#654321" strokeWidth="2" />
          </>
        )}

        {[250, 300, 350, 400, 450, 500, 550].map(y => (
          <line key={y} x1="50" y1={y} x2="850" y2={y} stroke="#2d3748" strokeWidth="1" />
        ))}

        <rect x="150" y="250" width="25" height="35" fill="#1a202c" />
        <rect x="200" y="250" width="25" height="35" fill="#1a202c" />
        <rect x="675" y="250" width="25" height="35" fill="#1a202c" />
        <rect x="725" y="250" width="25" height="35" fill="#1a202c" />

        {gateOpen && (
          <rect x="410" y="580" width="80" height="20" fill="#ffd700" className="cursor-pointer animate-pulse" onClick={onEnterCastle} />
        )}

        {allQuestsComplete && (
          <circle cx="450" cy="150" r="40" fill="none" stroke="#ffd700" strokeWidth="3" className="animate-ping" />
        )}
      </svg>

      {levers.map((lever) => (
        <CastleLever
          key={lever.id}
          lever={lever}
          onPull={() => onLeverPull(lever.id)}
        />
      ))}
    </div>
  )
}

function CastleLever({ lever, onPull }: {
  lever: Lever
  onPull: () => void
}) {
  return (
    <div
      className="absolute cursor-pointer transition-all duration-200 hover:scale-110 group"
      style={{
        left: `${lever.position.x}%`,
        top: `${lever.position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onPull}
    >
      <div className="relative">
        {/* Mechanizm dzwigi */}
        <div className={`w-5 h-10 rounded border-2 relative`}>
          {/* Uchwyt */}
          <div
            className={`z-10 absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 rounded transition-all duration-300 border ${lever.isActivated
                ? 'bg-green-500 border-green-400 -rotate-45'
                : 'bg-gray-500 border-gray-400 rotate-45'
              }`}
          ></div>

          {/* Jednostka na hoverze */}
          <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-1 py-0.5 rounded border border-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-0">
            {lever.symbol}
          </div>
        </div>

        {/* aktywacja, animacje */}
        {lever.isActivated && (
          <>
            <div className="absolute inset-0 bg-green-400/40 rounded-full blur animate-pulse"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-green-400 text-sm animate-bounce">⚡</div>
          </>
        )}
      </div>
    </div>
  )
}

function SequenceDisplay({ currentSequence, expectedLength, questComplete }: {
  currentSequence: string[]
  expectedLength: number
  questComplete: boolean
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-600 max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-blue-300 text-center mb-4">
        Current Formula Sequence
      </h3>

      <div className="flex justify-center items-center gap-3 flex-wrap">
        {Array.from({ length: Math.max(expectedLength, currentSequence.length) }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-lg font-bold ${index < currentSequence.length
                ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                : 'border-gray-600 border-dashed text-gray-500'
                }`}
            >
              {index < currentSequence.length ? currentSequence[index] : '?'}
            </div>

            {index < expectedLength - 1 && index < currentSequence.length && (
              <span className="text-yellow-400 mx-2 text-xl">
                {index === 0 ? '=' : (index === 1 && expectedLength > 3) ? '×' : (index === expectedLength - 2) ? '/' : '×'}
              </span>
            )}
          </div>
        ))}
      </div>

      {questComplete && (
        <div className="text-center mt-4 text-green-400 font-bold">
          🎉 All Electrical Laws Mastered! 🎉
        </div>
      )}
    </div>
  )
}

export default Level6Page
