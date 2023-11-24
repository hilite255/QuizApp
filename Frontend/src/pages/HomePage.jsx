import { Grid, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <Grid container sx={{ marginTop: '24px' }}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Tooltip
                    title="Go to the profile page"
                    arrow
                    followCursor
                    placement="top"
                >
                    <IconButton
                        sx={{ borderRadius: '10px' }}
                        onClick={() => navigate('/user')}
                    >
                        <PersonIcon
                            color="primary"
                            sx={{ width: '250px', height: '250px' }}
                        />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={6}>
                <Tooltip
                    title="Check out the quizzes"
                    arrow
                    followCursor
                    placement="top"
                >
                    <IconButton
                        sx={{ borderRadius: '10px' }}
                        onClick={() => navigate('/quizzes')}
                    >
                        <QuizIcon
                            color="primary"
                            sx={{ width: '250px', height: '250px' }}
                        />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Tooltip
                    title="Let's create a new quiz"
                    arrow
                    followCursor
                    placement="top"
                >
                    <IconButton
                        sx={{ borderRadius: '10px' }}
                        onClick={() => navigate('/user/quiz/add')}
                    >
                        <NoteAddIcon
                            color="primary"
                            sx={{ width: '250px', height: '250px' }}
                        />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={6}>
                <Tooltip
                    title={'Click for a random cat'}
                    arrow
                    followCursor
                    placement="top"
                >
                    <IconButton
                        sx={{ borderRadius: '10px' }}
                        onClick={() =>
                            window.open('https://cataas.com/cat', '_blank')
                        }
                    >
                        <PetsIcon
                            color="primary"
                            sx={{ width: '250px', height: '250px' }}
                        />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    );
};
