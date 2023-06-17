import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';

export const DialogContainer = styled(Dialog).attrs((props: { type: string }) => props)`
  .MuiPaper-elevation {
    background-color: var(--background-default) !important;

    width: ${(props) => {
      if (props.type === '') {
        return 'auto';
      }

      if (props.type === 'medium') {
        return '50%';
      }
    }};
  }

  h2 {
    color: var(--text-primary) !important;
  }

  button {
    color: var(--primary) !important;
  }
`;
