import { Link } from 'react-router-dom'

function EasterEggPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-6xl">🚫</h1>
        <h2 className="text-3xl font-bold text-red-400">
          Na skróty nie wolno iść!
        </h2>
        <p className="text-xl text-gray-300">
          Nie po to są studia!
        </p>
        <Link 
          to="/" 
          className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          Powrót do rekrutacji
        </Link>
      </div>
    </div>
  )
}

export default EasterEggPage
