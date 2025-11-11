'use client';

import { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-8">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
        {children}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}

