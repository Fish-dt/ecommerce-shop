'use client';

import { useAppSelector } from '@/redux/hooks';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductList } from '@/components/Product/ProductList';
import { ProductListHeader } from '@/components/Product/ProductListHeader';
import { FavoritesEmpty } from '@/components/Favorites/FavoritesEmpty';

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <ProductFilters
            selectedCategory={null}
            onCategoryChange={() => {}}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <ProductListHeader title="Your Favorites" />

          {favorites.length === 0 ? (
            <FavoritesEmpty />
          ) : (
            <ProductList
              products={favorites}
              isLoading={false}
              hasMore={false}
              onLoadMore={() => {}}
            />
          )}
        </div>
      </div>
    </main>
  );
}
