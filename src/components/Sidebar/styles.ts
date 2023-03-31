import { Button, Paper } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Paper)`
  width: 384px;
  height: 100%;

  position: absolute;
  right: 0;

  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 16px;
  margin-left: 16px;

  background-color: var(--background-default) !important;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const HeaderSidebarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Figure = styled.figure`
  margin: 0px;
  width: 300px;
  margin-top: 32px;
  margin-bottom: 32px;

  img {
    width: 100%;
  }
`;

export const LastProfessionalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 32px);
`;

export const LastProfessionalsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  h3 {
    color: var(--text-primary);
  }

  h5 {
    color: var(--text-secondary);
  }
`;

export const ButtonAll = styled(Button)`
  padding: 0px !important;
  text-transform: initial !important;

  h5 {
    margin: 0px;
  }
`;
