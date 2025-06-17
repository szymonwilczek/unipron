import { useNavigate } from 'react-router-dom'
import LobuzAvatar from '@/components/lvl4/LobuzAvatar'

interface TermPageProps {
  termNumber: number
}

function TermPage({ termNumber }: TermPageProps) {
  const navigate = useNavigate()

  const getTermContent = () => {
    switch (termNumber) {
      case 0:
        return {
          content: (
            <div className="space-y-6 h-full flex flex-col justify-center">
              <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-700 flex-1 flex items-center">
                <div className="bg-neutral-800 text-black p-16 rounded-lg font-serif w-full">
                  <h3 className="text-3xl text-neutral-100 font-bold mb-4 text-center">
                    Definition of the limit of a function (Weierstrass)
                  </h3>

                  <div className="space-y-4 text-xl">
                    <p className="text-neutral-100">
                      Let f: D → ℝ and let x₀ be the focus point of the set D.
                    </p>

                    <div className="bg-yellow-100 p-4 rounded border-l-4 border-yellow-500">
                      <p className="font-bold">
                        lim[x→x₀] f(x) = L
                      </p>
                      <p className="mt-2">
                        ⟺ ∀ε &gt; 0 ∃δ &gt; 0 ∀x ∈ D: 0 &lt; |x - x₀| &lt; δ ⟹ |f(x) - L| &lt; ε
                      </p>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p className='text-neutral-100 font-bold text-lg'>Prove, that lim[x→2] (3x - 1) = 5</p>
                      <p className="mt-4 italic font-mono text-neutral-200 font-medium text-medium">
                        Don't worry, this is your first try. <br />You always still have the normal first term.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }

      case 1:
        return {
          content: (
            <div className="h-full flex flex-col justify-center border border-neutral-700 rounded-lg p-6">
              <div className="text-center space-y-6">
                <div className="text-8xl">📚</div>
                <h2 className="text-3xl font-bold text-yellow-400">
                  Familiarization term
                </h2>
                <p className="text-gray-300 text-lg">
                  It was only a familiarization term.  The real exam is yet to come. <br />Most students come here to find out what to learn at all.
                </p>
              </div>
            </div>
          )
        }

      case 2:
        return {
          content: (
            <div className="h-full flex flex-col justify-center border border-neutral-700 rounded-lg p-6">
              <div className="text-center space-y-6">
                <div className="text-8xl">❌</div>
                <h2 className="text-3xl font-bold text-red-400">
                  Not this time.
                </h2>
                <p className="text-gray-300 text-lg">
                  Second term, second deception. Not so easy to make it.
                </p>
              </div>
            </div>
          )
        }
      case 3:
        return {
          content: (
            <div className="h-full flex flex-col justify-center border border-neutral-700 rounded-lg p-6">
              <div className="text-center space-y-6">
                <div className="text-8xl animate-spin">⚡</div>
                <h2 className="text-3xl font-bold text-blue-400">
                 3 out of pitty. 
                </h2>
                <p className="text-gray-300 text-lg">
                You're facing much worse now anyway.
                </p>
                {setTimeout(() => navigate("/physics/egzamin"), 2000) && null}
              </div>
            </div>
          )
        }

      default:
        return {
          subtitle: "",
          content: <div>Error</div>
        }
    }
  }

  const { content } = getTermContent()

  return (
    <div className="min-h-screen bg-neutral-950 p-2">
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex flex-row" style={{ height: 'auto', minHeight: 'fit-content' }}>
          <div className="flex-1">
            <div className="bg-neutral-900 rounded-lg border-1 border-neutral-700 h-full min-h-full">
              {content}
            </div>
          </div>

          <div className="flex-shrink-0 h-full">
            <LobuzAvatar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermPage;
