import type { DiagramLevel } from '../types'
import { highLevelNodes, highLevelEdges, highLevelSequence } from './highLevelDiagram'
import { 
  aiGatewayNodes, aiGatewayEdges, aiGatewaySequence,
  orchestrationNodes, orchestrationEdges, orchestrationSequence,
  contextBuilderNodes, contextBuilderEdges, contextBuilderSequence,
  toolGatewayNodes, toolGatewayEdges, toolGatewaySequence,
  modelGatewayNodes, modelGatewayEdges, modelGatewaySequence,
} from './componentDiagrams'

export const diagramRegistry: Record<string, DiagramLevel> = {
  high_level: {
    id: 'high_level',
    name: 'Lattice Platform',
    description: 'Level 2 Architecture Overview',
    nodes: highLevelNodes,
    edges: highLevelEdges,
    sequenceSteps: highLevelSequence,
  },
  ai_gateway_component: {
    id: 'ai_gateway_component',
    name: 'AI Gateway',
    description: 'Auth, session management, telemetry, response contract',
    nodes: aiGatewayNodes,
    edges: aiGatewayEdges,
    sequenceSteps: aiGatewaySequence,
  },
  orchestration_component: {
    id: 'orchestration_component',
    name: 'Orchestration Engine',
    description: 'Agent Runtime / Workflow Executor',
    nodes: orchestrationNodes,
    edges: orchestrationEdges,
    sequenceSteps: orchestrationSequence,
  },
  context_builder_component: {
    id: 'context_builder_component',
    name: 'Context Builder',
    description: 'Retrieval, citations, redaction',
    nodes: contextBuilderNodes,
    edges: contextBuilderEdges,
    sequenceSteps: contextBuilderSequence,
  },
  tool_gateway_component: {
    id: 'tool_gateway_component',
    name: 'Tool Gateway',
    description: 'RBAC, deterministic tools, audit',
    nodes: toolGatewayNodes,
    edges: toolGatewayEdges,
    sequenceSteps: toolGatewaySequence,
  },
  model_gateway_component: {
    id: 'model_gateway_component',
    name: 'Model Gateway',
    description: 'Routing, cost controls, model isolation',
    nodes: modelGatewayNodes,
    edges: modelGatewayEdges,
    sequenceSteps: modelGatewaySequence,
  },
}
