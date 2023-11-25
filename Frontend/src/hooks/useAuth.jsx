import React, { useContext, useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, Container } from '@mui/material';
import { AUTH0_CONFIG } from '../config.js';
import { doApiCall } from '../apiCall.js';
import { useMessage } from './useMessage.jsx';

const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
    const { isLoading, getAccessTokenSilently, isAuthenticated, logout } =
        useAuth0();
    const [dbUser, setDbUser] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const { displayMessage } = useMessage();

    useEffect(() => {
        (async () => {
            try {
                if (!isAuthenticated) {
                    return;
                }
                setIsUserLoading(true);
                const accessToken = await getAccessTokenSilently();
                localStorage.setItem('accessToken', accessToken);
                const metadataResponse = await fetch(
                    `https://${AUTH0_CONFIG.DOMAIN}/userinfo`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                );

                const parsedUserInfo = await metadataResponse.json();

                const userFromBackend = await doApiCall(
                    'POST',
                    '/api/user/login',
                    {
                        email: parsedUserInfo.email,
                        name: parsedUserInfo.name
                    }
                );
                setDbUser(userFromBackend);
                setIsUserLoading(false);
                displayMessage('Logged in successfully', true);
            } catch (err) {
                console.error(err);
                displayMessage('Failed to login', false);
                logout().catch(err => console.error(err));
                setIsUserLoading(false);
            }
        })();
    }, [getAccessTokenSilently, isAuthenticated]);

    if (isLoading || isUserLoading) {
        return (
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                user: dbUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
AuthContext.displayName = 'AuthContext';

export function useAuth() {
    return useContext(AuthContext);
}
