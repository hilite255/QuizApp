import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AXIOS_METHOD, useApi } from '../hooks/useApi.jsx';

export const HomePage = () => {
    const navigate = useNavigate();
    const { data, isLoading, apiCallCallback } = useApi(
        AXIOS_METHOD.GET,
        '/api/user/login'
    );

    console.log(data);
    return (
        <>
            <Typography>asdfasfa</Typography>
            <Button onClick={() => navigate('/quiz/1')}>
                Move to the quiz page
            </Button>
            <Button onClick={() => apiCallCallback()}>test</Button>
        </>
    );
};
