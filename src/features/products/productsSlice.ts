import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  listProducts,
  fetchProduct as fetchProductAPI,
  getProductsByCategory,
  createProduct as createProductAPI,
  updateProduct as updateProductAPI,
  deleteProduct as deleteProductAPI,
  type ProductListResponse,
  type Product,
  type CreateProductInput,
  type UpdateProductInput,
} from '@/services/productService';

// Async Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: { limit?: number; skip?: number; search?: string }) => {
    const response = await listProducts(params);
    return response;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const response = await fetchProductAPI(id);
    return response;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (params: { category: string; limit?: number; skip?: number }) => {
    const response = await getProductsByCategory(params);
    return response;
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (data: CreateProductInput) => {
    const response = await createProductAPI(data);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (data: UpdateProductInput) => {
    const { id, ...updateData } = data;
    const response = await updateProductAPI(id, updateData);
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string | number) => {
    await deleteProductAPI(id);
    return id;
  }
);

// State Interface
interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  error: string | null;
  // For category filtering
  category: string | null;
  categoryProducts: Product[];
  categoryTotal: number;
  categoryLoading: boolean;
  categoryError: string | null;
  // For search
  searchQuery: string;
  // For individual product
  productLoading: boolean;
  productError: string | null;
  // For mutations
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  createError: string | null;
  updateError: string | null;
  deleteError: string | null;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  total: 0,
  skip: 0,
  limit: 10,
  loading: false,
  error: null,
  category: null,
  categoryProducts: [],
  categoryTotal: 0,
  categoryLoading: false,
  categoryError: null,
  searchQuery: '',
  productLoading: false,
  productError: null,
  creating: false,
  updating: false,
  deleting: false,
  createError: null,
  updateError: null,
  deleteError: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
      if (!action.payload) {
        state.categoryProducts = [];
        state.categoryTotal = 0;
      }
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.productError = null;
    },
    resetProducts: (state) => {
      state.products = [];
      state.skip = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        // Only show loading spinner on initial load (skip === 0)
        if (action.meta.arg.skip === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.skip === 0) {
          // Reset products on new search or initial load
          state.products = action.payload.products;
        } else {
          // Append products for pagination
          const newProductIds = new Set(action.payload.products.map(p => p.id));
          const existingIds = new Set(state.products.map(p => p.id));
          const uniqueNewProducts = action.payload.products.filter(p => !existingIds.has(p.id));
          state.products = [...state.products, ...uniqueNewProducts];
        }
        state.total = action.payload.total || 0;
        state.skip = action.payload.skip || 0;
        state.limit = action.payload.limit || 10;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });

    // Fetch Product By ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productLoading = false;
        state.currentProduct = action.payload;
        state.productError = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = action.error.message || 'Failed to fetch product';
      });

    // Fetch Products By Category
    builder
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        // Only show loading spinner on initial load (skip === 0)
        if (action.meta.arg.skip === 0) {
          state.categoryLoading = true;
        }
        state.categoryError = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        if (action.payload.skip === 0) {
          // Reset category products on new category selection
          state.categoryProducts = action.payload.products;
        } else {
          // Append products for pagination
          const newProductIds = new Set(action.payload.products.map(p => p.id));
          const existingIds = new Set(state.categoryProducts.map(p => p.id));
          const uniqueNewProducts = action.payload.products.filter(p => !existingIds.has(p.id));
          state.categoryProducts = [...state.categoryProducts, ...uniqueNewProducts];
        }
        state.categoryTotal = action.payload.total || 0;
        state.categoryError = null;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.error.message || 'Failed to fetch category products';
      });

    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.creating = false;
        state.products.unshift(action.payload);
        state.total += 1;
        state.createError = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.error.message || 'Failed to create product';
      });

    // Update Product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.currentProduct?.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
        const categoryIndex = state.categoryProducts.findIndex(p => p.id === action.payload.id);
        if (categoryIndex !== -1) {
          state.categoryProducts[categoryIndex] = action.payload;
        }
        state.updateError = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.error.message || 'Failed to update product';
      });

    // Delete Product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleting = false;
        state.products = state.products.filter(p => p.id !== action.payload);
        state.categoryProducts = state.categoryProducts.filter(p => p.id !== action.payload);
        if (state.currentProduct?.id === action.payload) {
          state.currentProduct = null;
        }
        state.total = Math.max(0, state.total - 1);
        state.deleteError = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.error.message || 'Failed to delete product';
      });
  },
});

export const {
  setSearchQuery,
  setCategory,
  clearCurrentProduct,
  resetProducts,
} = productsSlice.actions;

export default productsSlice.reducer;

