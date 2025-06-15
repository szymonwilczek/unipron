import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import TutajewiczAvatar from '@/components/TutajewiczAvatar'

const correctCode = `czyt wys wei il;
wyad wea;
czyt wys weja dod weak wyl wea;`

function Level3Page() {
  const [code, setCode] = useState(`czyt wei il wys;
wea wyad;
czyt wys dod weja wyl wyl wea;
what in the world is this?`)

  const [error, setError] = useState('Failed to decode the command correctly!')
  const navigate = useNavigate()

  const handleCodeChange = (value: string) => {
    setCode(value)
  }

  const handleSolutionSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const lines = code.split('\n').map(line => line.trim())
    const correctLines = correctCode.split('\n').map(line => line.trim())

    if (lines[0] !== correctLines[0]) {
      setError('Failed to decode the command correctly!')
      return
    }

    if (lines[1] !== correctLines[1]) {
      setError('Failed to read command address!')
      return
    }

    if (lines[2] !== correctLines[2]) {
      setError('Failed to perform ADD operation.')
      return
    }

    if (code.trim() === correctCode.trim()) {
        navigate('/quantum/core/access')
    } else {
      setError('Compilation failed! Check your syntax.')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 xl:flex xl:flex-row mb-2">
          <div className="flex-1">
            <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-700 h-full">
              <div className="flex justify-center h-full p-4">
                <img
                  src="/images/maszyna-w.png"
                  alt="Machine W"
                  className="w-full h-auto rounded-lg border border-gray-600 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.nextElementSibling?.classList.remove('hidden')
                  }}
                />

                {/* Fallback */}
                <div className="hidden bg-neutral-950 p-8 rounded-lg border-2 border-dashed border-neutral-700 text-center w-full">
                  <p className="text-gray-400 mb-4">
                    Machine W
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <TutajewiczAvatar />
          </div>
        </div>
        <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-700">
          <h3 className="text-xl font-semibold text-neutral-200 mb-4">
            DOD Command
          </h3>

          <div className="mb-4">
            <div className="relative bg-neutral-900 border border-red-600 rounded-md overflow-hidden">
              <div className="flex">
                {/* Numery linii */}
                <div className="bg-neutral-900 text-gray-500 text-sm font-mono px-3 py-2 select-none focus:ring-0 focus:border-none focus:border-transparent">
                  {code.split('\n').map((_, index) => (
                    <div key={index} className="leading-6">
                      {index + 1}
                    </div>
                  ))}
                </div>

                {/* Textarea */}
                <Textarea
                  value={code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="flex-1 font-mono text-sm bg-transparent text-white resize-none p-2 border-none outline-none leading-6 focus:ring-0 focus:border-none"
                  placeholder="Code..."
                  style={{
                    lineHeight: '1.5rem',
                    boxShadow: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="text-red-600 text-lg mb-4 flex font-mono">
            E: <p className="text-red-400 ml-1">{error}</p>
          </div>

          <form onSubmit={handleSolutionSubmit}>
            <Button
              type="submit"
              className="bg-neutral-700 hover:bg-neutral-800 text-white w-full font-mono text-lg font-bold mt-2"
            >
              Run Solution
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Level3Page
