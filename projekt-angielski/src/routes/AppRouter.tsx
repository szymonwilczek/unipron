import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from '@/pages/HomePage'
import Level2Page from '@/pages/Level2Page'
import Level3Page from '@/pages/Level3Page'
import Level4Page from '@/pages/Level4Page'
import Level5Page from '@/pages/Level5Page'
import Level6Page from '@/pages/Level6Page'
import TermPage from '@/pages/TermPage'
import EasterEggPage from '@/pages/EasterEggPage'

function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasMaintenanceAccess, setHasMaintenanceAccess] = useState(false)
  const [hasCodeAccess, setHasCodeAccess] = useState(false)
  const [hasProofAccess, setHasProofAccess] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Routes>
          <Route
            path="/"
            element={<HomePage onAuthenticate={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/lvl2"
            element={
              isAuthenticated ?
                <Level2Page onMaintenanceAccess={() => setHasMaintenanceAccess(true)} /> :
                <EasterEggPage />
            }
          />
          <Route
            path="/system/diagnostics/core"
            element={
              hasMaintenanceAccess ? <Level3Page /> : <EasterEggPage />
            }
          />

          <Route
            path="/quantum/core/access"
            element={
              <Level4Page onProofAccess={() => setHasProofAccess(true)} />
            }
          />

          {/* Strony terminów */}
          <Route path="/amial/term0" element={<TermPage termNumber={0} />} />
          <Route path="/amial/term1" element={<TermPage termNumber={1} />} />
          <Route path="/amial/term2" element={<TermPage termNumber={2} />} />
          <Route
            path="/amial/term3"
            element={<Level5Page />}
          />

          <Route
            path="/physics/quantum/reality"
            element={
              <Level6Page />
            }
          />



          <Route path="*" element={<EasterEggPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default AppRouter
