import { useState } from 'react';
import { TextField, Typography } from '@mui/material';

export const SimpleQuestion = ({ question, setAnswer }) => {
    return (
        <>
            <Typography variant="h5" sx={{ marginBottom: '48px' }}>
                {question}
            </Typography>
            <TextField
                label="Answer"
                variant="outlined"
                multiline
                maxRows={4}
                onChange={({ target }) => target && setAnswer(target.value)}
            />
        </>
    );
};
