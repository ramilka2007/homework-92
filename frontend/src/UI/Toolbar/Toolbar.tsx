import { NavLink } from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';
import { useAppSelector } from '../../app/hooks';
import {
  selectUser,
} from '../../features/users/usersSlice';

const Toolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/" className="navbar-brand d-flex ">
          <p className="me-2 mb-0">Spotify</p>
        </NavLink>
        <div>
          {user ? (
            <UserMenu user={user}/>
          ) : (
            <AnonymousMenu />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
