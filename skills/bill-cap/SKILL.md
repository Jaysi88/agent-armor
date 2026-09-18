---
name: bill-cap
description: Require a max tool-call count, max USD, and STOP phrase before a long agent or automation loop. Triggers: bill cap, token budget, this session is expensive, stop spending, cost cap.
license: MIT
metadata:
  author: Jaysi88
  version: "1.0.0"
  repo: https://github.com/Jaysi88/agent-armor
---

# Bill cap

Unbounded loops are how a quick fix becomes $47.

Required in the run card:

| Field | Example |
| --- | --- |
| maxCalls | 20 |
| maxUsd | 2 |
| stopPhrase | STOP SPEND |

```bash
node skills/bill-cap/scripts/scan.mjs run.json
```
