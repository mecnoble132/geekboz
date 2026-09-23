/**
 * Patch the 5 already-seeded Diwali prebuilt PCs (diwali-gbz-pc1..pc5) with:
 * - Real images for all 5 (uploaded fresh from assets/images/nvidia/pcs/,
 *   filenames now match the correct PC per your rename).
 * - PC1: renamed "MLG Special Edition PC", price 299999.
 * - PC2: renamed "Sneaker PC", price 295999, description notes lifelong service.
 * - PC5: GPU corrected to RTX 5080 (was "Not specified").
 *
 * Uses Firestore `.update()` (partial merge), so it only touches the fields
 * listed below — everything else on each doc is left as-is.
 *
 * Requirements: same as scripts/seed-diwali-prebuilts.mjs
 *   $env:FIREBASE_SERVICE_ACCOUNT_JSON="C:\path\to\serviceAccountKey.json"
 *   node scripts/update-diwali-prebuilts.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const FIREBASE_SERVICE_ACCOUNT_JSON = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '';

const CLOUDINARY_CLOUD_NAME = 'dzbjr3asg';
const CLOUDINARY_UPLOAD_PRESET = 'geekboz_unsigned_prebuilts';
const CLOUDINARY_FOLDER = 'geekboz/prebuilts';

const LOCAL_IMAGE_DIR = path.resolve('assets', 'images', 'nvidia', 'pcs');

const updates = [
  {
    id: 'diwali-gbz-pc1',
    imageFile: 'diwali-pc-1.JPG',
    fields: {
      name: 'MLG Special Edition PC',
      price: 299999
    }
  },
  {
    id: 'diwali-gbz-pc2',
    imageFile: 'diwali-pc-2.JPG',
    fields: {
      name: 'Sneaker PC',
      price: 295999,
      description: 'Diwali special build — Ryzen 5 9600X paired with RTX 5070 12GB in a compact ITX form factor. Lifelong service included.'
    }
  },
  {
    id: 'diwali-gbz-pc3',
    imageFile: 'diwali-pc-3.png',
    fields: {}
  },
  {
    id: 'diwali-gbz-pc4',
    imageFile: 'diwali-pc-4.png',
    fields: {}
  },
  {
    id: 'diwali-gbz-pc5',
    imageFile: 'diwali-pc-5.png',
    fields: {
      gpu: 'NVIDIA GeForce RTX 5080'
    }
  }
];

function extToMime(ext) {
  const e = (ext || '').toLowerCase();
  if (e === '.png') return 'image/png';
  if (e === '.jpg' || e === '.jpeg') return 'image/jpeg';
  if (e === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

async function uploadFileToCloudinary(localFilePath, publicIdHint) {
  const fileBuffer = fs.readFileSync(localFilePath);
  const fileExt = path.extname(localFilePath);
  const mime = extToMime(fileExt);
  const blob = new Blob([fileBuffer], { type: mime });

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append('file', blob, path.basename(localFilePath));
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  if (CLOUDINARY_FOLDER) formData.append('folder', CLOUDINARY_FOLDER);
  if (publicIdHint) formData.append('public_id', publicIdHint);

  const res = await fetch(endpoint, { method: 'POST', body: formData });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data || !data.secure_url) {
    throw new Error(`Cloudinary upload failed for ${localFilePath}`);
  }
  return data.secure_url;
}

async function main() {
  if (!FIREBASE_SERVICE_ACCOUNT_JSON) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_JSON env var (path to firebase service account JSON).');
  }

  const serviceAccount = JSON.parse(fs.readFileSync(FIREBASE_SERVICE_ACCOUNT_JSON, 'utf8'));

  initializeApp({ credential: cert(serviceAccount) });
  const db = getFirestore();

  for (const u of updates) {
    const localPath = path.join(LOCAL_IMAGE_DIR, u.imageFile);
    if (!fs.existsSync(localPath)) {
      console.warn(`Image not found for ${u.id}, skipping image update: ${localPath}`);
    } else {
      console.log(`Uploading ${u.imageFile} for ${u.id}...`);
      const url = await uploadFileToCloudinary(localPath, `prebuilts/${u.id}/main`);
      u.fields.image = url;
      u.fields.gallery = [url];
      console.log(`  -> ${url}`);
    }

    await db.collection('prebuilts').doc(u.id).update(u.fields);
    console.log(` - updated ${u.id}: ${Object.keys(u.fields).join(', ')}`);
  }

  console.log('Done updating Diwali prebuilts.');
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
