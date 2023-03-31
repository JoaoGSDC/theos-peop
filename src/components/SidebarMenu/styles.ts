import styled from 'styled-components';
import { Paper } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

export const Container = styled(Paper)`
  width: 232px;
  height: 100%;
  min-width: 216px;

  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 16px;
  margin-right: 16px;

  background-color: var(--background-default) !important;

  h3 {
    color: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 0px;

    svg {
      margin: 0px 8px;
    }
  }

  ul {
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const MenuItemOption = styled(MenuItem).attrs((props: { selectedMenuItem: boolean }) => props)`
  background-color: ${(props) =>
    props.selectedMenuItem ? 'var(--background-extra)' : 'var(--background-default)'} !important;
  color: ${(props) => (props.selectedMenuItem ? 'var(--primary)' : 'var(--text-secondary)')} !important;
  font-weight: 700 !important;
  margin: 8px 0px !important;
  padding: 10px 16px !important;
  border-radius: 8px !important;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: var(--background-extra) !important;
  }
`;

export const Figure = styled.figure`
  margin: 0px;
  height: 32px;
  margin-top: 32px;
  margin-bottom: 32px;

  img {
    height: 100%;
  }
`;
