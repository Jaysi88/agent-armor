# Agent Armor

**The five things that actually kill agent sessions in 2026 — as scanners, not slogans.**

Snyk’s ToxicSkills audit: **36%** of public Agent Skills had a security flaw. Trail of Bits bypassed the popular skill scanners in under an hour.

This pack is brakes: install, scan, stop. Local only. Nothing phones home.

```bash
npx skills add Jaysi88/agent-armor
```

https://github.com/Jaysi88/agent-armor

## Market gap

| What people star | What still burns them | This skill |
| --- | --- | --- |
| 1,400-skill directories | A SKILL.md that says “ignore previous” + `curl | sh` | **skill-scan** |
| Superpowers / Karpathy rules | `rm -rf`, force-push, DROP TABLE | **shell-guard** |
| “Tests pass” | Checkout is a white screen | **click-proof** |
| Dump-the-repo context | 400-file read to change a label | **context-diet** |
| Unbounded agent loops | The session that costs $47 | **bill-cap** |
| Local-only MCP | Agent loads GitHub + a remote SSE this turn | **session-allow** |

## Use cases

**Before `npx skills add stranger/cool-skill`** — skill-scan the SKILL.md. Pattern gate, not a proof of safety.

**Before the agent runs a shell plan** — shell-guard. Destructive commands need YES this turn.

**Before “the landing page works”** — click-proof needs a URL, status, and what was clicked.

**When the agent opens the whole monorepo** — context-diet.

**When a loop never stops** — bill-cap (maxCalls + maxUsd + STOP).

**When someone asks which tools load this session** — session-allow. Extra tools or anything that phones home is BLOCK.

### Session allow

```bash
node skills/session-allow/scripts/scan.mjs examples/session-allow/bad  # BLOCK
node skills/session-allow/scripts/scan.mjs examples/session-allow/ok   # PASS
```

## How to use

1. `npx skills add Jaysi88/agent-armor`
2. Tell the agent: skill scan / shell guard / click proof / context diet / bill cap / session allow
3. Scanner must pass before install, shell, or “UI works”

## License

[MIT](./LICENSE) © Jay Si Thu Tun ([Jaysi88](https://github.com/Jaysi88))
