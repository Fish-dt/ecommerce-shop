# 🛍️ Ecommerce Shop

A modern ecommerce application built with Next.js 16, React 19, and TypeScript. It showcases high-quality app architecture with Redux Toolkit state management, accessible UI, and a clean UX.

## 📋 Table of Contents

- Features
- Tech Stack
- Architecture & Project Structure
- Getting Started
- Scripts
- State Management
- API
- Docker
- Environment Variables

## ✨ Features

### Core Functionality
- Product browsing with search and category filtering
- Product details page with rich information
- Favorites system (persisted via localStorage)
- Add/edit product form with validation
- Dark mode with theme persistence

### User Experience
- Responsive design (mobile-first)
- Optimized images and skeleton loading states
- Accessible components (keyboard and ARIA friendly)
- Toast notifications for user feedback

### Performance
- Next.js SSR/SSG for fast loads and SEO
- Automatic code splitting and lazy loading
- Memoization for expensive UI paths

### SEO
- Page titles and descriptions via Next.js Metadata API
- Semantic HTML

## 🛠 Tech Stack

### Core
- Next.js 16.0.1 (App Router)
- React 19.2.0
- TypeScript 5
- Node.js 20+

### State, Forms, Validation
- Redux Toolkit 2.10.1, React Redux 9.2.0
- React Hook Form 7.66.0
- Zod 4.1.12

### UI & Styling
- Tailwind CSS 4
- Radix UI, shadcn/ui
- Lucide React
- next-themes

### API & Networking
- Axios 1.13.2
- DummyJSON API (mock ecommerce)

### DX
- ESLint 9
- Path aliases (`@/...`)

## 🏗 Architecture & Project Structure

The project follows a feature-oriented structure for clarity and scalability.

```
ecommerce-shop/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router (layouts, pages, API)
│   ├── components/         # UI and feature components
│   │   ├── Favorites/
│   │   ├── Product/
│   │   ├── SEO/
│   │   └── ui/
│   ├── features/           # Redux feature slices
│   │   ├── categories/
│   │   ├── favorites/
│   │   ├── products/
│   │   └── theme/
│   ├── redux/              # Store and typed hooks
│   ├── services/           # API client and services
│   ├── types/              # Global TS types
│   └── utils/              # Helpers and utilities
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

### Key Principles
- Clear separation of concerns by feature
- Strong typing at the edges (API responses, forms)
- Encapsulated UI components and hooks

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 9+ (or yarn/pnpm)

### Quick Start

You can run the project locally or instantly via Docker — whichever you prefer.

#### 🧩 Option 1 — Run Locally
```bash
git clone https://github.com/Fish-dt/ecommerce-shop.git
cd ecommerce-shop

# Create a .env.local file in the root directory
NEXT_PUBLIC_API_BASE=https://dummyjson.com/products

npm install
npm run dev
# Open http://localhost:3000
```

#### Option 2 — Run with Docker

You can use the published Docker image from [Docker Hub](https://hub.docker.com/r/fishux/ecommerce-shop):

```bash
docker pull fishux/ecommerce-shop:latest
docker run -p 3000:3000 fishux/ecommerce-shop:latest
# Open http://localhost:3000
```

See more: [https://hub.docker.com/r/fishux/ecommerce-shop](https://hub.docker.com/r/fishux/ecommerce-shop)


## 🔄 State Management

- Redux Toolkit is used for global state (favorites, products, categories, theme).
- Favorites are persisted to localStorage and initialized client-side.
- Typed store and hooks live in `src/redux/`.

Store highlights:
- Feature slices organized by domain
- Derived state via selectors where needed
- Async logic in services or thunks

## 🔌 API

- The app uses the DummyJSON Products API for product data.
- Docs: https://dummyjson.com/docs/products

Service pattern (example):
```ts
// src/services/api.ts
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});
```

Common endpoints:
- GET /products
- GET /products/search?q={query}
- GET /products/:id
- GET /products/categories
- GET /products/category/:category
- POST /products/add
- PUT /products/:id
- DELETE /products/:id

## 🐳 Docker

A simple production Dockerfile is provided.

Build:
```bash
docker build -t ecommerce-shop:latest .
```

Run:
```bash
docker run --rm -p 3000:3000 ecommerce-shop:latest
```

Compose:
```bash
docker compose up --build
```


## 🔧 Environment Variables

Set at runtime for Docker or locally via `.env.local` (not committed):
- `NEXT_PUBLIC_API_BASE` (example: https://dummyjson.com/products)

Example with Docker:
```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE=https://dummyjson.com/products \
  ecommerce-shop:latest
```

---
