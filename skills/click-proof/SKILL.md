---
name: click-proof
description: Block "the UI works" without a browser receipt. Need url, status, action (clicked/typed), and excerpt. Use for landing pages, checkout, vibe coding. Triggers: click proof, did you open the page, screenshot, playwright receipt.
license: MIT
metadata:
  author: Jaysi88
  version: "1.0.0"
  repo: https://github.com/Jaysi88/agent-armor
---

# Click proof

Unit tests are not a click. A receipt is a real URL, a status, and what was clicked this turn.

## Required JSON

```json
{ "url": "http://127.0.0.1:8080", "status": 200, "action": "clicked Start", "excerpt": "hero heading visible" }
```

```bash
node skills/click-proof/scripts/scan.mjs receipt.json
```
