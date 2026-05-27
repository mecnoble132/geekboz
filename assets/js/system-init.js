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

  // Enable offline persistence so Firestore caches data locally.
  // This means prices always come from Firestore (live or cached),
  // never from stale JSON files.
  db.enablePersistence({ synchronizeTabs: true })
    .catch(function (err) {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open — persistence only works in one tab at a time.
        console.warn('Firestore persistence unavailable (multiple tabs open). Using memory cache.');
      } else if (err.code === 'unimplemented') {
        // Browser doesn't support persistence (e.g. Safari private mode).
        console.warn('Firestore persistence not supported in this browser.');
      }
    });

  // Expose a simple global for non-module scripts.
  window.sysApi = { auth, db };
})();