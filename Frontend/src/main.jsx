import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router.jsx';
import { responsiveFontSizes, ThemeProvider } from '@mui/material';
import constructTheme from '../theme.js';
import { Auth0Provider } from '@auth0/auth0-react';
import('../styles/index.styl');

let theme = constructTheme();
theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Auth0Provider
                    domain="dev-1ckx0xgt.us.auth0.com"
                    clientId="OacUI6sz6PujDRHVGFqMMQ75HegUtKbA"
                    authorizationParams={{
                        redirect_uri: window.location.origin
                    }}
                >
                    <Router />
                </Auth0Provider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
