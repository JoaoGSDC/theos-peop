import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { AvatarContainer, AvatarIcon, CircleBox, styles, UserName } from './styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
// import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useToken } from '../../utils/token';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function Avatar() {
  const token = useToken();
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const _name = Cookies.get('user') as string;
    setName(_name);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    token.remove();

    router.push('/login');
  };

  return (
    <>
      <AvatarContainer>
        <UserName>{name}</UserName>

        <CircleBox>
          <Tooltip title="Opções de usuário">
            <IconButton
              data-testid="avatar-icon"
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <AvatarIcon>{name?.split('')[0]}</AvatarIcon>
            </IconButton>
          </Tooltip>
        </CircleBox>
      </AvatarContainer>

      <Menu
        data-testid="menu"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: styles.sx,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configurações
        </MenuItem> */}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  );
}

export default Avatar;
