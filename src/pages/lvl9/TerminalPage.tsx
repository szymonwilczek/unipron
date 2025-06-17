import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface FileSystemNode {
  [key: string]: FileSystemNode | string
}

function TerminalPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')
  const [history, setHistory] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [showDataForm, setShowDataForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitFeedback, setSubmitFeedback] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    roomNumber: '',
    extension: '',
    labAccessCode: '',
    parkingSpot: '',
    lockerCode: '',
    systemLogin: '',
    accessCardId: '',
    sshKey: ''
  })

  const correctData = {
    roomNumber: '813',
    extension: '38',
    labAccessCode: 'LAB_DS_7891',
    parkingSpot: 'P-47',
    lockerCode: '1847',
    systemLogin: 'kpaszek_sys',
    accessCardId: '7891234',
    sshKey: 'AAAAB3NzaC1yc2EAAAADAQABAAABgQC7vbq'
  }

  const fileSystem: FileSystemNode = {
    'home': {
      'student': {
        'documents': {
          'temp': {},
          'logs': {
            'access.log': `Last login: ${new Date().toLocaleString()}`,
          }
        }
      }
    },
    'var': {
      'university': {
        'staff': {
          'rooms': {
            'building_a': {
              'floor_8': {
                'AM.txt': '801',
                'KP.txt': '813',
                'PT.txt': '825'
              },
              'floor_7': {
                'JS.txt': '742',
                'KW.txt': '756'
              }
            },
            'building_b': {
              'floor_3': {
                'ML.txt': '312',
                'ZK.txt': '328'
              }
            }
          },
          'extensions': {
            'department_cs': {
              'AM.txt': '42',
              'PT.txt': '51',
              'KP.txt': '38',
            },
            'department_ee': {
              'JS.txt': '67',
              'KW.txt': '73'
            }
          },
          'access_codes': {
            'laboratory': {
              'digital_systems': {
                'KP.txt': 'LAB_DS_7891',
                'AM.txt': 'LAB_DS_2341',
                'PT.txt': 'LAB_DS_5567'
              },
              'electronics': {
                'JS.txt': 'LAB_EL_1234',
                'KW.txt': 'LAB_EL_9876'
              }
            }
          },
          'parking': {
            'staff_spots': {
              'KP.txt': 'P-47',
              'AM.txt': 'P-12',
              'PT.txt': 'P-89'
            }
          },
          'lockers': {
            'teacher_lounge': {
              'KP.txt': '1847',
              'AM.txt': '2653',
              'PT.txt': '3921'
            }
          },
          'system_access': {
            'university_portal': {
              'KP.txt': 'kpaszek_sys',
              'AM.txt': 'amlynarczyk_sys',
              'PT.txt': 'ptomczyk_sys'
            },
            'ssh_keys': {
              'KP.txt': 'AAAAB3NzaC1yc2EAAAADAQABAAABgQC7vbq',
              'AM.txt': 'AAAAB3NzaC1yc2EAAAADAQABAAABgQD2xcd',
              'PT.txt': 'AAAAB3NzaC1yc2EAAAADAQABAAABgQF1mnp'
            }
          },
          'cards': {
            'access_ids': {
              'KP.txt': '7891234',
              'AM.txt': '2341567',
              'PT.txt': '5567890'
            }
          }
        }
      }
    },
    'etc': {
      'university': {
        'config': {
          'system.conf': 'University System Configuration. Authorized personnel only.',
        }
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current && !showDataForm) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, showDataForm])

  useEffect(() => {
    if (!showDataForm) {
      inputRef.current?.focus()
    }
  }, [isConnected, showDataForm])

  const addToHistory = (text: string) => {
    setHistory(prev => [...prev, text])
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFormSubmit = () => {
    setIsSubmitting(true)
    setSubmitFeedback("Verification...")

    setTimeout(() => {
      const isCorrect = Object.keys(correctData).every(key =>
        formData[key as keyof typeof formData].trim() ===
        correctData[key as keyof typeof correctData]
      )

      if (isCorrect) {
        setSubmitFeedback("Access granted.")
        setTimeout(() => {
          navigate('/algorithms/czech')
        }, 2000)
      } else {
        setSubmitFeedback("Invalid data.")
        setIsSubmitting(false)
        setTimeout(() => {
          setSubmitFeedback('')
        }, 3000)
      }
    }, 2000)
  }

  const executeCommand = async (command: string) => {
    const cmd = command.trim()

    if (!isConnected) {
      if (cmd === 'ssh student@polsl.pl') {
        addToHistory(`\n`)
        addToHistory(`Welcome to Politechnika Śląska University System`)
        addToHistory(`Last login: ${new Date().toLocaleString()}`)
        addToHistory(`\n`)
        addToHistory(`⚠️  WARNING: This system is for authorized personnel only.`)
        addToHistory(`    Unauthorized access is strictly prohibited.`)
        addToHistory(`\n`)
        addToHistory(`Type 'help' to see available commands.`)
        addToHistory(`\n`)
        setIsConnected(true)
        setCurrentPath('/home/student')
        return
      } else {
        addToHistory(`bash: ${cmd}: command not found`)
        return
      }
    }

    const args = cmd.split(' ')
    const baseCmd = args[0]

    switch (baseCmd) {
      case 'form':
        setShowDataForm(true)
        addToHistory(`Opening data verification form...`)
        break

      case 'ls':
        const showHidden = args.includes('-a')
        const currentDir = getCurrentDirectory()
        if (typeof currentDir === 'object') {
          const items = Object.keys(currentDir)
          const visibleItems = showHidden ? items : items.filter(item => !item.startsWith('.'))
          if (visibleItems.length === 0) {
            addToHistory(``)
          } else {
            addToHistory(visibleItems.join('  '))
          }
        } else {
          addToHistory(`ls: cannot access '${currentPath}': Not a directory`)
        }
        break

      case 'cd':
        if (args.length === 1) {
          setCurrentPath('/home/student')
        } else {
          const newPath = args[1]
          if (newPath === '..') {
            const pathParts = currentPath.split('/').filter(p => p)
            pathParts.pop()
            setCurrentPath('/' + pathParts.join('/'))
          } else if (newPath.startsWith('/')) {
            if (pathExists(newPath)) {
              setCurrentPath(newPath)
            } else {
              addToHistory(`cd: no such file or directory: ${newPath}`)
            }
          } else {
            const newFullPath = currentPath === '/' ? `/${newPath}` : `${currentPath}/${newPath}`
            if (pathExists(newFullPath)) {
              setCurrentPath(newFullPath)
            } else {
              addToHistory(`cd: no such file or directory: ${newPath}`)
            }
          }
        }
        break

      case 'cat':
        if (args.length < 2) {
          addToHistory(`cat: missing file operand`)
        } else {
          const fileName = args[1]
          const filePath = currentPath === '/' ? `/${fileName}` : `${currentPath}/${fileName}`
          const content = getFileContent(filePath)
          if (content) {
            addToHistory(`[📄 ${fileName}]: ${content}`)
          } else {
            addToHistory(`cat: ${fileName}: No such file or directory`)
          }
        }
        break

      case 'pwd':
        addToHistory(currentPath)
        break

      case 'find':
        if (args.length < 3 || args[1] !== '-name') {
          addToHistory(`Usage: find -name <pattern>`)
        } else {
          const pattern = args[2]
          const results = findFiles(fileSystem, pattern, '')
          if (results.length > 0) {
            addToHistory(`Found ${results.length} files:`)
            results.forEach(result => addToHistory(`  ${result}`))
          } else {
            addToHistory(`No files found matching '${pattern}'`)
          }
        }
        break

      case 'help':
        addToHistory(`Available commands:`)
        addToHistory(`  form        - open data verification form`)
        addToHistory(`  ls [-a]     - list directory contents`)
        addToHistory(`  cd <dir>    - change directory`)
        addToHistory(`  pwd         - print working directory`)
        addToHistory(`  cat <file>  - display file contents`)
        addToHistory(`  find -name <pattern> - find files`)
        addToHistory(`  clear       - clear terminal`)
        addToHistory(`  exit        - disconnect from server`)
        break

      case 'clear':
        setHistory([])
        break

      case 'exit':
        addToHistory(`Connection to polsl.pl closed.`)
        setTimeout(() => {
          navigate('/digital-systems/advanced')
        }, 1000)
        break

      default:
        addToHistory(`bash: ${baseCmd}: command not found`)
        addToHistory(`Type 'help' for available commands`)
    }
  }

  const getCurrentDirectory = (): FileSystemNode | string => {
    const pathParts = currentPath.split('/').filter(p => p)
    let current: FileSystemNode | string = fileSystem

    for (const part of pathParts) {
      if (typeof current === 'object' && current[part]) {
        current = current[part]
      } else {
        return {}
      }
    }

    return current
  }

  const pathExists = (path: string): boolean => {
    const pathParts = path.split('/').filter(p => p)
    let current: FileSystemNode | string = fileSystem

    for (const part of pathParts) {
      if (typeof current === 'object' && current[part]) {
        current = current[part]
      } else {
        return false
      }
    }

    return true
  }

  const getFileContent = (path: string): string | null => {
    const pathParts = path.split('/').filter(p => p)
    let current: FileSystemNode | string = fileSystem

    for (const part of pathParts) {
      if (typeof current === 'object' && current[part]) {
        current = current[part]
      } else {
        return null
      }
    }

    return typeof current === 'string' ? current : null
  }

  const findFiles = (node: FileSystemNode | string, pattern: string, currentPath: string): string[] => {
    const results: string[] = []

    if (typeof node === 'object') {
      for (const [key, value] of Object.entries(node)) {
        const fullPath = currentPath ? `${currentPath}/${key}` : key

        if (key.includes(pattern) || pattern === '*') {
          results.push(fullPath)
        }

        if (typeof value === 'object') {
          results.push(...findFiles(value, pattern, fullPath))
        }
      }
    }

    return results
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const command = currentInput.trim()
      const prompt = isConnected
        ? `student@polsl:${currentPath}$ ${command}`
        : `user@local:~$ ${command}`

      addToHistory(prompt)
      executeCommand(command)
      setCurrentInput('')
    }
  }

  const getCurrentPrompt = () => {
    return isConnected ? `student@polsl:${currentPath} $ ` : `user@local:~$ `
  }

  const isFormComplete = Object.values(formData).every(value => value.trim() !== '')

  return (
    <div className="min-h-screen bg-neutral-950 text-green-400 font-mono text-sm relative">
      <div className="container mx-auto p-4">

        <div className="bg-neutral-900 rounded-t-lg p-2 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-gray-300 font-mono font-bold">
              {isConnected ? 'student@polsl.pl - SSH' : 'localhost'}
            </span>
          </div>
        </div>

        <div
          ref={terminalRef}
          className="bg-zinc-950 rounded-b-lg p-4 h-96 overflow-y-auto border border-gray-600"
          onClick={() => !showDataForm && inputRef.current?.focus()}
        >
          {history.length === 0 && (
            <div className="mb-4">
              <div className="text-green-400">Hello there.</div>
              <div className="text-green-400">---</div>
            </div>
          )}

          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}

          {!showDataForm && (
            <div className="flex">
              <span className="text-green-400">{getCurrentPrompt()}</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 ml-2 bg-transparent border-none outline-none text-green-400 font-mono"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {showDataForm && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src="/images/paszek.png"
                  alt="University Logo"
                  className="w-24 h-auto rounded-lg border-2 border-neutral-500"
                />
                <div>
                  <h1 className="text-2xl font-bold text-yellow-400 font-mono">
                    CLASSIFIED DATA VERIFICATION
                  </h1>
                  <p className="text-neutral-300 font-semibold">
                    Dr. eng. Pasztof Krzyszek
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowDataForm(false)}
                className="bg-red-700 hover:bg-red-800 text-white font-mono font-bold"
              >
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-700">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">
                      Office room number
                    </label>
                    <input
                      type="text"
                      value={formData.roomNumber}
                      onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                      placeholder="..."
                      className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-green-400 font-mono focus:outline-none text-sm"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">
                      Parking spot
                    </label>
                    <input
                      type="text"
                      value={formData.parkingSpot}
                      onChange={(e) => handleInputChange('parkingSpot', e.target.value)}
                      placeholder="..."
                      className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-green-400 font-mono focus:outline-none text-sm"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-700">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">
                      Internal phone number
                    </label>
                    <input
                      type="text"
                      value={formData.extension}
                      onChange={(e) => handleInputChange('extension', e.target.value)}
                      placeholder="..."
                      className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-green-400 font-mono focus:outline-none text-sm"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">
                      Access Card ID
                    </label>
                    <input
                      type="text"
                      value={formData.accessCardId}
                      onChange={(e) => handleInputChange('accessCardId', e.target.value)}
                      placeholder="..."
                      className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-green-400 font-mono focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-700 md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">
                      Lab access code
                    </label>
                    <input
                      type="text"
                      value={formData.labAccessCode}
                      onChange={(e) => handleInputChange('labAccessCode', e.target.value)}
                      placeholder="..."
                      className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-green-400 font-mono focus:outline-none text-sm"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">
                      Locker code
                    </label>
                    <input
                      type="text"
                      value={formData.lockerCode}
                      onChange={(e) => handleInputChange('lockerCode', e.target.value)}
                      placeholder="..."
                      className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-green-400 font-mono focus:outline-none text-sm"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">
                      System login
                    </label>
                    <input
                      type="text"
                      value={formData.systemLogin}
                      onChange={(e) => handleInputChange('systemLogin', e.target.value)}
                      placeholder="..."
                      className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-green-400 font-mono focus:outline-none text-sm"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-2">
                      SSH Key
                    </label>
                    <input
                      type="text"
                      value={formData.sshKey}
                      onChange={(e) => handleInputChange('sshKey', e.target.value)}
                      placeholder="..."
                      className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-3 py-2 text-green-400 font-mono focus:outline-none text-sm"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <Button
                onClick={handleFormSubmit}
                disabled={!isFormComplete || isSubmitting}
                className="w-full bg-neutral-700 hover:bg-neutral-800 text-neutral-300 py-3 text-lg font-bold font-mono disabled:opacity-50 disabled:cursor-not-allowed border border-neutral-600"
              >
                {isSubmitting ? 'Verification...' : 'Verify'}
              </Button>

              {submitFeedback && (
                <div className={`p-4 rounded-lg border font-mono ${submitFeedback.includes('Access granted.')
                  ? 'border-green-500 bg-green-900/30 text-green-200'
                  : submitFeedback.includes('Invalid data.')
                    ? 'border-red-500 bg-red-900/30 text-red-200'
                    : 'border-yellow-500 bg-yellow-900/30 text-yellow-200'
                  }`}>
                  <p className="text-lg font-semibold">{submitFeedback}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TerminalPage
