import { useCallback, useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from '@xyflow/react'
import { useFlowStore } from '../store/flowStore'
import { LatticeNode as LatticeNodeComponent } from './nodes/LatticeNode'
import { LatticeGroupNode } from './nodes/LatticeGroupNode'
import type { LatticeNode, LatticeEdge } from '../types'

const nodeTypes = {
  default: LatticeNodeComponent,
  group: LatticeGroupNode,
}

export function FlowCanvas() {
  const { nodes: storeNodes, edges: storeEdges, drillDown, selectNode, isPlaying, playbackSpeed, advanceStep } = useFlowStore()

  const [nodes, setNodes, onNodesChange] = useNodesState<LatticeNode>(storeNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<LatticeEdge>(storeEdges)

  useEffect(() => {
    setNodes(storeNodes)
    setEdges(storeEdges)
  }, [storeNodes, storeEdges, setNodes, setEdges])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      advanceStep()
    }, 1500 / playbackSpeed)

    return () => clearInterval(interval)
  }, [isPlaying, playbackSpeed, advanceStep])

  const onNodeClick = useCallback((_: React.MouseEvent, node: any) => {
    selectNode(node.id)
    if (node.data?.canDrillDown) {
      drillDown(node.id)
    }
  }, [drillDown, selectNode])

  const getEdgeStyle = useCallback((edge: any) => {
    const status = edge.data?.status || 'idle'
    const isAsync = edge.data?.isAsync

    const baseStyle: React.CSSProperties = {
      strokeWidth: 2,
      stroke: status === 'active' ? '#3b82f6' : status === 'complete' ? '#22c55e' : '#475569',
    }

    if (isAsync) {
      baseStyle.strokeDasharray = '5,5'
    }

    return baseStyle
  }, [])

  const styledEdges = edges.map(edge => ({
    ...edge,
    style: getEdgeStyle(edge),
    animated: edge.data?.status === 'active',
  }))

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={styledEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1e293b" />
        <Controls className="!bg-slate-800 !border-slate-700 !rounded-lg [&>button]:!bg-slate-700 [&>button]:!border-slate-600 [&>button]:!text-white [&>button:hover]:!bg-slate-600" />
        <MiniMap
          className="!bg-slate-900 !border-slate-700 !rounded-lg"
          nodeColor={(node) => {
            const type = node.data?.componentType as string
            switch (type) {
              case 'experience': return '#3b82f6'
              case 'control': return '#9ca3af'
              case 'runtime': return '#22c55e'
              case 'data': return '#f59e0b'
              case 'model': return '#8b5cf6'
              case 'database': return '#f59e0b'
              case 'service': return '#60a5fa'
              default: return '#475569'
            }
          }}
          maskColor="rgba(0, 0, 0, 0.8)"
        />
      </ReactFlow>
    </div>
  )
}
