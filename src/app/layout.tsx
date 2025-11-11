import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

import { AppProviders } from '@/components/AppProviders';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/seo';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

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
        <AppProviders>
          {children}
        </AppProviders>
        <Footer/>
      </body>
    </html>
  );
}
