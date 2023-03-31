import React from 'react';
import MenuList from '@mui/material/MenuList';

import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';

import { Container, Figure, MenuItemOption } from './styles';
import { useToken } from '../../utils/token';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SidebarMenu() {
  const router = useRouter();
  const token = useToken();
  const isAuth = token.exists();

  return (
    <>
      {isAuth ? (
        <Container>
          <Figure>
            <img src="/assets/theos-peop-logo.png" alt="logo" />
          </Figure>

          <MenuList>
            <Link href={`/`}>
              <MenuItemOption selectedMenuItem={router.pathname === '/'}>
                <HomeIcon /> Início
              </MenuItemOption>
            </Link>

            <Link href={`/analytics`}>
              <MenuItemOption selectedMenuItem={router.pathname.includes('/analytics')}>
                <InsightsIcon />
                Analytics
              </MenuItemOption>
            </Link>

            <Link href={`/vagas`}>
              <MenuItemOption selectedMenuItem={router.pathname.includes('/vagas')}>
                <WorkIcon /> Vagas
              </MenuItemOption>
            </Link>

            <Link href={`/profissionais`}>
              <MenuItemOption selectedMenuItem={router.pathname.includes('/profissionais')}>
                <PeopleIcon />
                Profissionais
              </MenuItemOption>
            </Link>
          </MenuList>
        </Container>
      ) : null}
    </>
  );
}

export default SidebarMenu;
