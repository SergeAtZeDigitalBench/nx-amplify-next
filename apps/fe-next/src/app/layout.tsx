import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import BrowserMswProvider from '../providers/BrowserMswProvider';
import QueryProvider from '../providers/QueryProvider';
import Navigation from '../components/Navigation';
import { albertSans, notoSans } from '../lib/fonts';
import '../styles/global.css';

export const metadata: Metadata = {
  title: 'Welcome to fe-next',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { serverWorker } = await import('../lib/msw/server');

    serverWorker.listen();
  }

  return (
    <html lang="en" className={`${notoSans.className} ${albertSans.variable}`}>
      <body>
        <BrowserMswProvider>
          <QueryProvider>
            <header className=" bg-slate-900">
              <Navigation />
            </header>
            <main className="max-w-5xl mx-auto">{children}</main>
            <footer></footer>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </BrowserMswProvider>
      </body>
    </html>
  );
};

export default RootLayout;
