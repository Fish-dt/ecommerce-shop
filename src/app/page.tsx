'use client';

import { ProductFilters } from '@/components/ProductFilters';
import { SearchBar } from '@/components/Product/SearchBar';
import { ProductList } from '@/components/Product/ProductList';
import { ProductListHeader } from '@/components/Product/ProductListHeader';
import { ProductError } from '@/components/Product/ProductError';
import { useProductList } from '@/hooks/useProductList';
import { PageMetadata } from '@/components/SEO/PageMetadata';

const INFINITE_SCROLL_ROOT_MARGIN = '300px';

export default function HomePage() {
  const {
    products,
    isLoading,
    error,
    hasMore,
    selectedCategory,
    localSearchQuery,
    setLocalSearchQuery,
    handleCategoryChange,
    loadMore,
  } = useProductList();

  return (
    <>
      <PageMetadata 
        title="Products" 
        description="Browse our wide selection of quality products. Find the perfect item for your needs with fast delivery and excellent customer service."
      />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <ProductListHeader />

              <SearchBar value={localSearchQuery} onChange={setLocalSearchQuery} />

              {error && <ProductError />}

              <ProductList
                products={products}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={loadMore}
                infiniteScrollRootMargin={INFINITE_SCROLL_ROOT_MARGIN}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
