import { ResponsiveBar } from '@nivo/bar';
import { Typography } from '@mui/material';

const MAX_TEXT_LENGTH = 28;

export const BarChart = ({ data, title }) => {
    return (
        <>
            <Typography variant="h4">{title}</Typography>
            <div style={{ width: '100%', height: '400px' }}>
                <ResponsiveBar
                    data={data}
                    keys={['correct', 'wrong']}
                    indexBy="question"
                    margin={{ top: 50, right: 130, bottom: 60, left: 60 }}
                    padding={0.3}
                    groupMode="grouped"
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    borderColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]]
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Questions',
                        legendPosition: 'middle',
                        legendOffset: 48,
                        truncateTickAt: 0,
                        format: value =>
                            value.length > MAX_TEXT_LENGTH
                                ? value.substring(0, MAX_TEXT_LENGTH) + '...'
                                : value
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Answers',
                        legendPosition: 'middle',
                        legendOffset: -40,
                        truncateTickAt: 0
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    role="application"
                />
            </div>
        </>
    );
};
