---
name: context-diet
description: Stop the agent reading the whole monorepo to change a label. Flags 20+ files, src/** globs, and cat of lockfiles. Triggers: context diet, too many files, don't dump the repo, context window.
license: MIT
metadata:
  author: Jaysi88
  version: "1.0.0"
  repo: https://github.com/Jaysi88/agent-armor
---

# Context diet

A button label is not a reason to ingest `src/`.

Default budget: 12 paths. Lockfiles, dist, and node_modules never count as needed.

```bash
node skills/context-diet/scripts/scan.mjs reads.md
```
