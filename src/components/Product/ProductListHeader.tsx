'use client';

interface ProductListHeaderProps {
  title?: string;
}

export function ProductListHeader({ title = 'E-Commerce Products' }: ProductListHeaderProps) {
  return <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50">{title}</h1>;
}

