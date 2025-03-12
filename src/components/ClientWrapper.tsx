'use client';

import { useEffect } from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // This will run only on the client side
    document.documentElement.removeAttribute('data-headlessui-focus-visible');
  }, []);

  return <>{children}</>;
} 