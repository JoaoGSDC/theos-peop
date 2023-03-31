import axios from 'axios';

const authentication = axios.create({
  baseURL: process.env.BASE_URL,
});

const auth = async (email: string, password: string) =>
  await authentication.put('/api/users/findOne', { email, password });

export default auth;
