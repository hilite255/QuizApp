import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Button, CircularProgress, Container, Typography } from '@mui/material';
import { HomePage } from './pages/HomePage.jsx';
import { MenuBar } from './components/MenuBar.jsx';
import { QuizPageContainer } from './containers/QuizPageContainer.jsx';
import { QuizzesListContainer } from './containers/QuizzesListContainer.jsx';
import { Footer } from './components/Footer.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { QuizCreatePage } from './pages/QuizCreatePage.jsx';
import { QuizStatsPage } from './pages/QuizStatsPage.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import LoginIcon from '@mui/icons-material/Login';
import { Redirect } from './components/Redirect.jsx';
import { QuizStatsPageContainer } from './containers/QuizStatsPageContainer.jsx';

export const Router = () => {
    const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        (async () => {
            try {
                const localAccessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: 'http://quiz-app.hu/',
                        consent:
                            'read:name read:current_user read:email profile'
                    }
                });
                localStorage.setItem('accessToken', localAccessToken);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [getAccessTokenSilently]);

    if (isLoading) {
        return (
            <>
                <MenuBar />
                <Container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 'calc(100vh - 140px)'
                    }}
                >
                    <CircularProgress />
                </Container>
                <Footer />
            </>
        );
    }

    if (!isLoading && !isAuthenticated) {
        return (
            <>
                <MenuBar />
                <Container sx={{ paddingTop: '32px', paddingBottom: '88px' }}>
                    <Routes>
                        <Route path="/" exact element={<HomePage />} />
                        <Route path="*" exact element={<Redirect to="/" />} />
                    </Routes>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <MenuBar />
            <Container sx={{ paddingTop: '32px', paddingBottom: '88px' }}>
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route
                        path="/quiz/:id"
                        exact
                        element={<QuizPageContainer />}
                    />
                    <Route
                        path="/quizzes"
                        exact
                        element={<QuizzesListContainer />}
                    />
                    <Route path="/user" exact element={<ProfilePage />} />
                    <Route
                        path="/user/quiz/add"
                        exact
                        element={<QuizCreatePage />}
                    />
                    <Route
                        path="/user/quiz/:id/stats"
                        exact
                        element={<QuizStatsPageContainer />}
                    />
                </Routes>
            </Container>
            <Footer />
        </>
    );
};
