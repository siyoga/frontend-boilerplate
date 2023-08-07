import googleLogo from 'public/google.svg';

type Store = {
  [key: string]: string;
};

const LogoStore: Store = {
  google: googleLogo,
};

export default LogoStore;
