function FormatControls({ fontSize, fontFamily, onFontSizeChange, onFontFamilyChange, availableFonts }: {
  fontSize: number
  fontFamily: string
  onFontSizeChange: (size: number) => void
  onFontFamilyChange: (font: string) => void
  availableFonts: string[]
}) {
  return (
    <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-700 mb-6">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Font size: {fontSize}pt
        </label>
        <input
          type="range"
          min="8"
          max="16"
          value={fontSize}
          onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
          className="w-full h-2 bg-neutral-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>8pt</span>
          <span>16pt</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Font
        </label>
        <select
          value={fontFamily}
          onChange={(e) => onFontFamilyChange(e.target.value)}
          className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
        >
          {availableFonts.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700">
        <p className="text-xs text-gray-300 mb-1">Preview:</p>
        <p
          style={{
            fontFamily: fontFamily,
            fontSize: `${fontSize}px`
          }}
          className="text-white"
        >
        Sample text 
        </p>
      </div>
    </div>
  )
}

export default FormatControls;
