import styled from 'styled-components';
import Box from '@mui/material/Box';

export const TabsHeaderContainer = styled(Box)`
  border-bottom: 1px;
  border-color: divider;
  margin-bottom: 8px;

  .Mui-selected {
    color: var(--primary) !important;
  }

  button:not(.Mui-selected) {
    color: var(--text-secondary);
  }
`;

export const TabContainer = styled.div`
  width: 100%;
  height: calc(100% - 56px);
`;
