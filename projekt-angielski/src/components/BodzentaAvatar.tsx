interface BodzentaAvatarProps {
  position: 'top' | 'left' | 'right'
}

function BodzentaAvatar({ position }: BodzentaAvatarProps) {
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'top-20 left-1/2 transform -translate-x-1/2'
      case 'left':
        return 'top-1/2 left-8 transform -translate-y-1/2'
      case 'right':
        return 'top-1/2 right-8 transform -translate-y-1/2'
    }
  }

  const getAnimationDelay = () => {
    switch (position) {
      case 'top':
        return 'animate-pulse'
      case 'left':
        return 'animate-pulse animation-delay-500'
      case 'right':
        return 'animate-pulse animation-delay-1000'
    }
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-10 ${getAnimationDelay()}`}>
      <div className="relative">
        {/* Świecąca aura */}
        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl scale-150 animate-pulse"></div>
        
        {/* Avatar */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-3 border-red-500 shadow-lg shadow-red-500/50">
          <img 
            src="/images/bodzenta.png" 
            alt="Prof. Jerzy Bodzenta"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback jeśli obraz się nie załaduje
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.nextElementSibling?.classList.remove('hidden')
            }}
          />
          <div className="hidden w-full h-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-xl">
            B
          </div>
        </div>

        {/* Oczy śledzące */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping animation-delay-300"></div>
      </div>
    </div>
  )
}

export default BodzentaAvatar
