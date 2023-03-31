import Cookies from 'js-cookie';

export const remove = () => {
  Cookies.remove('token');
};
