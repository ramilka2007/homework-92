import { Button } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Button
        className="text-white"
        component={NavLink}
        to="/register"
        color="inherit"
      >
        Sign up
      </Button>
      <span className="text-white">|</span>
      <Button
        className="text-white"
        component={NavLink}
        to="/login"
        color="inherit"
      >
        Sign in
      </Button>
    </>
  );
};

export default AnonymousMenu;
