import { apiClient, handleApiError } from './api';
import { Product } from '@/types/product';

export type { Product };

export interface ProductListResponse {
  products: Product[];
  total?: number;
  skip?: number;
  limit?: number;
}

export interface CreateProductInput {
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  discountPercentage?: number;
  rating?: number;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string | number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

// Get all products with pagination
export const listProducts = async (params: {
  limit?: number;
  skip?: number;
  search?: string;
}): Promise<ProductListResponse> => {
  try {
    const { limit = 10, skip = 0, search } = params;
    const url = search
      ? `/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
      : `?limit=${limit}&skip=${skip}`;
    const res = await apiClient.get<ProductListResponse>(url);
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get product by ID
export const fetchProduct = async (id: string): Promise<Product> => {
  try {
    const res = await apiClient.get<Product>(`/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await apiClient.get<string[] | Category[]>('/categories');
    // Handle array of category strings or objects
    if (Array.isArray(res.data)) {
      return res.data.map((cat) => {
        // If it's already a Category object, return it
        if (typeof cat === 'object' && cat !== null && 'slug' in cat && 'name' in cat) {
          return cat as Category;
        }
        // If it's a string, transform it to Category object
        if (typeof cat === 'string') {
          return {
            slug: cat.toLowerCase().replace(/\s+/g, '-'),
            name: cat.charAt(0).toUpperCase() + cat.slice(1),
            url: `/category/${cat.toLowerCase().replace(/\s+/g, '-')}`,
          };
        }
        return null;
      }).filter((cat): cat is Category => cat !== null);
    }
    return [];
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get products by category
export const getProductsByCategory = async (params: {
  category: string;
  limit?: number;
  skip?: number;
}): Promise<ProductListResponse> => {
  try {
    const { category, limit = 10, skip = 0 } = params;
    const res = await apiClient.get<ProductListResponse>(
      `/category/${category}?limit=${limit}&skip=${skip}`
    );
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Create product
export const createProduct = async (data: CreateProductInput): Promise<Product> => {
  try {
    const res = await apiClient.post<Product>('/add', data);
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update product
export const updateProduct = async (
  id: string | number,
  data: Partial<CreateProductInput>
): Promise<Product> => {
  try {
    const res = await apiClient.patch<Product>(`/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete product
export const deleteProduct = async (id: string | number): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
