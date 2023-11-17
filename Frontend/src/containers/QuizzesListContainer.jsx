import { QuizzesList } from '../pages/QuizzesList.jsx';

export const QuizzesListContainer = () => {
    //mock data for quizzes list
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
    return <QuizzesList quizzes={quizzes} />;
};
