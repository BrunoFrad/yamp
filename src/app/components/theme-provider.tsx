'use client';

import dynamic from 'next/dynamic';
import type { ThemeProviderProps } from 'next-themes';

const NextThemesProvider = dynamic(
  () => import('next-themes').then(mod => mod.ThemeProvider),
  { ssr: false }
);

export function ThemeProviderClient(props: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{props.children}</NextThemesProvider>;
}