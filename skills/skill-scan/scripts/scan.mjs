#!/usr/bin/env node
import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const target = resolve(args.find((a) => !a.startsWith("--")) ?? ".");
const RULES = [
  { id: "ignore-prev", re: /ignore (?:all )?(?:previous|prior|above) instructions/i },
  { id: "system-impersonate", re: /you are now (?:in )?(?:developer|god|unrestricted|jailbreak) mode/i },
  { id: "curl-sh", re: /curl[^\n]{0,80}\|\s*(?:ba)?sh|wget[^\n]{0,80}\|\s*(?:ba)?sh/i },
  { id: "env-exfil", re: /process\.env|\$[A-Z_]*(?:API_KEY|TOKEN|SECRET|PASSWORD)|exfiltrat/i },
  { id: "base64-blob", re: /atob\s*\(|Buffer\.from\([^)]*base64|base64,/i },
  { id: "phone-home", re: /phones? home|sse:\/\/|mcp\.[^\s]+\/sse|remote[ -]?mcp|ngrok|webhook.*http/i },
  { id: "hidden-url", re: /https?:\/\/(?:[^\s]*\.(?:ngrok|trycloudflare|duckdns)|[0-9]{1,3}(?:\.[0-9]{1,3}){3})/i },
];

function files(p) {
  if (!existsSync(p)) return [];
  if (statSync(p).isFile()) return [p];
  return readdirSync(p, { withFileTypes: true }).flatMap((e) => {
    const q = join(p, e.name);
    if (e.isDirectory()) return files(q);
    if (/\.(md|mjs|js|sh|txt)$/i.test(e.name)) return [q];
    return [];
  });
}

const hits = [];
for (const file of files(target)) {
  const body = readFileSync(file, "utf8");
  const lines = body.split("\n");
  for (const r of RULES) {
    lines.forEach((line, i) => {
      if (r.re.test(line)) hits.push({ file, line: i + 1, id: r.id, claim: line.trim().slice(0, 100) });
    });
  }
}
if (jsonMode) process.stdout.write(JSON.stringify({ hits }, null, 2) + "\n");
else {
  console.log("## Skill scan");
  console.log(`- Status: ${hits.length ? "BLOCK" : "PASS"}`);
  console.log("- Note: PASS is not a security proof. Novel injection will slip through.");
  for (const h of hits) console.log(`- [${h.id}] ${h.file}:${h.line}  ${h.claim}`);
}
process.exit(hits.length ? 1 : 0);
