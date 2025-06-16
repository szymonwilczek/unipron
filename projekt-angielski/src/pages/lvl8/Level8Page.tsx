import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface Question {
  id: string
  question: string
  answer: string
  method: string
}

function Level8Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const navigate = useNavigate()

  const questions: Question[] = [
    {
      id: 'storage',
      question: "warmup: first question saved in local memory;",
      answer: "local storage",
      method: "LocalStorage"
    },
    {
      id: 'recursion',
      question: "second (second (second (second))) question and first answer;",
      answer: "recursion",
      method: "Console Variable"
    },
    {
      id: 'solid',
      question: "third question: R U L E;",
      answer: "solid",
      method: "CSS Hidden Content"
    },
    {
      id: 'pattern',
      question: "forth_question::GetInstance();",
      answer: "singleton",
      method: "Network Tab"
    },
    {
      id: 'lifo',
      question: "Last question and first answer;",
      answer: "lifo",
      method: "HTML Comment"
    }
  ]

  useEffect(() => {
    ; (window as any).siminskiSecret1 = "recursion"
    ; (window as any).siminskiAnswer2 = "Not this one..."
    ; (window as any).siminskiHint = "Keep looking..."

    console.log("Welcome in programming laboratory!")
    console.log("Sitof Krzymiński hid the answers in different places...")
    console.log("Check the local variables (window.siminski*).")
    console.log("Do not underestimate the power of DevTools!")

    localStorage.setItem('programming_answer', 'local storage')
    sessionStorage.setItem('programming_answer', 'session storage')

    const img = new Image()
    img.src = '/singleton-pattern-image.png'

    return () => {
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

      setTimeout(() => {
        if (currentQuestion === questions.length - 1) {
          setIsComplete(true)
        } else {
          setCurrentQuestion(prev => prev + 1)
          setUserAnswer('')
        }
      }, 500)
    }
  }

  const handleComplete = () => {
    if (score >= 4) {
      navigate('/digital-systems/advanced')
    }
  }

  if (isComplete) {
    return <CompletionScreen score={score} total={questions.length} onComplete={handleComplete} />
  }

  return (
    <div className="lifo-question-answer min-h-screen bg-neutral-950 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <img
              src="/images/siminski.png"
              alt="Prof. Krzysztof Simiński"
              className="w-32 h-auto rounded-lg border-2 border-neutral-700"
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
              <h2 className="text-xl font-bold text-white">Dr. Sitof Krzymiński</h2>
            </div>
          </div>
        </div>

        <QuestionCard
          question={questions[currentQuestion]}
          userAnswer={userAnswer}
          onAnswerChange={setUserAnswer}
          onSubmit={handleSubmit}
        />
      </div>
      <style>
        {`
          .siminski-hidden-answer::before {
            content: "R U L E =========  SOLID";
            display: none;
            /* Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion */
          }
          
          .secret-programming-principle {
            /* 
              Third question answer: SOLID
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

      <div className="siminski-hidden-answer secret-programming-principle"></div>
    </div>
  )
}

function QuestionCard({ question, userAnswer, onAnswerChange, onSubmit }: {
  question: Question
  userAnswer: string
  onAnswerChange: (value: string) => void
  onSubmit: () => void
}) {
  return (
    <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-700">
      <div className="mb-6">
        <h3 className="text-xl font-bold font-mono text-white mb-4">
          {question.question}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="answer..."
            className="w-full font-mono bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={onSubmit}
            disabled={!userAnswer.trim()}
            className="bg-neutral-700 hover:bg-neutral-800 font-mono text-white p-3 text-lg font-bold disabled:opacity-50">
            CHECK
          </Button>
        </div>
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
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-700">
          <div className="text-6xl mb-6">
            {passed ? '🎉' : '😞'}
          </div>

          <h1 className="text-3xl font-bold font-mono text-white mb-4">
            {passed ? 'Congrats!' : 'Try again'}
          </h1>

          <p className="text-gray-300 text-lg mb-6">
            <span className="text-green-400 font-bold">{score}/{total}</span> ({percentage.toFixed(0)}%)
          </p>

          {passed ? (
            <div className="space-y-4">
              <Button
                onClick={onComplete}
                className="bg-neutral-700 hover:bg-neutral-800 text-white px-8 py-4 text-xl font-bold"
              >
                next
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
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
