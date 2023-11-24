import { Grid, IconButton } from '@mui/material';
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
                <IconButton
                    sx={{ borderRadius: '10px' }}
                    onClick={() => navigate('/user')}
                >
                    <PersonIcon
                        color="primary"
                        sx={{ width: '250px', height: '250px' }}
                    />
                </IconButton>
            </Grid>
            <Grid item xs={6}>
                <IconButton sx={{ borderRadius: '10px' }}>
                    <QuizIcon
                        color="primary"
                        sx={{ width: '250px', height: '250px' }}
                        onClick={() => navigate('/quizzes')}
                    />
                </IconButton>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <IconButton sx={{ borderRadius: '10px' }}>
                    <NoteAddIcon
                        color="primary"
                        sx={{ width: '250px', height: '250px' }}
                        onClick={() => navigate('/user/quiz/add')}
                    />
                </IconButton>
            </Grid>
            <Grid item xs={6}>
                <IconButton sx={{ borderRadius: '10px' }}>
                    <PetsIcon
                        color="primary"
                        sx={{ width: '250px', height: '250px' }}
                        onClick={() =>
                            window.open('https://cataas.com/cat', '_blank')
                        }
                    />
                </IconButton>
            </Grid>
        </Grid>
    );
};
