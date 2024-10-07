import ReactDOM, {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { persistor, store } from './app/store';
import theme from './theme';
import { PersistGate } from 'redux-persist/integration/react';
import { addInterceptors } from './axiosApi';
import { GOOGLE_CLIENT_ID } from './constants';
import { GoogleOAuthProvider } from '@react-oauth/google';

addInterceptors(store);

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>,
);
