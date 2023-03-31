import Cookies from 'js-cookie';

export const exists = () => {
  const token = (Cookies.get('token') as string) ? true : false;
  return token;
};
