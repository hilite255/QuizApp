import React, { useState } from 'react';
import { Button, MobileStepper, Stack, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { QuestionContainer } from '../components/QuestionContainer.jsx';

export const QuizPage = ({ questions, title }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [started, setStarted] = useState(false);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <div style={{ marginTop: '48px' }}>
            {started ? (
                <>
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
                                disabled={activeStep === questions.length - 1}
                            >
                                Next
                                <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0}
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
                        <QuestionContainer question={questions[activeStep]} />
                    </div>
                </>
            ) : (
                <Stack sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="h6">Click start to begin</Typography>
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
