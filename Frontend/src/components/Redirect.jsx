import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Redirect = ({ to }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to);
    }, [to]);

    return null;
};
