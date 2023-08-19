import './globals.css';

import NextAuthProvider from 'providers/NextAuthProvider';
import UserMenu from 'ui/UserMenu';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend Boilerplate',
  description: 'Made with love by siyoga',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex flex-row items-center justify-between px-12 py-8 w-full">
          <span>Frontend Boilerplate</span>
          {!session ? (
            <span>
              <Link
                href={'/auth/signin'}
                className="bg-black rounded-lg px-6 py-3 text-white"
              >
                Sign In
              </Link>
            </span>
          ) : (
            <UserMenu session={session} />
          )}
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
