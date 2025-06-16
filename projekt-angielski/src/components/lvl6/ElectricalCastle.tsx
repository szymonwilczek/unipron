import type { Lever } from "@/types/types"
import CastleLever from "./CastleLever"

function ElectricalCastle({ levers, onLeverPull, allQuestsComplete, onDoorHandle, explosion }: {
  levers: Lever[]
  onLeverPull: (leverId: string) => void
  allQuestsComplete: boolean
  onDoorHandle: () => void
  explosion: boolean
}) {
  return (
    <div className="relative w-full h-full mt-10">
      <svg viewBox="0 0 900 600" className="w-full h-full">
        <defs>
          <linearGradient id="stoneWall" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#a8a29e", stopOpacity: 1 }} />
            <stop offset="30%" style={{ stopColor: "#78716c", stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: "#57534e", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#44403c", stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="darkStone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#6b7280", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#4b5563", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#374151", stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="woodGate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#92400e", stopOpacity: 1 }} />
            <stop offset="30%" style={{ stopColor: "#b45309", stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: "#78350f", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#451a03", stopOpacity: 1 }} />
          </linearGradient>

          <filter id="stoneShadow">
            <feDropShadow dx="2" dy="2" stdDeviation="1" floodColor="#000000" floodOpacity="0.3" />
          </filter>

          <filter id="deepShadow">
            <feDropShadow dx="3" dy="4" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        <rect x="50" y="200" width="800" height="400" fill="url(#stoneWall)" filter="url(#stoneShadow)" />

        {Array.from({ length: 16 }, (_, row) =>
          Array.from({ length: 20 }, (_, col) => {
            const offsetX = (row % 2) * 20;
            const blockWidth = 38;
            const blockHeight = 24;
            const x = 52 + col * blockWidth + offsetX;
            const y = 202 + row * blockHeight;

            const stoneShades = ['#78716c', '#6b7280', '#57534e', '#71717a', '#52525b'];
            const shade = stoneShades[(row + col) % stoneShades.length];

            return (
              <g key={`main-brick-${row}-${col}`}>
                <rect
                  x={x} y={y}
                  width={blockWidth - 2}
                  height={blockHeight - 2}
                  fill={shade}
                  stroke="#3f3f46"
                  strokeWidth="1"
                  filter="url(#stoneShadow)"
                />
                <line x1={x + 5} y1={y + 3} x2={x + 15} y2={y + 3} stroke="#52525b" strokeWidth="0.5" opacity="0.6" />
                <line x1={x + 20} y1={y + 8} x2={x + 30} y2={y + 8} stroke="#52525b" strokeWidth="0.5" opacity="0.4" />
                <circle cx={x + 10} cy={y + 15} r="1" fill="#3f3f46" opacity="0.3" />
              </g>
            );
          })
        )}

        <rect x="0" y="120" width="120" height="480" fill="url(#darkStone)" filter="url(#deepShadow)" />

        {Array.from({ length: 24 }, (_, row) =>
          Array.from({ length: 3 }, (_, col) => {
            const offsetX = (row % 2) * 15;
            const blockWidth = 35;
            const blockHeight = 19;
            const x = 5 + col * blockWidth + offsetX;
            const y = 125 + row * blockHeight;

            const towerShades = ['#4b5563', '#374151', '#6b7280', '#52525b'];
            const shade = towerShades[(row + col) % towerShades.length];

            return (
              <g key={`left-brick-${row}-${col}`}>
                <rect
                  x={x} y={y}
                  width={blockWidth - 1}
                  height={blockHeight - 1}
                  fill={shade}
                  stroke="#1f2937"
                  strokeWidth="1"
                />
                <line x1={x + 3} y1={y + 2} x2={x + 12} y2={y + 2} stroke="#1f2937" strokeWidth="0.5" opacity="0.4" />
                <circle cx={x + 8} cy={y + 12} r="0.8" fill="#1f2937" opacity="0.5" />
              </g>
            );
          })
        )}

        <rect x="780" y="120" width="120" height="480" fill="url(#darkStone)" filter="url(#deepShadow)" />

        {Array.from({ length: 24 }, (_, row) =>
          Array.from({ length: 3 }, (_, col) => {
            const offsetX = (row % 2) * 15;
            const blockWidth = 35;
            const blockHeight = 19;
            const x = 785 + col * blockWidth + offsetX;
            const y = 125 + row * blockHeight;

            const towerShades = ['#4b5563', '#374151', '#6b7280', '#52525b'];
            const shade = towerShades[(row + col) % towerShades.length];

            return (
              <g key={`right-brick-${row}-${col}`}>
                <rect
                  x={x} y={y}
                  width={blockWidth - 1}
                  height={blockHeight - 1}
                  fill={shade}
                  stroke="#1f2937"
                  strokeWidth="1"
                />
                <line x1={x + 3} y1={y + 2} x2={x + 12} y2={y + 2} stroke="#1f2937" strokeWidth="0.5" opacity="0.4" />
                <circle cx={x + 8} cy={y + 12} r="0.8" fill="#1f2937" opacity="0.5" />
              </g>
            );
          })
        )}

        <polygon points="0,120 60,30 120,120" fill="#1e293b" filter="url(#deepShadow)" />
        <polygon points="780,120 840,30 900,120" fill="#1e293b" filter="url(#deepShadow)" />

        <rect x="57" y="20" width="6" height="15" fill="#7c2d12" />
        <rect x="837" y="20" width="6" height="15" fill="#7c2d12" />

        <polygon points="63,25 85,30 85,40 63,35" fill="#dc2626" />
        <polygon points="843,25 865,30 865,40 843,35" fill="#dc2626" />
        <line x1="70" y1="28" x2="78" y2="32" stroke="#991b1b" strokeWidth="1" />
        <line x1="850" y1="28" x2="858" y2="32" stroke="#991b1b" strokeWidth="1" />

        {Array.from({ length: 11 }, (_, i) => (
          <rect key={`merlon-${i}`} x={145 + i * 60} y={190} width={20} height={25} fill="#57534e" filter="url(#stoneShadow)" />
        ))}

        <g>
          <rect x="25" y="200" width="18" height="35" fill="#0f172a" stroke="#1e293b" strokeWidth="2" rx="9" />
          <line x1="34" y1="200" x2="34" y2="235" stroke="#7c2d12" strokeWidth="1" />
          <line x1="25" y1="217" x2="43" y2="217" stroke="#7c2d12" strokeWidth="1" />
        </g>

        <g>
          <rect x="77" y="200" width="18" height="35" fill="#0f172a" stroke="#1e293b" strokeWidth="2" rx="9" />
          <line x1="86" y1="200" x2="86" y2="235" stroke="#7c2d12" strokeWidth="1" />
          <line x1="77" y1="217" x2="95" y2="217" stroke="#7c2d12" strokeWidth="1" />
        </g>

        <g>
          <rect x="805" y="200" width="18" height="35" fill="#0f172a" stroke="#1e293b" strokeWidth="2" rx="9" />
          <line x1="814" y1="200" x2="814" y2="235" stroke="#7c2d12" strokeWidth="1" />
          <line x1="805" y1="217" x2="823" y2="217" stroke="#7c2d12" strokeWidth="1" />
        </g>

        <g>
          <rect x="857" y="200" width="18" height="35" fill="#0f172a" stroke="#1e293b" strokeWidth="2" rx="9" />
          <line x1="866" y1="200" x2="866" y2="235" stroke="#7c2d12" strokeWidth="1" />
          <line x1="857" y1="217" x2="875" y2="217" stroke="#7c2d12" strokeWidth="1" />
        </g>

        <rect x="380" y="320" width="140" height="280" fill="url(#darkStone)" filter="url(#deepShadow)" />

        <path d="M 385 420 Q 450 280 515 420" fill="url(#stoneWall)" stroke="#374151" strokeWidth="4" filter="url(#stoneShadow)" />

        {Array.from({ length: 9 }, (_, i) => {
          const angle = (i - 4) * 20 - 90;
          const radius = 140;
          const centerX = 450;
          const centerY = 380;
          const x = centerX + Math.cos(angle * Math.PI / 180) * radius;
          const y = centerY + Math.sin(angle * Math.PI / 180) * radius;

          return (
            <rect
              key={`arch-stone-${i}`}
              x={x - 15} y={y - 8}
              width={30} height={16}
              fill="#6b7280"
              stroke="#374151"
              strokeWidth="1"
              transform={`rotate(${angle} ${x} ${y})`}
            />
          );
        })}

        <rect
          x="390"
          y="330"
          width="120"
          height="270"
          fill="url(#woodGate)"
          stroke="#451a03"
          strokeWidth="4"
          filter="url(#deepShadow)"
          className={explosion ? 'animate-pulse' : ''}
        />

        {Array.from({ length: 6 }, (_, i) => (
          <g key={`plank-${i}`}>
            <rect x={395 + i * 20} y="330" width="18" height="270" fill="#92400e" stroke="#78350f" strokeWidth="1" />
            <line x1={397 + i * 20} y1="350" x2={411 + i * 20} y2="350" stroke="#78350f" strokeWidth="0.5" opacity="0.6" />
            <line x1={397 + i * 20} y1="400" x2={411 + i * 20} y2="400" stroke="#78350f" strokeWidth="0.5" opacity="0.4" />
            <line x1={397 + i * 20} y1="450" x2={411 + i * 20} y2="450" stroke="#78350f" strokeWidth="0.5" opacity="0.6" />
            <line x1={397 + i * 20} y1="500" x2={411 + i * 20} y2="500" stroke="#78350f" strokeWidth="0.5" opacity="0.4" />
            <line x1={397 + i * 20} y1="550" x2={411 + i * 20} y2="550" stroke="#78350f" strokeWidth="0.5" opacity="0.6" />
          </g>
        ))}

        <rect x="390" y="360" width="120" height="12" fill="#1f2937" filter="url(#stoneShadow)" />
        <rect x="390" y="440" width="120" height="12" fill="#1f2937" filter="url(#stoneShadow)" />
        <rect x="390" y="520" width="120" height="12" fill="#1f2937" filter="url(#stoneShadow)" />

        {Array.from({ length: 8 }, (_, i) => (
          <circle key={`rivet-top-${i}`} cx={405 + i * 15} cy="366" r="2" fill="#4b5563" stroke="#374151" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={`rivet-mid-${i}`} cx={405 + i * 15} cy="446" r="2" fill="#4b5563" stroke="#374151" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={`rivet-bot-${i}`} cx={405 + i * 15} cy="526" r="2" fill="#4b5563" stroke="#374151" strokeWidth="0.5" />
        ))}

        <g 
          className={allQuestsComplete ? 'cursor-pointer' : 'cursor-default'}
          onClick={allQuestsComplete ? onDoorHandle : undefined}
        >
          <circle cx="480" cy="450" r="8" 
            fill={"#1f2937"} 
            stroke={"#0f172a"} 
            strokeWidth="2" 
            filter="url(#stoneShadow)"
          />
          <circle cx="480" cy="450" r="5" 
            fill={"#374151"} 
          />
          <circle cx="478" cy="448" r="1" 
            fill={"#6b7280"} 
          />
        </g>

        {explosion && (
          <>
            <circle cx="450" cy="400" r="8" fill="#fbbf24" className="animate-ping" />
            <circle cx="420" cy="380" r="5" fill="#f97316" className="animate-pulse" />
            <circle cx="480" cy="390" r="6" fill="#dc2626" className="animate-bounce" />
            <circle cx="440" cy="420" r="4" fill="#fde047" className="animate-ping" />
            <circle cx="460" cy="410" r="3" fill="#fb923c" className="animate-pulse" />
          </>
        )}
      </svg>

      {!allQuestsComplete && levers.map((lever) => (
        <CastleLever
          key={lever.id}
          lever={lever}
          onPull={() => onLeverPull(lever.id)}
        />
      ))}
    </div>
  )
}

export default ElectricalCastle;
