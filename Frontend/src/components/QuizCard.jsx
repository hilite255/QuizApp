import QuizIcon from '@mui/icons-material/Quiz.js';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { doApiCall } from '../apiCall.js';
import { useMessage } from '../hooks/useMessage.jsx';

export const QuizCard = ({ title, id, userQuizzes = false, fetchQuizzes }) => {
    const navigate = useNavigate();
    const { displayMessage } = useMessage();

    const handleDelete = () => {
        doApiCall('DELETE', `/api/quiz/${id}`).catch(e => {
            console.log(e);
            displayMessage('Quiz deletion failed', false);
        });
        fetchQuizzes();
        displayMessage('Quiz deleted successfully', true);
    };
    return (
        <Card
            sx={{ display: 'flex', cursor: 'pointer' }}
            onClick={() =>
                userQuizzes
                    ? navigate(`/user/quiz/${id}/stats`)
                    : navigate(`/quiz/${id}`)
            }
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
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
                {userQuizzes && (
                    <IconButton
                        onClick={e => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        sx={{
                            justifySelf: 'flex-end',
                            height: 'min-content',
                            marginTop: '16px',
                            marginRight: '16px'
                        }}
                    >
                        <ClearIcon color="error" />
                    </IconButton>
                )}
            </Box>
        </Card>
    );
};
