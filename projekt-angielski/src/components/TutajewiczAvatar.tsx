import { useState, useEffect } from 'react'

function TutajewiczAvatar() {
  const [showBubble, setShowBubble] = useState(false)

  useEffect(() => {
    // Animacja pojawiania się
    const timer = setTimeout(() => {
      setShowBubble(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      {/* Dymek z tekstem */}
      {showBubble && (
        <div className="absolute -top-20 -left-40 z-10 animate-fadeIn">
          <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-gray-300 max-w-xs">
            <p className="text-gray-800 text-sm">
              Oooj pamiętam, że zawsze na początku miałem coś wpisywać...
              ale jak to było... <span className="font-bold text-blue-600">wei il czyt wys</span>????
            </p>

            {/* Ogon dymka */}
            <div className="absolute bottom-0 left-8 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              <div className="w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-t-gray-300 absolute -top-1 -left-2"></div>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Tutajewicza */}
      <div className="bg-gray-700 animate-slideInRight">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 overflow-hidden">
            <img
              src="/images/tutek.png"
              alt="Dr Tutajewicz"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback jeśli obraz się nie załaduje
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-blue-300">
              Dr Tutajewicz
            </h4>
            <p className="text-sm text-gray-400">
              Projektant Maszyny W
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutajewiczAvatar
