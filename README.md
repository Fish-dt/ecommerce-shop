# 🛍️ Ecommerce Shop

A modern, full-featured ecommerce application built with Next.js 16, React 19, and TypeScript. This project demonstrates best practices React development practices, featuring server-side rendering, state management with Redux Toolkit, and a comprehensive SEO implementation.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [State Management](#-state-management)
- [Performance Optimizations](#-performance-optimizations)
- [SEO Implementation](#-seo-implementation)
- [API Integration](#-api-integration)
- [Custom Hooks](#-custom-hooks)

## ✨ Features

### Core Functionality
- **Product Management**: Browse, search, and filter products with infinite scroll pagination
- **Product Details**: Comprehensive product pages with image galleries and detailed information
- **Favorites System**: Save favorite products with localStorage persistence
- **Category Filtering**: Dynamic category filtering with responsive collapsible UI
- **Search Functionality**: Real-time product search with debounced queries
- **Authentication**: NextAuth.js integration for user authentication
- **Product CRUD**: Create, read, update, and delete products
- **Dark Mode**: Full dark mode support with theme persistence

### User Experience
- **Responsive Design**: Mobile-first design with breakpoint optimizations
- **Image Optimization**: Next.js Image component with lazy loading
- **Infinite Scroll**: Efficient pagination with intersection observer
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Comprehensive error boundaries and error states
- **Toast Notifications**: User-friendly toast notifications for actions
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation

### Performance
- **Server-Side Rendering**: Next.js SSR for improved SEO and initial load
- **Code Splitting**: Automatic code splitting and lazy loading
- **Memoization**: React.memo and useMemo for component optimization
- **Debouncing**: Search query debouncing to reduce API calls
- **Image Optimization**: Optimized images with Next.js Image component
- **Redux Optimization**: Normalized state structure and selector memoization

### SEO
- **Meta Tags**: Basic page titles and descriptions via Next.js Metadata API
- **Semantic HTML**: Proper HTML5 semantic elements

## 🛠 Tech Stack

### Core
- **Next.js 16.0.1** - React framework with SSR, SSG, and API routes
- **React 19.2.0** - UI library with latest features
- **TypeScript 5** - Type-safe JavaScript
- **Node.js 20+** - Runtime environment

### State Management
- **Redux Toolkit 2.10.1** - Modern Redux with simplified API
- **React Redux 9.2.0** - React bindings for Redux
- **Redux Persist** - State persistence (localStorage for favorites)

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **shadcn/ui** - High-quality component library
- **next-themes** - Theme management

### Forms & Validation
- **React Hook Form 7.66.0** - Performant form library
- **Zod 4.1.12** - Schema validation
- **@hookform/resolvers** - Zod integration for RHF

### API & Data Fetching
- **Axios 1.13.2** - HTTP client
- **NextAuth.js 4.24.13** - Authentication
- **DummyJSON API** - Mock ecommerce API

### Developer Experience
- **ESLint 9** - Code linting
- **TypeScript** - Static type checking
- **Path Aliases** - Clean import paths (@/components)

## 🏗 Architecture

### Design Patterns

#### Feature-Based Structure
The project follows a feature-based architecture with clear separation of concerns:

```
src/
├── features/          # Feature slices (Redux)
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── services/         # API services
├── lib/              # Utilities and helpers
├── types/            # TypeScript type definitions
└── app/              # Next.js app router pages
```

#### Component Architecture
- **Atomic Design**: Components organized by complexity
- **Container/Presentational**: Separation of logic and presentation
- **Custom Hooks**: Business logic extracted to hooks
- **Compound Components**: Complex components broken into smaller pieces

#### State Management Strategy
- **Redux Toolkit**: Global state management
- **Local State**: Component-specific state with useState
- **URL State**: Query parameters for filters and search
- **Server State**: Next.js server components and API routes

### Key Architectural Decisions

1. **Redux Toolkit over Context API**: Better performance for complex state
2. **Feature Slices**: Organized Redux slices by feature domain
3. **Custom Hooks**: Reusable business logic encapsulation
4. **Service Layer**: API calls abstracted in service files
5. **Type Safety**: Comprehensive TypeScript types throughout
6. **Component Composition**: Smaller, composable components

## 📁 Project Structure

```
ecommerce-shop/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── *.svg
├── src/
│   ├── app/                # Next.js app router
│   │   ├── api/           # API routes
│   │   │   └── auth/      # NextAuth.js routes
│   │   ├── add-product/   # Add product page
│   │   ├── favorites/     # Favorites page
│   │   ├── product/       # Product pages
│   │   │   └── [id]/      # Dynamic product routes
│   │   ├── signin/        # Sign in page
│   │   ├── signup/        # Sign up page
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/         # React components
│   │   ├── Auth/          # Authentication components
│   │   ├── Favorites/     # Favorites components
│   │   ├── Navbar/        # Navigation components
│   │   ├── Product/       # Product components
│   │   ├── SEO/           # SEO components
│   │   └── ui/            # UI primitives
│   ├── features/           # Redux feature slices
│   │   ├── categories/    # Categories slice
│   │   ├── favorites/     # Favorites slice
│   │   ├── products/      # Products slice
│   │   └── theme/         # Theme slice
│   ├── hooks/              # Custom React hooks
│   │   ├── useAddProduct.ts
│   │   ├── useEditProduct.ts
│   │   ├── useProductDetail.ts
│   │   ├── useProductList.ts
│   │   ├── useTheme.ts
│   │   └── useToast.ts
│   ├── lib/                # Utilities and helpers
│   │   ├── seo.ts         # SEO utilities
│   │   └── utils.ts       # General utilities
│   ├── redux/              # Redux configuration
│   │   ├── hooks.ts       # Typed hooks
│   │   └── store.ts       # Store configuration
│   ├── services/           # API services
│   │   ├── api.ts         # API client
│   │   └── productService.ts
│   ├── types/              # TypeScript types
│   │   ├── components.ts
│   │   ├── forms.ts
│   │   └── product.ts
│   └── utils/              # Utility functions
│       ├── format.ts
│       └── params.ts
├── .eslintrc.json          # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **Git** for version control

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Fish-dt/ecommerce-shop.git
cd ecommerce-shop

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fish-dt/ecommerce-shop.git
   cd ecommerce-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
## 📝 Development Guidelines

### Code Style

#### TypeScript
- Use TypeScript for all new files
- Define types and interfaces in `src/types/`
- Avoid `any` type; use `unknown` when necessary
- Use type inference where appropriate

#### Component Structure
```typescript
// 1. Imports
import React from 'react';
import { useState } from 'react';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  onClick: () => void;
}

// 3. Component
export function Component({ title, onClick }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState('');
  
  // 5. Handlers
  const handleClick = () => {
    // Logic
  };
  
  // 6. Render
  return <div>{title}</div>;
}
```

#### Naming Conventions
- **Components**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useProductList.ts`)
- **Utilities**: camelCase (`formatPrice.ts`)
- **Types**: PascalCase (`Product`, `ProductForm`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Component Guidelines

1. **Keep components small and focused**
2. **Use composition over inheritance**
3. **Extract reusable logic to custom hooks**
4. **Memoize expensive computations**
5. **Use React.memo for expensive components**
6. **Implement proper error boundaries**

### State Management Guidelines

1. **Use Redux for global state**
2. **Use useState for component-local state**
3. **Use URL params for shareable state (filters, search)**
4. **Normalize state structure**
5. **Use selectors for derived state**
6. **Avoid prop drilling; use Redux or Context**

### Performance Guidelines

1. **Use React.memo for list items**
2. **Memoize callbacks with useCallback**
3. **Memoize computed values with useMemo**
4. **Lazy load heavy components**
5. **Optimize images with Next.js Image**
6. **Debounce search inputs**
7. **Use infinite scroll for pagination**

## 🔄 State Management

### Redux Store Structure

```typescript
{
  favorites: {
    items: Product[]
  },
  theme: {
    current: 'light' | 'dark'
  },
  products: {
    products: Product[],
    currentProduct: Product | null,
    loading: boolean,
    error: string | null,
    category: string | null,
    searchQuery: string,
    // ... more state
  },
  categories: {
    items: Category[],
    loading: boolean,
    error: string | null
  }
}
```

### Redux Patterns

#### Feature Slices
Each feature has its own slice with:
- State interface
- Initial state
- Reducers
- Actions
- Selectors

#### Async Actions
Using `createAsyncThunk` for API calls:
```typescript
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: FetchProductsParams) => {
    const response = await productService.listProducts(params);
    return response;
  }
);
```

#### Selectors
Memoized selectors for derived state:
```typescript
export const selectDisplayProducts = createSelector(
  [selectProducts, selectCategory, selectSearchQuery],
  (products, category, searchQuery) => {
    // Filter and search logic
  }
);
```

### Local Storage Persistence

Favorites are persisted to localStorage:
- Automatic save on favorite toggle
- Automatic load on app initialization via `FavoritesInitializer` component
- Error handling for localStorage failures
- SSR-safe implementation (client-side only)

### State Initialization

The `FavoritesInitializer` component loads favorites from localStorage after React hydration to prevent SSR mismatches:
```typescript
// src/components/Favorites/FavoritesInitializer.tsx
export function FavoritesInitializer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);
  return null;
}
```

## ⚡ Performance Optimizations

### React Optimizations

1. **React.memo**: Prevent unnecessary re-renders
   ```typescript
   export const ProductCard = React.memo(({ product }) => {
     // Component implementation
   });
   ```

2. **useMemo**: Memoize expensive computations
   ```typescript
   const discountedPrice = useMemo(() => {
     return product.price * (1 - product.discountPercentage / 100);
   }, [product.price, product.discountPercentage]);
   ```

3. **useCallback**: Memoize callbacks
   ```typescript
   const handleClick = useCallback(() => {
     // Handler logic
   }, [dependencies]);
   ```

### Next.js Optimizations

1. **Image Optimization**: Using Next.js Image component
2. **Code Splitting**: Automatic code splitting
3. **Server Components**: Where applicable
4. **Static Generation**: For static pages
5. **Incremental Static Regeneration**: For dynamic content

### Bundle Optimizations

1. **Tree Shaking**: Remove unused code
2. **Dynamic Imports**: Lazy load components
3. **Bundle Analysis**: Analyze bundle size
4. **Dependency Optimization**: Minimize dependencies

## 🔍 SEO Implementation

### Meta Tags (Basic)
- Dynamic page titles
- Meta descriptions

### SEO Best Practices

1. **Semantic HTML**: Use proper HTML5 elements
2. **Alt Text**: Descriptive alt text for images
3. **Heading Hierarchy**: Proper h1-h6 structure
4. **Internal Linking**: Link related products
5. **URL Structure**: Clean, descriptive URLs
6. **Sitemap**: Generate sitemap (future implementation)
7. **Robots.txt**: Configure crawler access

## 🔌 API Integration

### API Service Layer

The application uses a service layer pattern for API calls:

```typescript
// src/services/productService.ts
export const listProducts = async (params: ListProductsParams): Promise<ProductListResponse>
export const fetchProduct = async (id: string): Promise<Product>
export const createProduct = async (data: CreateProductInput): Promise<Product>
export const updateProduct = async (id: string, data: UpdateProductInput): Promise<Product>
export const deleteProduct = async (id: string | number): Promise<void>
export const getProductsByCategory = async (params: CategoryProductsParams): Promise<ProductListResponse>
```

### API Client Configuration

```typescript
// src/services/api.ts
export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Error Handling

All API errors are handled consistently:
- Axios error interception
- User-friendly error messages
- Error state management in Redux
- Toast notifications for user feedback

### API Endpoints

Currently using [DummyJSON API](`https://dummyjson.com`):
- `GET /products` - List all products
- `GET /products/search?q={query}` - Search products (e.g., `GET /products/search?q=phone`)
- `GET /products/:id` - Get product by ID
- `GET /products/categories` - Get all categories
- `GET /products/category/:category` - Get products by category
- `POST /products/add` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product


## 🧩 Custom Hooks

### useProductList
Manages product listing with filters, search, and pagination:
- Debounced search queries
- Category filtering
- Infinite scroll pagination
- Loading states
- Error handling

### useProductDetail
Fetches and manages single product details:
- Product data fetching
- Loading states
- Error handling
- Cache management

### useAddProduct / useEditProduct
Form management for product creation and editing:
- Form validation with Zod
- React Hook Form integration
- API calls
- Success/error handling
- Navigation on success

### useTheme
Theme management with persistence:
- Light/dark mode toggle
- Theme persistence
- SSR-safe implementation
- Mounted state handling



