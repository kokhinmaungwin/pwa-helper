/*!
 * PWA Helper v1.0.0
 * Author: Khin Maung Win
 * License: MIT
 * CDN-ready · Single file · No dependency
 */

(function (window, document) {
  "use strict";

  const PWAHelper = {};
  let deferredPrompt = null;
  let isInstalled = false;

  /* =========================
     INSTALL PROMPT HANDLING
  ========================== */
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    window.dispatchEvent(new Event("pwa:ready"));
  });

  PWAHelper.install = async function () {
    if (!deferredPrompt) {
      console.warn("PWAHelper: Install prompt not available");
      return;
    }
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    deferredPrompt = null;

    if (choice.outcome === "accepted") {
      console.log("PWA installed");
    }
  };

  /* =========================
     INSTALLED STATE
  ========================== */
  window.addEventListener("appinstalled", () => {
    isInstalled = true;
    window.dispatchEvent(new Event("pwa:installed"));
  });

  PWAHelper.isInstalled = function () {
    return (
      isInstalled ||
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  };

  /* =========================
     SERVICE WORKER
  ========================== */
  PWAHelper.registerSW = function (path = "service-worker.js") {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register(path)
      .then((reg) => {
        console.log("Service Worker registered");

        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              window.dispatchEvent(new Event("pwa:update"));
            }
          });
        });
      })
      .catch((err) => console.error("SW error", err));
  };

  /* =========================
     ONLINE / OFFLINE STATUS
  ========================== */
  function updateConnectionStatus() {
    const status = navigator.onLine ? "online" : "offline";
    window.dispatchEvent(new CustomEvent("pwa:connection", { detail: status }));
  }

  window.addEventListener("online", updateConnectionStatus);
  window.addEventListener("offline", updateConnectionStatus);

  /* =========================
     AUTO INIT
  ========================== */
  document.addEventListener("DOMContentLoaded", () => {
    updateConnectionStatus();
  });

  /* =========================
     EXPORT
  ========================== */
  window.PWAHelper = PWAHelper;

})(window, document);
