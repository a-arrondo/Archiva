import { t } from "./i18n.js";

export function setUrlDisplay(text) {
  document.getElementById("current-url").textContent = text;
}

export function setError(msg) {
  const el = document.getElementById("current-url");
  el.textContent = msg;
  el.style.color = "#e63946";
}

export function populateMirrorSelect(mirrors, savedMirror) {
  const sel = document.getElementById("mirror-select");
  sel.innerHTML = "";
  for (const m of mirrors) {
    const opt = document.createElement("option");
    opt.value = m.url;
    opt.textContent = m.label;
    sel.appendChild(opt);
  }
  if (savedMirror) sel.value = savedMirror;
}

export function showPinging() {
  const indicator = document.getElementById("ping-indicator");
  if (indicator) indicator.classList.remove("hidden");
}

export function applyPingResults(pingMap, savedMirror) {
  const indicator = document.getElementById("ping-indicator");
  if (indicator) indicator.classList.add("hidden");

  const sel = document.getElementById("mirror-select");
  const offlineLabel = t("offline");

  for (const opt of sel.options) {
    const result = pingMap.get(opt.value);
    const alive  = result?.alive ?? true;
    opt.disabled    = !alive;
    opt.textContent = opt.textContent.replace(` (${offlineLabel})`, "") +
                      (!alive ? ` (${offlineLabel})` : "");
    opt.style.opacity = !alive ? "0.35" : "";
    opt.style.color   = !alive ? "#555"  : "";
  }

  const savedOpt = savedMirror && [...sel.options].find(o => o.value === savedMirror);
  if (savedOpt && !savedOpt.disabled) {
    sel.value = savedMirror;
  } else {
    const fastest = [...sel.options]
      .filter(o => !o.disabled)
      .sort((a, b) => (pingMap.get(a.value)?.latency ?? Infinity) -
                      (pingMap.get(b.value)?.latency ?? Infinity))[0];
    if (fastest) sel.value = fastest.value;
  }
}

export function getSelectedMirror() {
  return document.getElementById("mirror-select").value;
}

export function flashCopied() {
  const btn = document.getElementById("copy-btn");
  btn.textContent = t("copiedBtn");
  btn.style.background = "#2a9d8f";
  setTimeout(() => {
    btn.textContent = t("copyBtn");
    btn.style.background = "";
  }, 1500);
}