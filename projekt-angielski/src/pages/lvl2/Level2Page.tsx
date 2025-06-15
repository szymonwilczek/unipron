import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import type { Level2PageProps } from '@/types'

function Level2Page({ onMaintenanceAccess }: Level2PageProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleMaintenanceClick = () => {
    setShowLogin(true)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const normalizedPassword = password.toLowerCase().trim()
    const validPasswords = [
      'machine w',
      'machine W',
      'Machine w', 
      'Machine W',
      'MACHINE W',
      'MACHINE w'
    ]
    
    const isValid = validPasswords.some(valid => 
      normalizedPassword === valid.toLowerCase()
    )
    
    if (isValid) {
      onMaintenanceAccess()
      navigate('/system/diagnostics/core')
    } else {
      setError('Invalid access key.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-neutral-950">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-3xl font-bold text-yellow-400">
          USOS System Maintenance
        </h1>
        
        <div className="bg-neutral-900 p-8 rounded-lg border border-yellow-700">
          <div className="space-y-6">
            <p className="text-gray-200 text-lg text-gray-200">
              The system is currently undergoing scheduled maintenance.
            </p>
            
            <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
              <p className="text-yellow-200">
                We apologize for the inconvenience. <br/> Your assistance is required 
                to resolve this issue.
              </p>
              <p className="text-yellow-300 font-medium mt-2 font-mono">
                Find the "W" key in the heart of the machine.
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleMaintenanceClick}
                className="text-6xl transition-transform duration-200 cursor-pointer"
              >
                ⚠️
              </button>
            </div>
          </div>
        </div>

        {showLogin && (
          <div className="bg-neutral-900 p-6 rounded-lg border border-red-500 space-y-4 font-mono">
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-neutral-500" 
                  placeholder="..."
                  autoFocus
                />
              </div>
              
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              
              <div className="flex items-center justify-center gap-3">
                <Button
                  type="submit"
                  className="bg-neutral-700 hover:bg-neutral-800 text-white px-6 py-2 rounded-lg font-bold"
                >
                  Access 
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Level2Page
