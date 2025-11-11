import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';

interface FavoritesState {
  items: Product[];
}

// Load from localStorage
const loadFavoritesFromStorage = (): Product[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
};

// Save to localStorage
const saveFavoritesToStorage = (items: Product[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('favorites', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
};

// Initialize with empty array - will be loaded on client-side mount
const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveFavoritesToStorage(state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      saveFavoritesToStorage(state.items);
    },
    loadFavorites: (state) => {
      state.items = loadFavoritesFromStorage();
    },
  },
});

export const { toggleFavorite, clearFavorites, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
