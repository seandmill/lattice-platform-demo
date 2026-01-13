import type { LatticeNode, LatticeEdge, SequenceStep } from '../types'
import { samplePayloads } from './payloads'

export const highLevelNodes: LatticeNode[] = [
  // Experience Plane
  { id: 'exp_plane', type: 'group', position: { x: 0, y: 0 }, style: { width: 820, height: 120 }, data: { label: 'Experience Plane', componentType: 'experience', status: 'idle', canDrillDown: false } },
  { id: 'review_workbench', position: { x: 20, y: 45 }, parentId: 'exp_plane', extent: 'parent', data: { label: 'Review Workbench', componentType: 'experience', status: 'idle', canDrillDown: false } },
  { id: 'ops_console', position: { x: 210, y: 45 }, parentId: 'exp_plane', extent: 'parent', data: { label: 'Ops Console', componentType: 'experience', status: 'idle', canDrillDown: false } },
  { id: 'customer_portal', position: { x: 400, y: 45 }, parentId: 'exp_plane', extent: 'parent', data: { label: 'Customer Portal', componentType: 'experience', status: 'idle', canDrillDown: false } },
  { id: 'dev_tools', position: { x: 600, y: 45 }, parentId: 'exp_plane', extent: 'parent', data: { label: 'Developer Tools', componentType: 'experience', status: 'idle', canDrillDown: false } },

  // Control Plane
  { id: 'ctrl_plane', type: 'group', position: { x: 870, y: 0 }, style: { width: 450, height: 290 }, data: { label: 'Control Plane', componentType: 'control', status: 'idle', canDrillDown: false } },
  { id: 'identity_rbac', position: { x: 20, y: 45 }, parentId: 'ctrl_plane', extent: 'parent', data: { label: 'Identity + RBAC', componentType: 'control', status: 'idle', canDrillDown: false } },
  { id: 'policy_engine', position: { x: 230, y: 45 }, parentId: 'ctrl_plane', extent: 'parent', data: { label: 'Policy Engine', componentType: 'control', status: 'idle', canDrillDown: false } },
  { id: 'tool_registry', position: { x: 20, y: 115 }, parentId: 'ctrl_plane', extent: 'parent', data: { label: 'Tool Registry', componentType: 'control', status: 'idle', canDrillDown: false } },
  { id: 'workflow_registry', position: { x: 230, y: 115 }, parentId: 'ctrl_plane', extent: 'parent', data: { label: 'Workflow Registry', componentType: 'control', status: 'idle', canDrillDown: false } },
  { id: 'eval_gates', position: { x: 20, y: 185 }, parentId: 'ctrl_plane', extent: 'parent', data: { label: 'Eval + Release Gates', componentType: 'control', status: 'idle', canDrillDown: false } },
  { id: 'secrets_mgmt', position: { x: 230, y: 185 }, parentId: 'ctrl_plane', extent: 'parent', data: { label: 'Secrets Management', componentType: 'control', status: 'idle', canDrillDown: false } },

  // Runtime Plane
  { id: 'runtime_plane', type: 'group', position: { x: 0, y: 160 }, style: { width: 820, height: 360 }, data: { label: 'Runtime Plane', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'ai_gateway', position: { x: 300, y: 45 }, parentId: 'runtime_plane', extent: 'parent', data: { label: 'AI Gateway', componentType: 'runtime', status: 'idle', canDrillDown: true, drillDownTarget: 'ai_gateway_component' } },
  { id: 'orchestration_engine', position: { x: 280, y: 125 }, parentId: 'runtime_plane', extent: 'parent', data: { label: 'Orchestration Engine', componentType: 'runtime', status: 'idle', canDrillDown: true, drillDownTarget: 'orchestration_component' } },
  { id: 'context_builder', position: { x: 20, y: 210 }, parentId: 'runtime_plane', extent: 'parent', data: { label: 'Context Builder', componentType: 'runtime', status: 'idle', canDrillDown: true, drillDownTarget: 'context_builder_component' } },
  { id: 'tool_gateway', position: { x: 280, y: 210 }, parentId: 'runtime_plane', extent: 'parent', data: { label: 'Tool Gateway', componentType: 'runtime', status: 'idle', canDrillDown: true, drillDownTarget: 'tool_gateway_component' } },
  { id: 'model_gateway', position: { x: 560, y: 210 }, parentId: 'runtime_plane', extent: 'parent', data: { label: 'Model Gateway', componentType: 'runtime', status: 'idle', canDrillDown: true, drillDownTarget: 'model_gateway_component' } },
  { id: 'hitl', position: { x: 560, y: 125 }, parentId: 'runtime_plane', extent: 'parent', data: { label: 'Human-in-the-Loop', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'session_store', position: { x: 20, y: 125 }, parentId: 'runtime_plane', extent: 'parent', data: { label: 'Session State Store', componentType: 'database', status: 'idle', canDrillDown: false } },
  { id: 'observability', position: { x: 20, y: 295 }, parentId: 'runtime_plane', extent: 'parent', data: { label: 'Observability', componentType: 'service', status: 'idle', canDrillDown: false, isAsync: true } },
  { id: 'audit_log', position: { x: 280, y: 295 }, parentId: 'runtime_plane', extent: 'parent', data: { label: 'Audit Log', componentType: 'service', status: 'idle', canDrillDown: false, isAsync: true } },

  // Data Plane
  { id: 'data_plane', type: 'group', position: { x: 0, y: 560 }, style: { width: 820, height: 155 }, data: { label: 'Data Plane', componentType: 'data', status: 'idle', canDrillDown: false } },
  { id: 'systems_of_record', position: { x: 20, y: 45 }, parentId: 'data_plane', extent: 'parent', data: { label: 'Systems of Record', componentType: 'database', status: 'idle', canDrillDown: false } },
  { id: 'document_store', position: { x: 210, y: 45 }, parentId: 'data_plane', extent: 'parent', data: { label: 'Document Store', componentType: 'database', status: 'idle', canDrillDown: false } },
  { id: 'search_index', position: { x: 400, y: 45 }, parentId: 'data_plane', extent: 'parent', data: { label: 'Search Index', componentType: 'database', status: 'idle', canDrillDown: false } },
  { id: 'vector_index', position: { x: 210, y: 105 }, parentId: 'data_plane', extent: 'parent', data: { label: 'Vector Index', componentType: 'database', status: 'idle', canDrillDown: false } },
  { id: 'knowledge_store', position: { x: 400, y: 105 }, parentId: 'data_plane', extent: 'parent', data: { label: 'Knowledge Store', componentType: 'database', status: 'idle', canDrillDown: false } },
  { id: 'telemetry_store', position: { x: 600, y: 45 }, parentId: 'data_plane', extent: 'parent', data: { label: 'Telemetry Store', componentType: 'database', status: 'idle', canDrillDown: false } },

  // Model Runtime
  { id: 'model_plane', type: 'group', position: { x: 870, y: 340 }, style: { width: 450, height: 140 }, data: { label: 'Model Runtime', componentType: 'model', status: 'idle', canDrillDown: false } },
  { id: 'approved_models', position: { x: 20, y: 55 }, parentId: 'model_plane', extent: 'parent', data: { label: 'Approved Model Endpoints', componentType: 'model', status: 'idle', canDrillDown: false } },
  { id: 'specialized_models', position: { x: 260, y: 55 }, parentId: 'model_plane', extent: 'parent', data: { label: 'Specialized Models', componentType: 'model', status: 'idle', canDrillDown: false } },
]

export const highLevelEdges: LatticeEdge[] = [
  { id: 'review_workbench-ai_gateway', source: 'review_workbench', target: 'ai_gateway', data: { status: 'idle' } },
  { id: 'ops_console-ai_gateway', source: 'ops_console', target: 'ai_gateway', data: { status: 'idle' } },
  { id: 'customer_portal-ai_gateway', source: 'customer_portal', target: 'ai_gateway', data: { status: 'idle' } },
  { id: 'dev_tools-ai_gateway', source: 'dev_tools', target: 'ai_gateway', data: { status: 'idle' } },
  { id: 'ai_gateway-identity_rbac', source: 'ai_gateway', target: 'identity_rbac', data: { status: 'idle' } },
  { id: 'ai_gateway-policy_engine', source: 'ai_gateway', target: 'policy_engine', data: { status: 'idle' } },
  { id: 'ai_gateway-workflow_registry', source: 'ai_gateway', target: 'workflow_registry', data: { status: 'idle' } },
  { id: 'ai_gateway-orchestration_engine', source: 'ai_gateway', target: 'orchestration_engine', animated: true, data: { status: 'idle', label: 'start run' } },
  { id: 'orchestration_engine-session_store', source: 'orchestration_engine', target: 'session_store', data: { status: 'idle' } },
  { id: 'orchestration_engine-context_builder', source: 'orchestration_engine', target: 'context_builder', data: { status: 'idle' } },
  { id: 'orchestration_engine-tool_gateway', source: 'orchestration_engine', target: 'tool_gateway', data: { status: 'idle' } },
  { id: 'orchestration_engine-model_gateway', source: 'orchestration_engine', target: 'model_gateway', data: { status: 'idle' } },
  { id: 'orchestration_engine-hitl', source: 'orchestration_engine', target: 'hitl', data: { status: 'idle' } },
  { id: 'context_builder-search_index', source: 'context_builder', target: 'search_index', data: { status: 'idle' } },
  { id: 'context_builder-vector_index', source: 'context_builder', target: 'vector_index', data: { status: 'idle' } },
  { id: 'context_builder-knowledge_store', source: 'context_builder', target: 'knowledge_store', data: { status: 'idle' } },
  { id: 'tool_gateway-systems_of_record', source: 'tool_gateway', target: 'systems_of_record', data: { status: 'idle' } },
  { id: 'tool_gateway-document_store', source: 'tool_gateway', target: 'document_store', data: { status: 'idle' } },
  { id: 'model_gateway-approved_models', source: 'model_gateway', target: 'approved_models', data: { status: 'idle' } },
  { id: 'model_gateway-specialized_models', source: 'model_gateway', target: 'specialized_models', data: { status: 'idle' } },
  { id: 'ai_gateway-observability', source: 'ai_gateway', target: 'observability', style: { strokeDasharray: '5,5' }, data: { status: 'idle', isAsync: true } },
  { id: 'orchestration_engine-observability', source: 'orchestration_engine', target: 'observability', style: { strokeDasharray: '5,5' }, data: { status: 'idle', isAsync: true } },
  { id: 'ai_gateway-audit_log', source: 'ai_gateway', target: 'audit_log', style: { strokeDasharray: '5,5' }, data: { status: 'idle', isAsync: true } },
  { id: 'ai_gateway-telemetry_store', source: 'ai_gateway', target: 'telemetry_store', style: { strokeDasharray: '5,5' }, data: { status: 'idle', isAsync: true } },
]

export const highLevelSequence: SequenceStep[] = [
  { id: 'step1', from: 'review_workbench', to: 'ai_gateway', label: 'POST /v1/ai/turn', payload: samplePayloads.turnRequest },
  { id: 'step2', from: 'ai_gateway', to: 'identity_rbac', label: 'Validate token + roles' },
  { id: 'step3', from: 'identity_rbac', to: 'ai_gateway', label: 'roles/claims', isReturn: true, payload: samplePayloads.authResponse },
  { id: 'step4', from: 'ai_gateway', to: 'policy_engine', label: 'Evaluate policy' },
  { id: 'step5', from: 'policy_engine', to: 'ai_gateway', label: 'allow + constraints', isReturn: true, payload: samplePayloads.policyResponse },
  { id: 'step6', from: 'ai_gateway', to: 'workflow_registry', label: 'Resolve workflow' },
  { id: 'step7', from: 'workflow_registry', to: 'ai_gateway', label: 'workflowId + version', isReturn: true },
  { id: 'step8', from: 'ai_gateway', to: 'orchestration_engine', label: 'Start run' },
  { id: 'step9', from: 'orchestration_engine', to: 'session_store', label: 'Load session state' },
  { id: 'step10', from: 'orchestration_engine', to: 'context_builder', label: 'Build context' },
  { id: 'step11', from: 'context_builder', to: 'vector_index', label: 'Semantic search' },
  { id: 'step12', from: 'context_builder', to: 'knowledge_store', label: 'Retrieve facts' },
  { id: 'step13', from: 'context_builder', to: 'orchestration_engine', label: 'Context package', isReturn: true, payload: samplePayloads.contextPackage },
  { id: 'step14', from: 'orchestration_engine', to: 'tool_gateway', label: 'Call tools' },
  { id: 'step15', from: 'tool_gateway', to: 'systems_of_record', label: 'Fetch case data' },
  { id: 'step16', from: 'tool_gateway', to: 'orchestration_engine', label: 'Tool results', isReturn: true },
  { id: 'step17', from: 'orchestration_engine', to: 'model_gateway', label: 'Generate response' },
  { id: 'step18', from: 'model_gateway', to: 'approved_models', label: 'Inference request' },
  { id: 'step19', from: 'approved_models', to: 'model_gateway', label: 'Model output', isReturn: true },
  { id: 'step20', from: 'model_gateway', to: 'orchestration_engine', label: 'Structured response', isReturn: true, payload: samplePayloads.modelResponse },
  { id: 'step21', from: 'orchestration_engine', to: 'ai_gateway', label: 'Result', isReturn: true },
  { id: 'step22', from: 'ai_gateway', to: 'audit_log', label: 'Write audit events', isAsync: true },
  { id: 'step23', from: 'ai_gateway', to: 'observability', label: 'Emit metrics', isAsync: true },
  { id: 'step24', from: 'ai_gateway', to: 'review_workbench', label: '200 OK', isReturn: true, payload: samplePayloads.finalResponse },
]
