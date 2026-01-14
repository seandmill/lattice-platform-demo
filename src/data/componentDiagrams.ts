import type { LatticeNode, LatticeEdge, SequenceStep } from '../types'
import { samplePayloads } from './payloads'

// AI Gateway Component Diagram
export const aiGatewayNodes: LatticeNode[] = [
  { id: 'callers_group', type: 'group', position: { x: 0, y: 0 }, style: { width: 450, height: 80, backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: 8 }, data: { label: 'Experience Plane', componentType: 'experience', status: 'idle', canDrillDown: false } },
  { id: 'review_wb', position: { x: 20, y: 30 }, parentId: 'callers_group', extent: 'parent', data: { label: 'Review Workbench', componentType: 'experience', status: 'idle', canDrillDown: false } },
  { id: 'ops_con', position: { x: 170, y: 30 }, parentId: 'callers_group', extent: 'parent', data: { label: 'Ops Console', componentType: 'experience', status: 'idle', canDrillDown: false } },
  { id: 'cust_portal', position: { x: 310, y: 30 }, parentId: 'callers_group', extent: 'parent', data: { label: 'Customer Portal', componentType: 'experience', status: 'idle', canDrillDown: false } },
  { id: 'gw_group', type: 'group', position: { x: 0, y: 120 }, style: { width: 700, height: 280, backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: 8 }, data: { label: 'AI Gateway (Runtime Plane)', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'api_surface', position: { x: 280, y: 30 }, parentId: 'gw_group', extent: 'parent', data: { label: 'API Surface', description: 'REST/SSE/gRPC', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'auth_rbac', position: { x: 20, y: 100 }, parentId: 'gw_group', extent: 'parent', data: { label: 'Auth + RBAC', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'request_validation', position: { x: 170, y: 100 }, parentId: 'gw_group', extent: 'parent', data: { label: 'Request Validation', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'policy_adapter', position: { x: 340, y: 100 }, parentId: 'gw_group', extent: 'parent', data: { label: 'Policy Adapter', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'workflow_router', position: { x: 510, y: 100 }, parentId: 'gw_group', extent: 'parent', data: { label: 'Workflow Router', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'session_manager', position: { x: 20, y: 170 }, parentId: 'gw_group', extent: 'parent', data: { label: 'Session Manager', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'response_normalizer', position: { x: 170, y: 170 }, parentId: 'gw_group', extent: 'parent', data: { label: 'Response Normalizer', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'rate_limiter', position: { x: 340, y: 170 }, parentId: 'gw_group', extent: 'parent', data: { label: 'Rate Limiter + Quotas', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'telemetry_exporter', position: { x: 20, y: 230 }, parentId: 'gw_group', extent: 'parent', data: { label: 'Telemetry Exporter', componentType: 'service', status: 'idle', canDrillDown: false, isAsync: true } },
  { id: 'audit_writer', position: { x: 170, y: 230 }, parentId: 'gw_group', extent: 'parent', data: { label: 'Audit Writer', componentType: 'service', status: 'idle', canDrillDown: false, isAsync: true } },
  { id: 'platform_group', type: 'group', position: { x: 0, y: 440 }, style: { width: 700, height: 100, backgroundColor: 'rgba(156, 163, 175, 0.1)', borderRadius: 8 }, data: { label: 'Platform Services', componentType: 'control', status: 'idle', canDrillDown: false } },
  { id: 'policy_engine_svc', position: { x: 20, y: 40 }, parentId: 'platform_group', extent: 'parent', data: { label: 'Policy Engine', componentType: 'control', status: 'idle', canDrillDown: false } },
  { id: 'workflow_registry_svc', position: { x: 170, y: 40 }, parentId: 'platform_group', extent: 'parent', data: { label: 'Workflow Registry', componentType: 'control', status: 'idle', canDrillDown: false, payload: samplePayloads.workflowRegistryEntry } },
  { id: 'orch_engine_svc', position: { x: 320, y: 40 }, parentId: 'platform_group', extent: 'parent', data: { label: 'Orchestration Engine', componentType: 'runtime', status: 'idle', canDrillDown: true, drillDownTarget: 'orchestration_component' } },
  { id: 'session_store_svc', position: { x: 480, y: 40 }, parentId: 'platform_group', extent: 'parent', data: { label: 'Session Store', componentType: 'database', status: 'idle', canDrillDown: false } },
]

export const aiGatewayEdges: LatticeEdge[] = [
  { id: 'review_wb-api_surface', source: 'review_wb', target: 'api_surface', data: { status: 'idle' } },
  { id: 'ops_con-api_surface', source: 'ops_con', target: 'api_surface', data: { status: 'idle' } },
  { id: 'cust_portal-api_surface', source: 'cust_portal', target: 'api_surface', data: { status: 'idle' } },
  { id: 'api_surface-auth_rbac', source: 'api_surface', target: 'auth_rbac', data: { status: 'idle' } },
  { id: 'api_surface-request_validation', source: 'api_surface', target: 'request_validation', data: { status: 'idle' } },
  { id: 'api_surface-rate_limiter', source: 'api_surface', target: 'rate_limiter', data: { status: 'idle' } },
  { id: 'api_surface-policy_adapter', source: 'api_surface', target: 'policy_adapter', data: { status: 'idle' } },
  { id: 'api_surface-workflow_router', source: 'api_surface', target: 'workflow_router', data: { status: 'idle' } },
  { id: 'api_surface-response_normalizer', source: 'api_surface', target: 'response_normalizer', data: { status: 'idle' } },
  { id: 'api_surface-telemetry_exporter', source: 'api_surface', target: 'telemetry_exporter', style: { strokeDasharray: '5,5' }, data: { status: 'idle', isAsync: true } },
  { id: 'api_surface-audit_writer', source: 'api_surface', target: 'audit_writer', style: { strokeDasharray: '5,5' }, data: { status: 'idle', isAsync: true } },
  { id: 'policy_adapter-policy_engine_svc', source: 'policy_adapter', target: 'policy_engine_svc', data: { status: 'idle' } },
  { id: 'workflow_router-workflow_registry_svc', source: 'workflow_router', target: 'workflow_registry_svc', data: { status: 'idle' } },
  { id: 'workflow_router-orch_engine_svc', source: 'workflow_router', target: 'orch_engine_svc', data: { status: 'idle' } },
  { id: 'session_manager-session_store_svc', source: 'session_manager', target: 'session_store_svc', data: { status: 'idle' } },
]

export const aiGatewaySequence: SequenceStep[] = [
  { id: 'gw1', from: 'review_wb', to: 'api_surface', label: 'POST /v1/ai/turn', payload: samplePayloads.turnRequest },
  { id: 'gw2', from: 'api_surface', to: 'auth_rbac', label: 'Authenticate request' },
  { id: 'gw3', from: 'api_surface', to: 'request_validation', label: 'Validate schema & size' },
  { id: 'gw4', from: 'api_surface', to: 'rate_limiter', label: 'Check quotas' },
  { id: 'gw5', from: 'api_surface', to: 'policy_adapter', label: 'Request policy evaluation' },
  { id: 'gw6', from: 'policy_adapter', to: 'policy_engine_svc', label: 'Evaluate policy' },
  { id: 'gw7', from: 'policy_engine_svc', to: 'policy_adapter', label: 'Policy decision', isReturn: true, payload: samplePayloads.policyResponse },
  { id: 'gw8', from: 'api_surface', to: 'workflow_router', label: 'Route request' },
  { id: 'gw9', from: 'workflow_router', to: 'workflow_registry_svc', label: 'Resolve workflow', payload: samplePayloads.workflowRegistryEntry },
  { id: 'gw10', from: 'workflow_router', to: 'orch_engine_svc', label: 'Start orchestration' },
  { id: 'gw11', from: 'orch_engine_svc', to: 'workflow_router', label: 'Result', isReturn: true },
  { id: 'gw12', from: 'api_surface', to: 'response_normalizer', label: 'Normalize response' },
  { id: 'gw13', from: 'api_surface', to: 'telemetry_exporter', label: 'Export telemetry', isAsync: true },
  { id: 'gw14', from: 'api_surface', to: 'audit_writer', label: 'Write audit log', isAsync: true },
  { id: 'gw15', from: 'api_surface', to: 'review_wb', label: '200 OK Response', isReturn: true, payload: samplePayloads.finalResponse },
]

// Orchestration Engine Component Diagram
export const orchestrationNodes: LatticeNode[] = [
  { id: 'orch_caller', position: { x: 280, y: 0 }, data: { label: 'AI Gateway', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'orch_group', type: 'group', position: { x: 0, y: 80 }, style: { width: 650, height: 250, backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: 8 }, data: { label: 'Orchestration Engine', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'run_controller', position: { x: 250, y: 30 }, parentId: 'orch_group', extent: 'parent', data: { label: 'Run Controller', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'workflow_executor', position: { x: 250, y: 100 }, parentId: 'orch_group', extent: 'parent', data: { label: 'Workflow Executor', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'agent_runtime', position: { x: 20, y: 100 }, parentId: 'orch_group', extent: 'parent', data: { label: 'Agent Runtime', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'prompt_manager', position: { x: 480, y: 100 }, parentId: 'orch_group', extent: 'parent', data: { label: 'Prompt Manager', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'state_manager', position: { x: 20, y: 170 }, parentId: 'orch_group', extent: 'parent', data: { label: 'State Manager', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'tool_dispatcher', position: { x: 250, y: 170 }, parentId: 'orch_group', extent: 'parent', data: { label: 'Tool Dispatcher', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'model_client', position: { x: 480, y: 170 }, parentId: 'orch_group', extent: 'parent', data: { label: 'Model Client', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'orch_session_store', position: { x: 0, y: 370 }, data: { label: 'Session Store', componentType: 'database', status: 'idle', canDrillDown: false } },
  { id: 'orch_context_builder', position: { x: 180, y: 370 }, data: { label: 'Context Builder', componentType: 'runtime', status: 'idle', canDrillDown: true, drillDownTarget: 'context_builder_component' } },
  { id: 'orch_tool_gateway', position: { x: 340, y: 370 }, data: { label: 'Tool Gateway', componentType: 'runtime', status: 'idle', canDrillDown: true, drillDownTarget: 'tool_gateway_component' } },
  { id: 'orch_model_gateway', position: { x: 500, y: 370 }, data: { label: 'Model Gateway', componentType: 'runtime', status: 'idle', canDrillDown: true, drillDownTarget: 'model_gateway_component' } },
]

export const orchestrationEdges: LatticeEdge[] = [
  { id: 'orch_caller-run_controller', source: 'orch_caller', target: 'run_controller', data: { status: 'idle' } },
  { id: 'run_controller-workflow_executor', source: 'run_controller', target: 'workflow_executor', data: { status: 'idle' } },
  { id: 'run_controller-agent_runtime', source: 'run_controller', target: 'agent_runtime', data: { status: 'idle' } },
  { id: 'workflow_executor-prompt_manager', source: 'workflow_executor', target: 'prompt_manager', data: { status: 'idle' } },
  { id: 'agent_runtime-state_manager', source: 'agent_runtime', target: 'state_manager', data: { status: 'idle' } },
  { id: 'workflow_executor-tool_dispatcher', source: 'workflow_executor', target: 'tool_dispatcher', data: { status: 'idle' } },
  { id: 'workflow_executor-model_client', source: 'workflow_executor', target: 'model_client', data: { status: 'idle' } },
  { id: 'state_manager-orch_session_store', source: 'state_manager', target: 'orch_session_store', data: { status: 'idle' } },
  { id: 'agent_runtime-orch_context_builder', source: 'agent_runtime', target: 'orch_context_builder', data: { status: 'idle' } },
  { id: 'tool_dispatcher-orch_tool_gateway', source: 'tool_dispatcher', target: 'orch_tool_gateway', data: { status: 'idle' } },
  { id: 'model_client-orch_model_gateway', source: 'model_client', target: 'orch_model_gateway', data: { status: 'idle' } },
]

export const orchestrationSequence: SequenceStep[] = [
  { id: 'orch1', from: 'orch_caller', to: 'run_controller', label: 'Start run' },
  { id: 'orch2', from: 'run_controller', to: 'workflow_executor', label: 'Execute workflow' },
  { id: 'orch3', from: 'run_controller', to: 'agent_runtime', label: 'Initialize agent' },
  { id: 'orch4', from: 'agent_runtime', to: 'state_manager', label: 'Load state' },
  { id: 'orch5', from: 'state_manager', to: 'orch_session_store', label: 'Fetch session' },
  { id: 'orch6', from: 'agent_runtime', to: 'orch_context_builder', label: 'Build context' },
  { id: 'orch7', from: 'orch_context_builder', to: 'agent_runtime', label: 'Context package', isReturn: true, payload: samplePayloads.contextPackage },
  { id: 'orch8', from: 'workflow_executor', to: 'prompt_manager', label: 'Resolve prompt' },
  { id: 'orch9', from: 'workflow_executor', to: 'tool_dispatcher', label: 'Dispatch tool call' },
  { id: 'orch10', from: 'tool_dispatcher', to: 'orch_tool_gateway', label: 'MCP tools/call', payload: samplePayloads.mcpToolCall },
  { id: 'orch11', from: 'orch_tool_gateway', to: 'tool_dispatcher', label: 'MCP response', isReturn: true, payload: samplePayloads.mcpToolResponse },
  { id: 'orch12', from: 'workflow_executor', to: 'model_client', label: 'Generate response' },
  { id: 'orch13', from: 'model_client', to: 'orch_model_gateway', label: 'Inference' },
  { id: 'orch14', from: 'orch_model_gateway', to: 'model_client', label: 'Model output', isReturn: true, payload: samplePayloads.modelResponse },
]

// Context Builder Component
export const contextBuilderNodes: LatticeNode[] = [
  { id: 'ctx_caller', position: { x: 250, y: 0 }, data: { label: 'Orchestration Engine', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'ctx_group', type: 'group', position: { x: 0, y: 80 }, style: { width: 600, height: 220, backgroundColor: 'rgba(236, 72, 153, 0.1)', borderRadius: 8 }, data: { label: 'Context Builder', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'retrieval_orchestrator', position: { x: 220, y: 30 }, parentId: 'ctx_group', extent: 'parent', data: { label: 'Retrieval Orchestrator', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'semantic_search', position: { x: 20, y: 100 }, parentId: 'ctx_group', extent: 'parent', data: { label: 'Semantic Search', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'keyword_search', position: { x: 180, y: 100 }, parentId: 'ctx_group', extent: 'parent', data: { label: 'Keyword Search', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'knowledge_retriever', position: { x: 340, y: 100 }, parentId: 'ctx_group', extent: 'parent', data: { label: 'Knowledge Retriever', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'reranker', position: { x: 100, y: 160 }, parentId: 'ctx_group', extent: 'parent', data: { label: 'Reranker', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'pii_redactor', position: { x: 260, y: 160 }, parentId: 'ctx_group', extent: 'parent', data: { label: 'PII Redactor', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'citation_builder', position: { x: 420, y: 160 }, parentId: 'ctx_group', extent: 'parent', data: { label: 'Citation Builder', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'ctx_vector_index', position: { x: 20, y: 340 }, data: { label: 'Vector Index', componentType: 'database', status: 'idle', canDrillDown: false } },
  { id: 'ctx_search_index', position: { x: 180, y: 340 }, data: { label: 'Search Index', componentType: 'database', status: 'idle', canDrillDown: false } },
  { id: 'ctx_knowledge_store', position: { x: 340, y: 340 }, data: { label: 'Knowledge Store', componentType: 'database', status: 'idle', canDrillDown: false } },
  { id: 'ctx_document_store', position: { x: 500, y: 340 }, data: { label: 'Document Store', componentType: 'database', status: 'idle', canDrillDown: false } },
]

export const contextBuilderEdges: LatticeEdge[] = [
  { id: 'ctx_caller-retrieval_orchestrator', source: 'ctx_caller', target: 'retrieval_orchestrator', data: { status: 'idle' } },
  { id: 'retrieval_orchestrator-semantic_search', source: 'retrieval_orchestrator', target: 'semantic_search', data: { status: 'idle' } },
  { id: 'retrieval_orchestrator-keyword_search', source: 'retrieval_orchestrator', target: 'keyword_search', data: { status: 'idle' } },
  { id: 'retrieval_orchestrator-knowledge_retriever', source: 'retrieval_orchestrator', target: 'knowledge_retriever', data: { status: 'idle' } },
  { id: 'semantic_search-reranker', source: 'semantic_search', target: 'reranker', data: { status: 'idle' } },
  { id: 'keyword_search-reranker', source: 'keyword_search', target: 'reranker', data: { status: 'idle' } },
  { id: 'reranker-pii_redactor', source: 'reranker', target: 'pii_redactor', data: { status: 'idle' } },
  { id: 'pii_redactor-citation_builder', source: 'pii_redactor', target: 'citation_builder', data: { status: 'idle' } },
  { id: 'semantic_search-ctx_vector_index', source: 'semantic_search', target: 'ctx_vector_index', data: { status: 'idle' } },
  { id: 'keyword_search-ctx_search_index', source: 'keyword_search', target: 'ctx_search_index', data: { status: 'idle' } },
  { id: 'knowledge_retriever-ctx_knowledge_store', source: 'knowledge_retriever', target: 'ctx_knowledge_store', data: { status: 'idle' } },
  { id: 'citation_builder-ctx_document_store', source: 'citation_builder', target: 'ctx_document_store', data: { status: 'idle' } },
]

export const contextBuilderSequence: SequenceStep[] = [
  { id: 'ctx1', from: 'ctx_caller', to: 'retrieval_orchestrator', label: 'Build context request' },
  { id: 'ctx2', from: 'retrieval_orchestrator', to: 'semantic_search', label: 'Vector search', isAsync: true },
  { id: 'ctx3', from: 'retrieval_orchestrator', to: 'keyword_search', label: 'Keyword search', isAsync: true },
  { id: 'ctx4', from: 'retrieval_orchestrator', to: 'knowledge_retriever', label: 'Knowledge lookup', isAsync: true },
  { id: 'ctx5', from: 'semantic_search', to: 'ctx_vector_index', label: 'Query vectors' },
  { id: 'ctx6', from: 'keyword_search', to: 'ctx_search_index', label: 'Query index' },
  { id: 'ctx7', from: 'knowledge_retriever', to: 'ctx_knowledge_store', label: 'Fetch facts' },
  { id: 'ctx8', from: 'semantic_search', to: 'reranker', label: 'Vector results' },
  { id: 'ctx9', from: 'keyword_search', to: 'reranker', label: 'Keyword results' },
  { id: 'ctx10', from: 'reranker', to: 'pii_redactor', label: 'Reranked chunks' },
  { id: 'ctx11', from: 'pii_redactor', to: 'citation_builder', label: 'Redacted content' },
  { id: 'ctx12', from: 'citation_builder', to: 'ctx_document_store', label: 'Fetch source metadata' },
  { id: 'ctx13', from: 'citation_builder', to: 'ctx_caller', label: 'Context package', isReturn: true, payload: samplePayloads.contextPackage },
]

// Tool Gateway Component
export const toolGatewayNodes: LatticeNode[] = [
  { id: 'tg_caller', position: { x: 300, y: 0 }, data: { label: 'Orchestration Engine', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'tg_group', type: 'group', position: { x: 0, y: 80 }, style: { width: 700, height: 180, backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: 8 }, data: { label: 'Tool Gateway', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'tool_router', position: { x: 280, y: 30 }, parentId: 'tg_group', extent: 'parent', data: { label: 'Tool Router', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'tool_auth', position: { x: 20, y: 100 }, parentId: 'tg_group', extent: 'parent', data: { label: 'Tool Auth + RBAC', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'mcp_client', position: { x: 200, y: 100 }, parentId: 'tg_group', extent: 'parent', data: { label: 'MCP Client', componentType: 'runtime', status: 'idle', canDrillDown: false, description: 'JSON-RPC 2.0' } },
  { id: 'tool_executor', position: { x: 380, y: 100 }, parentId: 'tg_group', extent: 'parent', data: { label: 'Tool Executor', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'tool_audit', position: { x: 540, y: 100 }, parentId: 'tg_group', extent: 'parent', data: { label: 'Audit Logger', componentType: 'service', status: 'idle', canDrillDown: false } },
  { id: 'tg_tool_registry', position: { x: 0, y: 300 }, data: { label: 'Tool Registry', componentType: 'control', status: 'idle', canDrillDown: false, payload: samplePayloads.toolRegistryEntry } },
  // MCP Servers group
  { id: 'mcp_servers_group', type: 'group', position: { x: 180, y: 290 }, style: { width: 520, height: 120, backgroundColor: 'rgba(139, 92, 246, 0.1)', borderRadius: 8 }, data: { label: 'Domain MCP Servers', componentType: 'external', status: 'idle', canDrillDown: false } },
  { id: 'mcp_servicing', position: { x: 20, y: 50 }, parentId: 'mcp_servers_group', extent: 'parent', data: { label: 'Cases MCP', componentType: 'external', status: 'idle', canDrillDown: false, description: 'case_lookup' } },
  { id: 'mcp_documents', position: { x: 180, y: 50 }, parentId: 'mcp_servers_group', extent: 'parent', data: { label: 'Documents MCP', componentType: 'external', status: 'idle', canDrillDown: false, description: 'doc_search, doc_fetch' } },
  { id: 'mcp_risk', position: { x: 340, y: 50 }, parentId: 'mcp_servers_group', extent: 'parent', data: { label: 'Analytics MCP', componentType: 'external', status: 'idle', canDrillDown: false, description: 'scoring, calc' } },
]

export const toolGatewayEdges: LatticeEdge[] = [
  { id: 'tg_caller-tool_router', source: 'tg_caller', target: 'tool_router', data: { status: 'idle' } },
  { id: 'tool_router-tool_auth', source: 'tool_router', target: 'tool_auth', data: { status: 'idle' } },
  { id: 'tool_router-mcp_client', source: 'tool_router', target: 'mcp_client', data: { status: 'idle' } },
  { id: 'mcp_client-tool_executor', source: 'mcp_client', target: 'tool_executor', data: { status: 'idle' } },
  { id: 'tool_executor-tool_audit', source: 'tool_executor', target: 'tool_audit', style: { strokeDasharray: '5,5' }, data: { status: 'idle', isAsync: true } },
  { id: 'tool_auth-tg_tool_registry', source: 'tool_auth', target: 'tg_tool_registry', data: { status: 'idle' } },
  // MCP connections to domain servers
  { id: 'mcp_client-mcp_servicing', source: 'mcp_client', target: 'mcp_servicing', data: { status: 'idle', label: 'tools/call' } },
  { id: 'mcp_client-mcp_documents', source: 'mcp_client', target: 'mcp_documents', data: { status: 'idle', label: 'tools/call' } },
  { id: 'mcp_client-mcp_risk', source: 'mcp_client', target: 'mcp_risk', data: { status: 'idle', label: 'tools/call' } },
]

export const toolGatewaySequence: SequenceStep[] = [
  { id: 'tg1', from: 'tg_caller', to: 'tool_router', label: 'Tool call request' },
  { id: 'tg2', from: 'tool_router', to: 'tool_auth', label: 'Authorize tool access' },
  { id: 'tg3', from: 'tool_auth', to: 'tg_tool_registry', label: 'Lookup tool + RBAC', payload: samplePayloads.toolRegistryEntry },
  { id: 'tg4', from: 'tool_router', to: 'mcp_client', label: 'Route to MCP Client' },
  { id: 'tg5', from: 'mcp_client', to: 'mcp_servicing', label: 'MCP tools/call', payload: samplePayloads.mcpToolCall },
  { id: 'tg6', from: 'mcp_servicing', to: 'mcp_client', label: 'MCP response', isReturn: true, payload: samplePayloads.mcpToolResponse },
  { id: 'tg7', from: 'mcp_client', to: 'tool_executor', label: 'Execute result' },
  { id: 'tg8', from: 'tool_executor', to: 'tool_audit', label: 'Emit audit event', isAsync: true },
  { id: 'tg9', from: 'tool_executor', to: 'tg_caller', label: 'Tool result', isReturn: true },
]

// Model Gateway Component
export const modelGatewayNodes: LatticeNode[] = [
  { id: 'mg_caller', position: { x: 250, y: 0 }, data: { label: 'Orchestration Engine', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'mg_group', type: 'group', position: { x: 0, y: 80 }, style: { width: 550, height: 180, backgroundColor: 'rgba(139, 92, 246, 0.1)', borderRadius: 8 }, data: { label: 'Model Gateway', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'model_router', position: { x: 200, y: 30 }, parentId: 'mg_group', extent: 'parent', data: { label: 'Model Router', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'cost_controller', position: { x: 20, y: 100 }, parentId: 'mg_group', extent: 'parent', data: { label: 'Cost Controller', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'model_client_mg', position: { x: 200, y: 100 }, parentId: 'mg_group', extent: 'parent', data: { label: 'Model Client', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'safety_filter', position: { x: 380, y: 100 }, parentId: 'mg_group', extent: 'parent', data: { label: 'Safety Filter', componentType: 'runtime', status: 'idle', canDrillDown: false } },
  { id: 'mg_approved', position: { x: 100, y: 300 }, data: { label: 'Approved Models', componentType: 'model', status: 'idle', canDrillDown: false } },
  { id: 'mg_specialized', position: { x: 300, y: 300 }, data: { label: 'Specialized Models', componentType: 'model', status: 'idle', canDrillDown: false } },
]

export const modelGatewayEdges: LatticeEdge[] = [
  { id: 'mg_caller-model_router', source: 'mg_caller', target: 'model_router', data: { status: 'idle' } },
  { id: 'model_router-cost_controller', source: 'model_router', target: 'cost_controller', data: { status: 'idle' } },
  { id: 'model_router-model_client_mg', source: 'model_router', target: 'model_client_mg', data: { status: 'idle' } },
  { id: 'model_client_mg-safety_filter', source: 'model_client_mg', target: 'safety_filter', data: { status: 'idle' } },
  { id: 'model_client_mg-mg_approved', source: 'model_client_mg', target: 'mg_approved', data: { status: 'idle' } },
  { id: 'model_client_mg-mg_specialized', source: 'model_client_mg', target: 'mg_specialized', data: { status: 'idle' } },
]

export const modelGatewaySequence: SequenceStep[] = [
  { id: 'mg1', from: 'mg_caller', to: 'model_router', label: 'Inference request' },
  { id: 'mg2', from: 'model_router', to: 'cost_controller', label: 'Check budget' },
  { id: 'mg3', from: 'model_router', to: 'model_client_mg', label: 'Route to model' },
  { id: 'mg4', from: 'model_client_mg', to: 'mg_approved', label: 'Call model API' },
  { id: 'mg5', from: 'mg_approved', to: 'model_client_mg', label: 'Raw response', isReturn: true },
  { id: 'mg6', from: 'model_client_mg', to: 'safety_filter', label: 'Filter output' },
  { id: 'mg7', from: 'safety_filter', to: 'mg_caller', label: 'Safe response', isReturn: true, payload: samplePayloads.modelResponse },
]
