'use client';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <p className="text-foreground">{message}</p>
    </div>
  );
}

