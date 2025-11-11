'use client';

import { Menu } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden p-2.5 rounded-xl bg-input hover:bg-accent/20 transition-colors"
      aria-label="Menu"
      aria-expanded={isOpen}
    >
      <Menu size={20} />
    </button>
  );
}

