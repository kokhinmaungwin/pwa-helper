# PWA Helper (CDN)

Lightweight, dependency-free helper script for Progressive Web Apps.  
Handles install prompt, service worker registration, update detection, and
online/offline status — all in a single JavaScript file.

![Version](https://img.shields.io/badge/version-v1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Features

- Install button handling (`beforeinstallprompt`)
- Service Worker auto registration
- Update detection event
- Online / Offline status events
- iOS safe install detection
- Zero dependency
- CDN ready (jsDelivr)
- Blog, PWA, CMS friendly

---

## CDN Usage

> ⚠️ **Use only ONE version at a time**

### Recommended (Production)
```html
<script src="https://cdn.jsdelivr.net/gh/kokhinmaungwin/pwa-helper@v1.0.0/pwa-helper.min.js"></script>
```
Development / Debug
```html
<script src="https://cdn.jsdelivr.net/gh/kokhinmaungwin/pwa-helper@v1.0.0/pwa-helper.js"></script>
```

---

## Basic Usage
```html
<button id="installBtn" hidden>Install App</button>

<script>
  const btn = document.getElementById("installBtn");

  window.addEventListener("pwa:ready", () => {
    btn.hidden = false;
  });

  btn.onclick = () => PWAHelper.install();

  PWAHelper.registerSW();
</script>
```

---

## Events

|Event	|Description |
|-------|------------|
|pwa:ready	|Install available|
|pwa:installed	|App installed|
|pwa:update	|New version detected|
|pwa:connection	|Online / Offline change|

---

## 📁 Folder Structure

```txt
pwa-helper/
 ├─ pwa-helper.js
 ├─ pwa-helper.min.js
 ├─ manifest.json
 ├─ service-worker.js
 ├─ LICENSE
 ├─ CHANGELOG.md
 ├─ README.md
 └─ demo.html   (optional but recommended)
```

---

## License

MIT License
© 2025 Khin Maung Win

---
