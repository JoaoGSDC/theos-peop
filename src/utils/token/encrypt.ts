import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

export const encrypt = (cookieValue = '', secretKey = '') => {
  const encryptedValue = CryptoJS.AES.encrypt(cookieValue, secretKey).toString();
  Cookies.set('token', encryptedValue);
};
