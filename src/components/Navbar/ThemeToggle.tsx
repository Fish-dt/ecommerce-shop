'use client';

import { Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleTheme } from '@/features/theme/themeSlice';

interface ThemeToggleProps {
  mounted: boolean;
}

export function ThemeToggle({ mounted }: ThemeToggleProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.current);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleThemeToggle}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}

