'use client';

import { ProductCard } from './product-card';

interface ProductGridSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({ count = 10 }: ProductGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }, (_, idx) => (
        <ProductCard key={`skeleton-${idx}`} loading />
      ))}
    </div>
  );
}

