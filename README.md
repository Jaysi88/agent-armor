# Agent Armor

**The five things that actually kill agent sessions in 2026 — as scanners, not slogans.**

Snyk’s ToxicSkills audit: **36%** of public Agent Skills had a security flaw. Trail of Bits bypassed the popular skill scanners in under an hour. Superpowers is a methodology. Frontend-design is taste.

This pack is brakes: install, scan, stop.

```bash
npx skills add Jaysi88/agent-armor
```

https://github.com/Jaysi88/agent-armor

## Market gap (why these five, not another awesome list)

| What people star | What still burns them | This skill |
| --- | --- | --- |
| 1,400-skill directories | A SKILL.md that says “ignore previous” + `curl | sh` | **skill-scan** |
| Superpowers / Karpathy rules | `rm -rf`, force-push, DROP TABLE in the same turn | **shell-guard** |
| “Tests pass” | Checkout is a white screen | **click-proof** |
| Dump-the-repo context | 400-file read to change a button label | **context-diet** |
| Unbounded agent loops | The session that costs $47 | **bill-cap** |

## Use cases

**Before `npx skills add stranger/cool-skill`** — run skill-scan on the SKILL.md. Pattern gate, not a proof of safety.

**Before the agent runs a shell plan** — shell-guard the transcript. Destructive commands need the user to have asked for them **this turn**.

**Before “the landing page works”** — click-proof needs a browser receipt (URL + status + what was clicked). Unit tests are not a click.

**When the agent opens the whole monorepo** — context-diet flags glutton reads.

**When a Grok automation or coding agent loops** — bill-cap requires max tool-calls / max USD / a STOP phrase.

## The five

### 1/ Skill Scan
```bash
node skills/skill-scan/scripts/scan.mjs examples/skill-scan/bad.md   # BLOCK
node skills/skill-scan/scripts/scan.mjs examples/skill-scan/ok.md    # PASS
```

### 2/ Shell Guard
```bash
node skills/shell-guard/scripts/scan.mjs examples/shell-guard/bad.sh  # BLOCK
node skills/shell-guard/scripts/scan.mjs examples/shell-guard/ok.sh   # PASS
```

### 3/ Click Proof
```bash
node skills/click-proof/scripts/scan.mjs examples/click-proof/fake.json  # BLOCK
node skills/click-proof/scripts/scan.mjs examples/click-proof/ok.json    # PASS
```

### 4/ Context Diet
```bash
node skills/context-diet/scripts/scan.mjs examples/context-diet/glutton.md  # BLOCK
node skills/context-diet/scripts/scan.mjs examples/context-diet/ok.md       # PASS
```

### 5/ Bill Cap
```bash
node skills/bill-cap/scripts/scan.mjs examples/bill-cap/runaway.json  # BLOCK
node skills/bill-cap/scripts/scan.mjs examples/bill-cap/ok.json       # PASS
```

## How to use

1. `npx skills add Jaysi88/agent-armor`
2. Tell the agent: skill scan / shell guard / click proof / context diet / bill cap
3. Scanner must pass before install, shell, “UI works”, or another tool loop

Fits next to [agent-contract](https://github.com/Jaysi88/agent-contract) (behavior) and [ghost-check](https://github.com/Jaysi88/ghost-check) (phantom code).

## License

[MIT](./LICENSE) © Jay Si Thu Tun ([Jaysi88](https://github.com/Jaysi88))
