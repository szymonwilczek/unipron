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
      'maszyna w',
      'maszyna W',
      'Maszyna w', 
      'Maszyna W',
      'MASZYNA W',
      'MASZYNA w'
    ]
    
    const isValid = validPasswords.some(valid => 
      normalizedPassword === valid.toLowerCase()
    )
    
    if (isValid) {
      onMaintenanceAccess()
      navigate('/system/diagnostics/core')
    } else {
      setError('Invalid access key. Check the machine\'s heart.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-3xl font-bold text-yellow-400">
          System Maintenance
        </h1>
        
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <div className="space-y-6">
            <p className="text-gray-200 text-lg">
              The system is currently undergoing scheduled maintenance.
            </p>
            
            <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4">
              <p className="text-yellow-200">
                We apologize for the inconvenience. Your assistance is required 
                to resolve this issue.
              </p>
              <p className="text-yellow-300 font-medium mt-2">
                Find the key in the heart of the machine.
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleMaintenanceClick}
                className="text-6xl transition-transform duration-200 cursor-pointer"
                title="Technical Issues - Click for assistance"
              >
                ⚠️
              </button>
            </div>
          </div>
        </div>

        {showLogin && (
          <div className="bg-gray-800 p-6 rounded-lg border border-red-500 space-y-4">
            <h3 className="text-xl font-semibold text-red-400">
              System Access Required
            </h3>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Enter access key:
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Access key..."
                  autoFocus
                />
              </div>
              
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Access System
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowLogin(false)
                    setPassword('')
                    setError('')
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
                >
                  Cancel
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
