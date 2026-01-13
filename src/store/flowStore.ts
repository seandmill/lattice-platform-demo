import { create } from 'zustand'
import type { LatticeNode, LatticeEdge, FlowStep, BreadcrumbItem, RequestPayload, SequenceStep, FlowStatus } from '../types'
import { diagramRegistry } from '../data/diagramRegistry'

interface FlowState {
  currentLevel: string
  nodes: LatticeNode[]
  edges: LatticeEdge[]
  sequenceSteps: SequenceStep[]
  breadcrumbs: BreadcrumbItem[]
  showSequenceDiagram: boolean
  isPlaying: boolean
  playbackSpeed: number
  currentStepIndex: number
  flowSteps: FlowStep[]
  selectedNodeId: string | null
  selectedEdgeId: string | null
  inspectorPayload: RequestPayload | null
  setCurrentLevel: (levelId: string) => void
  drillDown: (nodeId: string) => void
  navigateToBreadcrumb: (index: number) => void
  toggleSequenceDiagram: () => void
  play: () => void
  pause: () => void
  reset: () => void
  stepForward: () => void
  stepBackward: () => void
  setPlaybackSpeed: (speed: number) => void
  advanceStep: () => void
  selectNode: (nodeId: string | null) => void
  selectEdge: (edgeId: string | null) => void
  setInspectorPayload: (payload: RequestPayload | null) => void
  updateNodeStatus: (nodeId: string, status: FlowStatus) => void
  updateEdgeStatus: (edgeId: string, status: FlowStatus) => void
}

