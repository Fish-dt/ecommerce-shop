'use client';

import { ReactNode } from 'react';

interface ProductFormLayoutProps {
  title: string;
  children: ReactNode;
}

export function ProductFormLayout({ title, children }: ProductFormLayoutProps) {
  return (
    <main className="container mx-auto px-4 py-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      {children}
    </main>
  );
}

