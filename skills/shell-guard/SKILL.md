---
name: shell-guard
description: Block destructive shell unless the user asked this turn. Flags rm -rf, curl|sh, sudo, git push --force, DROP TABLE, chmod 777, mkfs. Triggers: shell guard, don't rm, dangerous command, force push.
license: MIT
metadata:
  author: Jaysi88
  version: "1.0.0"
  repo: https://github.com/Jaysi88/agent-armor
---

# Shell guard

Drafting `rm -rf` is a finding. Running it without yes this turn is a fire.

```bash
node skills/shell-guard/scripts/scan.mjs plan.sh
```

BLOCK → do not execute. Ask.
