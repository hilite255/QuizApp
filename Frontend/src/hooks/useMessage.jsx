import React, { useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const MessageContext = React.createContext();

export function MessageContextProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const displayMessage = (message, success) => {
        setMessage(message);
        setSuccess(success);
        setOpen(true);
    };

    return (
        <MessageContext.Provider
            value={{
                displayMessage
            }}
        >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={6000}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity={success ? 'success' : 'error'}
                >
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </MessageContext.Provider>
    );
}
MessageContext.displayName = 'MessageContext';

export function useMessage() {
    return useContext(MessageContext);
}
