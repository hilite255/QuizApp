import { UserCard } from '../components/UserCard.jsx';
import { Typography } from '@mui/material';
import { QuizzesList } from './QuizzesList.jsx';

export const ProfilePage = () => {
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
            <Typography variant="h4" sx={{ marginTop: '32px' }}>
                My Quizzes
            </Typography>
            <QuizzesList quizzes={quizzes} />
        </>
    );
};
