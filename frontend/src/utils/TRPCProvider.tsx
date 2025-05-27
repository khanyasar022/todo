'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from './trpc'; // Assuming trpc.ts is in the same directory
// AppRouter import might not be needed here if trpc object is correctly typed via createTRPCReact
// import { AppRouter } from '../../../server/src/router'; 

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: process.env.NEXT_PUBLIC_TRPC_URL || 'http://localhost:5000/trpc',
          // You can pass any headers you need here, e.g., for authentication
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

// Removed the trpcProxy export as it's not standard and can be confusing.
// The trpc object from './trpc' should be used for hooks. 