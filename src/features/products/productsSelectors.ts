import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

// Basic Selectors
export const selectProductsState = (state: RootState) => state.products;
export const selectCategoriesState = (state: RootState) => state.categories;

// Products Selectors
export const selectProducts = (state: RootState) => state.products.products;
export const selectCurrentProduct = (state: RootState) => state.products.currentProduct;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductsTotal = (state: RootState) => state.products.total;
export const selectProductsSkip = (state: RootState) => state.products.skip;
export const selectProductsLimit = (state: RootState) => state.products.limit;

// Category Selectors
export const selectCategory = (state: RootState) => state.products.category;
export const selectCategoryProducts = (state: RootState) => state.products.categoryProducts;
export const selectCategoryLoading = (state: RootState) => state.products.categoryLoading;
export const selectCategoryError = (state: RootState) => state.products.categoryError;
export const selectCategoryTotal = (state: RootState) => state.products.categoryTotal;

// Search Selectors
export const selectSearchQuery = (state: RootState) => state.products.searchQuery;

// Product Detail Selectors
export const selectProductLoading = (state: RootState) => state.products.productLoading;
export const selectProductError = (state: RootState) => state.products.productError;

// Mutation Selectors
export const selectCreating = (state: RootState) => state.products.creating;
export const selectUpdating = (state: RootState) => state.products.updating;
export const selectDeleting = (state: RootState) => state.products.deleting;
export const selectCreateError = (state: RootState) => state.products.createError;
export const selectUpdateError = (state: RootState) => state.products.updateError;
export const selectDeleteError = (state: RootState) => state.products.deleteError;

// Memoized Selectors
export const selectDisplayProducts = createSelector(
  [selectProducts, selectCategoryProducts, selectCategory],
  (products, categoryProducts, category) => {
    return category ? categoryProducts : products;
  }
);

export const selectDisplayLoading = createSelector(
  [selectProductsLoading, selectCategoryLoading, selectCategory],
  (loading, categoryLoading, category) => {
    return category ? categoryLoading : loading;
  }
);

export const selectDisplayError = createSelector(
  [selectProductsError, selectCategoryError, selectCategory],
  (error, categoryError, category) => {
    return category ? categoryError : error;
  }
);

export const selectDisplayTotal = createSelector(
  [selectProductsTotal, selectCategoryTotal, selectCategory],
  (total, categoryTotal, category) => {
    return category ? categoryTotal : total;
  }
);

export const selectHasMore = createSelector(
  [selectDisplayProducts, selectDisplayTotal, selectCategory, selectProductsSkip, selectProductsLimit, selectCategoryTotal],
  (products, total, category, skip, limit, categoryTotal) => {
    const currentTotal = category ? categoryTotal : total;
    if (currentTotal > 0) {
      return products.length < currentTotal;
    }
    return products.length === limit && products.length > 0;
  }
);


