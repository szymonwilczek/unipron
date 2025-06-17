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
      id: 'exam_2022_q2',
      question: "What was the question #2 on the 2022 exam?",
      options: [
        "What is the time complexity of the Binary Search algorithm?",
        "Which data structure works on a LIFO basis?",
        "Which algorithm uses a 'divide and conquer' strategy?",
        "Dijkstra's algorithm is used for what?"
      ],
      correct: 0
    },
    {
      id: 'exam_2021_answer3',
      question: "What was the correct answer to question #3 in 2021 exam?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      correct: 1
    },
    {
      id: 'exam_2020_pattern',
      question: "What is special about 2020-2022 exams?",
      options: [
        "Questions are getting tougher",
        "Every year is a completely new questions",
        "Questions don't change",
      ],
      correct: 2
    },
    {
      id: 'exam_month',
      question: "In what month were the exams held?",
      options: ["May", "June", "July", "August"],
      correct: 1
    },
    {
      id: 'dijkstra_question',
      question: "In a question about Dijkstra's algorithm, which answer was marked as correct?",
      options: ["Sorting", "Finding the shortest path", "Searching the tree", "Hashing"],
      correct: 1
    },
    {
      id: 'binary_search_letter',
      question: "What letter was the correct answer to the Binary Search complexity question?",
      options: ["B", "C", "D", "A"],
      correct: 0
    },
    {
      id: 'exam_total_questions',
      question: "How many questions did the exams contain according to available archives?",
      options: ["3", "4", "5", "6"],
      correct: 2
    },
    {
      id: 'exam_year_difference',
      question: "How many years separate the oldest and newest examinations in the archives?",
      options: ["1 year", "2 years", "3 years", "4 years"],
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
  const passed = score >= 3

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
    <div className="min-h-screen bg-neutral-950 p-4">
      <style>
        {`
            checkout {
              /forum or /dysk;
            }
          `}
      </style>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <img
              src="/images/czechu.png"
              alt="Prof. Czegniew Zbich"
              className="w-40 h-auto rounded-lg border-2 border-neutral-600"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden w-16 h-16 rounded-full border-2 border-blue-500 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">🧮</span>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Prof. Czegniew Zbich</h2>
            </div>
          </div>
        </div>
        <QuestionCard
          question={questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
        />
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
    <div className="bg-neutral-900 backdrop-blur-sm rounded-lg p-8 border border-neutral-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-4 font-mono">
          Question {questionNumber}: {question.question}
        </h3>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-mono ${selectedAnswer === index
              ? 'border-neutral-600 bg-neutral-700/50 text-blue-200'
              : 'border-neutral-700 bg-neutral-900/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/70 '
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
        className="w-full bg-neutral-700 hover:bg-neutral-800 text-white py-3 text-lg font-bold disabled:opacity-50"
      >
        {questionNumber === 5 ? 'Finish' : 'Next Question'}
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
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-neutral-900 backdrop-blur-sm rounded-lg p-8 border border-neutral-700">
          <div className="text-6xl mb-6">
            {passed ? '🎉' : '😞'}
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            {passed ? 'You\'ve passed!' : 'Not this time.'}
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            <span className="text-blue-400 font-bold">{score}/{total}</span> ({percentage.toFixed(0)}%)
          </p>

          {passed ? (
            <div className="space-y-4">
              <Button
                onClick={onContinue}
                className="bg-neutral-700 border border-neutral-600 hover:bg-neutral-800 text-white px-8 py-4 text-xl font-bold"
              >
                Next level
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                onClick={onRetry}
                className="bg-neutral-700 border border-neutral-600 hover:bg-neutral-800 text-white px-8 py-4 text-xl font-bold"
              >
               Try again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Level10Page
