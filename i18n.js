
export function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const msg = chrome.i18n.getMessage(el.dataset.i18n);
    if (msg) el.textContent = msg;
  });
}

export const t = key => chrome.i18n.getMessage(key);