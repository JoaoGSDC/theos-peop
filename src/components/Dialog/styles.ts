import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';

export const DialogContainer = styled(Dialog)`
  .MuiPaper-elevation {
    background-color: var(--background-default) !important;
  }

  h2 {
    color: var(--text-primary) !important;
  }

  button {
    color: var(--primary) !important;
  }
`;
