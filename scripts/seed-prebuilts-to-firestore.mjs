/**
 * Seed Firestore prebuilts from `prebuilts/products.json`.
 *
 * Optional: upload product images to Cloudinary and store `secure_url` in Firestore.
 *
 * Requirements:
 * - Node.js 18+ (for global fetch/Blob)
 * - `firebase-admin` installed:
 *     npm i firebase-admin
 * - Firebase Admin service account credentials:
 *     export FIREBASE_SERVICE_ACCOUNT_JSON="C:\\path\\to\\serviceAccountKey.json"
 *
 * Optional Cloudinary:
 * - export CLOUDINARY_CLOUD_NAME="..."
 * - export CLOUDINARY_UPLOAD_PRESET="..."
 * - export CLOUDINARY_FOLDER="geekboz/prebuilts" (optional)
 *
 * Usage:
 *   node scripts/seed-prebuilts-to-firestore.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

import admin from 'firebase-admin';

const FIREBASE_SERVICE_ACCOUNT_JSON =
  process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '';

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || '';
const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || 'geekboz/prebuilts';

const productsJsonPath = path.resolve('prebuilts', 'products.json');
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

const defaultHomepageCarouselSlides = [
  { productId: 'gbz-z5', tag: 'New Arrival', bgImage: 'https://hips.hearstapps.com/hmg-prod/images/pop-gaming-desktops-social-697a79b13a6ff.jpg', order: 1, enabled: true },
  { productId: 'gbz-m5', tag: 'Best Seller', bgImage: 'https://hips.hearstapps.com/hmg-prod/images/pop-gaming-desktops-social-697a79b13a6ff.jpg', order: 2, enabled: true },
  { productId: 'gbz-z1', tag: 'Compact Beast', bgImage: 'https://hips.hearstapps.com/hmg-prod/images/pop-gaming-desktops-social-697a79b13a6ff.jpg', order: 3, enabled: true },
  { productId: 'gbz-z7', tag: 'Workstation', bgImage: 'https://hips.hearstapps.com/hmg-prod/images/pop-gaming-desktops-social-697a79b13a6ff.jpg', order: 4, enabled: true }
];

const useCloudinary =
  !!CLOUDINARY_CLOUD_NAME &&
  !!CLOUDINARY_UPLOAD_PRESET;

function extToMime(ext) {
  const e = (ext || '').toLowerCase();
  if (e === '.png') return 'image/png';
  if (e === '.jpg' || e === '.jpeg') return 'image/jpeg';
  if (e === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

function isHttpUrl(s) {
  return typeof s === 'string' && /^https?:\/\//i.test(s);
}

function resolveLocalPathFromProductsJson(relPath) {
  // products.json lives in `prebuilts/`, and the JSON uses paths relative to that file.
  // Example: "../assets/images/foo.webp" => resolves to "<repoRoot>/assets/images/foo.webp"
  return path.resolve('prebuilts', relPath);
}

async function uploadFileToCloudinary(localFilePath, publicIdHint) {
  if (!useCloudinary) return null;

  const fileBuffer = fs.readFileSync(localFilePath);
  const fileExt = path.extname(localFilePath);
  const mime = extToMime(fileExt);
  const blob = new Blob([fileBuffer], { type: mime });

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append('file', blob, path.basename(localFilePath));
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  if (CLOUDINARY_FOLDER) formData.append('folder', CLOUDINARY_FOLDER);

  // Optional: helps grouping/debugging. Cloudinary may ignore this for unsigned presets.
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
    throw new Error(
      'Missing FIREBASE_SERVICE_ACCOUNT_JSON env var (path to firebase service account JSON).'
    );
  }

  const serviceAccount = JSON.parse(fs.readFileSync(FIREBASE_SERVICE_ACCOUNT_JSON, 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();

  // Upload cache so identical files (many gallery repeats) are only uploaded once.
  const uploadCache = new Map();

  async function maybeUploadUrl(url, publicIdHint) {
    if (!url) return url;
    if (isHttpUrl(url)) return url; // already external

    const localPath = resolveLocalPathFromProductsJson(url);
    if (uploadCache.has(localPath)) return uploadCache.get(localPath);

    const secureUrl = await uploadFileToCloudinary(localPath, publicIdHint);
    uploadCache.set(localPath, secureUrl || url); // fallback to original if cloudinary disabled
    return secureUrl || url;
  }

  console.log(`Seeding ${products.length} prebuilts...`);

  for (const p of products) {
    const uploadedMain = useCloudinary
      ? await maybeUploadUrl(p.image, `prebuilts/${p.id}/main`)
      : p.image;

    const uploadedGallery = useCloudinary
      ? await Promise.all((p.gallery || []).map((u, idx) => maybeUploadUrl(u, `prebuilts/${p.id}/g${idx}`)))
      : (p.gallery || []);

    const doc = {
      ...p,
      image: uploadedMain,
      gallery: uploadedGallery,
      // Ensure types are correct for the front-end.
      price: Number(p.price || 0),
      order: Number(p.order || 0),
      featured: !!p.featured,
      inStock: !!p.inStock,
      badge: p.badge || null,
      id: p.id
    };

    await db.collection('prebuilts').doc(p.id).set(doc);
    console.log(` - seeded ${p.id}`);
  }

  await db.collection('settings').doc('homepageCarousel').set({
    slides: defaultHomepageCarouselSlides
  });

  console.log('Done seeding prebuilts + homepage carousel settings.');
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

