import { JSX, useState, useRef, useCallback } from 'react'
import { ChevronRight, ChevronDown, X, ArrowUpRight, ArrowDownLeft, Clock, Copy, Check, GripVertical } from 'lucide-react'
import { useFlowStore } from '../store/flowStore'

export function PayloadInspector() {
  const { inspectorPayload, setInspectorPayload, sequenceSteps, currentStepIndex } = useFlowStore()
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(['body', 'headers', 'workflow', 'tool']))
  const [copied, setCopied] = useState(false)
  const [width, setWidth] = useState(400)
  const isResizing = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isResizing.current = true
    startX.current = e.clientX
    startWidth.current = width
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    e.preventDefault()
  }, [width])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return
    const delta = startX.current - e.clientX
    const newWidth = Math.min(Math.max(startWidth.current + delta, 320), 800)
    setWidth(newWidth)
  }, [])

  const handleMouseUp = useCallback(() => {
    isResizing.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }, [handleMouseMove])

  const currentStep = sequenceSteps[currentStepIndex]
  const payload = inspectorPayload || currentStep?.payload

  const toggleExpanded = (key: string) => {
    const newSet = new Set(expandedKeys)
    if (newSet.has(key)) {
      newSet.delete(key)
    } else {
      newSet.add(key)
    }
    setExpandedKeys(newSet)
  }

  const copyToClipboard = async () => {
    if (payload) {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const renderValue = (value: unknown, path: string, depth: number = 0): JSX.Element => {
    if (value === null) return <span className="text-orange-400">null</span>
    if (value === undefined) return <span className="text-slate-500">undefined</span>
    if (typeof value === 'boolean') return <span className="text-purple-400">{value.toString()}</span>
    if (typeof value === 'number') return <span className="text-cyan-400">{value}</span>
    if (typeof value === 'string') {
      if (value.length > 50) {
        return <span className="text-green-400">"{value.slice(0, 50)}..."</span>
      }
      return <span className="text-green-400">"{value}"</span>
    }

    if (Array.isArray(value)) {
      const isExpanded = expandedKeys.has(path)
      return (
        <div>
          <button
            onClick={() => toggleExpanded(path)}
            className="flex items-center gap-1 text-slate-400 hover:text-white"
          >
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            <span className="text-slate-500">[{value.length}]</span>
          </button>
          {isExpanded && (
            <div className="ml-4 border-l border-slate-700 pl-2">
              {value.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-slate-500">{idx}:</span>
                  {renderValue(item, `${path}.${idx}`, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    if (typeof value === 'object') {
      const isExpanded = expandedKeys.has(path)
      const entries = Object.entries(value)
      return (
        <div>
          <button
            onClick={() => toggleExpanded(path)}
            className="flex items-center gap-1 text-slate-400 hover:text-white"
          >
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            <span className="text-slate-500">{`{${entries.length}}`}</span>
          </button>
          {isExpanded && (
            <div className="ml-4 border-l border-slate-700 pl-2">
              {entries.map(([key, val]) => (
                <div key={key} className="flex items-start gap-2">
                  <span className="text-blue-300">{key}:</span>
                  {renderValue(val, `${path}.${key}`, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    return <span className="text-white">{String(value)}</span>
  }

  if (!payload && !currentStep) {
    return (
      <div style={{ width }} className="bg-slate-900 border-l border-slate-700 flex flex-col relative">
        {/* Resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-blue-500/50 transition-colors group flex items-center"
        >
          <GripVertical className="w-3 h-3 text-slate-600 group-hover:text-blue-400 absolute -left-1" />
        </div>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Payload Inspector</h3>
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded hover:bg-slate-700 transition-colors opacity-50"
            disabled
          >
            <Copy className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-sm text-slate-500 text-center">
            Play the animation or click on a node/step to inspect its payload
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width }} className="bg-slate-900 border-l border-slate-700 flex flex-col relative">
      {/* Resize handle */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-blue-500/50 transition-colors group flex items-center"
      >
        <GripVertical className="w-3 h-3 text-slate-600 group-hover:text-blue-400 absolute -left-1" />
      </div>
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Payload Inspector</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded hover:bg-slate-700 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
          {inspectorPayload && (
            <button
              onClick={() => setInspectorPayload(null)}
              className="p-1.5 rounded hover:bg-slate-700 transition-colors"
              title="Clear"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {currentStep && (
        <div className="p-3 border-b border-slate-700 bg-slate-800/50">
          <p className="text-xs text-slate-400 mb-1">Current Step</p>
          <p className="text-sm text-white font-medium">{currentStep.label}</p>
          <p className="text-xs text-slate-500 mt-1">
            {currentStep.from} → {currentStep.to}
          </p>
        </div>
      )}

      {payload && (
        <div className="flex-1 overflow-auto p-4">
          <div className="flex items-center gap-2 mb-3">
            {payload.direction === 'request' ? (
              <ArrowUpRight className="w-4 h-4 text-blue-400" />
            ) : (
              <ArrowDownLeft className="w-4 h-4 text-green-400" />
            )}
            <span className={`text-xs font-medium uppercase ${payload.direction === 'request' ? 'text-blue-400' : 'text-green-400'
              }`}>
              {payload.direction}
            </span>
            {payload.latency && (
              <span className="flex items-center gap-1 text-xs text-slate-500 ml-auto">
                <Clock className="w-3 h-3" />
                {payload.latency}ms
              </span>
            )}
          </div>

          {payload.method && payload.endpoint && (
            <div className="mb-3 p-2 bg-slate-800 rounded text-xs font-mono">
              <span className="text-purple-400">{payload.method}</span>{' '}
              <span className="text-slate-300">{payload.endpoint}</span>
            </div>
          )}

          <div className="space-y-1 text-xs font-mono">
            {Object.entries(payload).map(([key, value]) => {
              if (['timestamp', 'direction', 'method', 'endpoint', 'latency'].includes(key)) return null
              return (
                <div key={key} className="flex items-start gap-2">
                  <span className="text-blue-300">{key}:</span>
                  {renderValue(value, key)}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
