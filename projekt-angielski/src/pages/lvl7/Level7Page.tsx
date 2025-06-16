import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function Level7Page() {
  const [fontSize, setFontSize] = useState(12)
  const [fontFamily, setFontFamily] = useState('Arial')
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const reportContent = `SPRAWOZDANIE Z TEORII UKŁADÓW CYFROWYCH

Student: Jan Kowalski
Numer indeksu: 123456
Data: ${new Date().toLocaleDateString('pl-PL')}

TEMAT: Analiza bramek logicznych w układach kombinacyjnych

1. WPROWADZENIE
Niniejsze sprawozdanie przedstawia analizę podstawowych bramek logicznych oraz ich zastosowanie w układach kombinacyjnych. Bramki logiczne stanowią fundamentalne elementy systemów cyfrowych.

2. CEL ĆWICZENIA
Celem ćwiczenia było poznanie działania podstawowych bramek logicznych: AND, OR, NOT, NAND, NOR, XOR oraz ich praktyczne zastosowanie w projektowaniu układów kombinacyjnych.

3. WYKONANE POMIARY
Podczas laboratorium wykonano pomiary napięć wyjściowych dla różnych kombinacji sygnałów wejściowych. Wszystkie bramki zostały przetestowane zgodnie z tabelami prawdy.

4. WYNIKI
Bramka AND: Sygnał wysoki na wyjściu tylko przy sygnałach wysokich na wszystkich wejściach.
Bramka OR: Sygnał wysoki na wyjściu przy sygnale wysokim na co najmniej jednym wejściu.
Bramka NOT: Odwrócenie sygnału wejściowego.

5. WNIOSKI
Bramki logiczne działają zgodnie z teorią. Wszystkie pomiary potwierdziły poprawność tablic prawdy. Układy kombinacyjne mogą być skutecznie realizowane przy użyciu podstawowych bramek logicznych.

6. BIBLIOGRAFIA
[1] Tokheim R. L. - Podstawy elektroniki cyfrowej
[2] Malvino A. P. - Elektronika cyfrowa i projektowanie systemów cyfrowych`

  const availableFonts = [
    'Arial',
    'Times New Roman',
    'Calibri',
    'Courier New'
  ]

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Sprawdź czy to Calibri 11pt
    if (fontFamily === 'Calibri' && fontSize < 13 && fontSize > 10) {
      setStatus('SPRAWDZANIE...')

      setTimeout(() => {
        setStatus('3.0')

        setTimeout(() => {
          navigate('/programming/final') // Następny poziom
        }, 3000)
      }, 2000)
    } else {
      setStatus('SPRAWDZANIE...')

      setTimeout(() => {
        setStatus('ZWROT')
        setIsSubmitting(false)
      }, 2000)
    }
  }

  const resetStatus = () => {
    if (status === 'ZWROT') {
      setStatus('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/dr-drabik.png"
              alt="Dr. Drabik"
              className="w-16 h-16 rounded-full border-4 border-blue-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden w-16 h-16 rounded-full border-4 border-blue-500 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">📊</span>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Dr. Drabik</h2>
              <p className="text-gray-300 text-sm">Prowadzący laboratorium</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Format Controls */}
          <div className="lg:col-span-1">
            <FormatControls
              fontSize={fontSize}
              fontFamily={fontFamily}
              onFontSizeChange={(size) => {
                setFontSize(size)
                resetStatus()
              }}
              onFontFamilyChange={(font) => {
                setFontFamily(font)
                resetStatus()
              }}
              availableFonts={availableFonts}
            />

            {/* Status */}
            <StatusDisplay status={status} />
          </div>

          {/* Editor */}
          <div className="lg:col-span-3">
            <ReportEditor
              content={reportContent}
              fontSize={fontSize}
              fontFamily={fontFamily}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              status={status}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FormatControls({ fontSize, fontFamily, onFontSizeChange, onFontFamilyChange, availableFonts }: {
  fontSize: number
  fontFamily: string
  onFontSizeChange: (size: number) => void
  onFontFamilyChange: (font: string) => void
  availableFonts: string[]
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-600 mb-6">
      <h3 className="text-lg font-bold text-blue-300 mb-4">🔧 Formatowanie</h3>

      {/* Font Size */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Rozmiar czcionki: {fontSize}pt
        </label>
        <input
          type="range"
          min="8"
          max="16"
          value={fontSize}
          onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>8pt</span>
          <span>16pt</span>
        </div>
      </div>

      {/* Font Family */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Czcionka
        </label>
        <select
          value={fontFamily}
          onChange={(e) => onFontFamilyChange(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
        >
          {availableFonts.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      {/* Preview */}
      <div className="bg-gray-700 rounded p-3 border border-gray-600">
        <p className="text-xs text-gray-400 mb-1">Podgląd:</p>
        <p
          style={{
            fontFamily: fontFamily,
            fontSize: `${fontSize}px`
          }}
          className="text-white"
        >
          Przykładowy tekst
        </p>
      </div>
    </div>
  )
}

function StatusDisplay({ status }: { status: string }) {
  if (!status) return null

  const getStatusColor = () => {
    if (status === 'ZWROT') return 'border-red-500 bg-red-900/50'
    if (status.includes('3.0')) return 'border-green-500 bg-green-900/50'
    return 'border-yellow-500 bg-yellow-900/50'
  }

  const getStatusIcon = () => {
    if (status === 'ZWROT') return '❌'
    if (status.includes('3.0')) return '✅'
    return '⏳'
  }

  return (
    <div className={`rounded-lg p-4 border ${getStatusColor()}`}>
      <div className="text-center">
        <div className="text-3xl mb-2">{getStatusIcon()}</div>
        <h3 className="font-bold text-lg mb-1">
          {status === 'ZWROT' ? 'ZWROT' :
            status.includes('3.0') ? 'ZAAKCEPTOWANO' : 'SPRAWDZANIE...'}
        </h3>
        {status.includes('3.0') && (
          <p className="text-green-300 text-xl font-bold">OCENA: 3.0</p>
        )}
        {status === 'ZWROT' && (
          <p className="text-red-300 text-sm">
            https://db.zmitac.aei.polsl.pl/GD/sprawozdania/
          </p>
        )}
      </div>
    </div>
  )
}

function ReportEditor({ content, fontSize, fontFamily, onSubmit, isSubmitting, status }: {
  content: string
  fontSize: number
  fontFamily: string
  onSubmit: () => void
  isSubmitting: boolean
  status: string
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-600 overflow-hidden">
      {/* Editor Header */}
      <div className="bg-gray-700 px-4 py-2 border-b border-gray-600 flex justify-between items-center">
        <h3 className="text-white font-semibold">📄 Edytor Sprawozdania</h3>
        <div className="text-sm text-gray-300">
          {fontFamily} | {fontSize}pt
        </div>
      </div>

      {/* Text Area */}
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
          placeholder="Treść sprawozdania..."
        />
      </div>

      {/* Submit Button */}
      <div className="p-4 border-t border-gray-600">
        <Button
          onClick={onSubmit}
          disabled={isSubmitting || status.includes('3.0')}
          className={`w-full py-3 text-lg font-bold ${status.includes('3.0')
              ? 'bg-green-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isSubmitting ? '📤 PRZESYŁANIE...' :
            status.includes('3.0') ? '✅ ZAAKCEPTOWANO' :
              '📤 PRZEŚLIJ SPRAWOZDANIE'}
        </Button>
      </div>
    </div>
  )
}

export default Level7Page
