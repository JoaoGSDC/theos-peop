import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

export const decrypt = () => {
  const token = Cookies.get('token') as string;
  const decryptedValue = CryptoJS.AES.decrypt(token, '').toString(CryptoJS.enc.Utf8);

  return decryptedValue;
};
