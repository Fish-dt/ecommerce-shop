'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { loadFavorites } from '@/features/favorites/favoritesSlice';

/**
 * Component to initialize favorites from localStorage on client-side mount
 * This prevents hydration mismatches and ensures favorites are loaded after React hydration
 */
export function FavoritesInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  return null;
}

