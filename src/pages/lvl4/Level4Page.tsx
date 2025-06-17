import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Level4Page() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/amial/term0')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-neutral-950 min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-green-400">
          Prepare for Next Level
        </h1>
        <div className="animate-spin text-6xl">⚙️</div>
        <p className="text-gray-300 text-lg">
          Redirecting to Mathematical Analysis...
        </p>
      </div>
    </div>
  )
}

export default Level4Page
