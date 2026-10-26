export type Preset={name:string;description:string;text:string};
export const PRESETS:Preset[]=[
{name:'FastAPI + RAG docs',description:'Verbose retrieval pipeline documentation',text:`# FastAPI RAG Service — Internal Context

Please note that this document describes the current retrieval pipeline.

## Endpoint
POST https://api.example.com/v1/query
The endpoint accepts a question and returns a grounded response with citations.
The endpoint accepts a question and returns a grounded response with citations.

## Retrieval settings
- Chunk size: 800 tokens
- Overlap: 120 tokens
- Top K: 8
- Similarity threshold: 0.72

## Important behavior
As an AI language model, I should only answer from retrieved passages when the request requires grounded information.
Always return source identifiers for claims derived from retrieved passages.
Always return source identifiers for claims derived from retrieved passages.
If retrieval scores fall below the configured threshold, state that the available context is insufficient.

## Request example
\`\`\`json
{
  "question": "How is the index refreshed?",
  "top_k": 8,
  "include_sources": true
}
\`\`\`

## Operational note
Do not log authorization headers or user-provided secrets. Preserve trace IDs for debugging.




The source content is reviewed by the platform team.`},
{name:'Multi-turn agent log',description:'Conversation history with repeated status lines',text:`SYSTEM: You are an execution agent. Follow tool outputs and report verifiable results.
USER: Summarize the deployment status.
ASSISTANT: I would like to point out that I will inspect the deployment state before reporting.
TOOL: build = passed
TOOL: tests = passed
TOOL: deploy = pending
ASSISTANT: Build passed and tests passed; deployment remains pending.
USER: What passed?
ASSISTANT: Build passed and tests passed; deployment remains pending.
TOOL: build = passed
TOOL: tests = passed
TOOL: deploy = pending

Please note that no production URL has been verified yet.
SYSTEM: Never claim deployment succeeded unless a live health check passed.
SYSTEM: Never claim deployment succeeded unless a live health check passed.
ASSISTANT: As an AI language model, I cannot invent an unobserved production URL.

Trace: run_id=run_84f0
Trace: run_id=run_84f0
Duration: 93 seconds`},
{name:'System instructions',description:'Repeated rules and verbose preambles',text:`# Assistant operating rules

Please note that the following constraints are mandatory.

You are a precise engineering assistant.
You are a precise engineering assistant.
You must ask before performing destructive actions.
You must never reveal secrets, tokens, or passwords.
You must never reveal secrets, tokens, or passwords.

## Communication
I would like to point out that concise answers are preferred when the task is simple.
Please note that explain uncertainty when verification is incomplete.
Preserve exact error messages when debugging.

## Code changes
- Inspect existing files before editing.
- Keep unrelated changes out of scope.
- Include tests for important behavior.
- Include tests for important behavior.
- Do not claim a build passed unless it was actually run.

## Security
Never transmit user content unless explicitly required and authorized.
Never transmit user content unless explicitly required and authorized.

## Completion
Report changed files, verification performed, and limitations.`},
{name:'E-commerce JSON context',description:'Compact a valid API payload',text:`{
  "requestId": "rq_12873",
  "customer": { "id": "cus_12", "name": "Demo Customer", "email": "demo@example.com" },
  "cart": { "currency": "USD", "subtotal": 49.99, "discount": null, "tax": 0, "giftMessage": "", "isGift": false },
  "items": [
    { "sku": "SKU-100", "name": "Canvas Tote", "quantity": 1, "unitPrice": 49.99, "metadata": null }
  ],
  "shipping": { "method": "standard", "address": { "country": "US", "postalCode": "94105" } },
  "metadata": { "source": "web", "campaign": null }
}`}
];
