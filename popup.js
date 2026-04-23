import { AUTHOR, ICON_CREDIT } from "./consts.js";
import { applyI18n, t } from "./i18n.js";
import { pingAllMirrors } from "./mirrors.js";
import { MIRRORS } from "./consts.js";
import { getPreferredMirror, setPreferredMirror } from "./storage.js";
import { getCurrentTab, openArchive, buildArchiveUrl } from "./tabs.js";
import {
  setUrlDisplay, setError,
  populateMirrorSelect, applyPingResults,
  getSelectedMirror, flashCopied,
  showPinging
} from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  applyI18n();
  document.querySelector(".author").textContent = `${t("authorCredit")} ${AUTHOR}`;
  document.querySelector(".flaticon-link").textContent = `${t("iconCredit")} ${ICON_CREDIT}`;
  const archiveBtn = document.getElementById("archive-btn");
  const copyBtn    = document.getElementById("copy-btn");
  const mirrorSel  = document.getElementById("mirror-select");

  const savedMirror = await getPreferredMirror();
  populateMirrorSelect(MIRRORS, savedMirror);

  if (!savedMirror) {
    mirrorSel.disabled  = true;
    archiveBtn.disabled = true;
    copyBtn.disabled    = true;
  }

  showPinging();
  pingAllMirrors().then(results => {
    applyPingResults(results, savedMirror);
    if (!savedMirror) {
      // Persist auto-selected fastest so next open is instant.
      setPreferredMirror(getSelectedMirror());
      mirrorSel.disabled  = false;
      archiveBtn.disabled = false;
      copyBtn.disabled    = false;
    }
  });

  const tab = await getCurrentTab();
  if (!tab) {
    setError(t("errNoTab"));
    archiveBtn.disabled = true;
    copyBtn.disabled = true;
    return;
  }

  const { hostname } = new URL(tab.url);
  if (/^archive\./i.test(hostname)) {
    setUrlDisplay(hostname);
    setError(t("notArchivable"));
    archiveBtn.disabled = true;
    copyBtn.disabled = true;
    return;
  }

  setUrlDisplay(hostname);

  mirrorSel.addEventListener("change", () => setPreferredMirror(getSelectedMirror()));

  archiveBtn.addEventListener("click", () => {
    openArchive(getSelectedMirror(), tab.url);
    // window.close();
  });

  copyBtn.addEventListener("click", async () => {
    const url = buildArchiveUrl(getSelectedMirror(), tab.url);
    try {
      await navigator.clipboard.writeText(url);
      flashCopied();
    } catch {
      setError("Clipboard access denied.");
    }
  });
});