import styled from 'styled-components';
import { List } from '@mui/material';
import AvatarMUI from '@mui/material/Avatar';
import ListItemMUI from '@mui/material/ListItem';

export const ListContainer = styled(List)`
  background-color: var(--background-default) Im !important;
  width: 100%;

  li {
    padding-right: 0px;
    padding-left: 0px;

    div {
      span {
        color: var(--text-primary);
      }

      p {
        color: var(--text-secondary);
      }
    }
  }
`;

export const ListItem = styled(ListItemMUI)`
  cursor: pointer;
`;

export const Avatar = styled(AvatarMUI)`
  background-color: var(--primary) !important;
`;

export const styles = {
  sx: {
    bgcolor: 'background.paper',
  },
};
