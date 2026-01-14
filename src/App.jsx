import { useEffect } from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { FlowCanvas } from './components/FlowCanvas'
import { Header } from './components/Header'
import { Breadcrumbs } from './components/Breadcrumbs'
import { PayloadInspector } from './components/PayloadInspector'
import { ControlPanel } from './components/ControlPanel'
import { SequenceDiagram } from './components/SequenceDiagram'
import { useFlowStore } from './store/flowStore'

function App() {
  const { showSequenceDiagram, isPlaying, playbackSpeed, advanceStep } = useFlowStore()

  // Animation controller - runs regardless of which view is shown
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      advanceStep()
    }, 1500 / playbackSpeed)

    return () => clearInterval(interval)
  }, [isPlaying, playbackSpeed, advanceStep])

  return (
    <ReactFlowProvider>
      <div className="min-h-screen bg-lattice-darker flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col">
          <Breadcrumbs />
          <div className="flex-1 flex relative">
            <div className="flex-1 relative">
              {showSequenceDiagram ? <SequenceDiagram /> : <FlowCanvas />}
            </div>
            <PayloadInspector />
          </div>
          <ControlPanel />
        </div>
      </div>
    </ReactFlowProvider>
  )
}

export default App
