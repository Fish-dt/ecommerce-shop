'use client';

import { Button } from '@/components/ui/button';
import { ProductFormFields } from './ProductFormFields';
import { DeleteProductDialog } from './DeleteProductDialog';
import type { UseFormRegister, FieldErrors, Control } from 'react-hook-form';
import type { ProductForm } from '@/types/forms';

interface EditProductFormProps {
  register: UseFormRegister<ProductForm>;
  control: Control<ProductForm>;
  errors: FieldErrors<ProductForm>;
  isUpdating: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onDelete: () => void;
}

export function EditProductForm({
  register,
  control,
  errors,
  isUpdating,
  onSubmit,
  onDelete,
}: EditProductFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Edit Product</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <ProductFormFields register={register} control={control} errors={errors} showLabels />
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button 
            type="submit" 
            disabled={isUpdating}
            className="bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-500 dark:to-blue-500 hover:from-sky-700 hover:to-blue-700 dark:hover:from-sky-600 dark:hover:to-blue-600 text-white"
          >
            {isUpdating ? 'Updating...' : 'Update Product'}
          </Button>
          <DeleteProductDialog onDelete={onDelete} />
        </div>
      </form>
    </div>
  );
}

