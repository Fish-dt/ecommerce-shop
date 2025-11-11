import { z } from 'zod';

/**
 * Form Validation Schemas
 */

// Product Form Schema (for create/edit)
export const productFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  price: z
    .number({ error: 'Price is required' })
    .positive('Price must be greater than 0'),
  stock: z
    .number({ error: 'Stock is required' })
    .nonnegative('Stock cannot be negative'),
  brand: z.string().min(2, 'Brand must be at least 2 characters'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
});

// Infer types from schemas
export type ProductFormData = z.infer<typeof productFormSchema>;
export type ProductForm = ProductFormData;

