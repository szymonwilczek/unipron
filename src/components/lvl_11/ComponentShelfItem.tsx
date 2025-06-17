import type { Component } from "@/types/types"

function ComponentShelfItem({ component, isDragging, jacekHelping, isSelected, connectingMode }: {
  component: Component
  isDragging: boolean
  jacekHelping: boolean
  isSelected: boolean
  connectingMode: boolean
}) {

  return (
    <div className={`p-2 rounded-lg border-2 text-center transition-all duration-200 ${isDragging ? 'border-orange-500 bg-orange-900/50 scale-110' :
      isSelected ? 'border-blue-500 bg-neutral-800/50 ring-2 ring-blue-400' :
        jacekHelping ? 'border-gray-600 bg-gray-700/30 opacity-50' :
          connectingMode ? 'border-blue-400 bg-blue-900/20 hover:border-blue-300' :
            'border-gray-500 bg-gray-700/30 hover:border-orange-400'
      }`}>
      <div className="text-xl mb-1">{getComponentIcon(component.type)}</div>
      <div className="text-white text-xs font-semibold">{getComponentName(component.type)}</div>
    </div>
  )
}

export function getComponentIcon(type: string) {
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
    case 'battery': return 'Battery'
    case 'capacitor': return 'Capacitor'
    case 'switch': return 'Switch'
    case 'wire': return 'Wire'
    default: return 'Element'
  }
}

export default ComponentShelfItem
