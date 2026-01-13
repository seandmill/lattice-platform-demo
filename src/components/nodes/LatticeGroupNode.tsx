import { memo } from 'react'
import type { ComponentType } from '../../types'

interface LatticeGroupNodeProps {
  data: {
    label: string
    componentType: ComponentType
  }
}

const groupColors: Record<ComponentType, { bg: string; border: string; text: string; shadow: string }> = {
  experience: {
    bg: 'rgba(59, 130, 246, 0.08)',
    border: 'border-blue-500/40',
    text: 'text-blue-300',
    shadow: 'shadow-blue-500/10'
  },
  control: {
    bg: 'rgba(156, 163, 175, 0.08)',
    border: 'border-slate-400/40',
    text: 'text-slate-300',
    shadow: 'shadow-slate-500/10'
  },
  runtime: {
    bg: 'rgba(34, 197, 94, 0.08)',
    border: 'border-green-500/40',
    text: 'text-green-300',
    shadow: 'shadow-green-500/10'
  },
  ingestion: {
    bg: 'rgba(249, 115, 22, 0.08)',
    border: 'border-orange-500/40',
    text: 'text-orange-300',
    shadow: 'shadow-orange-500/10'
  },
  data: {
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'border-amber-500/40',
    text: 'text-amber-300',
    shadow: 'shadow-amber-500/10'
  },
  model: {
    bg: 'rgba(139, 92, 246, 0.08)',
    border: 'border-purple-500/40',
    text: 'text-purple-300',
    shadow: 'shadow-purple-500/10'
  },
  service: {
    bg: 'rgba(6, 182, 212, 0.08)',
    border: 'border-cyan-500/40',
    text: 'text-cyan-300',
    shadow: 'shadow-cyan-500/10'
  },
  database: {
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'border-amber-500/40',
    text: 'text-amber-300',
    shadow: 'shadow-amber-500/10'
  },
  external: {
    bg: 'rgba(107, 114, 128, 0.08)',
    border: 'border-gray-500/40',
    text: 'text-gray-300',
    shadow: 'shadow-gray-500/10'
  },
}

export const LatticeGroupNode = memo(function LatticeGroupNode({ data }: LatticeGroupNodeProps) {
  const colors = groupColors[data.componentType] || groupColors.runtime

  return (
    <div
      className={`rounded-xl border-2 border-dashed ${colors.border} p-4 h-full w-full shadow-xl ${colors.shadow}`}
      style={{ backgroundColor: colors.bg }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
        <span className={`text-[11px] font-bold ${colors.text} uppercase tracking-widest`}>
          {data.label}
        </span>
      </div>
    </div>
  )
})
