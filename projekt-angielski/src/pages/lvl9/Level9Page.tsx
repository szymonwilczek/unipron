import { useState, useEffect } from 'react'

function Level9Page() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsInitialized(true), 1000)
  }, [])

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-green-400 text-2xl font-mono animate-pulse">
          Initializing secure access...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="check /terminal or /console" />
      <div className="connect via ssh: student@polsl.pl" />
      <div className="max-w-4xl w-full text-center">
        <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-700 shadow-2xl">

          <div className="mb-8">
            <div className="w-20 h-20 rounded-full border-2 border-neutral-700 bg-neutral-800 to-neutral-950 flex items-center justify-center mx-auto mb-6">
              <span className="font-bold text-2xl font-mono">🔒</span>
            </div>

            <h1 className="text-4xl font-bold text-yellow-400 mb-4 font-mono">
              RESTRICTED AREA
            </h1>
          </div>

          <div className="bg-red-900/30 border border-red-500 rounded-lg p-6 mb-8">
            <h2 className="text-red-400 font-bold text-xl mb-4 font-mono">⚠️ ACCESS ERROR</h2>
            <p className="text-red-300 font-mono">
              No authorization for confidential personal data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level9Page
