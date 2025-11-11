'use client';
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from 'next-auth/react';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from "sonner";
import { FavoritesInitializer } from '@/components/Favorites/FavoritesInitializer';
import { SEOHead } from '@/components/SEO/SEOHead';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${plusJakartaSans.variable} antialiased flex flex-col min-h-screen`}
      >
        <SEOHead />
        <SessionProvider>
        <Provider store={store}>
          <FavoritesInitializer />
          <Navbar/>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer/>
            <Toaster position="top-right" />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
