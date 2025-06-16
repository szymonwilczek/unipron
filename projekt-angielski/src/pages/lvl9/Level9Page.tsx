import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function Level9Page() {
  const [playlistId, setPlaylistId] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const correctPlaylistId = "PLrAFSMZQ4ImkgvK9wP0VQR8C_w5_Q7a8b"

  const baseYouTubeUrl = "https://www.youtube.com/playlist?list="

  const handleSubmit = () => {
    if (!playlistId.trim()) {
      setFeedback("⚠️ Wprowadź ID playlisty!")
      return
    }

    setIsLoading(true)
    setFeedback("🔍 Sprawdzanie playlisty...")

    // Symulacja sprawdzania
    setTimeout(() => {
      if (playlistId.trim() === correctPlaylistId) {
        setFeedback("✅ Doskonale! Odnalazłeś właściwą playlistę!")
        
        setTimeout(() => {
          navigate('/digital-systems/advanced')
        }, 2000)
      } else {
        setFeedback("❌ To nie jest właściwa playlista. Spróbuj ponownie!")
        setIsLoading(false)
      }
    }, 1500)
  }

  const openFullLink = () => {
    if (playlistId.trim()) {
      window.open(baseYouTubeUrl + playlistId.trim(), '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-600 shadow-2xl">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src="/prof-paszek.png"
                alt="Prof. Krzysztof Paszek"
                className="w-20 h-20 rounded-full border-4 border-red-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.nextElementSibling?.classList.remove('hidden')
                }}
              />
              <div className="hidden w-20 h-20 rounded-full border-4 border-red-500 bg-gradient-to-br from-red-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">🎬</span>
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white">Prof. Krzysztof Paszek</h2>
                <p className="text-gray-300">Układy Cyfrowe - YouTube Edition</p>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-red-400 mb-4">
              🎬 YouTube Playlist Challenge 🎬
            </h1>
            <p className="text-gray-300 text-lg">
              Znajdź i dokończ link do playlisty z wszystkimi filmami Prof. Paszka
            </p>
          </div>

          {/* Challenge Content */}
          <div className="space-y-6">
            
            {/* YouTube URL Display */}
            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <h3 className="text-lg font-bold text-white mb-4">🔗 Link do dokończenia:</h3>
              
              <div className="bg-black rounded-lg p-4 font-mono text-left">
                <span className="text-green-400">{baseYouTubeUrl}</span>
                <span className="text-yellow-400 bg-yellow-400/20 px-1">
                  {playlistId || '[WPROWADŹ_ID_PLAYLISTY]'}
                </span>
              </div>
              
              {playlistId && (
                <Button
                  onClick={openFullLink}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm"
                >
                  🔗 Otwórz link w nowej karcie
                </Button>
              )}
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Wprowadź ID playlisty YouTube:
                </label>
                <input
                  type="text"
                  value={playlistId}
                  onChange={(e) => setPlaylistId(e.target.value)}
                  placeholder="PLrAFSMZQ4ImkgvK9wP0VQR8C_w5_Q7a8b"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-4 text-white text-center font-mono text-lg focus:border-red-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSubmit()}
                  disabled={isLoading}
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!playlistId.trim() || isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '🔍 SPRAWDZANIE...' : '🎬 SPRAWDŹ PLAYLISTĘ'}
              </Button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`p-4 rounded-lg border ${
                feedback.includes('✅') 
                  ? 'border-green-500 bg-green-900/30 text-green-200' 
                  : feedback.includes('❌')
                  ? 'border-red-500 bg-red-900/30 text-red-200'
                  : 'border-yellow-500 bg-yellow-900/30 text-yellow-200'
              }`}>
                <p className="text-lg font-semibold">{feedback}</p>
              </div>
            )}

            {/* Hints */}
            <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
              <h3 className="text-blue-400 font-bold mb-2">💡 Wskazówki:</h3>
              <div className="text-blue-200 text-sm space-y-1 text-left">
                <p>• ID playlisty YouTube to ciąg znaków po "list=" w URL</p>
                <p>• Sprawdź oficjalny kanał YouTube Prof. Paszka</p>
                <p>• Poszukaj playlisty z wykładami z układów cyfrowych</p>
                <p>• ID playlisty zaczyna się od "PL" i ma około 34 znaków</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            "Najlepsze wykłady to te, które można obejrzeć wielokrotnie!" - Prof. Paszek
          </p>
        </div>
      </div>
    </div>
  )
}

export default Level9Page
