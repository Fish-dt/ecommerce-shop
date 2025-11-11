import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchProducts,
  fetchProductsByCategory,
  setSearchQuery,
  setCategory,
  resetProducts,
} from '@/features/products/productsSlice';
import {
  selectDisplayProducts,
  selectDisplayLoading,
  selectDisplayError,
  selectHasMore,
  selectCategory,
  selectSearchQuery,
} from '@/features/products/productsSelectors';

const PRODUCTS_PER_PAGE = 10;
const SEARCH_DEBOUNCE_MS = 400;

export function useProductList() {
  const dispatch = useAppDispatch();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const hasInitialLoad = useRef(false);

  // Redux state
  const products = useAppSelector(selectDisplayProducts);
  const isLoading = useAppSelector(selectDisplayLoading);
  const error = useAppSelector(selectDisplayError);
  const hasMore = useAppSelector(selectHasMore);
  const selectedCategory = useAppSelector(selectCategory);
  const searchQuery = useAppSelector(selectSearchQuery);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localSearchQuery));
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [localSearchQuery, dispatch]);

  // Initial product load
  useEffect(() => {
    if (!hasInitialLoad.current) {
      hasInitialLoad.current = true;
      dispatch(fetchProducts({ limit: PRODUCTS_PER_PAGE, skip: 0 }));
    }
  }, [dispatch]);

  // Fetch products when filters change
  useEffect(() => {
    if (!hasInitialLoad.current) return;

    dispatch(resetProducts());

    if (selectedCategory) {
      dispatch(
        fetchProductsByCategory({
          category: selectedCategory,
          limit: PRODUCTS_PER_PAGE,
          skip: 0,
        })
      );
    } else if (searchQuery) {
      dispatch(
        fetchProducts({
          limit: PRODUCTS_PER_PAGE,
          skip: 0,
          search: searchQuery,
        })
      );
    } else {
      dispatch(fetchProducts({ limit: PRODUCTS_PER_PAGE, skip: 0 }));
    }
  }, [selectedCategory, searchQuery, dispatch]);

  // Load more products for pagination
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    const nextSkip = products.length;

    if (selectedCategory) {
      dispatch(
        fetchProductsByCategory({
          category: selectedCategory,
          limit: PRODUCTS_PER_PAGE,
          skip: nextSkip,
        })
      );
    } else if (searchQuery) {
      dispatch(
        fetchProducts({
          limit: PRODUCTS_PER_PAGE,
          skip: nextSkip,
          search: searchQuery,
        })
      );
    } else {
      dispatch(fetchProducts({ limit: PRODUCTS_PER_PAGE, skip: nextSkip }));
    }
  }, [products.length, isLoading, hasMore, selectedCategory, searchQuery, dispatch]);

  // Clear search when category is selected
  useEffect(() => {
    if (selectedCategory && localSearchQuery) {
      setLocalSearchQuery('');
      dispatch(setSearchQuery(''));
    }
  }, [selectedCategory, localSearchQuery, dispatch]);

  // Category change handler
  const handleCategoryChange = useCallback(
    (category: string | null) => {
      dispatch(setCategory(category));
    },
    [dispatch]
  );

  return {
    products,
    isLoading,
    error,
    hasMore,
    selectedCategory,
    localSearchQuery,
    setLocalSearchQuery,
    handleCategoryChange,
    loadMore,
  };
}

