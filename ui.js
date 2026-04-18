
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

export function applyPingResults(pingMap) {
  const sel = document.getElementById("mirror-select");
  for (const opt of sel.options) {
    const alive = pingMap.get(opt.value);
    opt.disabled = alive === false;
    opt.textContent = opt.textContent.replace(/ \(offline\)$/, "") + (alive === false ? " (offline)" : "");
    opt.style.opacity = alive === false ? "0.35" : "";
    opt.style.color = alive === false ? "#555" : "";
  }

  const current = sel.options[sel.selectedIndex];
  if (current?.disabled) {
    const firstAlive = [...sel.options].find(o => !o.disabled);
    if (firstAlive) sel.value = firstAlive.value;
  }
}

export function getSelectedMirror() {
  return document.getElementById("mirror-select").value;
}

export function flashCopied() {
  const btn = document.getElementById("copy-btn");
  btn.textContent = "Copied!";
  btn.style.background = "#2a9d8f";
  setTimeout(() => {
    btn.textContent = "Copy URL";
    btn.style.background = "";
  }, 1500);
}