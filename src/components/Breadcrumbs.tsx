import { ChevronRight, Home } from 'lucide-react'
import { useFlowStore } from '../store/flowStore'

export function Breadcrumbs() {
  const { breadcrumbs, navigateToBreadcrumb } = useFlowStore()

  return (
    <nav className="bg-lattice-dark/50 border-b border-slate-800 px-6 py-2">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.id} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-slate-600" />}
            <button
              onClick={() => navigateToBreadcrumb(index)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                index === breadcrumbs.length - 1
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {index === 0 && <Home className="w-3.5 h-3.5" />}
              {crumb.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
