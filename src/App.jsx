import { useState } from 'react'
import Scene from './components/Scene'
import ControlPanel from './components/ControlPanel'

function App() {
  const [config, setConfig] = useState({
    color: '#3b82f6',
    material: 'standard',
    scale: 1,
    autoRotate: true
  })

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0f172a]">
      <Scene config={config} />
      <ControlPanel config={config} onChange={setConfig} />
    </div>
  )
}

export default App