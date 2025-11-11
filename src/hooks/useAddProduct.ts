import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createProduct } from '@/features/products/productsSlice';
import { selectCreating, selectCreateError } from '@/features/products/productsSelectors';
import { productFormSchema, type ProductForm } from '@/types/forms';
import { toast } from 'sonner';

export function useAddProduct() {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreating);
  const createError = useAppSelector(selectCreateError);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit = async (data: ProductForm) => {
    try {
      await dispatch(createProduct(data)).unwrap();
      toast.success('Product created successfully!');
      reset();
    } catch (err) {
      console.error(err);
      toast.error(createError || 'Failed to create product.');
    }
  };

  return {
    register,
    control,
    handleSubmit,
    errors,
    isCreating,
    onSubmit,
  };
}

