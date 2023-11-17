import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { HomePage } from './pages/HomePage.jsx';
import { MenuBar } from './components/MenuBar.jsx';
import { QuizPage } from './pages/QuizPage.jsx';
import { QuizPageContainer } from './containers/QuizPageContainer.jsx';

export const Router = () => {
    return (
        <>
            <MenuBar />
            <Container>
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route
                        path="/quiz/:id"
                        exact
                        element={<QuizPageContainer />}
                    />
                </Routes>
            </Container>
        </>
    );
};
