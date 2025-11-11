'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  submitText: string;
  isLoading?: boolean;
}

export function AuthForm({ onSubmit, children, submitText, isLoading = false }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {children}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Loading...' : submitText}
      </Button>
    </form>
  );
}

