
import { MIRRORS } from "./consts.js";
import { getPreferredMirror } from "./storage.js";
import { buildArchiveUrl } from "./tabs.js";
import { t } from "./i18n.js";


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "archive-page",
    title: t("contextMenuArchivePage"),
    contexts: ["page"]
  });
  chrome.contextMenus.create({
    id: "archive-link",
    title: t("contextMenuArchiveLink"),
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const url =
    info.menuItemId === "archive-link"
      ? info.linkUrl
      : info.pageUrl ?? tab?.url;
  if (!url) return;
  const mirror = (await getPreferredMirror()) ?? MIRRORS[0].url;
  chrome.tabs.create({ url: buildArchiveUrl(mirror, url) });
});


chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "archive-tab") return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url) return;
  const mirror = (await getPreferredMirror()) ?? MIRRORS[0].url;
  chrome.tabs.create({ url: buildArchiveUrl(mirror, tab.url) });
});