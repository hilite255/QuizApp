import { Box, Typography } from '@mui/material';

export const Footer = () => {
    return (
        <Box
            sx={{
                height: '48px',
                backgroundColor: '#CBD0D8',
                padding: '8px',
                position: 'absolute',
                bottom: '0',
                minWidth: 'calc(100% - 16px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Typography variant="body3">Something interesting</Typography>
        </Box>
    );
};
