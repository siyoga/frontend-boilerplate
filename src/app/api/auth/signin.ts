import { Tokens } from 'types/Tokens';

import api from '../ky';

export async function signInViaGoogle(tokenId: string): Promise<Tokens | void> {
  const response = await api.get('auth/login/google', {
    headers: { Authorization: `Bearer ${tokenId}` },
  });

  console.log(response);
  return response.json<Tokens | void>();
}
