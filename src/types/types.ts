export interface HomePageProps {
  onAuthenticate: () => void
}

export interface Level2PageProps {
  onMaintenanceAccess: () => void
}

export interface Level3PageProps {
  onCodeAccess: () => void
}

export interface Level5PageProps {
  onFinalAccess: () => void
}

export interface Lever {
  id: string
  unit: string
  symbol: string
  position: { x: number; y: number }
  isActivated: boolean
  isBomb: boolean
}

export interface Question {
  id: string
  question: string
  answer: string
  method: string
}

export interface Component {
  id: string
  type: 'led' | 'resistor' | 'battery' | 'capacitor' | 'switch' | 'wire'
  x: number
  y: number
  connected: boolean
  onBoard: boolean
}
