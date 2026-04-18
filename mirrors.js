
export const MIRRORS = [
  { label: "archive.today", url: "https://archive.today" },
  { label: "archive.ph",    url: "https://archive.ph"    },
  { label: "archive.is",    url: "https://archive.is"    },
  { label: "archive.li",    url: "https://archive.li"    },
  { label: "archive.vn",    url: "https://archive.vn"    },
  { label: "archive.fo",    url: "https://archive.fo"    },
  { label: "archive.md",    url: "https://archive.md"    },
];


export async function pingMirror(mirrorUrl, timeoutMs = 3000) {
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