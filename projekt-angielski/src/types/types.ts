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
