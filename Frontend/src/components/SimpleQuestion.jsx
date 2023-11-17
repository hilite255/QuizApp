import { useState } from 'react';
import { TextField, Typography } from '@mui/material';

export const SimpleQuestion = ({ question }) => {
    const [answer, setAnswer] = useState(null);
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
                onChange={({ target }) => setAnswer(target.value)}
            />
        </>
    );
};
