import 'tailwindcss/tailwind.css';
import '../globalStyles.scss';

import type {AppProps} from 'next/app';
import {memo} from 'react';
import {Metadata} from 'next';

// Add metadata configuration
export const metadata: Metadata = {
  title: 'M&A Marketplace',
  description: 'A state-of-the-art platform for buying and selling businesses',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const MyApp = memo(({Component, pageProps}: AppProps): JSX.Element => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
});

MyApp.displayName = 'MyApp';
export default MyApp;
