import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '@/features/favorites/favoritesSlice';
import themeReducer from '@/features/theme/themeSlice';
import productsReducer from '@/features/products/productsSlice';
import categoriesReducer from '@/features/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    theme: themeReducer,
    products: productsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
