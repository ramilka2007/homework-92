import { Box, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunk';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Box>
        <Button onClick={handleClick} className="text-white">
          Hello, {user.displayName ? user.displayName : user.username}!
        </Button>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleLogout}
            component={NavLink}
            className="text-decoration-none text-black"
            to="/login"
          >
            Log out
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;
