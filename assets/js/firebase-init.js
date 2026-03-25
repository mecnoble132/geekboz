/* global firebase, window */
(function () {
  if (!window.firebaseConfig) {
    console.error("firebase-init: window.firebaseConfig is missing");
    return;
  }
  if (typeof firebase === "undefined") {
    console.error("firebase-init: firebase SDK not loaded (missing firebase-*-compat.js script tags)");
    return;
  }

  const cfg = window.firebaseConfig || {};
  // Avoid initializing with placeholder values (keeps site working until configured).
  if (!cfg.apiKey || cfg.apiKey.includes("PUT_API_KEY_HERE")) {
    console.warn("firebase-init: firebaseConfig still placeholders; skipping initialization");
    return;
  }

  // Initialize exactly once.
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(cfg);
  }

  const auth = firebase.auth();
  const db = firebase.firestore();

  // Expose a simple global for non-module scripts.
  window.fb = { auth, db };
})();

