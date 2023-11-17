import { QuizCard } from '../components/QuizCard.jsx';
import { Pagination, Stack } from '@mui/material';

export const QuizzesList = ({ quizzes }) => {
    return (
        <>
            <Stack gap={4}>
                {quizzes.map(quiz => {
                    return <QuizCard title={quiz.title} id={quiz.id} />;
                })}
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
