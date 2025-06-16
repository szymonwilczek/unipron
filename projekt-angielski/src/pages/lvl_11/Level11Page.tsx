import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface Component {
  id: string
  type: 'led' | 'resistor' | 'battery' | 'capacitor' | 'switch' | 'wire'
  x: number
  y: number
  connected: boolean
  onBoard: boolean
}

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
  const navigate = useNavigate()
  const boardRef = useRef<HTMLDivElement>(null)

  // Wymagane połączenia dla poprawnego obwodu
  const requiredConnections = [
    'battery-switch', 'switch-capacitor', 'capacitor-resistor1', 'resistor1-led1',
    'led1-led2', 'led2-resistor2', 'resistor2-wire1', 'wire1-wire2', 'wire2-battery'
  ]

  useEffect(() => {
    // Initialize components
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

    setCurrentDialog("Zadanie: Stwórz migający obwód LED z kondensatorem! Umieść komponenty i połącz je w odpowiedniej kolejności.")
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
        dialog: "Widzę, że masz problem z tym skomplikowanym obwodem. Daj, ja to zrobię!",
        action: () => { },
        delay: 3000
      },
      {
        dialog: "Najpierw musimy umieścić zasilanie - baterię...",
        action: () => {
          animateComponentToBoard('battery', 350, 150)
        },
        delay: 3000
      },
      {
        dialog: "Teraz przełącznik, żeby kontrolować obwód...",
        action: () => {
          animateComponentToBoard('switch', 450, 150)
          setTimeout(() => {
            addJacekConnection('battery', 'switch')
          }, 1500)
        },
        delay: 3000
      },
      {
        dialog: "Łączę baterię z przełącznikiem. Widzisz to połączenie?",
        action: () => { },
        delay: 2500
      },
      {
        dialog: "Kondensator sprawi, że LED będzie migać...",
        action: () => {
          animateComponentToBoard('capacitor', 550, 200)
          setTimeout(() => {
            addJacekConnection('switch', 'capacitor')
          }, 1500)
        },
        delay: 3500
      },
      {
        dialog: "Pierwszy resistor ogranicza prąd...",
        action: () => {
          animateComponentToBoard('resistor1', 450, 250)
          setTimeout(() => {
            addJacekConnection('capacitor', 'resistor1')
          }, 1500)
        },
        delay: 3000
      },
      {
        dialog: "Pierwszy LED - główne światło...",
        action: () => {
          animateComponentToBoard('led1', 500, 320)
          setTimeout(() => {
            addJacekConnection('resistor1', 'led1')
          }, 1500)
        },
        delay: 3000
      },
      {
        dialog: "Drugi LED jako wskaźnik...",
        action: () => {
          animateComponentToBoard('led2', 600, 280)
          setTimeout(() => {
            addJacekConnection('led1', 'led2')
          }, 1500)
        },
        delay: 3000
      },
      {
        dialog: "Drugi resistor...",
        action: () => {
          animateComponentToBoard('resistor2', 650, 220)
          setTimeout(() => {
            addJacekConnection('led2', 'resistor2')
          }, 1500)
        },
        delay: 2500
      },
      {
        dialog: "Pierwszy przewód łączący...",
        action: () => {
          animateComponentToBoard('wire1', 400, 320)
          setTimeout(() => {
            addJacekConnection('resistor2', 'wire1')
          }, 1500)
        },
        delay: 3000
      },
      {
        dialog: "Ostatni przewód zamyka obwód...",
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
        dialog: "I gotowe! Kompletny migający obwód LED!",
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
        dialog: "Widzisz? Bez doświadczenia nie dałbyś rady!",
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

    const rect = e.currentTarget.getBoundingClientRect()
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

    // Sprawdź czy połączenie już istnieje
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
        setCurrentDialog("Dobre połączenie! Kontynuuj...")
      } else {
        setCurrentDialog("Hmm, to połączenie może nie być optymalne...")
        setUserAttempts(prev => prev + 2) // Penalty za złe połączenie
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

  // Auto-complete check
  useEffect(() => {
    if (checkUserCircuitComplete() && !jacekHelping) {
      setCurrentDialog("Nieźle! Prawie ukończyłeś obwód!")
      setTimeout(() => {
        setIsComplete(true)
      }, 3000)
    }
  }, [connections, components])

  // Podpowiedzi
  useEffect(() => {
    if (userAttempts > 0 && !jacekHelping) {
      if (userAttempts === 5) {
        setCurrentDialog("Pamiętaj o łączeniu komponentów! Użyj trybu połączeń.")
      } else if (userAttempts === 10) {
        setCurrentDialog("To bardzo skomplikowany obwód z 9 połączeniami...")
      } else if (userAttempts === 15) {
        setCurrentDialog("Dr. Chęciński na pewno ci pomoże z tym zaawansowanym projektem!")
      }
    }
  }, [userAttempts])

  if (isComplete) {
    return <CompletionScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-orange-400 mb-4">
            🔧 Zaawansowane Laboratorium Elektroniki 🔧
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-orange-500 bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">🔧</span>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Dr. Jacek Chęciński</h2>
              <p className="text-gray-300 text-sm">Elektronika - Zaawansowana Praktyka</p>
            </div>
          </div>
        </div>

        {/* Instructions & Help */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
            <h3 className="text-orange-400 font-bold mb-2">📋 Zaawansowane Zadanie</h3>
            <p className="text-gray-300 mb-4">{currentDialog}</p>
            <div className="text-sm text-gray-400">
              <p>• <strong>Krok 1:</strong> Przeciągnij komponenty na płytkę</p>
              <p>• <strong>Krok 2:</strong> Używaj trybu połączeń do łączenia komponentów</p>
              <p>• <strong>Krok 3:</strong> Stwórz zamknięty obwód (9 połączeń)</p>
              <p className="text-yellow-400 mt-2">
                💡 Kolejność: Bateria → Przełącznik → Kondensator → Resistor → LED → ...
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
            <h3 className="text-orange-400 font-bold mb-4">🆘 Pomoc</h3>
            {!jacekHelping ? (
              <div className="space-y-3">
                <Button
                  onClick={handleJacekHelp}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-bold"
                >
                  🔧 Zawołaj Dr. Chęcińskiego!
                </Button>
                <div className="text-xs text-gray-400 text-center">
                  Prób: {userAttempts} | Komponenty: {components.filter(c => c.onBoard).length}/9 | Połączenia: {connections.length}/9
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="animate-pulse text-orange-400 mb-2">
                  👨‍🔬 Dr. Chęciński pracuje...
                </div>
                <div className="text-sm text-gray-300">
                  Obserwuj eksperta!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Connection Controls */}
        {!jacekHelping && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-orange-400 font-bold">🔌 Narzędzia</h3>
              <div className="flex gap-4">
                <Button
                  onClick={toggleConnectingMode}
                  className={`px-4 py-2 font-bold ${connectingMode ?
                      'bg-green-600 hover:bg-green-700 text-white' :
                      'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                  {connectingMode ? '⚡ Tryb Połączeń AKTYWNY' : '🔗 Tryb Przeciągania'}
                </Button>

                {connectingMode && selectedComponent && (
                  <div className="bg-yellow-600 text-white px-3 py-2 rounded text-sm">
                    Wybrano: {getComponentName(components.find(c => c.id === selectedComponent)?.type || '')}
                  </div>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-400 mt-2">
              {connectingMode ?
                "Kliknij dwa komponenty aby je połączyć" :
                "Przeciągaj komponenty na płytkę"
              }
            </div>
          </div>
        )}

        {/* Workshop Area */}
        <div
          ref={boardRef}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-600 p-6 mb-6 relative select-none"
          style={{ height: '500px' }}
        >
          <div className="flex h-full gap-6">

            {/* Component Shelf */}
            <div className="bg-gray-700/30 rounded-lg p-4 border-r-2 border-gray-600" style={{ width: '220px', minWidth: '220px' }}>
              <h3 className="text-orange-400 font-bold mb-4 text-center text-sm">🔧 Komponenty</h3>
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

              <div className="mt-4 p-2 bg-gray-800 rounded text-xs">
                <div className="text-gray-300 mb-1">Postęp:</div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(components.filter(c => c.onBoard).length / 9) * 100}%` }}
                  />
                </div>
                <div className="text-gray-400 mt-1">
                  {components.filter(c => c.onBoard).length}/9 komponentów
                </div>
              </div>
            </div>

            {/* Breadboard */}
            <div className="flex-1 relative">
              {/* Board Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg opacity-20" />
              <div className="absolute inset-2 bg-gradient-to-br from-gray-600 to-gray-700 rounded opacity-30" />

              {/* Grid Pattern */}
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

              {/* All Components */}
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

              {/* Connections */}
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

              {/* Mode Indicators */}
              {connectingMode && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg font-bold">
                  🔌 Tryb Połączeń
                </div>
              )}

              {jacekHelping && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-bold animate-bounce">
                  👨‍🔬 Dr. Chęciński w akcji...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Circuit Status */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
          <h3 className="text-orange-400 font-bold mb-2">⚡ Status Obwodu</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-gray-300 text-sm mb-2">Komponenty na płytce:</h4>
              <div className="grid grid-cols-5 gap-1">
                {['battery', 'switch', 'capacitor', 'resistor1', 'resistor2', 'led1', 'led2', 'wire1', 'wire2'].map(id => (
                  <div key={id} className={`p-1 rounded text-xs text-center ${components.find(c => c.id === id)?.onBoard ? 'bg-green-900/30 text-green-400' : 'bg-gray-700/30 text-gray-400'
                    }`}>
                    {getComponentIcon(components.find(c => c.id === id)?.type || '')}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-gray-300 text-sm mb-2">Połączenia:</h4>
              <div className={`p-3 rounded text-center ${connections.length >= 7 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                }`}>
                {connections.length}/9 połączeń
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComponentShelfItem({ component, isDragging, jacekHelping, isSelected, connectingMode }: {
  component: Component
  isDragging: boolean
  jacekHelping: boolean
  isSelected: boolean
  connectingMode: boolean
}) {

  return (
    <div className={`p-2 rounded-lg border-2 text-center transition-all duration-200 ${isDragging ? 'border-orange-500 bg-orange-900/50 scale-110' :
        isSelected ? 'border-blue-500 bg-blue-900/50 ring-2 ring-blue-400' :
          jacekHelping ? 'border-gray-600 bg-gray-700/30 opacity-50' :
            connectingMode ? 'border-blue-400 bg-blue-900/20 hover:border-blue-300' :
              'border-gray-500 bg-gray-700/30 hover:border-orange-400'
      }`}>
      <div className="text-xl mb-1">{getComponentIcon(component.type)}</div>
      <div className="text-white text-xs font-semibold">{getComponentName(component.type)}</div>
    </div>
  )
}

function getComponentIcon(type: string) {
  switch (type) {
    case 'led': return '💡'
    case 'resistor': return '🔗'
    case 'battery': return '🔋'
    case 'capacitor': return '⚡'
    case 'switch': return '🔘'
    case 'wire': return '📎'
    default: return '⚡'
  }
}

function getComponentName(type: string) {
  switch (type) {
    case 'led': return 'LED'
    case 'resistor': return 'Resistor'
    case 'battery': return 'Bateria'
    case 'capacitor': return 'Kondensator'
    case 'switch': return 'Przełącznik'
    case 'wire': return 'Przewód'
    default: return 'Element'
  }
}

function CompletionScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-600">
          <div className="text-6xl mb-6">🏆</div>

          <h1 className="text-3xl font-bold text-orange-400 mb-4">
            Zaawansowany Obwód Ukończony!
          </h1>

          <div className="bg-orange-900/30 border border-orange-600 rounded-lg p-6 mb-6">
            <p className="text-orange-200 text-lg italic mb-4">
              "Widzisz? To był naprawdę skomplikowany projekt!"
            </p>
            <p className="text-orange-200 text-sm mb-2">
              "9 komponentów, 9 połączeń, kondensator, przełącznik...
              Bez mojego doświadczenia nie dałbyś rady!"
            </p>
            <p className="text-orange-200 text-xs mt-3 font-bold">
              - Dr. Jacek Chęciński, ekspert elektroniki
            </p>
          </div>
          <Button
            onClick={() => navigate('/ending')} 
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-xl font-bold"
          >
            🎉 ENDING
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Level11Page
