import ElectricalCastle from '@/components/lvl6/ElectricalCastle'
import KnightOnCastle from '@/components/lvl6/KnightOnCastle'
import SequenceDisplay from '@/components/lvl6/SequenceDisplay'
import type { Lever } from '@/types/types'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


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
  const [currentSequence, setCurrentSequence] = useState<string[]>([])
  const [allQuestsComplete, setAllQuestsComplete] = useState(false)
  const [explosion, setExplosion] = useState(false)
  const navigate = useNavigate()

  const quests: Quest[] = [
    {
      id: 'resistance',
      message: "Show some true resistance, warrior!",
      expectedSequence: ['Ω', 'V', 'A'], // R = U/I
      formula: 'R = U/I',
      completed: false
    },
    {
      id: 'power_basic',
      message: "I demand you to demonstrate your power!",
      expectedSequence: ['W', 'V', 'A'], // P = U*I
      formula: 'P = U×I',
      completed: false
    },
    {
      id: 'knights_honor',
      message: "What flows when the knight draws his blade?",
      expectedSequence: ['A'],
      formula: 'I',
      completed: false
    },
    {
      id: 'energy_strike',
      message: "Strike with pure energy!",
      expectedSequence: ['J', 'W', 's'], // E = P*t
      formula: 'E = P×t',
      completed: false
    },
  ]

  useEffect(() => {
    const allUnits = [
      { unit: 'Ohm', symbol: 'Ω', isBomb: false },
      { unit: 'Volt', symbol: 'V', isBomb: false },
      { unit: 'Watt', symbol: 'W', isBomb: false },
      { unit: 'Ampere', symbol: 'A', isBomb: false },
      { unit: 'Farad', symbol: 'F', isBomb: true },
      { unit: 'Henry', symbol: 'H', isBomb: true },
      { unit: 'Tesla', symbol: 'T', isBomb: true },
      { unit: 'Weber', symbol: 'Wb', isBomb: true },
      { unit: 'Coulomb', symbol: 'C', isBomb: true },
      { unit: 'Siemens', symbol: 'S', isBomb: true },
      { unit: 'Joule', symbol: 'J', isBomb: false },
      { unit: 'Newton', symbol: 'N', isBomb: true },
      { unit: 'Pascal', symbol: 'Pa', isBomb: true },
      { unit: 'Hertz', symbol: 'Hz', isBomb: true },
      { unit: 'Kelvin', symbol: 'K', isBomb: true },
      { unit: 'Lumen', symbol: 'lm', isBomb: true },
      { unit: 'Second', symbol: 's', isBomb: false },
      { unit: 'Becquerel', symbol: 'Bq', isBomb: true }
    ]

    const leverPositions = [
      { x: 19, y: 62.75 }, { x: 19, y: 74.75 }, { x: 19, y: 86.75 },
      { x: 27, y: 62.75 }, { x: 27, y: 74.75 }, { x: 27, y: 86.75 },
      { x: 35, y: 62.75 }, { x: 35, y: 74.75 }, { x: 35, y: 86.75 },

      { x: 65, y: 62.75 }, { x: 65, y: 74.75 }, { x: 65, y: 86.75 },
      { x: 72, y: 62.75 }, { x: 72, y: 74.75 }, { x: 72, y: 86.75 },
      { x: 80, y: 62.75 }, { x: 80, y: 74.75 }, { x: 80, y: 86.75 },
    ]

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

    if (lever.isBomb) {
      // EXPLOSION!
      setExplosion(true)
      playExplosionSound()

      setTimeout(() => {
        setCurrentQuest(0)
        setCurrentSequence([])
        resetLevers()
        setExplosion(false)

      }, 1000)

      return
    }

    const quest = quests[currentQuest]
    if (!quest || quest.completed) return

    const newSequence = [...currentSequence, lever.symbol]
    setCurrentSequence(newSequence)

    setLevers(prev => prev.map(l =>
      l.id === leverId ? { ...l, isActivated: true } : l
    ))

    const expectedSequence = quest.expectedSequence

    if (newSequence.length === expectedSequence.length) {
      if (JSON.stringify(newSequence) === JSON.stringify(expectedSequence)) {
        setTimeout(() => {
          setCurrentQuest(prev => prev + 1)
          setCurrentSequence([])
          resetLevers()

          if (currentQuest === quests.length - 1) {
            setAllQuestsComplete(true)
          }
        }, 1500)

      } else {
        setTimeout(() => {
          setCurrentSequence([])
          resetLevers()
        }, 2000)
      }
    } else if (newSequence.length > expectedSequence.length) {
      setTimeout(() => {
        setCurrentSequence([])
        resetLevers()
      }, 1500)
    }
  }

  const resetLevers = () => {
    setLevers(prev => prev.map(l => ({ ...l, isActivated: false })))
  }

  const handleDoorHandle = () => {
    if (allQuestsComplete) {
      navigate('/circuits/advanced/theory')
    }
  }

  const currentQuestData = quests[currentQuest]

  return (
    <div className="min-h-screen bg-neutral-950 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-neutral-950"></div>

      {explosion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="text-9xl animate-ping">💥</div>
          <div className="absolute inset-0 bg-red-500/30 animate-pulse"></div>
        </div>
      )}

      <div className="flex flex-col z-10 max-w-7xl mx-auto">

        <div className="relative mx-auto mb-6" style={{ maxWidth: '900px', height: '600px' }}>
          <ElectricalCastle
            levers={levers}
            onLeverPull={handleLeverPull}
            allQuestsComplete={allQuestsComplete}
            onDoorHandle={handleDoorHandle}
            explosion={explosion}
          />

          <KnightOnCastle
            message={currentQuestData?.message || ''}
            questNumber={currentQuest + 1}
            totalQuests={quests.length}
            questComplete={allQuestsComplete}
          />
        </div>

        <SequenceDisplay
          currentSequence={currentSequence}
          expectedLength={currentQuestData?.expectedSequence.length || 0}
          questComplete={allQuestsComplete}
          questId={currentQuestData?.id} 
        />
      </div>
    </div>
  )
}

export default Level6Page
