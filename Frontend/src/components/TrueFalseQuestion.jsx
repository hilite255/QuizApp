import { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';

export const TrueFalseQuestion = ({ question, setAnswer }) => {
    const [localAnswer, setLocalAnswer] = useState(null);

    useEffect(() => {
        if (localAnswer === null) {
            return;
        }
        setAnswer(localAnswer.toString());
    }, [localAnswer, setAnswer]);
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
                        color={localAnswer === true ? 'primary' : 'secondary'}
                        onClick={() =>
                            localAnswer !== true
                                ? setLocalAnswer(true)
                                : setLocalAnswer(null)
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
                        color={localAnswer === false ? 'primary' : 'secondary'}
                        onClick={() =>
                            localAnswer !== false
                                ? setLocalAnswer(false)
                                : setLocalAnswer(null)
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
