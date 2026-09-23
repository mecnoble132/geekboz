/**
 * Sneaker PC (diwali-gbz-pc2) already includes lifelong/long-term service
 * for free, so the "GBZ Care Service Suite" add-on (10 Year Service,
 * Firestore addons/nyxkaWkzEMHheCWj8jGZ) shouldn't be offered again as a
 * paid add-on on its product page.
 *
 * Sets `excludedAddons: [<that addon id>]` on the PC2 doc. The product page
 * (prebuilts/product.js) filters out any addon whose id appears in this
 * array before rendering the add-ons list.
 *
 * Requirements: same as the other scripts/*-diwali-prebuilts.mjs scripts.
 *   $env:FIREBASE_SERVICE_ACCOUNT_JSON="C:\path\to\serviceAccountKey.json"
 *   node scripts/exclude-addon-pc2.mjs
 */

import fs from 'node:fs';

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const FIREBASE_SERVICE_ACCOUNT_JSON = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '';

const PRODUCT_ID = 'diwali-gbz-pc2';
const EXCLUDED_ADDON_ID = 'nyxkaWkzEMHheCWj8jGZ'; // "GBZ Care Service Suite" / 10 Year Service

async function main() {
  if (!FIREBASE_SERVICE_ACCOUNT_JSON) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_JSON env var (path to firebase service account JSON).');
  }

  const serviceAccount = JSON.parse(fs.readFileSync(FIREBASE_SERVICE_ACCOUNT_JSON, 'utf8'));

  initializeApp({ credential: cert(serviceAccount) });
  const db = getFirestore();

  await db.collection('prebuilts').doc(PRODUCT_ID).update({
    excludedAddons: [EXCLUDED_ADDON_ID]
  });

  console.log(`Updated ${PRODUCT_ID}: excludedAddons = [${EXCLUDED_ADDON_ID}]`);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
