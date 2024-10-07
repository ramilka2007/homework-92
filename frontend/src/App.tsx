import './App.css';
import Home from './containers/Home/Home';
import Register from './features/users/Register';
import Login from './features/users/Login';
import { Route, Routes } from 'react-router-dom';
import Toolbar from './UI/Toolbar/Toolbar';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import { selectUser } from './features/users/usersSlice';
import { useAppSelector } from './app/hooks';

const App = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <header>
                <Toolbar />
            </header>
            <main className="mt-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<h1>Not found</h1>} />
                </Routes>
            </main>
        </>
    );
};

export default App;
