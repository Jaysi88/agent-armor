---
name: session-allow
description: Pick which local tools load this session. Allowlist only. Remote MCP, SSE, and anything that phones home is BLOCK. Use before connecting MCP or loading extra skills. Triggers: session allow, which tools load, local only mcp, allowlist, don't phone home.
license: MIT
metadata:
  author: Jaysi88
  version: "1.0.0"
  repo: https://github.com/Jaysi88/agent-armor
---

# Session allow

skill-scan gates the **file**. This gates the **session**.

The agent may only load tools named in `allow.json`. `localOnly: true` means no http/sse MCP.

## Files

`allow.json` — what this turn is allowed to load:

```json
{ "localOnly": true, "allow": ["read", "grep", "glob", "filesystem"] }
```

`loaded.json` — what the agent actually attached:

```json
{ "tools": ["read", "grep"] }
```

```bash
node skills/session-allow/scripts/scan.mjs examples/session-allow/ok
```

BLOCK → do not start the session. Shrink the tool list.
