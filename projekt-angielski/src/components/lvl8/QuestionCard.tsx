import type { Question } from "@/types/types"
import { Button } from "../ui/button"

function QuestionCard({ question, userAnswer, onAnswerChange, onSubmit }: {
  question: Question
  userAnswer: string
  onAnswerChange: (value: string) => void
  onSubmit: () => void
}) {
  return (
    <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-700">
      <div className="mb-7">
        <h2 className="text-xl font-bold font-mono text-white mb-4">
          {question.question}
        </h2>
      </div>

      <div className="space-y-5">
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

export default QuestionCard
