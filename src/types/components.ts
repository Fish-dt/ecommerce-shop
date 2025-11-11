import type { Product } from './product';

/**
 * Component Props Types
 */

// Product Card Props
export interface ProductCardProps {
  product?: Product;
  loading?: boolean;
}

// Product Info Props
export interface ProductInfoProps {
  product: Product;
}

// Product Images Props
export interface ProductImagesProps {
  product: Product;
}

// Product Filters Props
export interface ProductFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

