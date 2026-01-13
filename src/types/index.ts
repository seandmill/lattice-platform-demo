import type { Node, Edge } from '@xyflow/react'

export type ComponentType =
    | 'experience'
    | 'control'
    | 'runtime'
    | 'ingestion'
    | 'data'
    | 'model'
    | 'service'
    | 'database'
    | 'external'

export type FlowStatus = 'idle' | 'active' | 'complete' | 'error' | 'pending'

export interface LatticeNodeData {
    label: string
    description?: string
    componentType: ComponentType
    status: FlowStatus
    canDrillDown: boolean
    drillDownTarget?: string
    isAsync?: boolean
    payload?: RequestPayload
    [key: string]: unknown
}

export interface LatticeEdgeData {
    label?: string
    isAsync?: boolean
    status: FlowStatus
    payload?: RequestPayload
    [key: string]: unknown
}

export type LatticeNode = Node<LatticeNodeData>
export type LatticeEdge = Edge<LatticeEdgeData>

export interface RequestPayload {
    timestamp: string
    direction: 'request' | 'response'
    method?: string
    endpoint?: string
    headers?: Record<string, string>
    body?: unknown
    latency?: number
}

export interface DiagramLevel {
    id: string
    name: string
    description: string
    nodes: LatticeNode[]
    edges: LatticeEdge[]
    sequenceSteps?: SequenceStep[]
}

export interface SequenceStep {
    id: string
    from: string
    to: string
    label: string
    description?: string
    payload?: RequestPayload
    isReturn?: boolean
    isAsync?: boolean
}

export interface FlowStep {
    nodeId: string
    edgeId?: string
    timestamp: number
    payload?: RequestPayload
    asyncTasks?: AsyncTask[]
}

export interface AsyncTask {
    id: string
    name: string
    status: FlowStatus
    startTime: number
    endTime?: number
}

export interface BreadcrumbItem {
    id: string
    label: string
    level: string
}
