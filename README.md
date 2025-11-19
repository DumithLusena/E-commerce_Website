# 🚀 MERN E‑Commerce

Full‑stack MERN shop with customer storefront, admin dashboard, product management (create/update with images), cart, authentication, and filtering.

> 🛒 Apps: `frontend/` (storefront) · `admin/` (catalog management) · `backend/` (API + auth + uploads)

## 📁 Project Structure
```
E-commerce Website/
  frontend/    # Customer UI (React + Vite + Tailwind)
  admin/       # Admin dashboard (React + Vite + Tailwind)
  backend/     # Express REST API, MongoDB models, auth, Cloudinary uploads
  README.md
```

## ✅ Core Features
- 🔍 Product browsing, searching & multi-filter (category / subCategory / size / sort)
- ⭐ Best Seller highlighting (`bestSeller` flag)
- 🛒 Persistent cart synced after login (JWT)
- 🔐 Auth (customer & admin tokens; Bearer or `token` header)
- 🖼️ Up to 4 product images (Cloudinary) – replace individually during edit
- ✏️ Unified create/update logic (PATCH-like behavior)
- 🧩 Responsive UI (Tailwind)

Planned (Roadmap) ➜ Checkout + Orders + Payments (Stripe/Razorpay) | Better validations | Rate limiting & logging.

## ⚙️ Prerequisites
- Node.js 18+ (LTS)  
- MongoDB (Atlas or local)  
- Cloudinary account (image hosting)  
- Optional: Stripe / Razorpay keys for payments

## 🔐 Environment Files
Create these before running.

### `backend/.env`
```
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-strong-secret
CLOUDINARY_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
CLIENT_URL=http://localhost:5173
ADMIN_ORIGIN=http://localhost:5174
STRIPE_SECRET_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```
### `frontend/.env`
```
VITE_BACKEND_URL=http://localhost:4000
```
### `admin/.env`
```
VITE_BACKEND_URL=http://localhost:4000
```
Notes: Protected endpoints accept `Authorization: Bearer <JWT>` or `token: <JWT>` header. Admin routes require admin token.

## ▶️ Run Locally (Windows cmd.exe)
Backend
```
cd backend
npm install
npm run server
```
Frontend (Storefront)
```
cd frontend
npm install
npm run dev
```
Admin (Dashboard)
```
cd admin
npm install
npm run dev
```
Ports: API 4000 · Frontend 5173 · Admin 5174 (may vary if taken).

## 🔗 API Overview (Base: `http://localhost:4000/api`)
Products
- GET `/product/list`
- GET `/product/single?id=<productId>`
- POST `/product/add` (admin, multipart: image1..image4)
- POST `/product/update` (admin, multipart) – partial field/image updates
- DELETE `/product/remove?id=<productId>` (admin)

Product JSON (shape)
```
{
  name: String,
  description: String,
  price: Number,
  category: 'MEN' | 'WOMEN' | 'KIDS',
  subCategory: 'TOPWEAR' | 'BOTTOMWEAR' | 'WINTERWEAR',
  sizes: ['S','M','L','XL','XXL'],
  images: [url1, url2, url3, url4],
  bestSeller: Boolean
}
```
Cart/Auth: send token header; server derives `req.userId` in middleware; cart controllers validate input.

## 🛠️ Admin Flow
1. Login → obtain admin JWT.
2. List view shows products with edit/delete.
3. Add/Edit form: pick/replace up to 4 images, toggle sizes, set bestseller.
4. Submit → Cloudinary uploads → product saved.

## 📦 Production Build
Frontend
```
cd frontend
npm run build
```
Admin
```
cd admin
npm run build
```
Deploy static `dist/` folders behind a CDN; run backend on Node host (configure CORS + env vars). Use process manager (PM2) & HTTPS reverse proxy (Nginx / Caddy).

## 🧪 Troubleshooting
| Issue | Check |
|-------|-------|
| 401/403 admin routes | Admin JWT present & not expired |
| Images fail | Cloudinary credentials + multipart formData |
| CORS errors | `CLIENT_URL` / `ADMIN_ORIGIN` values correct |
| Cart not syncing | Token stored & sent; backend log for userId |
| Mongo connect fail | URI correctness & Atlas IP allowlist |

