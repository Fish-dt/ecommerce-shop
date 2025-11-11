'use client';

import Image from 'next/image';
import type { Product } from '@/types/product';

interface ProductImagePreviewProps {
  product: Product;
}

export function ProductImagePreview({ product }: ProductImagePreviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-lg flex items-center justify-center min-h-[400px]">
        <Image
          src={product.thumbnail || '/placeholder.svg'}
          alt={product.title}
          width={600}
          height={600}
          className="object-contain max-h-[500px] w-auto h-auto"
          priority
        />
      </div>
      {product.images && product.images.length > 1 && (
        <div className="w-full flex justify-center">
          <div className="flex gap-2 overflow-x-auto max-w-full">
            {product.images.map((img: string, i: number) => (
              <div 
                key={`${img}-${i}`} 
                className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 border-slate-300 dark:border-slate-600"
              >
                <Image
                  src={img || '/placeholder.svg'}
                  alt={`${product.title}-${i}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

