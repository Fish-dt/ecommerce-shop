'use client';

import { ProductDetailLayout } from '@/components/Product/ProductDetailLayout';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import { useProductDetail } from '@/hooks/useProductDetail';
import { PageMetadata } from '@/components/SEO/PageMetadata';

export default function ProductDetailPage() {
  const { product, isLoading, error } = useProductDetail();

  if (isLoading) return <LoadingState />;
  if (error || !product) return <ErrorState message="Product not found." title="Not Found" />;

  return (
    <>
      <PageMetadata 
        title={product.title}
        description={product.description || `Buy ${product.title} at $${product.price}. High quality product with fast delivery.`}
        image={product.thumbnail || product.images?.[0]}
        type="product"
      />
      <ProductDetailLayout product={product} />
    </>
  );
}