import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { QuestionCreateCard } from '../components/QuestionCreateCard.jsx';
import AddIcon from '@mui/icons-material/Add';

export const QuizCreatePage = () => {
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');

    const addQuestion = (question, type, answer, options) => {
        setQuestions([...questions, { question, type, answer, options }]);
    };

    return (
        <Grid container gap={2}>
            <Grid item xs={2} sx={{ margin: '0 auto ' }}>
                <Button
                    fullWidth
                    color="success"
                    onClick={() => console.log({ title, questions })}
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
