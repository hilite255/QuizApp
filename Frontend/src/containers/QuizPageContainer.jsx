import { QuizPage } from '../pages/QuizPage.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doApiCall } from '../apiCall.js';

export const QuizPageContainer = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await doApiCall('GET', `/api/quiz/${id}`);
            setData(data);
        })();
    }, [id]);

    if (!data) {
        return null;
    }
    return (
        <QuizPage
            title={data.title}
            questions={data.questions}
            time={data.duration}
            id={id}
        />
    );
};
