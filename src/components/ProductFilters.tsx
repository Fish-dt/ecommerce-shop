'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCategories } from '@/features/categories/categoriesSlice';
import { selectCategories, selectCategoriesLoading } from '@/features/categories/categoriesSelectors';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ProductFiltersProps } from '@/types/components';

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesLoading);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Auto-expand on desktop
      if (!mobile) {
        setIsOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const handleCategoryClick = (slug: string | null) => {
    onCategoryChange(slug);
    // Close on mobile after selection
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleHeaderClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-gradient-to-br dark:from-slate-700 dark:to-slate-600 border-slate-200 dark:border-slate-500 shadow-md">
      <CardHeader 
        className="pb-4 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-slate-600 dark:to-slate-500 border-b border-slate-200 dark:border-slate-500 cursor-pointer lg:cursor-default"
        onClick={handleHeaderClick}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-50">Categories</CardTitle>
          <button
            type="button"
            className="lg:hidden text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            aria-label={isOpen ? 'Collapse categories' : 'Expand categories'}
          >
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </CardHeader>
      <CardContent className={cn(
        "space-y-2 pt-4 transition-all duration-300",
        "lg:block",
        isOpen ? "block" : "hidden"
      )}>
        {isLoading ? (
          <div className="text-sm text-slate-600 dark:text-slate-300 py-4">Loading categories...</div>
        ) : (
          <div className="space-y-1">
            <button
              onClick={() => handleCategoryClick(null)}
              className={cn(
                'w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors',
                selectedCategory === null
                  ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-600/50'
              )}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className={cn(
                  'w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors',
                  selectedCategory === category.slug
                    ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-600/50'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

