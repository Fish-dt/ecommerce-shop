'use client';

import type { Product } from '@/types/product';
import { ProductImages } from './ProductImages';
import { ProductInfo } from './ProductInfo';
import { ProductStructuredData } from '@/components/SEO/ProductStructuredData';

interface ProductDetailLayoutProps {
  product: Product;
}

export function ProductDetailLayout({ product }: ProductDetailLayoutProps) {
  return (
    <>
      <ProductStructuredData product={product} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 flex justify-center items-start">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="flex flex-col gap-4">
            <ProductImages product={product} />
          </div>
          <div className="flex flex-col">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
    </>
  );
}

