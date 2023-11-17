import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <Typography>asdfasfa</Typography>
            <Button onClick={() => navigate('/quiz/1')}>
                Move to the quiz page
            </Button>
        </>
    );
};
