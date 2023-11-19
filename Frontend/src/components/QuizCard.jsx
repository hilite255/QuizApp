import QuizIcon from '@mui/icons-material/Quiz.js';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box } from '@mui/material';

export const QuizCard = ({ title, id, userQuizzes = false }) => {
    const navigate = useNavigate();
    return (
        <Card
            sx={{ display: 'flex', cursor: 'pointer' }}
            onClick={() =>
                userQuizzes
                    ? navigate(`/user/quiz/${id}/stats`)
                    : navigate(`/quiz/${id}`)
            }
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
