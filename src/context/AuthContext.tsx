import React from 'react';
import { useToken } from '../utils/token';

const token = useToken();

export const AuthContext = React.createContext({
  exists: () => token.exists(),
  add: (cookieValue?: string, secretKey?: string) => token.encrypt(),
  remove: () => token.remove(),
});
