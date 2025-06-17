import { Link } from 'react-router-dom'

function EasterEggPage() {
  return (
    <div className="min-h-screen flex items-center bg-neutral-950 justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-6xl">🚫</h1>
        <h2 className="text-3xl font-bold text-red-400 font-mono">
          Forbidden Page Mate!
        </h2>
        <Link
          to="/"
          className="inline-block bg-neutral-700 hover:bg-neutral-800 border border-neutral-600 font-mono font-bold text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          Back to Page 1
        </Link>
      </div>
    </div>
  )
}

export default EasterEggPage
