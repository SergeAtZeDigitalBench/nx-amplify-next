'use client';

import { useState, useEffect } from 'react';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const BrowserMswProvider = ({ children }: Props): JSX.Element | null => {
  const [mockingEnabled, enableMocking] = useState(false);

  useEffect(() => {
    const enableApiMocking = async () => {
      /**
       * @fixme Next puts this import to the top of
       * this module and runs it during the build
       * in Node.js. This makes "msw/browser" import to fail.
       */
      const { browserWorker } = await import('../../lib/msw/browser');
      await browserWorker.start();
      enableMocking(true);
    };

    enableApiMocking();
  }, []);

  if (!mockingEnabled) {
    return null;
  }

  return <>{children}</>;
};

export default BrowserMswProvider;
