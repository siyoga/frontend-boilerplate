'use client';

import { signIn } from 'next-auth/react';
import type { ClientSafeProvider } from 'next-auth/react';

import { ButtonProps } from './Button';

interface Props extends Omit<Partial<ButtonProps>, 'onClick'> {
  provider: ClientSafeProvider;
}

export default function SignInButton({
  children,
  disabled,
  className,
  provider,
}: Props) {
  return (
    <button
      onClick={() => signIn(provider.id)}
      disabled={disabled}
      className={`rounded-lg flex flex-row items-center px-3 py-2 gap-3 font-semibold text-white justify-between${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </button>
  );
}
