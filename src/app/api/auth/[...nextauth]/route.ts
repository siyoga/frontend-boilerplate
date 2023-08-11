import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { use } from 'react';

import { login, refresh, registerViaGoogle, whoAmI } from '../auth';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 1296000,
  },
  pages: {
    signIn: 'auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      switch (account?.provider) {
        case 'google':
          const registerResponse = await registerViaGoogle(
            account.id_token as string
          );

          if (!registerResponse) {
            return '/unauthorized';
          }

          const loginResponse = await login(registerResponse);

          console.log('LOGIN RES: ' + loginResponse);

          if (!loginResponse) {
            return '/unauthorized';
          }

          account.access_token = loginResponse.accessToken;
          account.expires_at = loginResponse.exp;
          account.refresh_token = loginResponse.refreshToken;

          return true;

        default:
          return '/unknownProvider';
      }
    },

    async jwt({ account, token }) {
      if (account) {
        return {
          access_token: account.access_token,
          expires_at: Math.floor(
            Date.now() / 1000 + (account.expires_at as number)
          ),
          refresh_token: account.refresh_token,
        } as JWT;
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        try {
          const response = await refresh(token.refresh_token);

          if (!response) {
            throw response;
          }

          return {
            ...token,
            access_token: response.accessToken,
            refresh_token: response.refreshToken ?? token.refresh_token,
            expires_at: response.exp,
          };
        } catch (error) {
          return { ...token, error: 'RefreshAccessTokenError' as const };
        }
      }
    },

    async session({ session, token }) {
      const user = await whoAmI(token.access_token);

      if (user) {
        session.user = { ...user, name: user.username, image: user.picture };
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
