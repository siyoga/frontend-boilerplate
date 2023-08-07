import LogoStore from 'store/LogoStore';
import SignInButton from 'ui/components/SignInButton';

import Image from 'next/image';
import { getProviders } from 'next-auth/react';

export default async function SignIn() {
  const providers = await getProviders();

  return (
    <div className="flex flex-col items-center justify-center">
      {providers ? (
        Object.values(providers).map((provider) => (
          <SignInButton
            key={provider.id}
            className="bg-red-400"
            provider={provider}
          >
            <Image
              alt={`${provider.id}_logo`}
              src={LogoStore[`${provider.id}`]}
              className="w-8"
            />
            {`Sign in with ${provider.name}`}
          </SignInButton>
        ))
      ) : (
        <p>Something went wrong...</p>
      )}
    </div>
  );
}
