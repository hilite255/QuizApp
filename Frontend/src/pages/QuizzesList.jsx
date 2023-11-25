import { QuizCard } from '../components/QuizCard.jsx';
import { Pagination, Stack } from '@mui/material';

export const QuizzesList = ({
    quizzes,
    userQuizzes = false,
    page,
    totalPages,
    moveToPage,
    fetchQuizzes
}) => {
    return (
        <>
            <Stack gap={4}>
                {quizzes.map(quiz => (
                    <QuizCard
                        title={quiz.title}
                        id={quiz.id}
                        userQuizzes={userQuizzes}
                        fetchQuizzes={fetchQuizzes}
                        key={quiz.id}
                        creator={quiz.creator.name}
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
                <Pagination
                    count={totalPages}
                    shape="rounded"
                    color="primary"
                    page={page}
                    onChange={(event, page) => {
                        moveToPage(page);
                        console.log(page);
                    }}
                />
            </div>
        </>
    );
};
