# Security

`skill-scan` is a **local pattern gate**, not Snyk and not Trail of Bits.
It will miss novel injection. It will catch the junk that still ships: ignore-previous, curl|sh, env dumps, base64 blobs in SKILL.md.

Never paste secret values into issues.
