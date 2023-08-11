import { authOptions } from 'app/api/auth/[...nextauth]/route';

import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import Button from './components/Button';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <header className="flex flex-row items-center justify-between px-16 py-8 w-full">
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
        <p>{session.user.name}</p>
      )}
    </header>
  );
}
