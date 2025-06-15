function TutajewiczAvatar() {
  return (
    <div className="relative h-full ml-2 rounded-lg drag-none">
      <div className="bg-neutral-900 animate-slideInRight rounded-lg border border-neutral-700 shadow-lg h-full">
        <div className="flex flex-col items-center justify-center h-full p-4">
          <div className="overflow-hidden rounded-lg mb-4">
            <img
              src="/images/tutek.png"
              alt="Dr Tutajewicz"
              draggable="false"
              className="max-w-xs w-auto h-auto object-contain select-none drag-none"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-300">
              Dr Tobert Rutajewicz
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutajewiczAvatar
