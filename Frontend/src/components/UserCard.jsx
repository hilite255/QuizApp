import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import {
    Avatar,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { Edit } from '@mui/icons-material';

export const UserCard = ({ dbUser, profilePic, openModal }) => {
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
                <IconButton
                    sx={{ alignSelf: 'flex-start' }}
                    onClick={() => openModal()}
                >
                    <Edit sx={{ fontSize: 26 }} />
                </IconButton>
            </Box>
        </Card>
    );
};
