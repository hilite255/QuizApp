import React, { useEffect, useState } from 'react';
import { Button, MobileStepper, Stack, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { QuestionContainer } from '../components/QuestionContainer.jsx';
import { Timer } from '../components/Timer.jsx';

export const QuizPage = ({ questions, title, time }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [started, setStarted] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [remainingTime, setRemainingTime] = useState(time);
    const [hasEnded, setHasEnded] = useState(false);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    const handleSubmit = () => {
        setHasEnded(true);
        console.log(answers);
    };

    //useEffect for timer
    useEffect(() => {
        let interval = null;
        if (started && !hasEnded) {
            interval = setInterval(() => {
                setRemainingTime(prevState => prevState - 1);
            }, 1000);
        }
        return () => interval && clearInterval(interval);
    }, [started, hasEnded]);

    useEffect(() => {
        if (remainingTime === 0) {
            handleSubmit();
        }
    }, [remainingTime]);

    return (
        <div style={{ marginTop: '48px' }}>
            {started ? (
                <>
                    <Timer time={remainingTime} big />
                    <Button
                        sx={{
                            marginY: '10px',
                            marginX: 'auto',
                            display: 'block'
                        }}
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                    <MobileStepper
                        variant="progress"
                        steps={questions.length}
                        position="static"
                        activeStep={activeStep}
                        fullWidth
                        sx={{ flexGrow: 1 }}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={
                                    activeStep === questions.length - 1 ||
                                    hasEnded
                                }
                            >
                                Next
                                <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0 || hasEnded}
                            >
                                <KeyboardArrowLeft />
                                Back
                            </Button>
                        }
                    />
                    <div
                        style={{
                            marginBottom: 20,
                            textAlign: 'center',
                            marginTop: '32px'
                        }}
                    >
                        <QuestionContainer
                            question={questions[activeStep]}
                            setAnswer={answer =>
                                setAnswers(prevState => {
                                    const newState = [...prevState];
                                    newState[activeStep] = {
                                        id: questions[activeStep].id,
                                        answer
                                    };
                                    return newState;
                                })
                            }
                        />
                    </div>
                </>
            ) : (
                <Stack sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="h6">Click start to begin</Typography>
                    <Typography variant="subtitle1">Available Time</Typography>
                    <Timer time={time} />
                    <Button
                        variant="contained"
                        onClick={() => setStarted(true)}
                        sx={{ width: 'min-content', margin: '0 auto' }}
                        size="large"
                    >
                        Start
                    </Button>
                </Stack>
            )}
        </div>
    );
};
