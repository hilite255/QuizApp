import { BarChart } from '../charts/BarChart.jsx';
import { PieChart } from '../charts/PieChart.jsx';
import { Typography } from '@mui/material';

export const QuizStatsPage = ({ data, title }) => {
    return (
        <>
            <Typography variant="h2">Statistics for: {title}</Typography>
            <BarChart
                data={data.aggregated}
                title="Answers for every question"
            />
            <Typography variant="h4">Answers by question</Typography>
            {data.questions.map(question => {
                return (
                    <PieChart
                        data={question.answers}
                        title={question.text}
                        key={question.text}
                    />
                );
            })}
        </>
    );
};
