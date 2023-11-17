import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const MenuBar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setOpen(!open)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, cursor: 'pointer' }}
                            className="menuTitle"
                            onClick={() => navigate('/')}
                        >
                            QuizApp
                        </Typography>
                        <Button color="primary">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer anchor={'left'} open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        {[
                            {
                                text: 'Profile',
                                icon: <AccountCircleIcon />,
                                path: '/profile'
                            },
                            {
                                text: 'Quizzes',
                                icon: <QuizIcon />,
                                path: '/quizzes'
                            }
                        ].map(({ text, icon, path }) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        setOpen(false);
                                        navigate(path);
                                    }}
                                >
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};
