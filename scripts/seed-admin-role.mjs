/**
 * Seed Firestore admin role doc:
 *   roles/{uid} { role: 'admin' }
 *
 * Env vars:
 * - FIREBASE_SERVICE_ACCOUNT_JSON="C:\\path\\to\\serviceAccountKey.json"
 * - ADMIN_EMAIL="admin@yourdomain.com"
 *
 * Usage:
 *   node scripts/seed-admin-role.mjs
 */

import fs from 'node:fs';
import admin from 'firebase-admin';

const FIREBASE_SERVICE_ACCOUNT_JSON =
  process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';

async function main() {
  if (!FIREBASE_SERVICE_ACCOUNT_JSON) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_JSON env var.');
  }
  if (!ADMIN_EMAIL) {
    throw new Error('Missing ADMIN_EMAIL env var.');
  }

  const serviceAccount = JSON.parse(fs.readFileSync(FIREBASE_SERVICE_ACCOUNT_JSON, 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const auth = admin.auth();
  const db = admin.firestore();

  const userRecord = await auth.getUserByEmail(ADMIN_EMAIL);
  if (!userRecord || !userRecord.uid) throw new Error('Could not resolve admin user UID.');

  await db.collection('roles').doc(userRecord.uid).set({ role: 'admin' });
  console.log(`Seeded roles/${userRecord.uid} as admin for ${ADMIN_EMAIL}`);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

