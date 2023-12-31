import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

const noto_sans = Noto_Sans({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PMFB - Dashboard',
  description: 'Banking made easy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={noto_sans.className}>
      <body className="xl:max-w-[1280px] w-full text-center">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
