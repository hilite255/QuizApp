import React, { useContext, useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, Container } from '@mui/material';
import { AUTH0_CONFIG } from '../config.js';
import { doApiCall } from '../apiCall.js';

const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
    const { isLoading, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                if (!isAuthenticated) {
                    return;
                }
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
                setDbUser(parsedUserInfo);

                await doApiCall('POST', '/api/user/login', {
                    user: {
                        email: parsedUserInfo.email,
                        name: parsedUserInfo.name,
                        picture: parsedUserInfo.picture
                    }
                });
            } catch (err) {
                console.error(err);
            }
        })();
    }, [getAccessTokenSilently, isAuthenticated]);

    if (isLoading) {
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
