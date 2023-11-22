import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import { Avatar, Stack, Typography, Box } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

export const UserCard = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = React.useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = 'dev-1ckx0xgt.us.auth0.com';

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: `https://${domain}/api/v2/`,
                        scope: 'read:name read:current_user read:email profile'
                    }
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                const { user_metadata } = await metadataResponse.json();
                console.log(metadataResponse);

                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e);
            }
        };

        getUserMetadata().catch(console.log);
    }, [getAccessTokenSilently, user?.sub]);

    if (!userMetadata) {
        return null;
    }

    return (
        <Card>
            <Box sx={{ p: 2, display: 'flex' }}>
                <Avatar
                    variant="rounded"
                    src={userMetadata.profilePic}
                    sx={{ width: '64px', height: '64px' }}
                />
                <Stack spacing={0.5} sx={{ marginX: '32px', flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight={700}>
                        {userMetadata.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {userMetadata.email}
                    </Typography>
                </Stack>
            </Box>
        </Card>
    );
};
