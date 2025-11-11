'use client';

import { useState } from 'react';
import { NavbarLogo } from './Navbar/NavbarLogo';
import { NavbarActions } from './Navbar/NavbarActions';
import { ThemeToggle } from './Navbar/ThemeToggle';
import { AuthSection } from './Navbar/AuthSection';
import { MobileMenuButton } from './Navbar/MobileMenuButton';
import { useTheme } from '@/hooks/useTheme';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mounted } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          <NavbarLogo />

          <div className="flex items-center gap-4">
            <NavbarActions />
            <ThemeToggle mounted={mounted} />
            <AuthSection />
            <MobileMenuButton isOpen={mobileOpen} onToggle={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
      </div>
    </nav>
  );
}
