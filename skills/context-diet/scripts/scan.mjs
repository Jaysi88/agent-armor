#!/usr/bin/env node
import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const target = resolve(args.find((a) => !a.startsWith("--")) ?? ".");
const BUDGET = 12;
const GLOBS = /\b(src\/\*\*|app\/\*\*|read the whole (?:repo|codebase)|cat (?:package-lock|pnpm-lock|yarn.lock))/i;
const PATHS = /(?:^|\s)((?:[\w.-]+\/){1,8}[\w.-]+\.[\w]+)(?:\s|$)/g;

function files(p) {
  if (!existsSync(p)) return [];
  if (statSync(p).isFile()) return [p];
  return readdirSync(p, { withFileTypes: true }).flatMap((e) => {
    const q = join(p, e.name);
    return e.isDirectory() ? files(q) : /\.(md|txt)$/i.test(e.name) ? [q] : [];
  });
}

const hits = [];
for (const file of files(target)) {
  const body = readFileSync(file, "utf8");
  if (GLOBS.test(body)) hits.push({ file, why: "glutton glob or lockfile dump" });
  const found = [...body.matchAll(PATHS)].map((m) => m[1]);
  if (found.length > BUDGET) hits.push({ file, why: `${found.length} paths > budget ${BUDGET}` });
}
if (jsonMode) process.stdout.write(JSON.stringify({ hits }, null, 2) + "\n");
else {
  console.log("## Context diet");
  console.log(`- Status: ${hits.length ? "BLOCK" : "PASS"}`);
  for (const h of hits) console.log(`- ${h.file}  ${h.why}`);
}
process.exit(hits.length ? 1 : 0);
