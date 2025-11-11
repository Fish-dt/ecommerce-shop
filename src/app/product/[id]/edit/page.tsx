'use client';

import { useParams } from 'next/navigation';
import { ProductImagePreview } from '@/components/Product/ProductImagePreview';
import { EditProductForm } from '@/components/Product/EditProductForm';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import { useEditProduct } from '@/hooks/useEditProduct';
import { extractProductId } from '@/utils/params';

export default function EditProductPage() {
  const { id } = useParams();
  const productId = extractProductId(id);
  const {
    product,
    isLoading,
    isUpdating,
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    handleDelete,
  } = useEditProduct(productId);

  if (isLoading) return <LoadingState />;
  if (!product) return <ErrorState message="Product not found." title="Not Found" />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 flex justify-center items-start">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
        <ProductImagePreview product={product} />
        <EditProductForm
          register={register}
          control={control}
          errors={errors}
          isUpdating={isUpdating}
          onSubmit={handleSubmit(onSubmit)}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}
