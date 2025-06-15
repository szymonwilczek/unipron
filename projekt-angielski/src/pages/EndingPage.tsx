import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function EndingPage() {
  const [showContent, setShowContent] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    // Animacja wejścia
    setTimeout(() => setShowContent(true), 500)
    
    // Sekwencyjna animacja elementów
    const phases = [1, 2, 3, 4, 5]
    phases.forEach((phase, index) => {
      setTimeout(() => setAnimationPhase(phase), 1000 + (index * 800))
    })
  }, [])

  const restartPresentation = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full text-center">
        
        {/* Main Content */}
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          
          {/* Title */}
          <div className={`mb-8 transition-all duration-800 ${animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-6xl font-bold text-white mb-4">
              🎓 Dziękujemy za uwagę! 🎓
            </h1>
            <div className="w-32 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Project Info */}
          <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 mb-8 border border-gray-600 transition-all duration-800 ${animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-3xl font-bold text-blue-300 mb-6">📚 "Uniwersytet Symulacji" 📚</h2>
            <p className="text-xl text-gray-300 mb-4">
              Interaktywna prezentacja o różnych typach wykładowców
            </p>
            <p className="text-lg text-gray-400">
              Gra edukacyjna stworzona w React + TypeScript
            </p>
          </div>

          {/* Team/Credits */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 transition-all duration-800 ${animationPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
              <h3 className="text-2xl font-bold text-green-400 mb-4">🛠️ Technologie</h3>
              <div className="space-y-2 text-gray-300">
                <p>⚛️ React 18 + TypeScript</p>
                <p>🎨 Tailwind CSS</p>
                <p>🚀 Vite Build Tool</p>
                <p>🎮 Interaktywne komponenty</p>
                <p>🎭 Symulacja dialogów</p>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">🎯 Cele projektu</h3>
              <div className="space-y-2 text-gray-300">
                <p>📖 Prezentacja w formie gry</p>
                <p>🎭 Charakteryzacja postaci</p>
                <p>🤝 Interaktywne doświadczenie</p>
                <p>😄 Rozrywka edukacyjna</p>
                <p>💻 Showcase umiejętności</p>
              </div>
            </div>
          </div>

          {/* Stats/Summary */}
          <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-600 transition-all duration-800 ${animationPhase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">📊 Podsumowanie</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-900/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-400">11</div>
                <div className="text-sm text-gray-400">Poziomów gry</div>
              </div>
              <div className="bg-green-900/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">10</div>
                <div className="text-sm text-gray-400">Unikalnych postaci</div>
              </div>
              <div className="bg-purple-900/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-gray-400">Interakcji</div>
              </div>
              <div className="bg-orange-900/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-orange-400">100%</div>
                <div className="text-sm text-gray-400">Zaangażowania</div>
              </div>
            </div>
          </div>

          {/* Final Message */}
          <div className={`transition-all duration-800 ${animationPhase >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500 rounded-lg p-6 mb-6">
              <p className="text-2xl text-blue-200 mb-4">
                🙏 Dziękujemy za wysłuchanie prezentacji!
              </p>
              <p className="text-lg text-gray-300">
                Mamy nadzieję, że nasza interaktywna forma była ciekawa i angażująca.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={restartPresentation}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-bold"
              >
                🔄 Uruchom ponownie prezentację
              </Button>
              
              <Button
                onClick={() => window.close()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 text-lg font-bold"
              >
                ❌ Zamknij prezentację
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className={`mt-8 text-center transition-all duration-800 ${animationPhase >= 5 ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-gray-500 text-sm">
              💻 Prezentacja stworzona w React + TypeScript | 🎨 Styled with Tailwind CSS
            </p>
            <p className="text-gray-600 text-xs mt-2">
              {new Date().getFullYear()} - Interaktywna prezentacja uniwersytecka
            </p>
          </div>
        </div>

        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EndingPage
