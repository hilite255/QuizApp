import { QuizStatsPage } from '../pages/QuizStatsPage.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doApiCall } from '../apiCall.js';
import { QUESTION_TYPES } from '../config.js';

const formatQuestionAnswers = questions => {
    return questions.map(question => {
        const answers = Object.keys(question.answers).map(key => {
            if (question.questionType === QUESTION_TYPES.SIMPLE) {
                return {
                    id: key,
                    label: key,
                    value: question.answers[key]
                };
            }
            if (question.questionType === QUESTION_TYPES.TRUE_FALSE) {
                return {
                    id: key === '0' ? 'False' : 'True',
                    label: key === '0' ? 'False' : 'True',
                    value: question.answers[key]
                };
            }
            return {
                id: question.options[parseInt(key, 10)],
                label: question.options[parseInt(key, 10)],
                value: question.answers[key]
            };
        });
        return {
            text: question.text,
            type: question.type,
            answers
        };
    });
};
export const QuizStatsPageContainer = () => {
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const data = await doApiCall('GET', `/api/quiz/${id}/stats`);
            const aggregated = data.questions.map(question => ({
                question: question.text,
                correct: question.correct,
                wrong: question.wrong
            }));
            setData(() => ({
                questions: formatQuestionAnswers(data.questions),
                aggregated,
                title: data.quizTitle
            }));
            console.log(data);
        })();
    }, [id]);

    return data && <QuizStatsPage data={data} title={data.title} />;
};
