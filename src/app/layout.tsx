import './globals.css';
import type { Metadata } from 'next';
import { useSession } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'UniSwap',
  description: 'Swap your unused semester tools and books',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
