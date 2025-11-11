import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories, type Category } from '@/services/productService';

// Async Thunk
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await getCategories();
    return response;
  }
);

// State Interface
interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const { clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;

