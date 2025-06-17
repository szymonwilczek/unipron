function KnightOnCastle({ message, questNumber, totalQuests, questComplete }: {
  message: string
  questNumber: number
  totalQuests: number
  questComplete: boolean
}) {

  if(questComplete) {
    return (<div></div>)
  }

  return (
    <div className="absolute top-52 left-1/2 transform -translate-x-1/2 -translate-y-full">
      <div className="flex flex-row items-center space-y-1">

        <div className="mr-4">
          <img
            src="/images/pulka.png"
            alt="Electrical Knight"
            className="w-full h-auto max-w-xs rounded-lg border-2 border-neutral-700 shadow-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.nextElementSibling?.classList.remove('hidden')
            }}
          />
        </div>

        {message && (
          <div className="mb-4 relative w-full">
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 shadow-lg max-w-md">
              <div className="text-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-xl text-neutral-300 font-serif font-bold">
                    Sir Purzej Andułka
                  </h3>
                  <span className="text-xs text-neutral-500">
                    {questNumber}/{totalQuests}
                  </span>
                </div>

                <p className="text-neutral-100 text-medium leading-relaxed font-serif">
                  {message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default KnightOnCastle
