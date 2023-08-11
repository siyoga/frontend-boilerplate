export interface User {
  id: string;
  email: string;
  username: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCredentials
  extends Omit<User, 'picture' | 'createdAt' | 'updatedAt' | 'id'> {
  password?: string;
}
