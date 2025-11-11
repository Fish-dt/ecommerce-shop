'use client';

import { Search, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function NavbarActions() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push('/#search');
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleSearchClick}
        className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        aria-label="Search"
      >
        <Search size={20} />
      </button>

      <Link
        href="/favorites"
        className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        aria-label="Favorites"
      >
        <Heart size={20} />
      </Link>
    </div>
  );
}

