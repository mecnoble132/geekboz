# Firebase + Firestore + Cloudinary Setup (GeekBoz)

This project is a vanilla static site. Admin authentication, catalog reads/writes, and image hosting are powered by Firebase/Firestore and Cloudinary.

## 1) Firebase setup
1. Create a Firebase project.
2. Enable **Authentication** → **Email/Password**.
3. Enable **Firestore Database**.
4. Register your web app and copy the Firebase “Web app config”.
5. Paste the values into:
   - `assets/js/system-config.js`

## 2) Firestore security rules
The repo includes:
- `firestore.rules`

Deploy the rules from the Firebase console/CLI. The rules assume:
- Public reads for `prebuilts/*` and `settings/*`
- Admin writes determined by `roles/{uid}.role === "admin"`

## 3) Seed admin role (required for the admin dashboard to work)
Run (Firebase Admin SDK bypasses rules):
1. Install dependency:
   - `npm i firebase-admin`
2. Set env vars:
   - `FIREBASE_SERVICE_ACCOUNT_JSON="C:\path\to\serviceAccountKey.json"`
   - `ADMIN_EMAIL="admin@yourdomain.com"`
3. Execute:
   - `node scripts/seed-admin-role.mjs`

## 4) Cloudinary setup
1. Create a Cloudinary account.
2. Create an **unsigned upload preset** for the admin uploader.
3. Configure the preset restrictions (recommended):
   - Allowed formats: `png,jpg,jpeg,webp`
   - Max file size: set a reasonable limit (example: 10MB)
   - Destination/folder: set (example: `geekboz/prebuilts`)
4. Set env vars used by the seeding/upload scripts:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_UPLOAD_PRESET`
   - `CLOUDINARY_FOLDER` (optional; defaults to `geekboz/prebuilts`)

### Important note about unsigned presets
Unsigned presets are not secret. Restrict the preset aggressively (formats/size/folder) so uploads are limited.

## 5) Seed prebuilts + homepage carousel
1. Ensure env vars:
   - `FIREBASE_SERVICE_ACCOUNT_JSON`
   - Optional Cloudinary env vars (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_UPLOAD_PRESET`) if you want `secure_url` images.
2. Execute:
   - `node scripts/seed-prebuilts-to-firestore.mjs`

After seeding:
- Public pages should render from Firestore.
- Admin dashboard should be able to edit products and carousel slides.

## 6) Quick verification checklist (manual)
1. Visit `/` and confirm homepage carousel + featured teaser show.
2. Visit `/prebuilts/` and ensure product cards load.
3. Visit `/prebuilts/product/?id=<someId>` and ensure product details load.
4. Log into `/admin/` using the seeded admin email/password.
5. Add/edit a product, upload images, and confirm the changes appear publicly.

