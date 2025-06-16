function SequenceDisplay({ currentSequence, expectedLength, questComplete }: {
  currentSequence: string[]
  expectedLength: number
  questComplete: boolean
}) {

  if(questComplete) {
    return (<div></div>)
  }

  return (
    <div className="bg-neutral-900 backdrop-blur-sm rounded-lg p-6 border border-neutral-700 max-w-2xl mx-auto mt-8">

      <div className="flex justify-center items-center gap-3 flex-wrap">
        {Array.from({ length: Math.max(expectedLength, currentSequence.length) }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-lg font-bold ${index < currentSequence.length
                ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                : 'border-neutral-700 border-dashed text-neutral-500'
                }`}
            >
              {index < currentSequence.length ? currentSequence[index] : '?'}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default SequenceDisplay;
