// app/layout.tsx
import './globals.css';  // Global styles
import { Inter } from 'next/font/google';  // Google font
import { ChakraProvider } from '@chakra-ui/react';  // Chakra UI provider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ShelfSpace',  // Update with your app's title
  description: 'Your application description',  // Update with your app's description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('RootLayout rendering');  // Uncomment for debugging
  return (
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
  );
}
