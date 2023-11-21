import { UserCard } from '../components/UserCard.jsx';
import { Button, Typography } from '@mui/material';
import { QuizzesList } from './QuizzesList.jsx';
import { useNavigate } from 'react-router-dom';
export const ProfilePage = () => {
    const navigate = useNavigate();
    //mock user data
    const user = {
        name: 'John Doe',
        email: 'alma@korte.com'
    };
    //mock quizzes data
    const quizzes = [
        {
            id: 1,
            title: 'Quiz 1'
        },
        {
            id: 2,
            title: 'Quiz 2'
        },
        {
            id: 3,
            title: 'Quiz 3'
        }
    ];

    return (
        <>
            <UserCard dbUser={user} />
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
            <QuizzesList quizzes={quizzes} userQuizzes />
        </>
    );
};
