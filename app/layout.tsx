'use client';

import type React from 'react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './globals.css';
import {
  clearMessage,
  getUnloadedErrorMessages,
  updateLogLoadStates,
} from '@/store/error-slice';
import { toast } from 'sonner';

export const metadata: Metadata = {
  title: 'Rentflow360 - Find Your Perfect Property in Kenya',
  description:
    'Discover, filter, and interact with property listings across Kenyan cities',
  generator: 'Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const unloadedErrors = useSelector(getUnloadedErrorMessages());
  const dispatch = useDispatch();

  useEffect(() => {
    if (unloadedErrors.length > 0) {
      const loadedMsgs: string[] = [];

      unloadedErrors.forEach((err) => {
        const onDismiss = () => {
          dispatch(clearMessage({ text: err.text }));
        };

        if (err.type === 'error') {
          toast.error(err.text, { onDismiss, onAutoClose: onDismiss });
        } else if (err.type === 'info') {
          toast.info(err.text, { onDismiss, onAutoClose: onDismiss });
        } else if (err.type === 'success') {
          toast.success(err.text, { onDismiss, onAutoClose: onDismiss });
        } else {
          toast.info(err.text, { onDismiss, onAutoClose: onDismiss });
        }

        loadedMsgs.push(err.text);
      });

      dispatch(updateLogLoadStates(loadedMsgs));
    }
  }, [unloadedErrors]);

  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased flex flex-col items-center sm:px-2`}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
