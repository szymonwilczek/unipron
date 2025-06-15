import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import type { HomePageProps } from '@/types'

function HomePage({ onAuthenticate }: HomePageProps) {
  const navigate = useNavigate()

  const handleRecruitment = () => {
    onAuthenticate()
    navigate('/lvl2')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-neutral-950">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl font-bold text-red-400 mb-8 font-mono">
          Welcome to Your Nightmare... <br/> I mean, Studies!
        </h1>
        
        <div className="bg-neutral-900 p-8 rounded-lg border border-gray-700 text-left">
          <h2 className="text-2xl font-semibold mb-6 text-blue-300 font-mono">
            Faculty of Automatic Control, Electronics and Computer Science
          </h2>
          
          <div className="space-y-4 text-gray-200 leading-relaxed font-serif font-semibold">
            <p className="font-bold text-2xl" style={{ fontFamily: 'Georgia, serif' }}  >RECRUITMENT ANNOUNCEMENT</p>
            
            <p className="text-lg text-justify" style={{ fontFamily: 'Georgia, serif' }}>
              The Faculty of Automatic Control, Electronics and Computer Science 
              at Silesian University of Technology invites prospective students 
              to apply for our undergraduate and graduate programs.
            </p>
            
            <p className="text-lg text-justify" style={{ fontFamily: 'Georgia, serif' }}>
              Our faculty offers cutting-edge education in computer science, 
              automation, robotics, and electronics. Students will have access 
              to modern laboratories, experienced faculty members, and opportunities 
              for international cooperation.
            </p>
            
            <div className="bg-gray-700 p-4 rounded border-l-4 border-blue-400">
              <p style={{ fontFamily: 'Georgia, serif' }} className="font-medium text-blue-200 text-lg">Application Requirements:</p>
              <ul className="mt-2 space-y-1">
                <li>• Completed secondary education</li>
                <li>• Determination and willingness to learn</li>
              </ul>
            </div>
            
            <p className="text-sm italic text-gray-400 mt-6">
              Dean Prof. Dr. Hab. Eng. Dariusz Kania<br/>
              Faculty of Automatic Control, Electronics and Computer Science
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleRecruitment}
          className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 text-xl rounded-lg transition-colors duration-200 font-mono"
        >
          I'm ready!
        </Button>
      </div>
    </div>
  )
}

export default HomePage
