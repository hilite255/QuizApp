import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMessage } from '../hooks/useMessage.jsx';

export const Redirect = ({ to }) => {
    const navigate = useNavigate();
    const { displayMessage } = useMessage();

    useEffect(() => {
        displayMessage(
            'You are not authorized to view this page. Log in first.',
            false
        );
        navigate(to);
    }, [to, navigate]);

    return null;
};
