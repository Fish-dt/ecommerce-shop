'use client';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'No products found. Try adjusting your search or filters.' }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground text-lg">{message}</p>
    </div>
  );
}

