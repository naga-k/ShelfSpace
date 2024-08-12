// app/layout.tsx

'use client';

import './globals.css';  // Global styles
import { Inter } from 'next/font/google';  // Google font
import { ChakraProvider } from '@chakra-ui/react';  // Chakra UI provider
import { useEffect, useState } from 'react';  // Import useState
import { initializeFirebase } from './firebase';  // Adjust the import path as necessary
import ErrorBoundary from './components/ErrorBoundary';  // Error boundary component
import Head from 'next/head';  // Import Head component

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);  // Define the state

  useEffect(() => {
    const initFirebase = async () => {
      try {
        await initializeFirebase();
      } catch (error) {
        console.error('Error initializing Firebase:', error);
      } finally {
        setFirebaseInitialized(true);  // Update state when initialization is complete
      }
    };

    initFirebase();
  }, []);

  if (!firebaseInitialized) {
    return (
      <html lang="en">
        <Head>
          <title>Loading...</title>
        </Head>
        <body>
          <div>Loading...</div>  {/* Display a loading message or spinner */}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <Head>
        <title>ShelfSpace</title>
        <meta name="description" content="Your application description" />
      </Head>
      <body className={inter.className}>
        <ChakraProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ChakraProvider>
      </body>
    </html>
  );
}
