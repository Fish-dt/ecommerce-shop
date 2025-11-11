'use client';

interface EndOfResultsProps {
  message?: string;
}

export function EndOfResults({ message = 'No more products to load.' }: EndOfResultsProps) {
  return (
    <p className="text-center mt-6 text-muted-foreground text-sm">{message}</p>
  );
}

