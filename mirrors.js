
import { PING_TIMEOUT, MIRRORS } from "./consts.js";


export async function pingMirror(mirrorUrl, timeoutMs = PING_TIMEOUT) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(mirrorUrl, { method: "HEAD", signal: controller.signal, mode: "no-cors" });
    return true;
  } catch {
    return false;
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