// app/pages/_app.tsx
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import ErrorBoundary from './components/ErrorBoundary';
import '../globals.css';  // Import global styles

function MyApp({ Component, pageProps }: AppProps) {
  console.log('_app.tsx rendering');

  return (
    <ChakraProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default MyApp;
