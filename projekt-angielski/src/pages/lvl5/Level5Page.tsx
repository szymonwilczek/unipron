import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import BodzentaAvatar from '@/components/BodzentaAvatar'

function Level5Page() {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [showHint, setShowHint] = useState(false)
  const navigate = useNavigate()

  const correctAnswers = [
    'motion laws',
    'laws of motion',
    'newton laws',
    'newton\'s laws',
    'newtons laws'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const normalized = answer.toLowerCase().trim()
    
    const isCorrect = correctAnswers.some(correct => 
      normalized === correct || normalized.includes(correct)
    )
    
    if (isCorrect) {
      // Przekierowanie do następnego poziomu
      navigate('/physics/quantum/reality')
    } else {
      setError('Incorrect. Professor Bodzenta is watching... Think about fundamental physics.')
      setAnswer('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black relative overflow-hidden">
      {/* Kamery w rogach */}
      <SecurityCamera position="top-left" />
      <SecurityCamera position="top-right" />
      <SecurityCamera position="bottom-left" />
      <SecurityCamera position="bottom-right" />

      {/* Avatary Bodzenty */}
      <BodzentaAvatar position="top" />
      <BodzentaAvatar position="left" />
      <BodzentaAvatar position="right" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          {/* Nagłówek ostrzegawczy */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-400 mb-4">
              All Eyes On You
            </h1>
            
            <div className="bg-red-900/50 border-2 border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-200 text-lg font-semibold">
                ⚠️ He sees everything. Do not attempt to deceive.
              </p>
              <p className="text-red-300 text-sm mt-2">
                See you next year.
              </p>
            </div>
          </div>

          {/* Główna zawartość */}
          <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-lg border border-gray-600 shadow-2xl">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                {/* Kartka z pytaniem */}
                <div className="bg-white text-black p-6 rounded-lg shadow-lg transform rotate-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Physics Question
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    "What fundamental rules explain why objects move, 
                    or resist movement, and how they affect each other?"
                  </p>
                  
                  <div className="mt-4 text-sm text-gray-500 italic">
                    - Prof. Jerzy Bodzenta
                  </div>
                </div>
                
                {/* Czerwone światło kamery */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Your Answer:
                </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  placeholder="Enter your answer..."
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
                  Submit Answer
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  variant="outline"
                  className="px-6 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  {showHint ? 'Hide' : 'Hint'}
                </Button>
              </div>
            </form>

            {showHint && (
              <div className="mt-6 bg-blue-900/30 border border-blue-600 rounded-lg p-4">
                <p className="text-blue-200 text-sm">
                  💡 <strong>Hint:</strong> Think about Sir Isaac Newton's contribution to physics. 
                  What did he formulate about how objects behave?
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SecurityCamera({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4'
      case 'top-right':
        return 'top-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
    }
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-20`}>
      <div className="relative">
        <div className="w-12 h-12 bg-black rounded-lg border-2 border-gray-600 flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-800 rounded-full border border-gray-500 relative">
            <div className="w-3 h-3 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          </div>
        </div>
        {/* Czerwone światło */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

export default Level5Page
