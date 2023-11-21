import { Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { QuestionCreateCard } from '../components/QuestionCreateCard.jsx';
import AddIcon from '@mui/icons-material/Add';
import { AXIOS_METHOD, doApiCall } from '../apiCall.js';

export const QuizCreatePage = () => {
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(0);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const addQuestion = (question, type, answer, options) => {
        setQuestions([...questions, { question, type, answer, options }]);
    };

    const handleSubmit = () => {
        doApiCall(AXIOS_METHOD.POST, '/api/quiz/create', {
            title,
            questions,
            startTime: fromDate,
            endTime: toDate,
            duration
        }).catch(err => console.log(err));
    };

    return (
        <Grid container gap={2}>
            <Grid item xs={2} sx={{ margin: '0 auto ' }}>
                <Button
                    fullWidth
                    color="success"
                    onClick={() => handleSubmit()}
                >
                    Create
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Quiz Title"
                    variant="outlined"
                    onChange={e => setTitle(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Duration in seconds"
                    variant="outlined"
                    onChange={e => setDuration(e.target.value)}
                    type="number"
                />
            </Grid>
            <Grid item xs={4}>
                <Typography variant="caption">From</Typography>
                <TextField
                    variant="outlined"
                    onChange={e => setFromDate(e.target.value)}
                    fullWidth
                    type="date"
                />
            </Grid>
            <Grid item xs={4}>
                <Typography variant="caption">To</Typography>
                <TextField
                    variant="outlined"
                    onChange={e => setToDate(e.target.value)}
                    fullWidth
                    type="date"
                />
            </Grid>
            <Grid item xs={12}>
                {questions.map((question, index) => (
                    <QuestionCreateCard
                        setParams={newValue =>
                            setQuestions(prevState => {
                                const newState = [...prevState];
                                newState[index] = newValue;
                                return newState;
                            })
                        }
                    />
                ))}
            </Grid>

            <Grid item xs={12}>
                <Button
                    onClick={() =>
                        addQuestion({
                            question: '',
                            type: '',
                            answer: '',
                            options: []
                        })
                    }
                    fullWidth
                >
                    <AddIcon />
                    Add question
                </Button>
            </Grid>
        </Grid>
    );
};
