import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface TermPageProps {
  termNumber: number
}

function TermPage({ termNumber }: TermPageProps) {
  const navigate = useNavigate()

  const getTermContent = () => {
    switch (termNumber) {
      case 0:
        return {
          title: "Prove It!",
          subtitle: "Analiza Matematyczna - Prof. Łoboz",
          content: (
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                  Mathematical Analysis - Lecture Slide
                </h2>
                
                <div className="bg-white text-black p-6 rounded-lg font-serif">
                  <h3 className="text-xl font-bold mb-4 text-center">
                    Definicja granicy funkcji (Weierstrassa)
                  </h3>
                  
                  <div className="space-y-4">
                    <p>
                      Niech f: D → ℝ oraz niech x₀ będzie punktem skupienia zbioru D.
                    </p>
                    
                    <div className="bg-yellow-100 p-4 rounded border-l-4 border-yellow-500">
                      <p className="font-bold">
                        lim[x→x₀] f(x) = L
                      </p>
                      <p className="mt-2">
                        ⟺ ∀ε &gt; 0 ∃δ &gt; 0 ∀x ∈ D: 0 &lt; |x - x₀| &lt; δ ⟹ |f(x) - L| &lt; ε
                      </p>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p><strong>Przykład:</strong></p>
                      <p>Udowodnij, że lim[x→2] (3x - 1) = 5</p>
                      <p className="mt-2 italic">
                        "Pamiętajcie, że na egzaminie będziecie musieli udowodnić każde twierdzenie!"
                        <br/>- Prof. Łoboz
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }

      case 1:
        return {
          title: "Termin zapoznawczy",
          subtitle: "Pierwszy podstęp...",
          content: (
            <div className="text-center space-y-6">
              <div className="text-8xl">📚</div>
              <h2 className="text-3xl font-bold text-yellow-400">
                Termin zapoznawczy
              </h2>
              <p className="text-gray-300 text-lg">
                To był tylko termin zapoznawczy. Prawdziwy egzamin dopiero przed Tobą.
              </p>
              <Button
                onClick={() => navigate('/amial/term0')}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                Powrót do wyboru terminu
              </Button>
            </div>
          )
        }

      case 2:
        return {
          title: "Tym razem też się nie udało",
          subtitle: "Drugi podstęp...",
          content: (
            <div className="text-center space-y-6">
              <div className="text-8xl">❌</div>
              <h2 className="text-3xl font-bold text-red-400">
                Tym razem też się nie udało
              </h2>
              <p className="text-gray-300 text-lg">
                Drugi termin, drugi podstęp. Prof. Łoboz nie da się tak łatwo oszukać.
              </p>
              <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
                <p className="text-red-200 text-sm">
                  "Nothing on faith! Prove it!" - Prof. Łoboz
                </p>
              </div>
              <Button
                onClick={() => navigate('/amial/term0')}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                Powrót do wyboru terminu
              </Button>
            </div>
          )
        }

      default:
        return {
          title: "Unknown Term",
          subtitle: "",
          content: <div>Error</div>
        }
    }
  }

  const { title, subtitle, content } = getTermContent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-300 text-lg">
              {subtitle}
            </p>
          )}
        </div>
        {content}
      </div>
    </div>
  )
}

export default TermPage;
