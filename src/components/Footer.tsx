'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, ShoppingBag } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-700 dark:to-slate-600 border-t border-slate-200 dark:border-slate-500 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center shadow-md">
                <ShoppingBag size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-slate-50">Ecommerce</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-200">
              Your one-stop shop for quality products. Shop with confidence and enjoy fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-sm text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/add-product" className="text-sm text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                  Add Product
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-200 dark:border-slate-500">
          <p className="text-sm text-slate-600 dark:text-slate-200">
            © {new Date().getFullYear()} Ecommerce. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href="#"
              className="text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="#"
              className="text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </Link>
            <Link
              href="#"
              className="text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

