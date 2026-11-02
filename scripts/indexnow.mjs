#!/usr/bin/env node
/*
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver) that pages changed, so they
 * recrawl within hours instead of weeks. Run it after a production deploy:
 *
 *   npm run indexnow                      every URL in the live sitemap
 *   npm run indexnow -- /insights/x /bg   only these paths
 *
 * The key file in public/ proves ownership; its name and content are the key.
 */
import { readdirSync } from "node:fs";

const SITE = "https://orryvelle.com";
const keyFile = readdirSync(new URL("../public/", import.meta.url)).find((name) => /^[a-f0-9]{32}\.txt$/.test(name));
if (!keyFile) throw new Error("No IndexNow key file (32 hex characters + .txt) in public/.");
const key = keyFile.replace(".txt", "");

const paths = process.argv.slice(2);
const urls = paths.length
  ? paths.map((path) => `${SITE}${path === "/" ? "" : path}`)
  : [...(await (await fetch(`${SITE}/sitemap.xml`)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (!urls.length) throw new Error("No URLs to submit; is the sitemap live?");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation: `${SITE}/${keyFile}`, urlList: urls }),
});

// 200 and 202 both mean accepted; 403 means the key file isn't reachable on the live site yet.
console.log(`IndexNow: ${response.status} ${response.statusText} for ${urls.length} URLs`);
if (response.status >= 300) process.exitCode = 1;
