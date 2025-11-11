'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center shadow-md">
        <ShoppingBag size={24} className="text-white" />
      </div>
      <span className="text-2xl font-bold text-slate-900 dark:text-slate-50 hidden sm:inline">Ecommerce</span>
    </Link>
  );
}

