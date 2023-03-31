import { GlobalStyle } from '../styles/globals';

import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import ProtectedRoute from '../components/ProtectedRoute';
import SidebarMenu from '../components/SidebarMenu';

export default function App({ Component, pageProps, router }: AppProps) {
  React.useEffect(() => {
    const storedTheme =
      localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <GlobalStyle />
      <ProtectedRoute router={router}>
        <SidebarMenu />

        <Component {...pageProps} />
      </ProtectedRoute>
    </>
  );
}
