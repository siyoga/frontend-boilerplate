import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import { login, registerViaGoogle } from '../auth';

const handler = NextAuth({
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
    async signIn({ account, user }) {
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
          account.refresh_token = loginResponse.refreshToken;

          return true;

        default:
          return '/unknownProvider';
      }
    },
  },
});

export { handler as GET, handler as POST };
