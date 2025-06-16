function SecurityCamera({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4'
      case 'top-right':
        return 'top-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
    }
  }

  const getRotationClasses = () => {
    switch (position) {
      case 'top-left':
        return 'rotate-[135deg]'
      case 'top-right':
        return 'rotate-[225deg]'
      case 'bottom-left':
        return 'rotate-45'
      case 'bottom-right':
        return '-rotate-45'
    }
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-20`}>
      <div className={`relative ${getRotationClasses()}`}>
        {/* ramie kamery */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-8 bg-gray-600 rounded-sm border border-gray-500"></div>
          {/* mocowanie */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-3 bg-gray-700 rounded border border-gray-500"></div>
          </div>
        </div>

        {/* korpus */}
        <div className="relative">
          <div className="w-10 h-8 bg-gray-800 rounded-lg border border-gray-600 flex items-center justify-start pl-1">
            {/* obiektyw */}
            <div className="w-6 h-6 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-900 rounded-full border border-gray-400 relative">
                <div className="w-2 h-2 bg-blue-200 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80"></div>
              </div>
            </div>

            {/* panel z diodami */}
            <div className="ml-1 flex flex-col gap-1">
              <div className="w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* uchwyt */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-2 bg-gray-700 rounded-t border border-gray-500"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityCamera;

