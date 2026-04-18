
export async function getCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url) throw new Error("No URL on active tab");
    return tab;
  } catch (err) {
    console.error("tabs.getCurrentTab failed:", err);
    return null;
  }
}

export function openArchive(mirrorBase, pageUrl) {
  chrome.tabs.create({ url: buildArchiveUrl(mirrorBase, pageUrl) });
}

export function buildArchiveUrl(mirrorBase, pageUrl) {
  return mirrorBase + "/?run=1&url=" + encodeURIComponent(pageUrl);
}