import React from 'react';
import { TextField } from '@mui/material';
import useForm from '../../components/UseForm';
import { PrimaryButton } from '../../styles/globals';
import { Container, Figure, Form } from './styles';
import { useToken } from '../../utils/token';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import Cookies from 'js-cookie';
import auth from '../../services/auth';
import { useRouter } from 'next/router';

function Login() {
  const token = useToken();
  const router = useRouter();

  const { add } = React.useContext(AuthContext);

  const fields = {
    email: '',
    password: '',
  };

  const { form, handleInputChange } = useForm({ fields });

  React.useEffect(() => {
    if (token.exists()) {
      router.push('/');
    }
  }, []);

  const handleAuthentication = async (event?: any) => {
    if (form.email === '' || form.password === '') {
      return;
    }

    if (event && event.keyCode !== 13) {
      return;
    }

    await auth(form.email, form.password).then((res: any) => {
      add(`${res.data.token}`);
      Cookies.set('company', res.data.company);
      Cookies.set('user', res.data.name);

      router.push('/');
    });
  };

  return (
    <>
      <Container>
        <Form>
          <Figure>
            <img src="/assets/theos-peop-logo.png" alt="logo" />
          </Figure>

          <TextField
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleInputChange}
            fullWidth
            onKeyDown={handleAuthentication}
          />

          <TextField
            name="password"
            label="Senha"
            type="password"
            value={form.password}
            onChange={handleInputChange}
            fullWidth
            onKeyDown={handleAuthentication}
          />

          <PrimaryButton type="button" onClick={() => handleAuthentication()}>
            Entrar
          </PrimaryButton>
        </Form>
      </Container>
    </>
  );
}

export default Login;
