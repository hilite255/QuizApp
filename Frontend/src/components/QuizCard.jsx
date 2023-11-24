import QuizIcon from '@mui/icons-material/Quiz.js';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    Tooltip
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { doApiCall } from '../apiCall.js';
import { useMessage } from '../hooks/useMessage.jsx';
import Zoom from '@mui/material/Zoom';
import { useState } from 'react';

export const QuizCard = ({ title, id, userQuizzes = false, fetchQuizzes }) => {
    const navigate = useNavigate();
    const { displayMessage } = useMessage();
    const [open, setOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        if (showTooltip) {
            setOpen(true);
        }
    };

    const handleDelete = () => {
        doApiCall('DELETE', `/api/quiz/${id}`)
            .then(() => {
                fetchQuizzes();
                displayMessage('Quiz deleted successfully', true);
            })
            .catch(e => {
                console.log(e);
                displayMessage('Quiz deletion failed', false);
            });
    };

    return (
        <Tooltip
            title={
                userQuizzes
                    ? 'Click to see the statistics'
                    : 'Click to solve the quiz'
            }
            placement="top"
            arrow
            followCursor
            TransitionComponent={Zoom}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
        >
            <Card
                sx={{ display: 'flex', cursor: 'pointer' }}
                onClick={() =>
                    userQuizzes
                        ? navigate(`/user/quiz/${id}/stats`)
                        : navigate(`/quiz/${id}`)
                }
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%'
                    }}
                >
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
                            onMouseEnter={() => {
                                setShowTooltip(false);
                                handleClose();
                            }}
                            onMouseLeave={() => {
                                setShowTooltip(true);
                                handleOpen();
                            }}
                        >
                            <ClearIcon color="error" />
                        </IconButton>
                    )}
                </Box>
            </Card>
        </Tooltip>
    );
};
