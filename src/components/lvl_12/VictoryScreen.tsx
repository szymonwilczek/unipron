function VictoryScreen({ score, onContinue }: {
  score: number,
  onContinue: () => void
}) {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-neutral-900 rounded-lg p-8 border border-yellow-500">

          <div className="text-6xl mb-6">🏆</div>

          <h1 className="text-4xl font-bold text-default-200 mb-4 font-mono">
            MISSION ACCOMPLISHED!
          </h1>

          <div className="bg-green-900/30 border border-green-600 rounded-lg p-6 mb-6">
            <p className="text-green-300 text-lg font-mono">
              Congratulations! <br />
              You managed to collect all the dots
              avoiding bank employees!<br />
              Your financial independence has been preserved!
            </p>
          </div>

          <p className="text-gray-300 text-lg mb-6 font-mono">
            Score: <span className="text-yellow-400 font-bold">{score}</span>
          </p>

          <div className="space-y-4">
            <button
              onClick={onContinue}
              className="block w-full bg-neutral-700 hover:bg-neutral-800 border border-neutral-600 text-white px-6 py-4 text-xl rounded-lg font-bold font-mono"
            >
              END JOURNEY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VictoryScreen;
