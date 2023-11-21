import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <Grid container sx={{ marginTop: '24px' }}>
                <Grid
                    item
                    xs={6}
                    sx={{ display: 'flex', justifyContent: 'end' }}
                >
                    <PersonIcon
                        color="primary"
                        sx={{ width: '250px', height: '250px' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <QuizIcon
                        color="primary"
                        sx={{ width: '250px', height: '250px' }}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                    sx={{ display: 'flex', justifyContent: 'end' }}
                >
                    <NoteAddIcon
                        color="primary"
                        sx={{ width: '250px', height: '250px' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <PetsIcon
                        color="primary"
                        sx={{ width: '250px', height: '250px' }}
                    />
                </Grid>
            </Grid>
            <Typography>asdfasfa</Typography>
            <Button onClick={() => navigate('/quiz/1')}>
                Move to the quiz page
            </Button>
            <Button onClick={() => apiCallCallback()}>test</Button>
        </>
    );
};
