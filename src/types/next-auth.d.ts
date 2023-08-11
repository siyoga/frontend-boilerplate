import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      createdAt: string;
      updatedAt: string;
    } & Required<DefaultSession['user']>;
  }

  interface User extends DefaultUser {
    createdAt?: string;
    updatedAt?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: 'RefreshAccessTokenError';
  }
}
