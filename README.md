# <img src="icons/icon64.png" width="32" height="32" valign="middle"> ArchiveIt

A lightweight browser extension that saves the current page to [Archive.today](https://archive.today) with a single click — bypassing paywalls and preserving content.

---

## Features

- **One-click archiving** — instantly sends the active tab to Archive.today
- **Multiple mirrors** — supports all Archive.today domains with automatic offline detection
- **Copy archive URL** — copy the archive link to clipboard without opening it
- **Persistent mirror preference** — remembers your last chosen mirror across sessions
- **Offline detection** — pings all mirrors on open and greys out unreachable ones

---

## Supported Mirrors

| Mirror | URL |
|---|---|
| archive.today | https://archive.today |
| archive.ph | https://archive.ph |
| archive.is | https://archive.is |
| archive.li | https://archive.li |
| archive.vn | https://archive.vn |
| archive.fo | https://archive.fo |
| archive.md | https://archive.md |

---

## Installation

### From source (developer mode)

1. Clone or download this repository
2. Open browser and go to extensions
3. Enable **Developer mode**
4. Click **Load unpacked** and select the extension folder
5. The ArchiveIt icon will appear in your toolbar

---

## Usage

1. Navigate to any webpage you want to archive
2. Click the **ArchiveIt** toolbar icon
3. Choose a mirror from the dropdown (optional)
4. Click **Archive this page** — a new tab opens with the archived snapshot
5. Or click **Copy URL** to copy the archive link to your clipboard

If a mirror is slow or fails, switch to another from the dropdown and try again.

---

## Project Structure

```
ArchiveIt/
├── manifest.json     # Extension manifest (MV3)
├── popup.html        # Popup UI
├── popup.js          # Popup entry point
├── mirrors.js        # Mirror list and ping logic
├── storage.js        # chrome.storage helpers
├── tabs.js           # Active tab and URL helpers
├── ui.js             # DOM manipulation helpers
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## Permissions

| Permission | Reason |
|---|---|
| `activeTab` | Read the URL of the current tab |
| `storage` | Save preferred mirror across sessions |

---

## Credits

- Icon by [smashingstocks](https://www.flaticon.com/free-icons/files-and-folders) — Flaticon
- Built on the [Archive.today](https://archive.today) service
