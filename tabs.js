
import { t } from "./i18n.js";

export async function getCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url) throw new Error(t("errNoTab"));
    return tab;
  } catch (err) {
    return null;
  }
}

export function openArchive(mirrorBase, pageUrl) {
  chrome.tabs.create({ url: buildArchiveUrl(mirrorBase, pageUrl) });
}

export function buildArchiveUrl(mirrorBase, pageUrl) {
  return mirrorBase + "/?run=1&url=" + encodeURIComponent(pageUrl);
}