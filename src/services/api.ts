import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

let Token = Cookies.get('token') as string;

if (Token) {
  Token = CryptoJS.AES.decrypt(Token, '').toString(CryptoJS.enc.Utf8);
}

const Company = Cookies.get('company');

const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Token,
    Company,
  },
});

export default api;
