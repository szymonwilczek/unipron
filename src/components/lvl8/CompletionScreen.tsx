import { Button } from "../ui/button"

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

export default CompletionScreen
