import QuizIcon from '@mui/icons-material/Quiz.js';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const QuizCard = ({ title, id }) => {
    const navigate = useNavigate();
    return (
        <Card
            sx={{ display: 'flex', cursor: 'pointer' }}
            onClick={() => navigate(`/quiz/${id}`)}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <QuizIcon
                    color="primary"
                    sx={{ fontSize: '100px', padding: '16px' }}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                    >
                        Mac Miller
                    </Typography>
                </CardContent>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
                ></Box>
            </Box>
        </Card>
    );
};
