#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const file = resolve(args.find((a) => !a.startsWith("--")) ?? "receipt.json");
const NEED = ["url", "status", "action", "excerpt"];
if (!existsSync(file)) { console.error("missing receipt"); process.exit(2); }
let data;
try { data = JSON.parse(readFileSync(file, "utf8")); }
catch { console.error("not JSON"); process.exit(2); }
const rows = Array.isArray(data) ? data : [data];
const holes = [];
rows.forEach((row, i) => {
  for (const k of NEED) if (!row[k] && row[k] !== 0) holes.push({ i, why: `missing ${k}` });
  if (row.url && !/^https?:\/\//i.test(String(row.url))) holes.push({ i, why: "url is not http(s)" });
  if (row.status && !(Number(row.status) >= 200 && Number(row.status) < 400)) holes.push({ i, why: `status ${row.status}` });
  if (row.action && /probably|looks fine|should work/i.test(String(row.action))) holes.push({ i, why: "action is a vibe" });
});
if (jsonMode) process.stdout.write(JSON.stringify({ holes }, null, 2) + "\n");
else {
  console.log("## Click proof");
  console.log(`- Status: ${holes.length ? "BLOCK" : "PASS"}`);
  for (const h of holes) console.log(`- [${h.i}] ${h.why}`);
}
process.exit(holes.length ? 1 : 0);
