import React from 'react';
import Card from '@mui/material/Card';
import { Edit } from '@mui/icons-material';
import { Avatar, IconButton, Stack, Typography, Box } from '@mui/material';

export const UserCard = ({ dbUser, profilePic }) => {
    return (
        <Card>
            <Box sx={{ p: 2, display: 'flex' }}>
                <Avatar
                    variant="rounded"
                    src={profilePic}
                    sx={{ width: '64px', height: '64px' }}
                />
                <Stack spacing={0.5} sx={{ marginX: '32px', flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight={700}>
                        {dbUser.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {dbUser.email}
                    </Typography>
                </Stack>
            </Box>
        </Card>
    );
};
