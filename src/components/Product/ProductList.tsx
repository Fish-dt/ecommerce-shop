'use client';

import { ProductGrid } from './ProductGrid';
import { ProductGridSkeleton } from './ProductGridSkeleton';
import { EmptyState } from './EmptyState';
import { InfiniteScrollTrigger } from './InfiniteScrollTrigger';
import { EndOfResults } from './EndOfResults';
import type { Product } from '@/types/product';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  infiniteScrollRootMargin?: string;
}

export function ProductList({
  products,
  isLoading,
  hasMore,
  onLoadMore,
  infiniteScrollRootMargin = '300px',
}: ProductListProps) {
  const showLoadingSkeleton = isLoading && products.length === 0;
  const showEmptyState = !isLoading && products.length === 0;
  const showProducts = products.length > 0;

  return (
    <>
      {showLoadingSkeleton && <ProductGridSkeleton />}

      {showEmptyState && <EmptyState />}

      {showProducts && (
        <>
          <ProductGrid products={products} />
          <InfiniteScrollTrigger
            hasMore={hasMore}
            isLoading={isLoading}
            onLoadMore={onLoadMore}
            rootMargin={infiniteScrollRootMargin}
          />
          {!hasMore && !isLoading && <EndOfResults />}
        </>
      )}
    </>
  );
}

