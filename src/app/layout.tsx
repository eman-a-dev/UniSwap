import './globals.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar/Navbar';

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
