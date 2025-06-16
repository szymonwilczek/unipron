import type { Lever } from "@/types/types"

function CastleLever({ lever, onPull }: {
  lever: Lever
  onPull: () => void
}) {
  return (
    <div
      className="absolute cursor-pointer transition-all duration-200 hover:scale-110 group"
      style={{
        left: `${lever.position.x}%`,
        top: `${lever.position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onPull}
    >
      <div className="relative">
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-gray-600 to-gray-800 rounded border-2 border-gray-700">
          <div className="absolute top-1 left-1 w-1 h-1 bg-gray-500 rounded-full"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-gray-500 rounded-full"></div>
          <div className="absolute bottom-1 left-2 w-1 h-1 bg-gray-500 rounded-full"></div>
          <div className="absolute bottom-1 right-2 w-1 h-1 bg-gray-500 rounded-full"></div>
        </div>

        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gradient-to-b from-gray-400 to-gray-600 border border-gray-700 rounded-sm">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-800 rounded-full"></div>
        </div>

        <div
          className={`relative w-2 h-16 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 border border-amber-900 rounded-sm transition-all duration-500 origin-bottom ${lever.isActivated ? '-rotate-45' : 'rotate-45'
            }`}
        >
          <div className="absolute top-2 left-0 w-full h-px bg-amber-600 opacity-50"></div>
          <div className="absolute top-6 left-0 w-full h-px bg-amber-600 opacity-30"></div>
          <div className="absolute top-10 left-0 w-full h-px bg-amber-600 opacity-40"></div>
          <div className="absolute top-14 left-0 w-full h-px bg-amber-600 opacity-20"></div>

          <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded border-2 transition-all duration-300 ${lever.isActivated
            ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-300 shadow-lg shadow-green-400/50'
            : 'bg-gradient-to-br from-gray-400 to-gray-600 border-gray-300'
            }`}>
            <div className={`absolute inset-0 flex items-center justify-center text-xs font-bold transition-colors duration-300 ${lever.isActivated ? 'text-white drop-shadow-sm' : 'text-gray-800'
              }`}>
              {lever.symbol}
            </div>

            <div className="absolute top-0.5 left-0.5 w-2 h-1 bg-white/40 rounded-full"></div>
          </div>

          <div className="absolute top-4 left-0 w-full h-1 bg-amber-900 opacity-80"></div>
          <div className="absolute top-6 left-0 w-full h-1 bg-amber-900 opacity-80"></div>
          <div className="absolute top-8 left-0 w-full h-1 bg-amber-900 opacity-80"></div>
        </div>

        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-amber-300 text-xs px-2 py-1 rounded border border-amber-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 font-mono">
          {lever.symbol} {lever.isActivated ? '✓' : '○'}
        </div>

        {lever.isActivated && (
          <>
            <div className="absolute inset-0 bg-green-400/20 rounded-full blur-sm animate-pulse scale-150"></div>

            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-green-400 text-lg animate-bounce">⚡</div>
            <div className="absolute -top-6 left-0 text-yellow-400 text-xs animate-ping">✨</div>
            <div className="absolute -top-6 right-0 text-blue-400 text-xs animate-ping animation-delay-300">✨</div>

            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-green-400/30 rounded-full blur animate-pulse"></div>
          </>
        )}

        <div className={`absolute top-8 w-6 h-1 bg-black/20 rounded-full blur-sm transition-all duration-500 ${lever.isActivated ? 'left-2 transform rotate-12' : 'right-2 transform -rotate-12'
          }`}></div>

        {lever.isActivated && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse opacity-70"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-500"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CastleLever
