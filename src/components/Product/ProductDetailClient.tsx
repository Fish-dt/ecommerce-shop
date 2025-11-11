'use client';

import { ProductDetailLayout } from '@/components/Product/ProductDetailLayout';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import { useProductDetail } from '@/hooks/useProductDetail';

export function ProductDetailClient() {
  const { product, isLoading, error } = useProductDetail();

  if (isLoading) return <LoadingState />;
  if (error || !product) return <ErrorState message="Product not found." title="Not Found" />;

  return <ProductDetailLayout product={product} />;
}


