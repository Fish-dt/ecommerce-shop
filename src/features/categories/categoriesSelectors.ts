import type { RootState } from '@/redux/store';

export const selectCategoriesState = (state: RootState) => state.categories;
export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories.loading;
export const selectCategoriesError = (state: RootState) => state.categories.error;

