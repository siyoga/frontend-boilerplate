import { Tokens } from 'types/Tokens';
import { UserCredentials } from 'types/User';

import api from '../ky';

export async function registerViaGoogle(
  tokenId: string
): Promise<UserCredentials | false> {
  const registerResponse = await api.get('auth/register/google', {
    headers: { Authorization: `Bearer ${tokenId}` },
  });

  if (!registerResponse.ok || registerResponse.status !== 201) {
    return false;
  }

  return await registerResponse.json<UserCredentials>();
}

export async function login(
  credentials: UserCredentials
): Promise<Tokens | false> {
  const response = await api.post('auth/login', {
    body: JSON.stringify(credentials),
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.status === 400) {
    return false;
  }

  return await response.json<Tokens>();
}
