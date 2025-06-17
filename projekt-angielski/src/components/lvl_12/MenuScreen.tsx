function MenuScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center">
        <div className="bg-neutral-900 backdrop-blur-sm rounded-lg p-8 border border-neutral-700 shadow-2xl">
          <h1 className="text-4xl font-bold text-neutral-200 mb-4 font-mono">
            LEVEL 12: BANK PAC-MAN
          </h1>

          <p className="text-neutral-100 text-lg mb-6 font-mono">
            Final challenge! <br /> Collect all the dots (and beers) while avoiding intrusive bank employees.
          </p>

          <div className="bg-neutral-800 rounded-lg p-6 mb-8 border border-gray-600 font-mono">
            <h3 className="text-lg font-bold text-gray-400 mb-4">KEYMAP:</h3>
            <div className="text-center space-y-2 text-yellow-200">
              <div>W - Up</div>
              <div>A - Left</div>
              <div>S - Down</div>
              <div>D - Right</div>
              <div>ESC - Pause</div>
            </div>
          </div>

          <button
            onClick={onStart}
            className="bg-neutral-700 hover:bg-neutral-800 text-neutral-100 px-8 py-4 text-xl font-bold rounded-lg border border-neutral-600 transition-all duration-200 transform hover:scale-105"
          >
            START
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuScreen;
