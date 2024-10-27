import type { Metadata } from 'next';
import { Providers } from '@/lib/providers';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Video Learning Platform',
  description: 'Learn through interactive video content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}