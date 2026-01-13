import { Layers, Zap } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-lattice-dark border-b border-slate-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Lattice</h1>
            <p className="text-xs text-slate-400">Request Lifecycle Visualizer</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Zap className="w-4 h-4 text-green-400" />
            <span>Enterprise AI Platform</span>
          </div>
        </div>
      </div>
    </header>
  )
}
