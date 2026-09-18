---
name: skill-scan
description: Scan a SKILL.md before installing. Flags ignore-previous, curl|sh, env dumps, base64 blobs, hidden URLs. Use before npx skills add, ClawHub, or copying a stranger's skill. Triggers: skill scan, is this skill safe, toxic skills, prompt injection in skill.
license: MIT
metadata:
  author: Jaysi88
  version: "1.0.0"
  repo: https://github.com/Jaysi88/agent-armor
---

# Skill scan

Snyk found a security flaw in **36%** of public skills. This is a local pattern gate — not a proof of safety. Fail = do not install.

```bash
node skills/skill-scan/scripts/scan.mjs path/to/SKILL.md
```

BLOCK → do not `npx skills add`.
