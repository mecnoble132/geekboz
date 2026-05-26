/* global firebase, window */
(function () {
  if (!window.sysConfig) {
    console.error("System error (C-201)");
    return;
  }
  if (typeof firebase === "undefined") {
    console.error("System error (C-202)");
    return;
  }

  const cfg = window.sysConfig || {};
  if (!cfg.apiKey || cfg.apiKey.includes("PUT_API_KEY_HERE")) {
    console.warn("System warning (W-203)");
    return;
  }

  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(cfg);
  }

  const auth = firebase.auth();
  const db = firebase.firestore();

  // Expose a simple global for non-module scripts.
  window.sysApi = { auth, db };
})();
