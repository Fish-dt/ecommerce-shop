import axios from 'axios';

/**
 * Base API configuration
 */
export const API_BASE = 'https://dummyjson.com/products';

/**
 * Create axios instance with default config
 */
export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Handle API errors
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
};

