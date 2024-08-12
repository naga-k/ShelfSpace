// app/layout.tsx

'use client';

// import './globals.css';  // Global styles
import { Inter } from 'next/font/google';  // Google font
import { ChakraProvider } from '@chakra-ui/react';  // Chakra UI provider
import { useEffect } from 'react';
import { initializeFirebase } from '../firebase';  // Adjust the import path as necessary
import ErrorBoundary from '../components/ErrorBoundary';  // Error boundary component
import Head from 'next/head';  // Import Head component

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('RootLayout rendering');  // Uncomment for debugging

  useEffect(() => {
    initializeFirebase(); // Call the initializeFirebase function
  }, []);

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