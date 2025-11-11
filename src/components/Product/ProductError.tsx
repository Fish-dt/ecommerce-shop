'use client';

import { AlertCircle } from 'lucide-react';

interface ProductErrorProps {
  message?: string;
}

export function ProductError({ message = 'Failed to load products. Please try again.' }: ProductErrorProps) {
  return (
    <div
      className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg flex items-center gap-2"
      role="alert"
    >
      <AlertCircle className="h-5 w-5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

