'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search products...' }: SearchBarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div id="search" className="mb-6 scroll-mt-20">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
          <Input
            type="search"
            placeholder={placeholder}
            value=""
            readOnly
            className="pl-10"
            aria-label="Search products"
          />
        </div>
      </div>
    );
  }

  return (
    <div id="search" className="mb-6 scroll-mt-20">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4 w-4 pointer-events-none" />
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
          aria-label="Search products"
        />
      </div>
    </div>
  );
}

