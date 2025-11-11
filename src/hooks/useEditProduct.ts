import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchProductById,
  updateProduct,
  deleteProduct,
  clearCurrentProduct,
} from '@/features/products/productsSlice';
import {
  selectCurrentProduct,
  selectProductLoading,
  selectUpdating,
  selectDeleting,
  selectUpdateError,
  selectDeleteError,
} from '@/features/products/productsSelectors';
import { productFormSchema, type ProductForm } from '@/types/forms';
import { extractProductId } from '@/utils/params';
import { useToast } from '@/hooks/useToast';

export function useEditProduct(productId: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const product = useAppSelector(selectCurrentProduct);
  const isLoading = useAppSelector(selectProductLoading);
  const isUpdating = useAppSelector(selectUpdating);
  const isDeleting = useAppSelector(selectDeleting);
  const updateError = useAppSelector(selectUpdateError);
  const deleteError = useAppSelector(selectDeleteError);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [productId, dispatch]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema),
  });

  // Populate form when product loads
  useEffect(() => {
    if (product) {
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('price', Number(product.price));
      setValue('stock', product.stock);
      setValue('brand', product.brand);
      setValue('category', product.category);
    }
  }, [product, setValue]);

  const onSubmit = async (data: ProductForm) => {
    try {
      await dispatch(updateProduct({ id: productId, ...data })).unwrap();
      toast.success('Product updated successfully!');
      router.push(`/product/${productId}`);
    } catch (err) {
      toast.error(updateError || 'Failed to update product');
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      toast.success('Product deleted successfully!');
      router.push('/');
    } catch (err) {
      toast.error(deleteError || 'Failed to delete product');
    }
  };

  return {
    product,
    isLoading,
    isUpdating,
    isDeleting,
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    handleDelete,
  };
}

