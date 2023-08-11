import Link from 'next/link';

import Button from './components/Button';

export default function Navbar() {
  return (
    <header className="flex flex-row items-center justify-between px-16 py-8 w-full">
      <span>Frontend Boilerplate</span>
      <span>
        <Link
          href={'/auth/signin'}
          className="bg-black rounded-lg px-6 py-3 text-white"
        >
          Sign In
        </Link>
      </span>
    </header>
  );
}
