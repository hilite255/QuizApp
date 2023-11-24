import { QuizzesList } from '../pages/QuizzesList.jsx';
import { useCallback, useEffect, useState } from 'react';
import { doApiCall } from '../apiCall.js';

export const QuizzesListContainer = ({ userQuizzes }) => {
    const [quizzes, setQuizzes] = useState(() => []);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);

    const fetchQuizzes = useCallback(async () => {
        const data = await doApiCall(
            'GET',
            userQuizzes
                ? `/api/quiz/all/user?page=${page}&perpage=${pageSize}`
                : `/api/quiz/all?page=${page}&perpage=${pageSize}`
        );
        setTotalPages(Math.ceil(data.count / pageSize));
        setQuizzes(data.quizzes);
    }, [userQuizzes, page]);

    useEffect(() => {
        (async () => {
            const data = await doApiCall(
                'GET',
                userQuizzes
                    ? `/api/quiz/all/user?page=${page}&perpage=${pageSize}`
                    : `/api/quiz/all?page=${page}&perpage=${pageSize}`
            );
            setTotalPages(Math.ceil(data.count / pageSize));
            setQuizzes(data.quizzes);
        })();
    }, [page, pageSize, userQuizzes, setTotalPages, setQuizzes]);

    return (
        <QuizzesList
            quizzes={quizzes}
            userQuizzes={userQuizzes}
            totalPages={totalPages}
            page={page}
            moveToPage={page => setPage(page)}
            fetchQuizzes={fetchQuizzes}
        />
    );
};
