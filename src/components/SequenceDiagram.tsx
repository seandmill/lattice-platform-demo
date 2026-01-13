import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react'
import { useFlowStore } from '../store/flowStore'

export function SequenceDiagram() {
  const { sequenceSteps, currentStepIndex, nodes } = useFlowStore()
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
          <div className="relative space-y-2 py-4">
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
                  className={`relative flex items-center py-2 transition-all duration-300 ${isActive ? 'bg-blue-500/10' : isComplete ? 'opacity-75' : 'opacity-40'
                    }`}
                >
                  {/* Step number */}
                  <div className="absolute left-0 w-8 text-xs text-slate-500 text-right pr-2">
                    {idx + 1}
                  </div>

                  {/* Arrow container */}
                  <div
                    className="flex items-center"
                    style={{
                      marginLeft: `calc(${(startCol / participants.length) * 100}% + ${150 * startCol / participants.length}px + 75px)`,
                      width: `calc(${(span / participants.length) * 100}% - 20px)`,
                    }}
                  >
                    <div className={`flex items-center w-full ${isLeftToRight ? '' : 'flex-row-reverse'}`}>
                      {/* Arrow line */}
                      <div className={`flex-1 h-px relative ${step.isAsync ? 'border-t border-dashed' : ''
                        } ${isActive ? 'bg-blue-400 border-blue-400' :
                          isComplete ? 'bg-green-500 border-green-500' :
                            'bg-slate-500 border-slate-500'
                        }`}>
                        {!step.isAsync && (
                          <div className={`absolute inset-0 ${isActive ? 'bg-blue-400' : isComplete ? 'bg-green-500' : 'bg-slate-500'
                            }`} />
                        )}
                      </div>

                      {/* Arrow head */}
                      {isLeftToRight ? (
                        <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-400' : isComplete ? 'text-green-500' : 'text-slate-500'
                          }`} />
                      ) : (
                        <ArrowLeft className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-400' : isComplete ? 'text-green-500' : 'text-slate-500'
                          }`} />
                      )}
                    </div>
                  </div>

                  {/* Label */}
                  <div
                    className="absolute text-xs px-2 py-1 rounded bg-slate-800 border whitespace-nowrap"
                    style={{
                      left: `calc(${((startCol + span / 2) / participants.length) * 100}% + 75px)`,
                      transform: 'translateX(-50%) translateY(-100%)',
                      top: '50%',
                      borderColor: isActive ? '#3b82f6' : isComplete ? '#22c55e' : '#475569',
                    }}
                  >
                    <span className={isActive ? 'text-blue-300' : isComplete ? 'text-green-300' : 'text-slate-400'}>
                      {step.label}
                    </span>
                    {step.isAsync && (
                      <Zap className="w-3 h-3 inline-block ml-1 text-amber-400" />
                    )}
                    {step.isReturn && (
                      <span className="ml-1 text-slate-500">(return)</span>
                    )}
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
