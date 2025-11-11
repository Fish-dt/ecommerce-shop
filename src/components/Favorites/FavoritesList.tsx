'use client';

import { ProductCard } from '@/components/Product/product-card';
import type { Product } from '@/types/product';

interface FavoritesListProps {
  favorites: Product[];
}

export function FavoritesList({ favorites }: FavoritesListProps) {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {favorites.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

