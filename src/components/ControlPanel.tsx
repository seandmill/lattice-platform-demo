import { Play, Pause, RotateCcw, SkipForward, SkipBack, GitBranch, List } from 'lucide-react'
import { useFlowStore } from '../store/flowStore'

export function ControlPanel() {
  const { 
    isPlaying, 
    play, 
    pause, 
    reset, 
    stepForward, 
    stepBackward,
    playbackSpeed, 
    setPlaybackSpeed,
    currentStepIndex,
    sequenceSteps,
    showSequenceDiagram,
    toggleSequenceDiagram,
  } = useFlowStore()

  const progress = sequenceSteps.length > 0 
    ? ((currentStepIndex + 1) / sequenceSteps.length) * 100 
    : 0

  return (
    <div className="bg-lattice-dark border-t border-slate-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button
              onClick={stepBackward}
              disabled={currentStepIndex <= 0}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Previous Step"
            >
              <SkipBack className="w-4 h-4 text-white" />
            </button>
            
            <button
              onClick={isPlaying ? pause : play}
              className={`p-3 rounded-lg transition-colors ${
                isPlaying 
                  ? 'bg-amber-600 hover:bg-amber-500' 
                  : 'bg-blue-600 hover:bg-blue-500'
              }`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            
            <button
              onClick={stepForward}
              disabled={currentStepIndex >= sequenceSteps.length - 1}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Next Step"
            >
              <SkipForward className="w-4 h-4 text-white" />
            </button>
            
            <button
              onClick={reset}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors ml-2"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Speed:</span>
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>

        <div className="flex-1 mx-8">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 min-w-[60px]">
              Step {currentStepIndex + 1} / {sequenceSteps.length}
            </span>
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-slate-500 min-w-[40px] text-right">
              {Math.round(progress)}%
            </span>
          </div>
          {sequenceSteps[currentStepIndex] && (
            <p className="text-xs text-slate-400 mt-1 text-center truncate">
              {sequenceSteps[currentStepIndex].label}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSequenceDiagram}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              showSequenceDiagram 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            title="Toggle Sequence Diagram"
          >
            {showSequenceDiagram ? (
              <>
                <GitBranch className="w-4 h-4" />
                <span className="text-sm">Component View</span>
              </>
            ) : (
              <>
                <List className="w-4 h-4" />
                <span className="text-sm">Sequence View</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
