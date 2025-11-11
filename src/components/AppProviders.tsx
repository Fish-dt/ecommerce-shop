'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Toaster } from 'sonner';
import { FavoritesInitializer } from '@/components/Favorites/FavoritesInitializer';
import { Navbar } from '@/components/Navbar';

interface AppProvidersProps {
	children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
	return (
		<SessionProvider>
			<Provider store={store}>
				<FavoritesInitializer />
				<Navbar />
				<div className="flex-1 flex flex-col">{children}</div>
				<Toaster position="top-right" />
			</Provider>
		</SessionProvider>
	);
}


