import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import SelectMUI from '@mui/material/Select';

export const SelectUI = styled(SelectMUI).attrs(({ blocked }: any) => ({
  blocked,
}))`
  pointer-events: ${(props) => (props.blocked ? 'none' : 'default')};
`;

export const SelectContainer = styled(FormControl)`
  .MuiInputBase-formControl {
    height: 48px !important;
    color: var(--text-primary);
  }
`;
