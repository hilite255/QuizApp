import { Typography } from '@mui/material';

export const Timer = ({ time, big = false }) => {
    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${Number.isNaN(minutes) ? '' : minutes}:${
            Number.isNaN(seconds) ? '00' : seconds.toString().padStart(2, '0')
        }`;
    };
    return (
        <Typography variant={big ? 'h4' : 'h6'} sx={{ textAlign: 'center' }}>
            {formatTime(time)}
        </Typography>
    );
};
