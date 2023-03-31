import { Avatar, Box } from '@mui/material';
import styled from 'styled-components';

export const CircleBox = styled(Box)`
  display: flex;
  align-items: center;
  text-align: center;
`;

export const AvatarIcon = styled(Avatar)`
  width: 32px;
  height: 32px;
  background-color: var(--primary) !important;
`;

export const AvatarContainer = styled.div`
  display: flex;
`;

export const UserName = styled.h4`
  color: var(--text-primary);
`;

export const styles = {
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};
