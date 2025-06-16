import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReportEditor from '@/components/lvl7/ReportEditor'
import FormatControls from '@/components/lvl7/FormatControls'
import StatusDisplay from '@/components/lvl7/StatusDisplay'

function Level7Page() {
  const [fontSize, setFontSize] = useState(12)
  const [fontFamily, setFontFamily] = useState('Arial')
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const reportContent = `                         Digital Circuits Laboratory
                         Academid Year 2024/25
                         City: Gliwice, Stationary
                         Major: Computer Science, 3rd semester
                         Leading: GD
                         Date: ${new Date().toLocaleDateString('pl-PL')}, 11:45
                         No: 1
                         Topic: Combinational digital circuits
                         Section:
                                       Szymon Wilczek
                                       Bartosz Kaprak
                                       Rafał Szczygieł
                                       Konrad Salej

EXCERCISE 1
Realize a 4-argument logic function whose inputs are treated as 2-bit positive binary numbers. The output of the circuit is to take the state 1 when the sum of the numbers given to input is divisible by 2 or is divisible by 3 or is equal to 0.

Content of the command given in the lab:
We define A,B as 2-bit numbers
A+B=C
If
C mod 2 = 0
or C mod 3 = 0
then OUTPUT = 1

SOLUTION
For states where the result is divisible by 2 or 3 or the result is equal to 0, the output is 1.
For all other states, the output is 0.

[Believe it or not, there is a picture right here.]

The output C of the Karnaugh grid shown, using the designated groups, will be
the following function:

[Believe it or not, there is an equation right here.]

Schematic drawing of the function realized on NAND gates:

[Believe it or not, there is a schematic picture right here.]

During the lab, we were able to successfully build, test, run and present a working circuit to the instructor. 
It worked correctly for the intended inputs. We did not notice any abnormalities during the operation of the circuit.`

  const availableFonts = [
    'Arial',
    'Times New Roman',
    'Calibri',
    'Courier New'
  ]

  const handleSubmit = () => {
    setIsSubmitting(true)

    if (fontFamily === 'Calibri' && fontSize < 13 && fontSize > 10) {
      setStatus('SPRAWDZANIE...')

      setTimeout(() => {
        setStatus('3.0')

        setTimeout(() => {
          navigate('/programming/final') 
        }, 3000)
      }, 2000)
    } else {
      setStatus('EXAMINATION...')

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
    <div className="min-h-screen bg-neutral-950 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <img
              src="/images/drabiel-gabik.png"
              alt="Dr. Drabiel Gabik"
              className="w-40 h-auto rounded-lg border-2 border-neutral-700"
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
              <h2 className="text-xl font-bold text-white">Dr. Drabiel Gabik</h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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

            <StatusDisplay status={status} />
          </div>

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

export default Level7Page
