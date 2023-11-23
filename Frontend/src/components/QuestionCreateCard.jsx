import {
    TextField,
    Paper,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Stack,
    Button
} from '@mui/material';
import { useEffect, useState } from 'react';
import { QUESTION_DISPLAY_TYPES, QUESTION_TYPES } from '../config.js';
import ClearIcon from '@mui/icons-material/Clear';

export const QuestionCreateCard = ({ setParams, removeQuestion }) => {
    const [type, setType] = useState(QUESTION_DISPLAY_TYPES.SIMPLE);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(1);
    const handleTypeChange = event => {
        const newValue = event.target.value;
        if (newValue === QUESTION_TYPES.MULTIPLE) {
            setAnswer([]);
        } else {
            setAnswer('');
        }
        setType(newValue);
    };

    useEffect(() => {
        setParams({
            question,
            type,
            answer:
                type === QUESTION_DISPLAY_TYPES.MULTIPLE
                    ? JSON.stringify(answer)
                    : answer,
            options,
            score
        });
    }, [question, type, answer, options, score]);

    const handleOptionsChange = (index, value) => {
        setOptions(prevState => {
            const newState = [...prevState];
            newState[index] = value;
            return newState;
        });
    };

    return (
        <Paper className="questionCreate" square={false}>
            <Stack gap={4} sx={{ width: '50%' }}>
                <TextField
                    variant="standard"
                    label="Question"
                    onChange={e => setQuestion(e.target.value)}
                />
                <FormControl sx={{ maxWidth: 'maxContent' }}>
                    <InputLabel id="select-label">Type</InputLabel>
                    <Select
                        labelId="select-label"
                        value={type}
                        label="Type"
                        onChange={handleTypeChange}
                    >
                        {Object.keys(QUESTION_DISPLAY_TYPES).map(key => (
                            <MenuItem value={QUESTION_TYPES[key]}>
                                {QUESTION_DISPLAY_TYPES[key]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {type === QUESTION_TYPES.SIMPLE && (
                    <TextField
                        onChange={e => setAnswer(e.target.value)}
                        variant="standard"
                        label="Answer"
                    />
                )}
                {type === QUESTION_TYPES.MULTIPLE && (
                    <>
                        {['A', 'B', 'C', 'D'].map((value, index) => (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        setAnswer(prevState => {
                                            if (prevState.includes(value)) {
                                                return prevState.filter(
                                                    item => item !== value
                                                );
                                            }
                                            return [...prevState, value];
                                        })
                                    }
                                    color={
                                        answer.includes(value)
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                    sx={{ marginRight: '16px' }}
                                >
                                    {value}
                                </Button>
                                <TextField
                                    placeholder={`Option ${index + 1}`}
                                    onChange={e =>
                                        handleOptionsChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </>
                )}
                {type === QUESTION_TYPES.TRUE_FALSE && (
                    <div style={{ display: 'flex' }}>
                        <Button
                            onClick={() => setAnswer('true')}
                            color={answer === 'true' ? 'primary' : 'secondary'}
                        >
                            True
                        </Button>
                        <Button
                            sx={{ marginLeft: '8px' }}
                            color={answer === 'false' ? 'primary' : 'secondary'}
                            onClick={() => setAnswer('false')}
                        >
                            False
                        </Button>
                    </div>
                )}
            </Stack>
            <TextField
                label="Score"
                variant="standard"
                type="number"
                onChange={e => setScore(parseInt(e.target.value, 10))}
                sx={{ margin: '0 auto' }}
            />
            <ClearIcon
                color="error"
                style={{ cursor: 'pointer', marginLeft: 'auto' }}
                onClick={removeQuestion}
            />
        </Paper>
    );
};
