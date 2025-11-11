'use client';

interface FavoritesEmptyProps {
  message?: string;
}

export function FavoritesEmpty({
  message = "You haven't favorited any products yet.",
}: FavoritesEmptyProps) {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground text-lg">{message}</p>
    </div>
  );
}

