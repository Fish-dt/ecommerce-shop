'use client';

import { useEffect } from 'react';
import type { Product } from '@/types/product';
import { generateProductStructuredData } from '@/lib/seo';

interface ProductStructuredDataProps {
  product: Product;
}

export function ProductStructuredData({ product }: ProductStructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(generateProductStructuredData(product));
    script.id = 'product-structured-data';

    // Remove existing script if it exists
    const existing = document.getElementById('product-structured-data');
    if (existing) existing.remove();

    // Add new script
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [product]);

  return null;
}

