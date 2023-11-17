import { QuizPage } from '../pages/QuizPage.jsx';

export const QuizPageContainer = () => {
    //mock grabbing the data
    const data = {
        id: 1,
        title: 'Quiz 1',
        questions: [
            {
                id: 1,
                question: 'What is the capital of the United States?',
                type: 'multipleChoice',
                options: [
                    'New York',
                    'Washington, D.C.',
                    'Los Angeles',
                    'Chicago'
                ]
            },
            {
                id: 2,
                question:
                    'Is Washington, D.C. the capital of the United States?',
                type: 'trueFalse'
            },
            {
                id: 3,
                question: 'What is the capital of the United States?',
                type: 'simple'
            }
        ]
    };
    return <QuizPage title={data.title} questions={data.questions} />;
};
