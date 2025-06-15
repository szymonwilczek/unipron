import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from '@/pages/hello/HomePage'
import Level2Page from '@/pages/lvl2/Level2Page'
import Level3Page from '@/pages/Level3Page'
import Level4Page from '@/pages/Level4Page'
import Level5Page from '@/pages/Level5Page'
import Level6Page from '@/pages/Level6Page'
import Level7Page from '@/pages/Level7Page'
import TermPage from '@/pages/TermPage'
import EasterEggPage from '@/pages/EasterEggPage'
import Level8Page from '@/pages/Level8Page'
import Level9Page from '@/pages/Level9Page'
import FTPDiskPage from '@/pages/FTPDiskPage'
import Level10Page from '@/pages/Level10Page'
import Level11Page from '@/pages/Level11Page'
import EndingPage from '@/pages/EndingPage'

function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasMaintenanceAccess, setHasMaintenanceAccess] = useState(false)

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
              <Level4Page />
            }
          />

          <Route path="/amial/term0" element={<TermPage termNumber={0} />} />
          <Route path="/amial/term1" element={<TermPage termNumber={1} />} />
          <Route path="/amial/term2" element={<TermPage termNumber={2} />} />
          <Route path="/amial/term3" element={<TermPage termNumber={3} />} />

          <Route
            path="/physics/egzamin"
            element={<Level5Page />}
          />

          <Route
            path="/electro/level6"
            element={
              <Level6Page />
            }
          />

          <Route
            path="/circuits/advanced/theory"
            element={
              <Level7Page />
            }
          />

          <Route
            path="/programming/final"
            element={<Level8Page />}
          />


          <Route
            path="/digital-systems/advanced"
            element={<Level9Page />}
          />

          <Route path="/forum" element={<FTPDiskPage />} />
          <Route path="/dysk" element={<FTPDiskPage />} />
          <Route path="/algorithms/czech" element={<Level10Page />} />

          <Route path="/electronics/repair" element={<Level11Page />} />

          <Route path="/ending" element={<EndingPage />} />

          <Route path="*" element={<EasterEggPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default AppRouter
