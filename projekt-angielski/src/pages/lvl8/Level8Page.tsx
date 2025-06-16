import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface Question {
  id: string
  question: string
  hint: string
  answer: string
  method: string
}

function Level8Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const navigate = useNavigate()

  const questions: Question[] = [
    {
      id: 'lifo',
      question: "Jaka struktura danych działa na zasadzie LIFO (Last In First Out)?",
      hint: "Sprawdź komentarze w kodzie HTML tej strony...",
      answer: "stos",
      method: "HTML Comment"
    },
    {
      id: 'recursion',
      question: "Jak nazywa się technika, gdy funkcja wywołuje samą siebie?",
      hint: "Otwórz konsolę deweloperską i sprawdź zmienne window.siminski*",
      answer: "rekurencja",
      method: "Console Variable"
    },
    {
      id: 'solid',
      question: "Podaj nazwę zasad programowania obiektowego (skrót z 5 liter):",
      hint: "Sprawdź ukryte style CSS w DevTools...",
      answer: "solid",
      method: "CSS Hidden Content"
    },
    {
      id: 'pattern',
      question: "Jaki wzorzec projektowy zapewnia tylko jedną instancję klasy?",
      hint: "Sprawdź zakładkę Network w DevTools - nazwa jednego z plików...",
      answer: "singleton",
      method: "Network Tab"
    },
    {
      id: 'storage',
      question: "W której pamięci przeglądarki dane są dostępne tylko podczas sesji?",
      hint: "Sprawdź Application tab -> Local/Session Storage",
      answer: "session storage",
      method: "Browser Storage"
    }
  ]

  useEffect(() => {
// Ukryte zmienne w konsoli - POPRAWKA
    ;(window as any).siminskiSecret1 = "rekurencja"
    ;(window as any).siminskiAnswer2 = "To nie ta zmienna..."
    ;(window as any).siminskiHint = "Szukaj dalej! 🔍"
    
    // Console hint
    console.log("🎓 Witaj w laboratorium programowania!")
    console.log("💡 Prof. Simiński ukrył odpowiedzi w różnych miejscach...")
    console.log("🔍 Sprawdź zmienne window.siminski* dla drugiego pytania")
    console.log("📱 Nie zapomnij o innych zakładkach DevTools!")
    
    // Local Storage
    localStorage.setItem('programming_bonus', 'localStorage')
    sessionStorage.setItem('programming_answer', 'session storage')
    
    // Network request z ukrytą nazwą
    const img = new Image()
    img.src = '/singleton-pattern-image.png'
    
    return () => {
      // Cleanup
      delete (window as any).siminskiSecret1
      delete (window as any).siminskiAnswer2
      delete (window as any).siminskiHint
    }
  }, [])

  const handleSubmit = () => {
    const currentQ = questions[currentQuestion]
    const normalizedAnswer = userAnswer.toLowerCase().trim()
    const normalizedCorrect = currentQ.answer.toLowerCase().trim()

    if (normalizedAnswer === normalizedCorrect) {
      setScore(prev => prev + 1)
      setFeedback(`✅ Poprawnie! Znaleziono odpowiedź metodą: ${currentQ.method}`)

      setTimeout(() => {
        if (currentQuestion === questions.length - 1) {
          setIsComplete(true)
        } else {
          setCurrentQuestion(prev => prev + 1)
          setUserAnswer('')
          setFeedback('')
        }
      }, 2000)
    } else {
      setFeedback(`❌ Niepoprawna odpowiedź. ${currentQ.hint}`)
    }
  }

  const handleComplete = () => {
    if (score >= 4) { // Minimum 4/5 poprawnych
      navigate('/algorithms/final')
    } else {
      setFeedback('❌ Zbyt mało poprawnych odpowiedzi! Prof. Simiński wymaga lepszego wyniku.')
    }
  }

  if (isComplete) {
    return <CompletionScreen score={score} total={questions.length} onComplete={handleComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 p-4">
      {/* HTML Comment with hidden answer */}
      {/* LIFO = Last In First Out = STOS */}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            💻 Laboratorium Programowania 💻
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/prof-siminski.png"
              alt="Prof. Krzysztof Simiński"
              className="w-16 h-16 rounded-full border-4 border-green-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden w-16 h-16 rounded-full border-4 border-green-500 bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">💻</span>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Prof. Krzysztof Simiński</h2>
              <p className="text-gray-300 text-sm">Programowanie i Algorytmy</p>
            </div>
          </div>
          <p className="text-gray-300 text-lg">
            Znajdź odpowiedzi ukryte w kodzie strony używając DevTools!
          </p>
        </div>

        {/* Progress */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-8 border border-gray-600">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Postęp:</span>
            <span className="text-green-400 font-bold">{currentQuestion + 1}/{questions.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Question */}
        <QuestionCard
          question={questions[currentQuestion]}
          userAnswer={userAnswer}
          onAnswerChange={setUserAnswer}
          onSubmit={handleSubmit}
          feedback={feedback}
        />

        {/* DevTools Instruction */}
        <div className="mt-8 bg-blue-900/30 border border-blue-600 rounded-lg p-4">
          <h3 className="text-blue-400 font-bold mb-2">🔧 Instrukcja dla detektywów kodu:</h3>
          <div className="text-blue-200 text-sm space-y-1">
            <p>• <strong>F12</strong> - otwórz DevTools</p>
            <p>• <strong>Console</strong> - sprawdź zmienne i logi</p>
            <p>• <strong>Elements</strong> - szukaj komentarzy HTML</p>
            <p>• <strong>Network</strong> - sprawdź nazwy plików</p>
            <p>• <strong>Application</strong> - Local/Session Storage</p>
            <p>• <strong>Sources</strong> - ukryte style CSS</p>
          </div>
        </div>
      </div>

      {/* Hidden CSS with answer - will be visible in DevTools */}
      <style>
        {`
          .siminski-hidden-answer::before {
            content: "SOLID"; /* Zasady programowania obiektowego */
            display: none;
            /* Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion */
          }
          
          .secret-programming-principle {
            /* 
              ODPOWIEDŹ NA TRZECIE PYTANIE: SOLID
              S - Single Responsibility Principle
              O - Open/Closed Principle  
              L - Liskov Substitution Principle
              I - Interface Segregation Principle
              D - Dependency Inversion Principle
            */
            display: none;
          }
        `}
      </style>

      {/* Hidden div that will show up in Elements */}
      <div className="siminski-hidden-answer secret-programming-principle"></div>
    </div>
  )
}

function QuestionCard({ question, userAnswer, onAnswerChange, onSubmit, feedback }: {
  question: Question
  userAnswer: string
  onAnswerChange: (value: string) => void
  onSubmit: () => void
  feedback: string
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-600">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-4">
          🤔 {question.question}
        </h3>
        <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3">
          <p className="text-yellow-200 text-sm">
            💡 <strong>Wskazówka:</strong> {question.hint}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Twoja odpowiedź:
          </label>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Wpisz odpowiedź znalezioną w DevTools..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
          />
        </div>

        <Button
          onClick={onSubmit}
          disabled={!userAnswer.trim()}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-bold disabled:opacity-50"
        >
          🔍 SPRAWDŹ ODPOWIEDŹ
        </Button>

        {feedback && (
          <div className={`p-4 rounded-lg border ${feedback.includes('✅')
            ? 'border-green-500 bg-green-900/30 text-green-200'
            : 'border-red-500 bg-red-900/30 text-red-200'
            }`}>
            <p>{feedback}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function CompletionScreen({ score, total, onComplete }: {
  score: number
  total: number
  onComplete: () => void
}) {
  const percentage = (score / total) * 100
  const passed = score >= 4

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-600">
          <div className="text-6xl mb-6">
            {passed ? '🎉' : '😞'}
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            {passed ? 'Gratulacje!' : 'Spróbuj ponownie'}
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            Twój wynik: <span className="text-green-400 font-bold">{score}/{total}</span> ({percentage.toFixed(0)}%)
          </p>

          {passed ? (
            <div className="space-y-4">
              <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
                <p className="text-green-200">
                  "Excellent debugging skills! Widzę, że DevTools nie mają przed Tobą tajemnic."
                  <br />- Prof. Simiński
                </p>
              </div>

              <Button
                onClick={onComplete}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xl font-bold"
              >
                🚀 PRZEJDŹ DALEJ
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
                <p className="text-red-200">
                  "Potrzebujesz więcej praktyki z DevTools. Spróbuj ponownie!"
                  <br />- Prof. Simiński
                </p>
              </div>

              <Button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-xl font-bold"
              >
                🔄 SPRÓBUJ PONOWNIE
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Level8Page
