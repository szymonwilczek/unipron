import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
}

function Level10Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const navigate = useNavigate()

  const questions: Question[] = [
    {
      id: 'sorting',
      question: "Które z poniższych to algorytm sortowania?",
      options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Wszystkie powyższe"],
      correct: 3
    },
    {
      id: 'complexity',
      question: "Jaka jest złożoność czasowa algorytmu Binary Search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
      correct: 1
    },
    {
      id: 'structure',
      question: "Która struktura danych działa na zasadzie LIFO?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      correct: 1
    },
    {
      id: 'algorithm',
      question: "Który algorytm używa strategii 'dziel i zwyciężaj'?",
      options: ["Bubble Sort", "Linear Search", "Merge Sort", "Selection Sort"],
      correct: 2
    },
    {
      id: 'graph',
      question: "Algorytm Dijkstry służy do:",
      options: ["Sortowania", "Znajdowania najkrótszej ścieżki", "Przeszukiwania drzewa", "Hashowania"],
      correct: 1
    }
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setSelectedAnswer(null)

    if (currentQuestion === questions.length - 1) {
      setShowResults(true)
    } else {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct ? 1 : 0)
    }, 0)
  }

  const score = calculateScore()
  const passed = score >= 3 // Minimum 3/5 to pass

  if (showResults) {
    return (
      <ResultsScreen 
        score={score}
        total={questions.length}
        passed={passed}
        onContinue={() => navigate('/electronics/repair')}
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
      {/* UKRYTY HINT W KOMENTARZU HTML */}
      {/* 
        UWAGA: Jeśli potrzebujesz dodatkowych materiałów, sprawdź /forum lub /dysk
        Tam znajdziesz archiwalne egzaminy i notatki studentów!
      */}
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            📚 Egzamin z Algorytmów 📚
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/prof-czech.png"
              alt="Prof. Zbigniew Czech"
              className="w-16 h-16 rounded-full border-4 border-blue-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden w-16 h-16 rounded-full border-4 border-blue-500 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">🧮</span>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Prof. Zbigniew Czech</h2>
              <p className="text-gray-300 text-sm">Algorytmy i Struktury Danych</p>
            </div>
          </div>
          <p className="text-gray-300 text-lg">
            Tradycyjny egzamin wielokrotnego wyboru - już 15 lat z rzędu te same pytania!
          </p>
        </div>

        {/* Progress */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-8 border border-gray-600">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Postęp:</span>
            <span className="text-blue-400 font-bold">{currentQuestion + 1}/{questions.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <QuestionCard 
          question={questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
        />

        {/* Vintage Notice */}
        <div className="mt-8 bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
          <h3 className="text-yellow-400 font-bold mb-2">📜 Tradycja Czech'a:</h3>
          <p className="text-yellow-200 text-sm">
            "Te same pytania zadaję od 15 lat. Po co zmieniać coś, co działa?" - Prof. Czech
          </p>
          <p className="text-yellow-200 text-xs mt-2 italic">
            Podobno starsi studenci mają gdzieś archiwalne egzaminy... 🤔
          </p>
        </div>
      </div>
    </div>
  )
}

function QuestionCard({ question, questionNumber, selectedAnswer, onAnswerSelect, onNext }: {
  question: Question
  questionNumber: number
  selectedAnswer: number | null
  onAnswerSelect: (index: number) => void
  onNext: () => void
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-600">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-4">
          Pytanie {questionNumber}: {question.question}
        </h3>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedAnswer === index
                ? 'border-blue-500 bg-blue-900/50 text-blue-200'
                : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/70'
            }`}
          >
            <span className="font-bold text-lg mr-3">
              {String.fromCharCode(65 + index)})
            </span>
            {option}
          </button>
        ))}
      </div>

      <Button
        onClick={onNext}
        disabled={selectedAnswer === null}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-bold disabled:opacity-50"
      >
        {questionNumber === 5 ? '🏁 ZAKOŃCZ EGZAMIN' : '➡️ NASTĘPNE PYTANIE'}
      </Button>
    </div>
  )
}

function ResultsScreen({ score, total, passed, onContinue, onRetry }: {
  score: number
  total: number
  passed: boolean
  onContinue: () => void
  onRetry: () => void
}) {
  const percentage = (score / total) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-600">
          <div className="text-6xl mb-6">
            {passed ? '🎉' : '😞'}
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            {passed ? 'Egzamin zaliczony!' : 'Niestety, nie tym razem'}
          </h1>
          
          <p className="text-gray-300 text-lg mb-6">
            Twój wynik: <span className="text-blue-400 font-bold">{score}/{total}</span> ({percentage.toFixed(0)}%)
          </p>
          
          {passed ? (
            <div className="space-y-4">
              <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
                <p className="text-green-200">
                  "Bardzo dobrze! Te pytania to klasyka. Widzę, że jesteś dobrze przygotowany." 
                  <br />- Prof. Czech
                </p>
              </div>
              
              <Button
                onClick={onContinue}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xl font-bold"
              >
                🚀 PRZEJDŹ DALEJ
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
                <p className="text-red-200">
                  "Hmm, może warto lepiej się przygotować. Te pytania zadaję już od lat..."
                  <br />- Prof. Czech
                </p>
              </div>
              
              <Button
                onClick={onRetry}
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

export default Level10Page
