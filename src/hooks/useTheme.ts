import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

export function useTheme() {
  const theme = useAppSelector((state) => state.theme.current);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.className = theme;
    }
  }, [theme, mounted]);

  return { theme, mounted };
}

