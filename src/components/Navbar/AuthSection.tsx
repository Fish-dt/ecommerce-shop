'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { PlusSquare, User, LogOut } from 'lucide-react';

export function AuthSection() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <Link
          href="/signin"
          className="hidden md:flex text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="hidden md:flex px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-500 dark:to-blue-500 text-white hover:shadow-lg transition-all"
        >
          Sign Up
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/add-product"
        className="hidden md:flex text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
        aria-label="Add Product"
      >
        <PlusSquare size={20} />
      </Link>
      <div className="hidden md:flex items-center gap-2">
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || ''}
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold">
            {session.user?.name?.[0] || <User size={16} />}
          </div>
        )}
        <button
          onClick={() => signOut()}
          className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          aria-label="Sign Out"
        >
          <LogOut size={20} />
        </button>
      </div>
    </>
  );
}

