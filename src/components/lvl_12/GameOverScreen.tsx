function GameOverScreen({ score, onRestart }: {
  score: number,
  onRestart: () => void,
}) {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-neutral-900 rounded-lg p-8 border border-red-500">

          <div className="text-6xl mb-6">💀</div>

          <h1 className="text-4xl font-bold text-red-400 mb-4 font-mono">
            You've been caught!
          </h1>

          <div className="bg-red-900/30 border border-red-600 rounded-lg p-6 mb-6">
            <p className="text-red-300 text-lg">
              A bank employee got you!<br />
              Now you'll have to listen to a presentation about accounts....
            </p>
          </div>

          <p className="text-gray-300 text-lg mb-6 font-mono">
            Score: <span className="text-neutral-100 font-bold">{score}</span>
          </p>

          <div className="space-y-4">
            <button
              onClick={onRestart}
              className="block w-full bg-neutral-700 hover:bg-neutral-800 border border-neutral-600 text-white px-6 py-3 rounded-lg font-bold font-mono"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameOverScreen;
