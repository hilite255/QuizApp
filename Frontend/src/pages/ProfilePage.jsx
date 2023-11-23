import { UserCard } from '../components/UserCard.jsx';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QuizzesListContainer } from '../containers/QuizzesListContainer.jsx';
export const ProfilePage = () => {
    const navigate = useNavigate();

    return (
        <>
            <UserCard />
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '32px',
                    marginBottom: '16px'
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: 0 }}>
                    My Quizzes
                </Typography>
                <Button
                    sx={{ marginLeft: 'auto' }}
                    onClick={() => navigate('/user/quiz/add')}
                >
                    Create new quiz
                </Button>
            </div>
            <QuizzesListContainer userQuizzes />
        </>
    );
};
