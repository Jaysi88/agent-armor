#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const file = resolve(args.find((a) => !a.startsWith("--")) ?? "run.json");
if (!existsSync(file)) { console.error("missing run card"); process.exit(2); }
let row;
try { row = JSON.parse(readFileSync(file, "utf8")); }
catch { console.error("not JSON"); process.exit(2); }
const holes = [];
if (!(Number(row.maxCalls) > 0 && Number(row.maxCalls) <= 100)) holes.push("maxCalls must be 1-100");
if (!(Number(row.maxUsd) > 0 && Number(row.maxUsd) <= 50)) holes.push("maxUsd must be 0-50");
if (!row.stopPhrase || !/stop/i.test(String(row.stopPhrase))) holes.push("stopPhrase must include STOP");
if (row.callsMade != null && Number(row.callsMade) > Number(row.maxCalls)) holes.push("callsMade exceeds maxCalls");
if (jsonMode) process.stdout.write(JSON.stringify({ holes }, null, 2) + "\n");
else {
  console.log("## Bill cap");
  console.log(`- Status: ${holes.length ? "BLOCK" : "PASS"}`);
  for (const h of holes) console.log(`- ${h}`);
}
process.exit(holes.length ? 1 : 0);
