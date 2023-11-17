import { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';

export const TrueFalseQuestion = ({ question }) => {
    const [answer, setAnswer] = useState(null);
    return (
        <>
            <Typography variant="h5">{question}</Typography>
            <Grid container>
                <Grid
                    item
                    xs={6}
                    sx={{ display: 'flex', justifyContent: 'end' }}
                >
                    <Button
                        color={answer === true ? 'primary' : 'secondary'}
                        onClick={() =>
                            answer !== true ? setAnswer(true) : setAnswer(null)
                        }
                        size="large"
                        style={{
                            marginRight: 10
                        }}
                    >
                        True
                    </Button>
                </Grid>
                <Grid
                    item
                    xs={6}
                    sx={{ display: 'flex', justifyContent: 'start' }}
                >
                    <Button
                        color={answer === false ? 'primary' : 'secondary'}
                        onClick={() =>
                            answer !== false
                                ? setAnswer(false)
                                : setAnswer(null)
                        }
                        size="large"
                    >
                        False
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
