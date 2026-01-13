import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { ChevronRight, Database, Server, Cpu, Globe, Settings, Layers } from 'lucide-react'
import type { ComponentType, FlowStatus } from '../../types'

interface LatticeNodeProps {
  data: {
    label: string
    description?: string
    componentType: ComponentType
    status: FlowStatus
    canDrillDown: boolean
    isAsync?: boolean
  }
  selected?: boolean
}

const componentIcons: Record<ComponentType, typeof Server> = {
  experience: Globe,
  control: Settings,
  runtime: Cpu,
  ingestion: Layers,
  data: Database,
  model: Cpu,
  service: Server,
  database: Database,
  external: Globe,
}

const componentColors: Record<ComponentType, { bg: string; border: string; text: string; glow: string }> = {
  experience: {
    bg: 'bg-blue-950',
    border: 'border-blue-400/60',
    text: 'text-blue-300',
    glow: 'shadow-blue-500/50'
  },
  control: {
    bg: 'bg-slate-900',
    border: 'border-slate-400/60',
    text: 'text-slate-300',
    glow: 'shadow-slate-500/50'
  },
  runtime: {
    bg: 'bg-green-950',
    border: 'border-green-400/60',
    text: 'text-green-300',
    glow: 'shadow-green-500/50'
  },
  ingestion: {
    bg: 'bg-orange-950',
    border: 'border-orange-400/60',
    text: 'text-orange-300',
    glow: 'shadow-orange-500/50'
  },
  data: {
    bg: 'bg-amber-950',
    border: 'border-amber-400/60',
    text: 'text-amber-300',
    glow: 'shadow-amber-500/50'
  },
  model: {
    bg: 'bg-purple-950',
    border: 'border-purple-400/60',
    text: 'text-purple-300',
    glow: 'shadow-purple-500/50'
  },
  service: {
    bg: 'bg-cyan-950',
    border: 'border-cyan-400/60',
    text: 'text-cyan-300',
    glow: 'shadow-cyan-500/50'
  },
  database: {
    bg: 'bg-amber-950',
    border: 'border-amber-400/60',
    text: 'text-amber-300',
    glow: 'shadow-amber-500/50'
  },
  external: {
    bg: 'bg-gray-900',
    border: 'border-gray-400/60',
    text: 'text-gray-300',
    glow: 'shadow-gray-500/50'
  },
}

const statusStyles: Record<FlowStatus, string> = {
  idle: '',
  active: 'ring-2 ring-blue-400 animate-pulse',
  complete: 'ring-2 ring-green-400',
  error: 'ring-2 ring-red-400',
  pending: 'ring-2 ring-yellow-400 opacity-75',
}

export const LatticeNode = memo(function LatticeNode({ data, selected }: LatticeNodeProps) {
  const Icon = componentIcons[data.componentType] || Server
  const colors = componentColors[data.componentType] || componentColors.runtime
  const statusStyle = statusStyles[data.status]

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-slate-500 !w-2 !h-2 !border-0" />
      <div
        className={`
          px-3 py-2 rounded-lg border
          ${colors.bg} ${colors.border}
          ${statusStyle}
          ${selected ? `shadow-lg ${colors.glow}` : ''}
          ${data.canDrillDown ? 'cursor-pointer hover:brightness-125' : ''}
          ${data.isAsync ? 'border-dashed' : ''}
          transition-all duration-200
        `}
      >
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
          <span className="text-xs font-medium text-white">{data.label}</span>
          {data.canDrillDown && (
            <ChevronRight className={`w-3 h-3 ${colors.text} flex-shrink-0`} />
          )}
        </div>
        {data.description && (
          <p className="text-[10px] text-slate-400 mt-1">{data.description}</p>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-slate-500 !w-2 !h-2 !border-0" />
    </>
  )
})

