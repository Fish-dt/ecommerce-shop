'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CategorySelect } from './CategorySelect';
import type { FieldErrors, UseFormRegister, Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { ProductForm } from '@/types/forms';

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductForm>;
  control: Control<ProductForm>;
  errors: FieldErrors<ProductForm>;
  showLabels?: boolean;
}

export function ProductFormFields({ register, control, errors, showLabels = false }: ProductFormFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        {showLabels && <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>}
        <Input {...register('title')} placeholder="Title" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        {showLabels && <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>}
        <Textarea {...register('description')} placeholder="Description" className="min-h-[100px]" />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        {showLabels && <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Price</label>}
        <Input
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          placeholder="Price"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>

      <div>
        {showLabels && <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Stock</label>}
        <Input
          type="number"
          {...register('stock', { valueAsNumber: true })}
          placeholder="Stock"
        />
        {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
      </div>

      <div>
        {showLabels && <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Brand</label>}
        <Input {...register('brand')} placeholder="Brand" />
        {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
      </div>

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <CategorySelect field={field} error={errors.category?.message} showLabels={showLabels} />
        )}
      />
    </div>
  );
}

