import api from 'app/api/ky';
import { Tokens } from 'types/Tokens';

import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import { signInViaGoogle } from '../signin';

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
    async jwt({ token, account }) {
      if (account) {
        const jwtResponse = await signInViaGoogle(account.id_token as string);

        console.log('response: ' + jwtResponse);
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
