import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react'
import { useFlowStore } from '../store/flowStore'

export function SequenceDiagram() {
  const { sequenceSteps, currentStepIndex, nodes, setInspectorPayload } = useFlowStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const activeStepRef = useRef<HTMLDivElement>(null)

  const participants = Array.from(
    new Set(sequenceSteps.flatMap(step => [step.from, step.to]))
  )
  const getParticipantLabel = (id: string) => {
    const node = nodes.find(n => n.id === id)
    return node?.data?.label || id
  }

  useEffect(() => {
    if (activeStepRef.current) {
      activeStepRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [currentStepIndex])

  const handleStepClick = (step: typeof sequenceSteps[0]) => {
    if (step.payload) {
      setInspectorPayload(step.payload)
    }
  }

  return (
    <div ref={containerRef} className="w-full h-full bg-slate-900 overflow-auto p-6">
      <div className="min-w-[800px]">
        {/* Participants header */}
        <div className="flex sticky top-0 bg-slate-900 pb-4 z-10">
          {participants.map((participant) => (
            <div
              key={participant}
              className="flex-1 text-center"
              style={{ minWidth: 150 }}
            >
              <div className="inline-block px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg">
                <span className="text-sm font-medium text-white">
                  {getParticipantLabel(participant)}
                </span>
              </div>
              {/* Vertical lifeline */}
              <div className="w-px h-4 bg-slate-600 mx-auto" />
            </div>
          ))}
        </div>

        {/* Sequence steps */}
        <div className="relative">
          {/* Lifelines */}
          <div className="absolute inset-0 flex pointer-events-none">
            {participants.map((participant) => (
              <div key={participant} className="flex-1" style={{ minWidth: 150 }}>
                <div className="w-px h-full bg-slate-700 mx-auto" style={{ marginLeft: 'calc(50% - 0.5px)' }} />
              </div>
            ))}
          </div>

          {/* Messages */}
          <div className="relative space-y-1 py-4">
            {sequenceSteps.map((step, idx) => {
              const fromIdx = participants.indexOf(step.from)
              const toIdx = participants.indexOf(step.to)
              const isLeftToRight = fromIdx < toIdx
              const startCol = Math.min(fromIdx, toIdx)
              const span = Math.abs(toIdx - fromIdx)
              const isActive = idx === currentStepIndex
              const isComplete = idx < currentStepIndex

              return (
                <div
                  key={step.id}
                  ref={isActive ? activeStepRef : null}
                  onClick={() => handleStepClick(step)}
                  className={`relative flex items-center h-12 transition-all duration-300 cursor-pointer hover:bg-slate-800/50 ${
                    isActive ? 'bg-blue-500/20' : ''
                  }`}
                >
                  {/* Step number */}
                  <div className={`absolute left-2 w-6 text-xs text-right ${
                    isActive ? 'text-blue-400 font-bold' : isComplete ? 'text-green-400' : 'text-slate-500'
                  }`}>
                    {idx + 1}
                  </div>

                  {/* Label - positioned above the arrow */}
                  <div
                    className={`absolute text-xs px-2 py-0.5 rounded whitespace-nowrap z-10 ${
                      isActive ? 'bg-blue-900/80 border border-blue-500 text-blue-200' : 
                      isComplete ? 'bg-slate-800 border border-green-600 text-green-300' : 
                      'bg-slate-800 border border-slate-600 text-slate-300'
                    }`}
                    style={{
                      left: `calc(${((startCol + span / 2) / participants.length) * 100}% + 75px)`,
                      transform: 'translateX(-50%)',
                      top: '2px',
                    }}
                  >
                    <span>{step.label}</span>
                    {step.isAsync && (
                      <Zap className="w-3 h-3 inline-block ml-1 text-amber-400" />
                    )}
                    {step.isReturn && (
                      <span className="ml-1 text-slate-400 text-[10px]">(return)</span>
                    )}
                  </div>

                  {/* Arrow container */}
                  <div
                    className="absolute flex items-center"
                    style={{
                      left: `calc(${(startCol / participants.length) * 100}% + 75px)`,
                      width: `calc(${(span / participants.length) * 100}%)`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                    }}
                  >
                    <div className={`flex items-center w-full ${isLeftToRight ? '' : 'flex-row-reverse'}`}>
                      {/* Start dot */}
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        isActive ? 'bg-blue-400' : isComplete ? 'bg-green-500' : 'bg-slate-500'
                      }`} />
                      
                      {/* Arrow line */}
                      <div className={`flex-1 h-0.5 relative ${
                        step.isAsync ? 'border-t-2 border-dashed bg-transparent' : ''
                      } ${
                        isActive ? 'bg-blue-400 border-blue-400' :
                        isComplete ? 'bg-green-500 border-green-500' :
                        'bg-slate-500 border-slate-500'
                      }`} />

                      {/* Arrow head */}
                      {isLeftToRight ? (
                        <ArrowRight className={`w-4 h-4 flex-shrink-0 ${
                          isActive ? 'text-blue-400' : isComplete ? 'text-green-500' : 'text-slate-500'
                        }`} />
                      ) : (
                        <ArrowLeft className={`w-4 h-4 flex-shrink-0 ${
                          isActive ? 'text-blue-400' : isComplete ? 'text-green-500' : 'text-slate-500'
                        }`} />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
