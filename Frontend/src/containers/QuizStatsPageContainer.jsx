import { QuizStatsPage } from '../pages/QuizStatsPage.jsx';

export const QuizStatsPageContainer = () => {
    //mock data to see the correct answer ratio for a question
    const aggregated = [
        {
            question:
                'This is a really long question i mean really really really',
            correct: 191,
            fail: 157
        },
        {
            question: 'AE',
            correct: 84,
            fail: 197
        },
        {
            question: 'AF',
            correct: 163,
            fail: 145
        },
        {
            question: 'AG',
            correct: 74,
            fail: 79
        },
        {
            question: 'AI',
            correct: 105,
            fail: 142
        },
        {
            question: 'AL',
            correct: 30,
            fail: 97
        },
        {
            question: 'AM',
            correct: 76,
            fail: 116
        }
    ];

    const simpleQuestionAnswer = {
        question: 'This is a really long question i mean really really really',
        type: 'simple',
        answers: [
            {
                id: 'alma',
                label: 'alma',
                value: 1
            },
            {
                id: 'korte',
                label: 'korte',
                value: 1
            },
            {
                id: 'szilva',
                label: 'szilva',
                value: 2
            },
            {
                id: 'dinnye',
                label: 'dinnye',
                value: 3
            },
            {
                id: 'Superbus zeluss ducunt ad planeta.',
                label: 'Superbus zeluss ducunt ad planeta.',
                value: 1
            },
            {
                id: 'Superbus',
                label: 'Superbus',
                value: 1
            },
            {
                id: 'zeluss',
                label: 'zeluss',
                value: 2
            },
            {
                id: 'ducunt',
                label: 'ducunt',
                value: 3
            },
            {
                id: 'ad',
                label: 'ad',
                value: 1
            },
            {
                id: 'planeta',
                label: 'planeta',
                value: 1
            },
            {
                id: 'The seeker witness.',
                label: 'The seeker witness.',
                value: 2
            },
            {
                id: 'Liberis persuadere in noster cella!',
                label: 'Liberis persuadere in noster cella!',
                value: 3
            },
            {
                id: 'persuadere',
                label: 'persuadere',
                value: 1
            },
            {
                id: 'noster',
                label: 'noster',
                value: 1
            },
            {
                id: 'cella',
                label: 'cella',
                value: 2
            },
            {
                id: 'Liberis',
                label: 'Liberis',
                value: 3
            }
        ]
    };

    const multipleChoiceAnswer = {
        question: 'This is a really long question i mean really really really',
        type: 'multipleChoice',
        answers: [
            {
                id: 'A',
                label: 'A',
                value: 112
            },
            {
                id: 'B',
                label: 'B',
                value: 156
            },
            {
                id: 'C',
                label: 'C',
                value: 3
            },
            {
                id: 'D',
                label: 'D',
                value: 200
            }
        ]
    };

    const trueFalseAnswer = {
        question: 'This is a really long question i mean really really really',
        type: 'trueFalse',
        answers: [
            {
                id: 'True',
                label: 'True',
                value: 112
            },
            {
                id: 'False',
                label: 'False',
                value: 156
            }
        ]
    };

    const data = {
        aggregated,
        questions: [simpleQuestionAnswer, multipleChoiceAnswer, trueFalseAnswer]
    };

    return <QuizStatsPage data={data} />;
};
