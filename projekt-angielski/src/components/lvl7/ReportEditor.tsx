import { Button } from "../ui/button"

function ReportEditor({ content, fontSize, fontFamily, onSubmit, isSubmitting, status }: {
  content: string
  fontSize: number
  fontFamily: string
  onSubmit: () => void
  isSubmitting: boolean
  status: string
}) {
  return (
    <div className="bg-neutral-900 rounded-lg border border-neutral-700 overflow-hidden">
      <div className="bg-neutral-800 px-4 py-2 border-b border-neutral-700 flex justify-between items-center">
        <h3 className="text-white font-semibold">📄 report-tuc-ex-1-fix23.pdf</h3>
      </div>

      <div className="p-4">
        <textarea
          value={content}
          readOnly
          style={{
            fontFamily: fontFamily,
            fontSize: `${fontSize}px`,
            lineHeight: '1.5'
          }}
          className="w-full h-96 bg-white text-black p-4 rounded border resize-none focus:outline-none"
          placeholder="Raport..."
        />
      </div>

      <div className="p-4 border-t border-neutral-700">
        <Button
          onClick={onSubmit}
          disabled={isSubmitting || status.includes('3.0')}
          className={`font-mono w-full py-3 text-lg font-bold ${status.includes('3.0')
              ? 'bg-green-600 cursor-not-allowed'
              : 'bg-neutral-700 hover:bg-neutral-800'
            }`}
        >
          {isSubmitting ? 'SENDING...' :
            status.includes('3.0') ? '✅ ACCEPTED' :
              'SEND REPORT'}
        </Button>
      </div>
    </div>
  )
}

export default ReportEditor
