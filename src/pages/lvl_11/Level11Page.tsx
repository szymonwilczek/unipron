import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import type { Component } from '@/types/types'
import ComponentShelfItem, { getComponentIcon } from '@/components/lvl_11/ComponentShelfItem'
import CompletionScreen from '@/components/lvl_11/CompletionScreen'

interface Connection {
  id: string
  from: string
  to: string
  created: boolean
}

function Level11Page() {
  const [components, setComponents] = useState<Component[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [currentDialog, setCurrentDialog] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [dragging, setDragging] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [jacekHelping, setJacekHelping] = useState(false)
  const [userAttempts, setUserAttempts] = useState(0)
  const [connectingMode, setConnectingMode] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  const requiredConnections = [
    'battery-switch', 'switch-capacitor', 'capacitor-resistor1', 'resistor1-led1',
    'led1-led2', 'led2-resistor2', 'resistor2-wire1', 'wire1-wire2', 'wire2-battery'
  ]

  useEffect(() => {
    setComponents([
      { id: 'battery', type: 'battery', x: 20, y: 120, connected: false, onBoard: false },
      { id: 'switch', type: 'switch', x: 20, y: 180, connected: false, onBoard: false },
      { id: 'resistor1', type: 'resistor', x: 20, y: 240, connected: false, onBoard: false },
      { id: 'led1', type: 'led', x: 20, y: 300, connected: false, onBoard: false },
      { id: 'led2', type: 'led', x: 20, y: 360, connected: false, onBoard: false },
      { id: 'capacitor', type: 'capacitor', x: 120, y: 120, connected: false, onBoard: false },
      { id: 'resistor2', type: 'resistor', x: 120, y: 180, connected: false, onBoard: false },
      { id: 'wire1', type: 'wire', x: 120, y: 240, connected: false, onBoard: false },
      { id: 'wire2', type: 'wire', x: 120, y: 300, connected: false, onBoard: false }
    ])

    setCurrentDialog("Task: Create a flashing LED circuit with a capacitor.")
  }, [])

  const handleJacekHelp = () => {
    setJacekHelping(true)
    setConnectingMode(false)
    setSelectedComponent(null)
    startJacekSequence()
  }

  const startJacekSequence = () => {
    const sequence = [
      {
        dialog: "I see you have a problem with this complicated circuit. Come on, I'll do it!",
        action: () => { },
        delay: 3000
      },
      {
        dialog: "First, we need to place the power supply - the battery....",
        action: () => {
          animateComponentToBoard('battery', 350, 150)
        },
        delay: 3000
      },
      {
        dialog: "Now a switch to control the circuit....",
        action: () => {
          animateComponentToBoard('switch', 450, 150)
          setTimeout(() => {
            addJacekConnection('battery', 'switch')
          }, 1500)
        },
        delay: 3000
      },
      {
        dialog: "I connect the battery to the switch. Can you see the connection?",
        action: () => { },
        delay: 2500
      },
      {
        dialog: "The capacitor will make the LED flash....",
        action: () => {
          animateComponentToBoard('capacitor', 550, 200)
          setTimeout(() => {
            addJacekConnection('switch', 'capacitor')
          }, 1500)
        },
        delay: 3500
      },
      {
        dialog: "The first resistor limits the current...",
        action: () => {
          animateComponentToBoard('resistor1', 450, 250)
          setTimeout(() => {
            addJacekConnection('capacitor', 'resistor1')
          }, 1500)
        },
        delay: 3000
      },
      {
        dialog: "The first LED main light...",
        action: () => {
          animateComponentToBoard('led1', 500, 320)
          setTimeout(() => {
            addJacekConnection('resistor1', 'led1')
          }, 1500)
        },
        delay: 3000
      },
      {
        dialog: "The second LED as an indicator...",
        action: () => {
          animateComponentToBoard('led2', 600, 280)
          setTimeout(() => {
            addJacekConnection('led1', 'led2')
          }, 1500)
        },
        delay: 3000
      },
      {
        dialog: "The second resistor...",
        action: () => {
          animateComponentToBoard('resistor2', 650, 220)
          setTimeout(() => {
            addJacekConnection('led2', 'resistor2')
          }, 1500)
        },
        delay: 2500
      },
      {
        dialog: "The first cable connecting...",
        action: () => {
          animateComponentToBoard('wire1', 400, 320)
          setTimeout(() => {
            addJacekConnection('resistor2', 'wire1')
          }, 1500)
        },
        delay: 3000
      },
      {
        dialog: "The last wire closes the circuit....",
        action: () => {
          animateComponentToBoard('wire2', 350, 280)
          setTimeout(() => {
            addJacekConnection('wire1', 'wire2')
            addJacekConnection('wire2', 'battery')
          }, 1500)
        },
        delay: 3000
      },
      {
        dialog: "And there you have it! A complete flashing LED circuit!",
        action: () => {
          setTimeout(() => {
            setComponents(prev => prev.map(comp => ({
              ...comp,
              connected: true
            })))
          }, 1000)
        },
        delay: 2500
      },
      {
        dialog: "See? Without experience, you wouldn't have made it!",
        action: () => {
          setTimeout(() => setIsComplete(true), 3000)
        },
        delay: 3000
      }
    ]

    let currentStep = 0
    const executeStep = () => {
      if (currentStep < sequence.length) {
        const step = sequence[currentStep]
        setCurrentDialog(step.dialog)
        step.action()

        setTimeout(() => {
          currentStep++
          executeStep()
        }, step.delay)
      }
    }

    executeStep()
  }

  const addJacekConnection = (fromId: string, toId: string) => {
    const connectionId = `${fromId}-${toId}`
    setConnections(prev => [...prev, { id: connectionId, from: fromId, to: toId, created: true }])
  }

  const animateComponentToBoard = (componentId: string, targetX: number, targetY: number) => {
    setComponents(prev => prev.map(comp =>
      comp.id === componentId ? {
        ...comp,
        x: targetX,
        y: targetY,
        onBoard: true
      } : comp
    ))
  }

  const handleMouseDown = (e: React.MouseEvent, componentId: string) => {
    if (jacekHelping) return

    if (connectingMode) {
      handleConnectionClick(componentId)
      return
    }

    e.preventDefault()

    const component = components.find(c => c.id === componentId)
    if (!component) return

    const parentRect = boardRef.current?.getBoundingClientRect()
    if (!parentRect) return

    setDragOffset({
      x: e.clientX - (parentRect.left + component.x),
      y: e.clientY - (parentRect.top + component.y)
    })
    setDragging(componentId)
    setUserAttempts(prev => prev + 1)

    const handleMouseMove = (e: MouseEvent) => {
      if (!boardRef.current) return

      const boardRect = boardRef.current.getBoundingClientRect()
      const newX = e.clientX - boardRect.left - dragOffset.x
      const newY = e.clientY - boardRect.top - dragOffset.y

      const constrainedX = Math.max(0, Math.min(newX, boardRect.width - 64))
      const constrainedY = Math.max(0, Math.min(newY, boardRect.height - 64))

      setComponents(prev => prev.map(comp =>
        comp.id === componentId ? {
          ...comp,
          x: constrainedX,
          y: constrainedY,
          onBoard: constrainedX > 220
        } : comp
      ))
    }

    const handleMouseUp = () => {
      setDragging(null)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleConnectionClick = (componentId: string) => {
    if (!selectedComponent) {
      setSelectedComponent(componentId)
    } else {
      if (selectedComponent !== componentId) {
        createUserConnection(selectedComponent, componentId)
      }
      setSelectedComponent(null)
    }
  }

  const createUserConnection = (fromId: string, toId: string) => {
    const connectionId1 = `${fromId}-${toId}`
    const connectionId2 = `${toId}-${fromId}`

    const existingConnection = connections.find(c =>
      c.id === connectionId1 || c.id === connectionId2
    )

    if (!existingConnection) {
      const isCorrect = requiredConnections.includes(connectionId1) || requiredConnections.includes(connectionId2)

      setConnections(prev => [...prev, {
        id: connectionId1,
        from: fromId,
        to: toId,
        created: true
      }])

      if (isCorrect) {
        setCurrentDialog("Good connection! Keep it up!")
      } else {
        setCurrentDialog("Hmm, that connection cannot be optimal...")
        setUserAttempts(prev => prev + 2)
      }
    }
  }

  const toggleConnectingMode = () => {
    setConnectingMode(!connectingMode)
    setSelectedComponent(null)
  }

  const checkUserCircuitComplete = () => {
    const onBoard = components.filter(c => c.onBoard)
    const userConnectionIds = connections.map(c => c.id)
    const correctConnections = requiredConnections.filter(req =>
      userConnectionIds.includes(req) || userConnectionIds.includes(req.split('-').reverse().join('-'))
    )

    return onBoard.length >= 8 && correctConnections.length >= 7
  }

  useEffect(() => {
    if (checkUserCircuitComplete() && !jacekHelping) {
      setCurrentDialog("Nicely done! Almost there!")
      setTimeout(() => {
        setIsComplete(true)
      }, 3000)
    }
  }, [connections, components])

  useEffect(() => {
    if (userAttempts > 0 && !jacekHelping) {
      if (userAttempts === 5) {
        setCurrentDialog("Remember to connect the components!")
      } else if (userAttempts === 10) {
        setCurrentDialog("It surely is very complicated...")
      } else if (userAttempts === 15) {
        setCurrentDialog("Dr. Chęcek Jaciński surely will help you build that!")
      }
    }
  }, [userAttempts])

  if (isComplete) {
    return <CompletionScreen />
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-6">
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <img
              src="/images/checinski.png"
              alt="Dr. Chęcek Jaciński"
              className="w-32 h-auto rounded-lg border-2 border-neutral-600"
            />
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">Dr. Chęcek Jaciński</h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 font-mono">
          <div className="md:col-span-2 bg-neutral-900 backdrop-blur-sm rounded-lg p-4 border border-neutral-700">
            <div className="text-sm text-gray-400">
              <p>• <strong>Step 1:</strong> Drag the components onto the board</p>
              <p>• <strong>Step 2:</strong> Use connection mode to link components</p>
              <p>• <strong>Step 3:</strong> Create a closed circuit</p>
            </div>
            <br />
            <p className="text-gray-300 mb-4">{currentDialog}</p>
          </div>

          <div className="bg-neutral-900 backdrop-blur-sm rounded-lg p-4 border border-neutral-700">
            {!jacekHelping ? (
              <div className="space-y-3">
                <Button
                  onClick={handleJacekHelp}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-bold"
                >
                  Call for help!
                </Button>
                <br />
                <br />
                <Button
                  onClick={toggleConnectingMode}
                  className="w-full bg-neutral-600 hover:bg-neutral-700 text-white py-3 text-lg font-bold"
                >
                  {connectingMode ? '⚡ CONNECTION MODE' : '🔗 DRAGGING MODE'}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="animate-pulse text-orange-400 mb-2">
                  Dr. Chęcek Jaciński is working...
                </div>
                <div className="text-sm text-gray-300">
                  Observe the export!
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          ref={boardRef}
          className="bg-neutral-900 backdrop-blur-sm rounded-lg border border-neutral-700 p-6 mb-6 relative select-none"
          style={{ height: '500px' }}
        >
          <div className="flex h-full gap-6">
            <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-600" style={{ width: '220px', minWidth: '220px' }}>
              <h3 className="text-neutral-200 font-bold mb-4 text-center text-lg">Shelf</h3>
              <div className="grid grid-cols-2 gap-2">
                {components.filter(comp => !comp.onBoard).map(component => (
                  <ComponentShelfItem
                    key={component.id}
                    component={component}
                    isDragging={dragging === component.id}
                    jacekHelping={jacekHelping}
                    isSelected={selectedComponent === component.id}
                    connectingMode={connectingMode}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg opacity-20" />
              <div className="absolute inset-2 bg-gradient-to-br from-gray-600 to-gray-700 rounded opacity-30" />
              <div className="absolute inset-4 opacity-20">
                <svg width="100%" height="100%" className="overflow-visible">
                  <defs>
                    <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
                      <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#666" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {components.map(component => (
                <div
                  key={component.id}
                  className={`absolute w-12 h-12 rounded-lg border-2 flex items-center justify-center text-2xl transition-all duration-300 cursor-pointer ${component.connected ? 'border-green-500 bg-green-900/30 animate-pulse' :
                    component.onBoard ? 'border-yellow-500 bg-yellow-900/30' :
                      'border-gray-500 bg-gray-700/30'
                    } ${dragging === component.id ? 'scale-110 z-50' : 'z-10'} ${selectedComponent === component.id ? 'ring-4 ring-blue-500' : ''
                    } ${connectingMode ? 'hover:ring-2 hover:ring-blue-400' : ''} ${jacekHelping ? 'shadow-lg shadow-orange-500/50' : ''
                    }`}
                  style={{
                    left: component.x,
                    top: component.y,
                    transform: jacekHelping && component.onBoard ? 'scale(1.1)' : undefined,
                    pointerEvents: jacekHelping ? 'none' : 'auto'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, component.id)}
                >
                  {getComponentIcon(component.type)}
                </div>
              ))}

              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                {connections.map((connection, index) => {
                  const component1 = components.find(c => c.id === connection.from)
                  const component2 = components.find(c => c.id === connection.to)

                  if (!component1 || !component2) return null

                  return (
                    <line
                      key={index}
                      x1={component1.x + 24}
                      y1={component1.y + 24}
                      x2={component2.x + 24}
                      y2={component2.y + 24}
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="none"
                      className="animate-pulse"
                      style={{
                        filter: 'drop-shadow(0 0 3px #10b981)'
                      }}
                    />
                  )
                })}
              </svg>

              {connectingMode && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg font-bold">
                  🔌 Connection Mode
                </div>
              )}

              {jacekHelping && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-bold animate-bounce">
                  Dr. Jaciński in action...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level11Page
