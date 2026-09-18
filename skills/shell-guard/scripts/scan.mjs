#!/usr/bin/env node
import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const target = resolve(args.find((a) => !a.startsWith("--")) ?? ".");
const DANGER = [
  { id: "rm-rf", re: /\brm\s+-[^\n]*r[^\n]*f|\brm\s+-[^\n]*f[^\n]*r/ },
  { id: "curl-sh", re: /curl[^\n]{0,80}\|\s*(?:ba)?sh|wget[^\n]{0,80}\|\s*(?:ba)?sh/i },
  { id: "sudo", re: /\bsudo\b/ },
  { id: "force-push", re: /git\s+push[^\n]*--force|git\s+push[^\n]*-f\b/ },
  { id: "drop", re: /\bDROP\s+(TABLE|DATABASE|SCHEMA)\b/i },
  { id: "chmod-777", re: /chmod\s+(-R\s+)?0?777\b/ },
  { id: "mkfs", re: /\bmkfs\b|\bdd\s+if=/ },
];
const YES = /\b(yes(?:\s+delete|\s+run|\s+do it)?|USER CONFIRMED)\b/i;

function files(p) {
  if (!existsSync(p)) return [];
  if (statSync(p).isFile()) return [p];
  return readdirSync(p, { withFileTypes: true }).flatMap((e) => {
    const q = join(p, e.name);
    return e.isDirectory() ? files(q) : /\.(sh|md|txt|bash)$/i.test(e.name) ? [q] : [];
  });
}

const hits = [];
for (const file of files(target)) {
  const body = readFileSync(file, "utf8");
  const ok = YES.test(body);
  body.split("\n").forEach((line, i) => {
    for (const d of DANGER) {
      if (d.re.test(line) && !ok) hits.push({ file, line: i + 1, id: d.id, claim: line.trim().slice(0, 100) });
    }
  });
}
if (jsonMode) process.stdout.write(JSON.stringify({ hits }, null, 2) + "\n");
else {
  console.log("## Shell guard");
  console.log(`- Status: ${hits.length ? "BLOCK" : "PASS"}`);
  for (const h of hits) console.log(`- [${h.id}] ${h.file}:${h.line}  ${h.claim}`);
}
process.exit(hits.length ? 1 : 0);
