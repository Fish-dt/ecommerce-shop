import type { Product } from '@/types/product';

export const siteConfig = {
  name: 'Ecommerce Shop',
  description: 'Your one-stop shop for quality products. Shop with confidence and enjoy fast delivery.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
};

export function generateProductStructuredData(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images || [product.thumbnail],
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.stock > 0 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      url: `${siteConfig.url}/product/${product.id}`,
    },
    aggregateRating: product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: 1,
        }
      : undefined,
    brand: product.brand
      ? {
          '@type': 'Brand',
          name: product.brand,
        }
      : undefined,
    category: product.category,
  };
}

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
  };
}

