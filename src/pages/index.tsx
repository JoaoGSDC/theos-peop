import React from 'react';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import HeaderPage from '../components/HeaderPage';
import Sidebar from '../components/Sidebar';
import { HeaderHomePageContainer, HomePageContainer } from '../styles/home.styles';
import Cookies from 'js-cookie';

export default function Home() {
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    const _name = Cookies.get('user') as string;
    setName(_name);
  }, []);

  return (
    <>
      <HomePageContainer>
        <HeaderHomePageContainer>
          <HeaderPage main={name} subtext="Esse é o portal do People Management!" />

          {/* <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Pesquisar</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              label="Pesquisar"
            />
          </FormControl> */}
        </HeaderHomePageContainer>
      </HomePageContainer>

      <Sidebar />
    </>
  );
}
