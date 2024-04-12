import { QueryClientProvider } from '@tanstack/react-query';

import type { ReactNode } from 'react';

import { getQueryClient } from '../index';

export const createWrapper = () => {
  // ✅ creates a new QueryClient for each test
  const queryClient = getQueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });

  const ReactQueryWrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return ReactQueryWrapper;
};
