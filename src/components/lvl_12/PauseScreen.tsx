function PauseScreen({ onResume }: { onResume: () => void }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-700 text-center">
        <h2 className="text-3xl font-bold text-neutral-200 mb-6 font-mono">GAME PAUSED</h2>
        <div className="space-y-4">
          <button
            onClick={onResume}
            className="block w-full bg-neutral-700 hover:bg-neutral-800 border border-neutral-600 text-white px-6 py-3 rounded-lg font-bold"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  )
}

export default PauseScreen;
