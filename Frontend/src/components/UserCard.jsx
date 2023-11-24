import Card from '@mui/material/Card';
import { Avatar, Stack, Typography, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth.jsx';

export const UserCard = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <Card>
            <Box sx={{ p: 2, display: 'flex' }}>
                <Avatar
                    variant="rounded"
                    src={user.picture}
                    sx={{ width: '64px', height: '64px' }}
                />
                <Stack spacing={0.5} sx={{ marginX: '32px', flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight={700}>
                        {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.email}
                    </Typography>
                </Stack>
            </Box>
        </Card>
    );
};
