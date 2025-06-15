import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Level4PageProps } from '@/types'

interface Level4PageProps {
  onProofAccess: () => void
}

function Level4Page({ onProofAccess }: Level4PageProps) {
  const navigate = useNavigate()

  useEffect(() => {
    // Automatycznie ustaw dostęp do proof i przekieruj
    onProofAccess()
    // Krótkie opóźnienie przed przekierowaniem
    const timer = setTimeout(() => {
      navigate('/amial/term0')
    }, 2000)

    return () => clearTimeout(timer)
  }, [onProofAccess, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-green-400">
          System Access Granted
        </h1>
        <div className="animate-spin text-6xl">⚙️</div>
        <p className="text-gray-300 text-lg">
          Redirecting to Mathematical Analysis...
        </p>
        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-blue-200 text-sm">
            💡 <strong>Hint:</strong> Egzamin nie będzie taki prosty...
          </p>
        </div>
      </div>
    </div>
  )
}

export default Level4Page
