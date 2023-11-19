import { Typography } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';

const MAX_TEXT_LENGTH = 5;
export const PieChart = ({ data, title }) => {
    return (
        <>
            <Typography variant="h6">{title}</Typography>
            <div style={{ width: '100%', height: '500px' }}>
                <ResponsivePie
                    data={data}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.2]]
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [['darker', 2]]
                    }}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ],
                            format: value =>
                                value.length > MAX_TEXT_LENGTH
                                    ? value.substring(0, MAX_TEXT_LENGTH) +
                                      '...'
                                    : value
                        }
                    ]}
                />
            </div>
        </>
    );
};
