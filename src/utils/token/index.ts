import { decrypt } from './decrypt';
import { encrypt } from './encrypt';
import { exists } from './exists';
import { remove } from './remove';

export const useToken = () => {
  return {
    decrypt,
    encrypt,
    exists,
    remove,
  };
};
