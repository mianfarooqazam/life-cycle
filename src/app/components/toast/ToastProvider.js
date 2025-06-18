'use client';

import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function ToastProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Toaster 
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          fontSize: '14px',
          borderRadius: '8px',
          padding: '12px 16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontFamily: 'var(--font-numans)',
        },
        success: {
          style: {
            background: '#5BB045',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#5BB045',
          },
        },
        error: {
          style: {
            background: '#f56565',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#f56565',
          },
        },
        loading: {
          style: {
            background: '#3b82f6',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#3b82f6',
          },
        },
      }}
    />
  );
}