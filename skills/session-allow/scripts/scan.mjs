#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const dir = resolve(args.find((a) => !a.startsWith("--")) ?? ".");
const allowPath = join(dir, "allow.json");
const loadedPath = join(dir, "loaded.json");

function load(p) {
  if (!existsSync(p)) return null;
  try { return JSON.parse(readFileSync(p, "utf8")); }
  catch { return null; }
}

const holes = [];
const allowDoc = load(allowPath);
const loadedDoc = load(loadedPath);
if (!allowDoc) holes.push("missing allow.json");
if (!loadedDoc) holes.push("missing loaded.json");

const allow = (allowDoc?.allow ?? []).map((t) => String(t).toLowerCase());
const loaded = (loadedDoc?.tools ?? loadedDoc?.mcp ?? []).map((t) => String(t));
const localOnly = allowDoc?.localOnly !== false;
const remote = /https?:\/\/(?!127\.0\.0\.1|localhost\b)|sse:\/\//i;

if (allowDoc && allow.length === 0 && loaded.length) holes.push("allow list is empty while tools are loaded");
if (allow.includes("*") || allow.includes("any")) holes.push("allow must name tools, not *");

for (const tool of loaded) {
  const key = tool.toLowerCase();
  const named = allow.some((a) => key === a || key.includes(a) || a.includes(key));
  if (!named) holes.push(`extra tool not on allowlist: ${tool}`);
  if (localOnly && remote.test(tool)) holes.push(`phones home: ${tool}`);
}

if (jsonMode) process.stdout.write(JSON.stringify({ holes, allow, loaded }, null, 2) + "\n");
else {
  console.log("## Session allow");
  console.log(`- Status: ${holes.length ? "BLOCK" : "PASS"}`);
  console.log(`- localOnly: ${localOnly}`);
  console.log(`- allow: ${allow.join(", ") || "(none)"}`);
  console.log(`- loaded: ${loaded.join(", ") || "(none)"}`);
  for (const h of holes) console.log(`- ${h}`);
}
process.exit(holes.length ? 1 : 0);
