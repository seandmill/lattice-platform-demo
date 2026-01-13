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
        department: 'compliance',
        clearanceLevel: 'standard',
        dataScopes: ['pii_masked', 'financial_read'],
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
        { id: 'cit-1', text: 'Per regulation 12 CFR 1026.35...', source: 'doc-001' },
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
          'Unusual transaction pattern detected',
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
        { id: 'cit-1', text: 'Per regulation 12 CFR 1026.35...', source: 'Compliance Guidelines v2.3' },
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
}
