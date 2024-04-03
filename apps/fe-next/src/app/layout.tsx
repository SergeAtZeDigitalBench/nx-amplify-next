import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import Navigation from '../components/Navigation';
import { albertSans, notoSans } from '../lib/fonts';
import '../styles/global.css';

export const metadata: Metadata = {
  title: 'Welcome to fe-next',
  description: 'Generated by create-nx-workspace',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={`${notoSans.className} ${albertSans.variable}`}>
      <body>
        <header className=" bg-slate-900">
          <Navigation />
        </header>
        <main className="max-w-5xl mx-auto">{children}</main>
        <footer></footer>
      </body>
    </html>
  );
};

export default RootLayout;
