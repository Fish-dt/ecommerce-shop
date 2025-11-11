'use client';

import { Button } from '@/components/ui/button';
import { ProductFormFields } from './ProductFormFields';
import type { UseFormRegister, FieldErrors, Control } from 'react-hook-form';
import type { ProductForm } from '@/types/forms';

interface CreateProductFormProps {
  register: UseFormRegister<ProductForm>;
  control: Control<ProductForm>;
  errors: FieldErrors<ProductForm>;
  isCreating: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  showLabels?: boolean;
  submitText?: string;
  creatingText?: string;
}

export function CreateProductForm({
  register,
  control,
  errors,
  isCreating,
  onSubmit,
  showLabels = false,
  submitText = 'Create Product',
  creatingText = 'Creating...',
}: CreateProductFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <ProductFormFields register={register} control={control} errors={errors} showLabels={showLabels} />
      <Button type="submit" disabled={isCreating}>
        {isCreating ? creatingText : submitText}
      </Button>
    </form>
  );
}

