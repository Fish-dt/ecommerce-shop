import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProductById, clearCurrentProduct } from '@/features/products/productsSlice';
import {
  selectCurrentProduct,
  selectProductLoading,
  selectProductError,
} from '@/features/products/productsSelectors';
import { extractProductId } from '@/utils/params';

export function useProductDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const productId = extractProductId(id);

  const product = useAppSelector(selectCurrentProduct);
  const isLoading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [productId, dispatch]);

  return {
    product,
    isLoading,
    error,
    productId,
  };
}

