'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCategories } from '@/features/categories/categoriesSlice';
import { selectCategories, selectCategoriesLoading } from '@/features/categories/categoriesSelectors';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ControllerRenderProps } from 'react-hook-form';
import type { ProductForm } from '@/types/forms';

interface CategorySelectProps {
  field: ControllerRenderProps<ProductForm, 'category'>;
  error?: string;
  showLabel?: boolean;
}

export function CategorySelect({ field, error, showLabel = false }: CategorySelectProps) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesLoading);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <div>
      {showLabel && <label className="block mb-1 text-sm font-medium">Category</label>}
      <Select
        value={field.value}
        onValueChange={field.onChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              Loading categories...
            </SelectItem>
          ) : categories.length === 0 ? (
            <SelectItem value="no-categories" disabled>
              No categories available
            </SelectItem>
          ) : (
            categories.map((category) => (
              <SelectItem key={category.slug || category} value={category.slug || category}>
                {category.name || category}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

