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
export const MenuBar = () => {
    const [open, setOpen] = useState(false);
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
                            sx={{ flexGrow: 1 }}
                            className="menuTitle"
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
                            { text: 'Profile', icon: <AccountCircleIcon /> },
                            { text: 'Quizzes', icon: <QuizIcon /> }
                        ].map(({ text, icon }) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
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
