
import { PING_TIMEOUT, MIRRORS } from "./consts.js";


export async function pingMirror(mirrorUrl, timeoutMs = PING_TIMEOUT) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const t0 = Date.now();
  try {
    await fetch(mirrorUrl, { method: "HEAD", signal: controller.signal, mode: "no-cors" });
    return { alive: true, latency: Date.now() - t0 };
  } catch {
    return { alive: false, latency: Infinity };
  } finally {
    clearTimeout(timer);
  }
}


export async function pingAllMirrors() {
  const results = await Promise.all(
    MIRRORS.map(async m => [m.url, await pingMirror(m.url)])
  );
  return new Map(results);
}