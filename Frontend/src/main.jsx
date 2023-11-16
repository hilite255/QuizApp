import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router.jsx';
import { responsiveFontSizes, ThemeProvider } from '@mui/material';
import constructTheme from '../theme.js';

let theme = constructTheme();
theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Router />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
