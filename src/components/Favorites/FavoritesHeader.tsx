'use client';

interface FavoritesHeaderProps {
  title?: string;
}

export function FavoritesHeader({ title = 'Your Favorites' }: FavoritesHeaderProps) {
  return <h1 className="text-2xl font-bold mb-6">{title}</h1>;
}

