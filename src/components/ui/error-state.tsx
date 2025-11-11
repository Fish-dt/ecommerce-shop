'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  title?: string;
}

export function ErrorState({ message = 'Something went wrong.', title = 'Error' }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

