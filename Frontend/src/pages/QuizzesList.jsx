import { QuizCard } from '../components/QuizCard.jsx';
import { Pagination, Stack } from '@mui/material';

export const QuizzesList = ({ quizzes, userQuizzes = false }) => {
    return (
        <>
            <Stack gap={4}>
                {quizzes.map(quiz => (
                    <QuizCard
                        title={quiz.title}
                        id={quiz.id}
                        userQuizzes={userQuizzes}
                    />
                ))}
            </Stack>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '32px'
                }}
            >
                <Pagination count={10} shape="rounded" color="primary" />
            </div>
        </>
    );
};
