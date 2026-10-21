/* global firebase, window */

// Cloudinary delivery optimisation: inserts f_auto (WebP/AVIF), q_auto and a
// max width into a res.cloudinary.com upload URL. Non-Cloudinary URLs, and URLs
// that already carry a transformation, are returned unchanged.
window.cldOpt = function (url, width) {
  if (typeof url !== 'string') return url;
  const marker = '/image/upload/';
  if (url.indexOf('res.cloudinary.com/') === -1 || url.indexOf(marker) === -1) return url;
  const i = url.indexOf(marker) + marker.length;
  const next = url.slice(i).split('/')[0];
  if (/^(v\d+|[a-z]{1,3}_[^/]*)$/.test(next) && !/^v\d+$/.test(next)) return url; // already transformed
  const t = 'f_auto,q_auto' + (width ? ',c_limit,w_' + width : '');
  return url.slice(0, i) + t + '/' + url.slice(i);
};

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