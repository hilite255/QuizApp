import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const CHOICES = ['A', 'B', 'C', 'D'];

export const MultipleChoiceQuestion = ({ question, options }) => {
    const [selectedChoice, setSelectedChoice] = useState(() => []); // [A, B, C, D

    return (
        <>
            <Typography
                sx={{ marginBottom: '32px', marginTop: '32px' }}
                variant="h5"
            >
                {question}
            </Typography>
            <Stack
                spacing={2}
                sx={{
                    width: 'max-content',
                    margin: '0 auto'
                }}
            >
                {options.map((option, index) => (
                    <Button
                        color={
                            selectedChoice.includes(CHOICES[index])
                                ? 'primary'
                                : 'secondary'
                        }
                        onClick={() => {
                            if (selectedChoice.includes(CHOICES[index])) {
                                setSelectedChoice(prevSelectedChoice =>
                                    prevSelectedChoice.filter(
                                        choice => choice !== CHOICES[index]
                                    )
                                );
                            } else {
                                setSelectedChoice(prevSelectedChoice => [
                                    ...prevSelectedChoice,
                                    CHOICES[index]
                                ]);
                            }
                        }}
                    >
                        {CHOICES[index]}
                        <Typography
                            sx={{
                                textTransform: 'none',
                                marginLeft: '16px'
                            }}
                            variant="body1"
                        >
                            {option}
                        </Typography>
                    </Button>
                ))}
            </Stack>
        </>
    );
};
