export const samplePayloads = {
  turnRequest: {
    timestamp: new Date().toISOString(),
    direction: 'request' as const,
    method: 'POST',
    endpoint: '/v1/ai/turn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJS...',
      'X-Correlation-Id': 'req-abc123',
    },
    body: {
      sessionId: 'sess-xyz789',
      surface: 'review_workbench',
      intent: 'analyze_case',
      input: {
        caseId: 'CASE-2024-001',
        query: 'Summarize the key findings and risk indicators for this case',
      },
    },
  },
  authResponse: {
    timestamp: new Date().toISOString(),
    direction: 'response' as const,
    latency: 45,
    body: {
      userId: 'user-123',
      roles: ['reviewer', 'analyst'],
      claims: {
        department: 'operations',
        clearanceLevel: 'standard',
        dataScopes: ['pii_masked', 'records_read'],
      },
    },
  },
  policyResponse: {
    timestamp: new Date().toISOString(),
    direction: 'response' as const,
    latency: 32,
    body: {
      decision: 'allow',
      constraints: {
        hitlRequired: false,
        maxContextTokens: 8000,
        modelClass: 'gpt-4-turbo',
        toolsAllowlist: ['case_lookup', 'document_search', 'risk_calculator'],
        dataRedaction: ['ssn', 'account_numbers'],
      },
    },
  },
  contextPackage: {
    timestamp: new Date().toISOString(),
    direction: 'response' as const,
    latency: 156,
    body: {
      chunks: 12,
      totalTokens: 4250,
      sources: [
        { type: 'vector', docId: 'doc-001', relevance: 0.94 },
        { type: 'keyword', docId: 'doc-003', relevance: 0.87 },
        { type: 'knowledge', factId: 'fact-112', relevance: 0.91 },
      ],
      citations: [
        { id: 'cit-1', text: 'Per policy guidelines section 4.2...', source: 'doc-001' },
        { id: 'cit-2', text: 'Risk threshold exceeded when...', source: 'doc-003' },
      ],
      redactedFields: ['ssn', 'account_number'],
    },
  },
  modelResponse: {
    timestamp: new Date().toISOString(),
    direction: 'response' as const,
    latency: 2340,
    body: {
      model: 'gpt-4-turbo',
      tokens: { prompt: 4250, completion: 856 },
      response: {
        summary: 'Case CASE-2024-001 shows elevated risk indicators...',
        riskScore: 0.73,
        keyFindings: [
          'Unusual pattern detected in records',
          'Documentation gaps in verification',
          'Prior similar case escalated',
        ],
        recommendedActions: ['escalate_review', 'request_documentation'],
        citations: ['cit-1', 'cit-2'],
      },
      safetyFlags: { blocked: false, categories: [] },
    },
  },
  finalResponse: {
    timestamp: new Date().toISOString(),
    direction: 'response' as const,
    latency: 2680,
    body: {
      correlationId: 'req-abc123',
      status: 'success',
      response: {
        text: 'Based on my analysis of Case CASE-2024-001...',
        riskScore: 0.73,
        confidence: 0.89,
      },
      citations: [
        { id: 'cit-1', text: 'Per policy guidelines section 4.2...', source: 'Operations Guide v2.3' },
      ],
      actions: [
        { type: 'escalate', label: 'Escalate for Review', enabled: true },
        { type: 'document', label: 'Request Documents', enabled: true },
      ],
      nextStep: 'await_user_action',
      metadata: {
        tokensUsed: 5106,
        modelCost: 0.0847,
        processingTimeMs: 2680,
      },
    },
  },

  // MCP Tool Call - shows the wire format for tool invocation
  mcpToolCall: {
    timestamp: new Date().toISOString(),
    direction: 'request' as const,
    method: 'POST',
    endpoint: '/mcp',
    headers: {
      'Content-Type': 'application/json',
      'X-MCP-Server': 'domain-tools',
      'X-Idempotency-Key': 'idem-tg-001',
    },
    body: {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: 'case_lookup',
        arguments: {
          caseId: 'CASE-2024-001',
          fields: ['status', 'riskScore', 'documents', 'timeline'],
        },
      },
      id: 'req-tg-001',
    },
  },

  // MCP Tool Response
  mcpToolResponse: {
    timestamp: new Date().toISOString(),
    direction: 'response' as const,
    latency: 89,
    body: {
      jsonrpc: '2.0',
      result: {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              caseId: 'CASE-2024-001',
              status: 'under_review',
              riskScore: 0.73,
              documents: [
                { id: 'doc-001', type: 'primary_document', status: 'verified' },
                { id: 'doc-002', type: 'supporting_evidence', status: 'pending' },
              ],
              timeline: [
                { event: 'submitted', timestamp: '2024-01-10T09:00:00Z' },
                { event: 'assigned', timestamp: '2024-01-10T09:15:00Z' },
              ],
            }),
          },
        ],
        isError: false,
      },
      id: 'req-tg-001',
    },
  },

  // Tool Registry Entry - what a registered tool looks like
  toolRegistryEntry: {
    timestamp: new Date().toISOString(),
    direction: 'response' as const,
    latency: 12,
    body: {
      tool: {
        name: 'case_lookup',
        version: '1.2.0',
        owner: 'platform-team',
        description: 'Retrieves case data from the system of record',
        mcp: {
          server: 'domain-tools-mcp',
          endpoint: 'http://domain-tools:8080/mcp',
        },
        inputSchema: {
          type: 'object',
          properties: {
            caseId: { type: 'string', description: 'The unique case identifier' },
            fields: { type: 'array', items: { type: 'string' }, description: 'Fields to retrieve' },
          },
          required: ['caseId'],
        },
        outputSchema: {
          type: 'object',
          properties: {
            caseId: { type: 'string' },
            status: { type: 'string' },
            riskScore: { type: 'number' },
            documents: { type: 'array' },
          },
        },
        riskTier: 'low',
        requiredScopes: {
          data: ['cases:read', 'documents:read'],
          actions: ['lookup'],
        },
        requiredRoles: ['reviewer', 'analyst', 'processor'],
        idempotent: true,
        timeoutMs: 5000,
        retryPolicy: { maxRetries: 3, backoffMs: 100 },
      },
    },
  },

  // Workflow Registry Entry - what a registered workflow looks like
  workflowRegistryEntry: {
    timestamp: new Date().toISOString(),
    direction: 'response' as const,
    latency: 8,
    body: {
      workflow: {
        id: 'case_analysis_v2',
        version: '2.1.0',
        owner: 'ops-workbench',
        description: 'Generate a case analysis with evidence and recommended actions',
        steps: [
          { id: 'retrieve_case', type: 'tool', tool: 'case_lookup', required: true },
          { id: 'fetch_documents', type: 'tool', tool: 'document_search', required: true },
          { id: 'build_context', type: 'context', sources: ['vector', 'knowledge'], maxTokens: 4000 },
          { id: 'generate_summary', type: 'model', modelClass: 'gpt-4-turbo', outputSchema: 'CaseAnalysis' },
          { id: 'human_review', type: 'hitl', condition: 'output.riskScore > 0.8 || output.confidence < 0.7' },
        ],
        allowedTools: ['case_lookup', 'document_search', 'risk_calculator', 'escalation_draft'],
        constraints: {
          maxTokenBudget: 8000,
          maxToolCalls: 10,
          timeoutMs: 30000,
        },
        plannerMode: 'hybrid',
        evalSuiteId: 'eval-case-analysis-v2',
        goldenDataset: 'gs://lattice-evals/case-analysis/golden-v2.jsonl',
      },
    },
  },
}
