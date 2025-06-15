import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import TutajewiczAvatar from '@/components/TutajewiczAvatar'

function Level3Page() {
  const [code, setCode] = useState(`czyt wys wei il
  LAD A, 10
  ADD A, 20
  STO A, 30
  HLT`)
  
  const [showHint, setShowHint] = useState(false)
  const [solution, setSolution] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const correctSolution = 'czytwys weiil'

  const handleCodeChange = (value: string) => {
    setCode(value)
    // Sprawdź pierwszą linię
    const firstLine = value.split('\n')[0].trim()
    if (firstLine === correctSolution) {
      setTimeout(() => {
        navigate('/quantum/core/access')
      }, 1500)
    }
  }

  const handleSolutionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const normalized = solution.toLowerCase().trim().replace(/\s+/g, ' ')
    
    if (normalized === correctSolution) {
      // Zaktualizuj kod z poprawną pierwszą linią
      const lines = code.split('\n')
      lines[0] = correctSolution
      setCode(lines.join('\n'))
      
      setTimeout(() => {
        navigate('/quantum/core/access')
      }, 1500)
    } else {
      setError('Niepoprawna sekwencja. Spróbuj połączyć słowa...')
      setSolution('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Nagłówek */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">
            Maszyna W - Architektura von Neumanna
          </h1>
          <p className="text-gray-300">
            Wykryto błąd w pierwszej linii programu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lewa strona - Diagram von Neumanna */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
                Architektura von Neumanna - Maszyna W
              </h2>
              
              <div className="flex justify-center">
                <img 
                  src="/images/maszyna-w.png" 
                  alt="Architektura von Neumanna - Maszyna W"
                  className="max-w-full h-auto rounded-lg border border-gray-600"
                  onError={(e) => {
                    // Fallback jeśli obraz się nie załaduje
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                
                {/* Fallback content */}
                <div className="hidden bg-gray-700 p-8 rounded-lg border-2 border-dashed border-gray-500 text-center">
                  <p className="text-gray-400 mb-4">
                    📊 Diagram architektury von Neumanna
                  </p>
                  <p className="text-sm text-gray-500">
                    Obraz: von-neumann-diagram.png<br/>
                    (Umieść w folderze public/)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <TutajewiczAvatar />
            
          </div>
        </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-red-400 mb-4">
                Błąd kompilacji
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-2">
                  Kod programu:
                </label>
                <Textarea
                  value={code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="font-mono text-sm bg-gray-900 border-red-500 text-white min-h-[150px]"
                  placeholder="Wprowadź kod..."
                />
              </div>

              <div className="text-red-400 text-sm mb-4">
                ❌ Błąd w linii 1: Nierozpoznana instrukcja "czyt wys wei il"
              </div>

              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                className="mb-4"
              >
                {showHint ? 'Ukryj' : 'Pokaż'} podpowiedź
              </Button>

              {showHint && (
                <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4 mb-4">
                  <p className="text-blue-200 text-sm">
                    💡 <strong>Wskazówka:</strong> Connect two words together... 
                    Połącz słowa w pary.
                  </p>
                </div>
              )}

              <form onSubmit={handleSolutionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Poprawiona pierwsza linia:
                  </label>
                  <input
                    type="text"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Wprowadź poprawioną instrukcję..."
                  />
                </div>
                
                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
                
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white w-full"
                >
                  Napraw kod
                </Button>
              </form>
            </div>
      </div>
    </div>
  )
}

export default Level3Page
