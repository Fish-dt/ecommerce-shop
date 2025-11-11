'use client';

import { ProductFormLayout } from '@/components/Product/ProductFormLayout';
import { CreateProductForm } from '@/components/Product/CreateProductForm';
import { useAddProduct } from '@/hooks/useAddProduct';

export default function AddProductPage() {
  const { register, control, handleSubmit, errors, isCreating, onSubmit } = useAddProduct();

  return (
    <ProductFormLayout title="Add New Product">
      <CreateProductForm
        register={register}
        control={control}
        errors={errors}
        isCreating={isCreating}
        onSubmit={handleSubmit(onSubmit)}
        showLabels
        submitText="Add Product"
        creatingText="Submitting..."
      />
    </ProductFormLayout>
  );
}
