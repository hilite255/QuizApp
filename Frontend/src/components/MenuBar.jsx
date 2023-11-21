import MenuIcon from '@mui/icons-material/Menu';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import {
    AppBar,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Box
} from '@mui/material';
export const MenuBar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { logout, isAuthenticated, loginWithRedirect } = useAuth0();

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
                        {isAuthenticated ? (
                            <Button color="primary" onClick={() => logout()}>
                                <LogoutIcon sx={{ marginRight: '16px' }} />
                                Logout
                            </Button>
                        ) : (
                            <Button
                                color="primary"
                                onClick={() => loginWithRedirect()}
                            >
                                <LoginIcon sx={{ marginRight: '16px' }} />
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer anchor={'left'} open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        {isAuthenticated ? (
                            <>
                                {[
                                    {
                                        text: 'Profile',
                                        icon: <AccountCircleIcon />,
                                        path: '/user'
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

                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() =>
                                            logout({
                                                logoutParams: {
                                                    returnTo:
                                                        window.location.origin
                                                }
                                            })
                                        }
                                    >
                                        <ListItemIcon>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => loginWithRedirect()}
                                >
                                    <ListItemIcon>
                                        <LoginIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Login" />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};
