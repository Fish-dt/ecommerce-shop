import { fetchProduct } from '@/services/productService';
import type { Metadata } from 'next';
import { ProductDetailClient } from '@/components/Product/ProductDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await fetchProduct(id);
    const title = product.title;
    const description =
      product.description ||
      `Buy ${product.title} at $${product.price}. High quality product with fast delivery.`;

    return {
      title,
      description,
    };
  } catch {
    return {
      title: 'Product not found',
      description: 'The requested product could not be found.',
    };
  }
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}