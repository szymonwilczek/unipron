import { useState, useEffect, useMemo } from 'react'

function EndingPage() {
  const [showContent, setShowContent] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  const stars = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2
    }))
  }, [])

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500)

    const phases = [1, 2, 3, 4, 5]
    phases.forEach((phase, index) => {
      setTimeout(() => setAnimationPhase(phase), 1000 + (index * 800))
    })
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-8 font-mono relative overflow-hidden">
      
      <div className="fixed inset-0 pointer-events-none">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              boxShadow: '0 0 6px rgba(96, 165, 250, 0.6), 0 0 12px rgba(96, 165, 250, 0.3)'
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl w-full text-center relative z-10">
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className={`mb-8 transition-all duration-800 ${animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-5xl font-bold text-neutral-200 mb-4">
              Thank you for your attention!
            </h1>
          </div>

          <div className={`bg-neutral-900/50 backdrop-blur-sm rounded-lg p-8 mb-8 border border-neutral-700 transition-all duration-800 ${animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-3xl font-bold text-blue-300 mb-6">Made with ❤️ by:</h2>
            <p className="text-xl text-gray-300 mb-4">
              Szymon Wilczek
            </p>
            <p className="text-xl text-gray-300 mb-4">
              Konrad Salej
            </p>
            <p className="text-xl text-gray-300 mb-4">
              Bartosz Kaprak
            </p>
            <p className="text-xl text-gray-300">
              Rafał Szczygieł
            </p>
          </div>

          <div className={`bg-neutral-900/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-neutral-700 transition-all duration-800 ${animationPhase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-2xl font-bold text-blue-200 mb-4">Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-900/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-400">12</div>
                <div className="text-sm text-gray-400">Game Levels</div>
              </div>
              <div className="bg-green-900/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">9</div>
                <div className="text-sm text-gray-400">Special Characters</div>
              </div>
              <div className="bg-purple-900/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-400">Tons</div>
                <div className="text-sm text-gray-400">Of Interactions</div>
              </div>
              <div className="bg-orange-900/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-orange-400">100%</div>
                <div className="text-sm text-gray-400">Commitment</div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-800 ${animationPhase >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6 mb-6 backdrop-blur-sm">
              <p className="text-2xl text-blue-200 mb-4 font-bold">
                Thank you for listening!
              </p>
              <p className="text-lg text-gray-300">
                We hope that our interactive format was at least somehow interesting and engaging :D
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndingPage
