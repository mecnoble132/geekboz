/**
 * One-time migration: upload assets/images/nvidia/*.{png,webp} to Cloudinary
 * and print a local-path -> secure_url mapping (JSON) to stdout.
 *
 * Usage:
 *   node scripts/upload-nvidia-assets-to-cloudinary.mjs
 *
 * Env vars:
 *   CLOUDINARY_CLOUD_NAME   (default: dzbjr3asg)
 *   CLOUDINARY_UPLOAD_PRESET (default: nvidia-assets)
 *   CLOUDINARY_FOLDER       (default: geekboz/nvidia)
 */

import fs from 'node:fs';
import path from 'node:path';

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dzbjr3asg';
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'nvidia-assets';
const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || 'geekboz/nvidia';

const SRC_DIR = path.resolve('assets/images/nvidia');
const FILES = [
  'frame-gen-comparison-bg.webp',
  'frame-gen-comparison.webp',
  'god-of-war-logo.png',
  'hero-section-bg.webp',
  'nvidia-geforce-rtx-badge-horiz-rgb-for-screen.png',
  'revolutionize-fav-games-bg.webp',
  'super-res-bg.webp',
  'super-res.webp'
];

function extToMime(ext) {
  const e = ext.toLowerCase();
  if (e === '.png') return 'image/png';
  if (e === '.jpg' || e === '.jpeg') return 'image/jpeg';
  if (e === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

async function uploadFile(fileName) {
  const localPath = path.join(SRC_DIR, fileName);
  const fileBuffer = fs.readFileSync(localPath);
  const ext = path.extname(fileName);
  const mime = extToMime(ext);
  const blob = new Blob([fileBuffer], { type: mime });
  const publicId = path.basename(fileName, ext);

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append('file', blob, fileName);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  if (CLOUDINARY_FOLDER) formData.append('folder', CLOUDINARY_FOLDER);
  formData.append('public_id', publicId);

  const res = await fetch(endpoint, { method: 'POST', body: formData });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data || !data.secure_url) {
    throw new Error(`Upload failed for ${fileName}: ${JSON.stringify(data)}`);
  }
  return data.secure_url;
}

async function main() {
  const mapping = {};
  for (const fileName of FILES) {
    process.stderr.write(`Uploading ${fileName}...\n`);
    const url = await uploadFile(fileName);
    mapping[`../assets/images/nvidia/${fileName}`] = url;
    process.stderr.write(`  -> ${url}\n`);
  }
  console.log(JSON.stringify(mapping, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
