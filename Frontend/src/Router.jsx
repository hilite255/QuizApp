import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { HomePage } from './pages/HomePage.jsx';
import { MenuBar } from './components/MenuBar.jsx';
import { QuizPage } from './pages/QuizPage.jsx';
import { QuizPageContainer } from './containers/QuizPageContainer.jsx';
import { QuizzesListContainer } from './containers/QuizzesListContainer.jsx';
import { Footer } from './components/Footer.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';

export const Router = () => {
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
                    <Route path="/profile" exact element={<ProfilePage />} />
                </Routes>
            </Container>
            <Footer />
        </>
    );
};
