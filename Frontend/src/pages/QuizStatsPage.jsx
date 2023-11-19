import { BarChart } from '../charts/BarChart.jsx';
import { PieChart } from '../charts/PieChart.jsx';
import { Typography } from '@mui/material';

export const QuizStatsPage = ({ data }) => {
    return (
        <>
            <BarChart
                data={data.aggregated}
                title="Answers for every question"
            />
            <Typography variant="h4">Answers by question</Typography>
            {data.questions.map(question => {
                return (
                    <PieChart
                        data={question.answers}
                        title={question.question}
                    />
                );
            })}
        </>
    );
};
