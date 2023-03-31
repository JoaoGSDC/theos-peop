import styled from 'styled-components';
import { TextField } from '@mui/material';

export const Container = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

export const Input = styled(TextField).attrs(({ blocked }: any) => ({
  blocked,
}))`
  pointer-events: ${(props) => (props.blocked ? 'none' : 'default')};
`;

export const SmallInput = styled(Input)`
  margin-right: 8px !important;

  input {
    width: 32.1px !important;
  }
`;
