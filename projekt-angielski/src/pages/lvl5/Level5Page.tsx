import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import BodzentaAvatar from '@/components/BodzentaAvatar'
import SecurityCamera from '@/components/SecurityCamera'

function Level5Page() {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [cheatingDetected, setCheatingDetected] = useState(false)
  const navigate = useNavigate()

  const correctAnswers = [
    'a measure of disorder or energy dissipation in a system',
    'measure of disorder',
    'energy dissipation',
    'disorder in a system'
  ]

  useEffect(() => {
    localStorage.setItem('physics_answer', JSON.stringify({
      question: 'entropy',
      answer: 'A measure of disorder or energy dissipation in a system'
    }))
  }, [])

  useEffect(() => {
    let devToolsOpen = false

    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold

      let start = new Date()
      debugger
      let end = new Date()
      if (end.getTime() - start.getTime() > 100) {
        setCheatingDetected(true)
      }

      if ((widthThreshold || heightThreshold) && !devToolsOpen) {
        devToolsOpen = true
        setCheatingDetected(true)
      }
    }

    const interval = setInterval(detectDevTools, 1000)

    const handleContextMenu = () => {
      setTimeout(detectDevTools, 100)
    }

    document.addEventListener('contextmenu', handleContextMenu)

    return () => {
      clearInterval(interval)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (cheatingDetected) {
      setError('CHEATING DETECTED! Access denied.')
      setAnswer('')
      return
    }

    const normalized = answer.toLowerCase().trim()

    const isCorrect = correctAnswers.some(correct =>
      normalized === correct || normalized.includes(correct)
    )

    if (isCorrect) {
      navigate('/electro/level6')
    } else {
      setError('Incorrect.')
      setAnswer('')
    }
  }

  if (cheatingDetected) {
    return (
      <div className="min-h-screen bg-red-950 flex items-center justify-center relative overflow-hidden">
        <SecurityCamera position="top-left" />
        <SecurityCamera position="top-right" />
        <SecurityCamera position="bottom-left" />
        <SecurityCamera position="bottom-right" />

        <BodzentaAvatar position="top" />
        <BodzentaAvatar position="left" />
        <BodzentaAvatar position="right" />

        <div className="text-center z-10">
          <div className="text-8xl mb-6">👁️</div>
          <h1 className="text-6xl font-bold text-red-400 mb-4">
            BUSTED!
          </h1>
          <div className="bg-red-900/50 border-2 border-red-500 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-200 text-lg font-bold mb-2">
              ⚠️ BERZY JODZENTA SEES ALL!
            </p>
            <p className="text-red-300 text-sm italic">
              "You tried to cheat, didn't you?"
            </p>
            <p className="text-red-400 text-xs mt-4 font-mono italic font-semibold">
              See you next year.
            </p>
          </div>

          <Button
            onClick={() => {
              setCheatingDetected(false)
              setAnswer('')
              setError('')
            }}
            className="mt-6 bg-gray-600 hover:bg-gray-700 text-white"
          >
            Try Again (Pay for conditional pass)
          </Button>
        </div>

        <div className="absolute inset-0 bg-red-500 opacity-10"></div>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-500 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <SecurityCamera position="top-left" />
      <SecurityCamera position="top-right" />
      <SecurityCamera position="bottom-left" />
      <SecurityCamera position="bottom-right" />

      <BodzentaAvatar position="top" />
      <BodzentaAvatar position="left" />
      <BodzentaAvatar position="right" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">

            <div className="bg-red-900/50 border-2 border-red-500 rounded-lg p-4 mb-2">
              <p className="text-red-200 text-lg font-semibold">
                ⚠️ He sees everything. Do not attempt to cheat.
              </p>
              <p className="text-red-300 text-sm mt-2 font-mono italic">
                See you next year.
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 backdrop-blur-sm p-8 rounded-lg border border-neutral-700 shadow-2xl">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="bg-white text-black p-6 rounded-lg shadow-lg transform rotate-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Question Set #20
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    2. Entropy
                  </p>
                </div>

                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border bg-neutral-800 text-neutral-200 border-neutral-700 rounded-lg text-white focus:outline-none"
                  placeholder="So? What is it?"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-600 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3"
                >
                  Yes... I... I know the answer
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level5Page