export const useFlowStore = create<FlowState>((set, get) => ({
  currentLevel: 'high_level',
  nodes: diagramRegistry['high_level'].nodes,
  edges: diagramRegistry['high_level'].edges,
  sequenceSteps: diagramRegistry['high_level'].sequenceSteps || [],

  breadcrumbs: [{ id: 'high_level', label: 'Lattice Platform', level: 'high_level' }],
  showSequenceDiagram: false,

  isPlaying: false,
  playbackSpeed: 1,
  currentStepIndex: -1,
  flowSteps: [],

  selectedNodeId: null,
  selectedEdgeId: null,
  inspectorPayload: null,

  setCurrentLevel: (levelId: string) => {
    const diagram = diagramRegistry[levelId]
    if (diagram) {
      set({
        currentLevel: levelId,
        nodes: diagram.nodes,
        edges: diagram.edges,
        sequenceSteps: diagram.sequenceSteps || [],
        currentStepIndex: -1,
        isPlaying: false,
      })
    }
  },

  drillDown: (nodeId: string) => {
    const { nodes, breadcrumbs } = get()
    const node = nodes.find(n => n.id === nodeId)

    if (node?.data.canDrillDown && node.data.drillDownTarget) {
      const targetLevel = node.data.drillDownTarget
      const diagram = diagramRegistry[targetLevel]

      if (diagram) {
        // Reset all node statuses before drilling down
        const resetNodes = diagram.nodes.map(n => ({
          ...n,
          data: { ...n.data, status: 'idle' as const }
        }))
        const resetEdges = diagram.edges.map(e => ({
          ...e,
          data: { ...e.data, status: 'idle' as const }
        }))

        set({
          currentLevel: targetLevel,
          nodes: resetNodes,
          edges: resetEdges,
          sequenceSteps: diagram.sequenceSteps || [],
          breadcrumbs: [...breadcrumbs, { id: targetLevel, label: diagram.name, level: targetLevel }],
          currentStepIndex: -1,
          isPlaying: false,
          showSequenceDiagram: false,
          selectedNodeId: null,
          selectedEdgeId: null,
        })
      }
    }
  },

  navigateToBreadcrumb: (index: number) => {
    const { breadcrumbs } = get()
    if (index < breadcrumbs.length) {
      const targetBreadcrumb = breadcrumbs[index]
      const diagram = diagramRegistry[targetBreadcrumb.level]

      if (diagram) {
        const resetNodes = diagram.nodes.map(n => ({
          ...n,
          data: { ...n.data, status: 'idle' as const }
        }))
        const resetEdges = diagram.edges.map(e => ({
          ...e,
          data: { ...e.data, status: 'idle' as const }
        }))

        set({
          currentLevel: targetBreadcrumb.level,
          nodes: resetNodes,
          edges: resetEdges,
          sequenceSteps: diagram.sequenceSteps || [],
          breadcrumbs: breadcrumbs.slice(0, index + 1),
          currentStepIndex: -1,
          isPlaying: false,
          showSequenceDiagram: false,
          selectedNodeId: null,
          selectedEdgeId: null,
        })
      }
    }
  },

  toggleSequenceDiagram: () => {
    set(state => ({ showSequenceDiagram: !state.showSequenceDiagram }))
  },

  play: () => {
    set({ isPlaying: true })
  },

  pause: () => {
    set({ isPlaying: false })
  },

  reset: () => {
    const { currentLevel } = get()
    const diagram = diagramRegistry[currentLevel]

    if (diagram) {
      const resetNodes = diagram.nodes.map(n => ({
        ...n,
        data: { ...n.data, status: 'idle' as const }
      }))
      const resetEdges = diagram.edges.map(e => ({
        ...e,
        data: { ...e.data, status: 'idle' as const }
      }))

      set({
        nodes: resetNodes,
        edges: resetEdges,
        currentStepIndex: -1,
        isPlaying: false,
        selectedNodeId: null,
        selectedEdgeId: null,
        inspectorPayload: null,
      })
    }
  },

  stepForward: () => {
    const { currentStepIndex, sequenceSteps, nodes, edges } = get()
    const nextIndex = currentStepIndex + 1

    if (nextIndex < sequenceSteps.length) {
      const step = sequenceSteps[nextIndex]

      // Update node and edge statuses
      const updatedNodes = nodes.map(n => ({
        ...n,
        data: {
          ...n.data,
          status: (n.id === step.from || n.id === step.to) ? 'active' as const :
            n.data.status === 'active' ? 'complete' as const : n.data.status
        }
      }))

      const edgeId = `${step.from}-${step.to}`
      const reverseEdgeId = `${step.to}-${step.from}`
      const updatedEdges = edges.map(e => ({
        ...e,
        data: {
          ...e.data,
          status: (e.id === edgeId || e.id === reverseEdgeId) ? 'active' as const :
            e.data?.status === 'active' ? 'complete' as const : e.data?.status || 'idle' as const
        }
      }))

      set({
        currentStepIndex: nextIndex,
        nodes: updatedNodes,
        edges: updatedEdges,
        inspectorPayload: step.payload || null,
      })
    } else {
      set({ isPlaying: false })
    }
  },

  stepBackward: () => {
    const { currentStepIndex } = get()
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 })
    }
  },

  setPlaybackSpeed: (speed: number) => {
    set({ playbackSpeed: speed })
  },

  advanceStep: () => {
    get().stepForward()
  },

  selectNode: (nodeId: string | null) => {
    const { nodes } = get()
    const node = nodes.find(n => n.id === nodeId)
    set({
      selectedNodeId: nodeId,
      selectedEdgeId: null,
      inspectorPayload: node?.data.payload || null,
    })
  },

  selectEdge: (edgeId: string | null) => {
    const { edges } = get()
    const edge = edges.find(e => e.id === edgeId)
    set({
      selectedEdgeId: edgeId,
      selectedNodeId: null,
      inspectorPayload: edge?.data?.payload || null,
    })
  },

  setInspectorPayload: (payload: RequestPayload | null) => {
    set({ inspectorPayload: payload })
  },

  updateNodeStatus: (nodeId: string, status: FlowStatus) => {
    set(state => ({
      nodes: state.nodes.map(n =>
        n.id === nodeId ? { ...n, data: { ...n.data, status } } : n
      )
    }))
  },

  updateEdgeStatus: (edgeId: string, status: FlowStatus) => {
    set(state => ({
      edges: state.edges.map(e =>
        e.id === edgeId ? { ...e, data: { ...e.data, status } } : e
      )
    }))
  },
}))
