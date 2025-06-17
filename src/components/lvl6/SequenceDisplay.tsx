function SequenceDisplay({ currentSequence, expectedLength, questComplete, questId }: {
  currentSequence: string[]
  expectedLength: number
  questComplete: boolean
  questId?: string
}) {

  if(questComplete) {
    return (<div></div>)
  }

  const getOperators = (questId: string) => {
    switch(questId) {
      case 'resistance':
        return ['=', '/'] // R = U/I
      case 'power_basic':
        return ['=', '×'] // P = U×I
      case 'knights_honor':
        return [] 
      case 'energy_strike':
        return ['=', '×'] // E = P×t
      default:
        return []
    }
  }

  const operators = getOperators(questId || '')

  return (
    <div className="bg-neutral-900 backdrop-blur-sm rounded-lg p-6 border border-neutral-700 max-w-2xl mx-auto mt-8">

      <div className="flex justify-center items-center gap-3 flex-wrap">
        {Array.from({ length: Math.max(expectedLength, currentSequence.length) }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-lg font-bold ${index < currentSequence.length
                ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                : 'border-neutral-700 border-dashed text-neutral-500'
                }`}
            >
              {index < currentSequence.length ? currentSequence[index] : '?'}
            </div>

            {index < expectedLength - 1 && operators.length > 0 && (
              <div className="text-2xl font-bold text-default-400 min-w-[24px] text-center">
                {operators[index] || ''}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SequenceDisplay;
