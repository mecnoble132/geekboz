/**
 * Seed the 5 temporary "Diwali" prebuilt PCs into Firestore `prebuilts`.
 *
 * Standalone and additive: only touches the 5 doc IDs below
 * (`diwali-gbz-pc1` .. `diwali-gbz-pc5`). Does NOT read or re-seed
 * `prebuilts/products.json`, so no existing live product is touched.
 *
 * PC1-PC3 carry RTX 50-series GPUs and get `nvidiaFeatured: true`
 * (shown on the Nvidia page's "Buy GeForce RTX" section).
 * All 5 get `featured: true` (shown on the Products page / homepage teaser)
 * and `badge: "Diwali"`.
 *
 * To remove the campaign later: delete these 5 docs, or just flip
 * `featured`/`nvidiaFeatured` off, from the admin panel. No code changes needed.
 *
 * Requirements:
 * - Node.js 18+
 * - `npm i firebase-admin` (run once, wherever you run this script from)
 * - Firebase Admin service account credentials:
 *     Windows (PowerShell): $env:FIREBASE_SERVICE_ACCOUNT_JSON="C:\path\to\serviceAccountKey.json"
 *     bash:                  export FIREBASE_SERVICE_ACCOUNT_JSON="/path/to/serviceAccountKey.json"
 *
 * Usage:
 *   node scripts/seed-diwali-prebuilts.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const FIREBASE_SERVICE_ACCOUNT_JSON = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '';

// Same Cloudinary unsigned upload target the admin panel already uses
// (admin/script.js: _CLOUD_NAME / _UPLOAD_PRESET / _CLOUD_FOLDER).
const CLOUDINARY_CLOUD_NAME = 'dzbjr3asg';
const CLOUDINARY_UPLOAD_PRESET = 'geekboz_unsigned_prebuilts';
const CLOUDINARY_FOLDER = 'geekboz/prebuilts';

// The 3 local placeholder images, mapped in order to PC1, PC2, PC3 (the
// Nvidia-page PCs). PC4/PC5 fall back to the same generic image the homepage
// teaser already uses. Swap all of these later via the admin image manager.
const LOCAL_IMAGE_DIR = path.resolve('assets', 'images', 'nvidia', 'pcs');
const LOCAL_IMAGES = [
  'file_000000002cc481fdad4332592b4f7016.png',
  'file_0000000060a081fdaf2b5f6349b89fd3.png',
  'file_00000000f5c481fdbcce24c48074d61e.png'
].map(f => path.join(LOCAL_IMAGE_DIR, f));

const FALLBACK_IMAGE = '../assets/images/prebuiltph3.webp';

const products = [
  {
    id: 'diwali-gbz-pc1',
    name: 'Diwali GBZ PC1',
    series: 'gaming',
    tag: 'Gaming',
    price: 297502,
    originalPrice: null,
    badge: 'Diwali',
    featured: true,
    nvidiaFeatured: true,
    inStock: true,
    order: 901,
    cpu: 'AMD Ryzen 7 9800X3D',
    gpu: 'MSI GeForce RTX 5070 12GB OC Warcraft Midnight Void',
    ram: '32 GB (2x16GB) ADATA XPG Lancer Blade RGB DDR5 6000MHz CL36',
    storage: '1 TB ADATA Legend 860 M.2 NVMe Gen4',
    motherboard: 'MSI B850 MLG Edition',
    psu: 'Deepcool PN750D 750W | 80+ Gold (Non-Modular)',
    case: 'MSI Pano 130R MLG Edition',
    cooling: 'MSI CoreLiquid A17 360mm AIO',
    description: 'Diwali special build — Ryzen 7 9800X3D paired with RTX 5070 12GB for flagship 1440p/4K gaming.',
    display: 'N/A (Desktop)',
    weight: '',
    fps: [],
    highlights: [],
    details: { performance: '', design: '', cooling: '', features: '' },
    localImageIndex: 0
  },
  {
    id: 'diwali-gbz-pc2',
    name: 'Diwali GBZ PC2',
    series: 'gaming',
    tag: 'Gaming',
    price: 322037,
    originalPrice: null,
    badge: 'Diwali',
    featured: true,
    nvidiaFeatured: true,
    inStock: true,
    order: 902,
    cpu: 'AMD Ryzen 5 9600X',
    gpu: 'GALAX RTX 5070 1-Click OC EX Gamer 12GB GDDR7',
    ram: '16 GB ADATA XPG Lancer Blade RGB DDR5 6000MHz CL36',
    storage: '1 TB ADATA Legend 860 M.2 NVMe Gen4',
    motherboard: 'MSI MPG B850i Edge TI WiFi',
    psu: '',
    case: 'Cooler Master Sneaker X CPT Kit',
    cooling: '',
    description: 'Diwali special build — Ryzen 5 9600X paired with RTX 5070 12GB in a compact ITX form factor.',
    display: 'N/A (Desktop)',
    weight: '',
    fps: [],
    highlights: [],
    details: { performance: '', design: '', cooling: '', features: '' },
    localImageIndex: 1
  },
  {
    id: 'diwali-gbz-pc3',
    name: 'Diwali GBZ PC3',
    series: 'gaming',
    tag: 'Gaming',
    price: 142297,
    originalPrice: null,
    badge: 'Diwali',
    featured: true,
    nvidiaFeatured: true,
    inStock: true,
    order: 903,
    cpu: 'AMD Ryzen 5 7500F',
    gpu: 'MSI RTX 5060 Ventus 2X 8GB OC GDDR7',
    ram: '16 GB GSKILL Flare X5 6000MHz CL36',
    storage: '500 GB ADATA Legend 860 NVMe M.2 SSD',
    motherboard: 'ASUS B650M-AYW WiFi',
    psu: 'Deepcool PL650D V2',
    case: 'daWg X520 Black',
    cooling: 'ADATA Triton II 360SE Black AIO',
    description: 'Diwali special build — Ryzen 5 7500F paired with RTX 5060 8GB for high-refresh 1080p gaming.',
    display: 'N/A (Desktop)',
    weight: '',
    fps: [],
    highlights: [],
    details: { performance: '', design: '', cooling: '', features: '' },
    localImageIndex: 2
  },
  {
    id: 'diwali-gbz-pc4',
    name: 'Diwali GBZ PC4',
    series: 'gaming',
    tag: 'Gaming',
    price: 80220,
    originalPrice: null,
    badge: 'Diwali',
    featured: true,
    nvidiaFeatured: false,
    inStock: true,
    order: 904,
    cpu: 'AMD Ryzen 5 5500',
    gpu: 'MSI RTX 3050 6GB Ventus 2X OC',
    ram: '8 GB ADATA XPG Gammixx D35 3200MHz',
    storage: '500 GB ADATA Legend 860 NVMe M.2 SSD',
    motherboard: 'ASUS Prime A520M-K',
    psu: 'Deepcool PL550D V2',
    case: 'Ant Esports EVO 360 Lite Black',
    cooling: 'Deepcool AG400 G2 ARGB Black Air Cooler',
    description: 'Diwali special build — Ryzen 5 5500 with RTX 3050 6GB, a budget-friendly entry gaming rig.',
    display: 'N/A (Desktop)',
    weight: '',
    fps: [],
    highlights: [],
    details: { performance: '', design: '', cooling: '', features: '' },
    localImageIndex: null
  },
  {
    id: 'diwali-gbz-pc5',
    name: 'Diwali GBZ PC5',
    series: 'gaming',
    tag: 'Gaming',
    price: 242578,
    originalPrice: null,
    badge: 'Diwali',
    featured: true,
    nvidiaFeatured: false,
    inStock: true,
    order: 905,
    cpu: 'AMD Ryzen 9 9950X',
    // NOTE: GPU was missing from the source quotation PDF (DWGBZPC5).
    // Fix this via the admin edit modal once confirmed.
    gpu: 'Not specified',
    ram: '32 GB (2x16GB) GSKILL Flare X5 6000MHz CL36',
    storage: '1 TB ADATA Legend 860 M.2 NVMe Gen4',
    motherboard: 'NZXT N9 X870E WiFi Black',
    psu: 'Deepcool PN1200M 1200W | 80+ Gold (Fully Modular)',
    case: 'TAG Gamerz Supernova Black',
    cooling: 'Thermaltake MagCurve 360 Ultra Black AIO',
    description: 'Diwali special build — flagship Ryzen 9 9950X platform. GPU to be confirmed.',
    display: 'N/A (Desktop)',
    weight: '',
    fps: [],
    highlights: [],
    details: { performance: '', design: '', cooling: '', features: '' },
    localImageIndex: null
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
    throw new Error(
      'Missing FIREBASE_SERVICE_ACCOUNT_JSON env var (path to firebase service account JSON).'
    );
  }

  const serviceAccount = JSON.parse(fs.readFileSync(FIREBASE_SERVICE_ACCOUNT_JSON, 'utf8'));

  initializeApp({
    credential: cert(serviceAccount)
  });

  const db = getFirestore();

  // Upload each of the 3 local images once, cache the resulting URL.
  const uploadedUrls = [];
  for (let i = 0; i < LOCAL_IMAGES.length; i++) {
    const localPath = LOCAL_IMAGES[i];
    if (!fs.existsSync(localPath)) {
      console.warn(`Image not found, skipping: ${localPath}`);
      uploadedUrls.push(null);
      continue;
    }
    console.log(`Uploading ${path.basename(localPath)} to Cloudinary...`);
    const url = await uploadFileToCloudinary(localPath, `prebuilts/diwali-img-${i}`);
    uploadedUrls.push(url);
    console.log(`  -> ${url}`);
  }

  console.log(`Seeding ${products.length} Diwali prebuilts...`);

  for (const p of products) {
    const { localImageIndex, ...rest } = p;
    const image =
      localImageIndex !== null && uploadedUrls[localImageIndex]
        ? uploadedUrls[localImageIndex]
        : FALLBACK_IMAGE;

    const doc = {
      ...rest,
      image,
      gallery: [image],
      price: Number(p.price || 0),
      originalPrice: p.originalPrice != null ? Number(p.originalPrice) : null,
      order: Number(p.order || 0),
      featured: !!p.featured,
      nvidiaFeatured: !!p.nvidiaFeatured,
      inStock: !!p.inStock
    };

    await db.collection('prebuilts').doc(p.id).set(doc);
    console.log(` - seeded ${p.id}`);
  }

  console.log('Done seeding Diwali prebuilts.');
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
