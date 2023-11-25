import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router.jsx';
import { responsiveFontSizes, ThemeProvider } from '@mui/material';
import constructTheme from '../theme.js';
import { Auth0Provider } from '@auth0/auth0-react';
import { AUTH0_CONFIG } from './config.js';
import { AuthContextProvider } from './hooks/useAuth.jsx';
import { MessageContextProvider } from './hooks/useMessage.jsx';
import('../styles/index.styl');

let theme = constructTheme();
theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <MessageContextProvider>
                    <Auth0Provider
                        domain={AUTH0_CONFIG.DOMAIN}
                        clientId={AUTH0_CONFIG.CLIENT_ID}
                        authorizationParams={{
                            redirect_uri: window.location.origin,
                            audience: AUTH0_CONFIG.AUDIENCE,
                            scope: 'openid profile email'
                        }}
                    >
                        <AuthContextProvider>
                            <Router />
                        </AuthContextProvider>
                    </Auth0Provider>
                </MessageContextProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
