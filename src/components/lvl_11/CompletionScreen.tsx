import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function CompletionScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-neutral-900 backdrop-blur-sm rounded-lg p-8 border border-neutral-700">
          <div className="text-6xl mb-6">🏆</div>

          <h1 className="text-3xl font-bold text-neutral-200 mb-4">
            Circut completed (by Dr. Jaciński)
          </h1>
          <Button
            onClick={() => navigate('/bank-escape')}
            className="bg-neutral-800 border border-neutral-700 hover:bg-neutral-900 text-white px-8 py-4 text-xl font-bold font-mono"
          >
            Next level
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompletionScreen;
