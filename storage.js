// storage.js — chrome.storage helpers

export async function getPreferredMirror() {
  const { preferredMirror } = await chrome.storage.local.get("preferredMirror");
  return preferredMirror || null;
}

export async function setPreferredMirror(url) {
  await chrome.storage.local.set({ preferredMirror: url });
}