'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function NextAuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
