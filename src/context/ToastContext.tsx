import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface ToastContextType {
    showToast: (message: string) => void;
    hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [show, setShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const showToast = (msg: string) => {
        setMessage(msg);
        setShow(true);
    };

    const hideToast = () => {
        setShow(false);
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}

            {show && (
                <ToastContainer position="bottom-start" className="p-3" style={toastContainerStyle}>
                    <Toast show={show} onClose={hideToast} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Notification</strong>
                            <small>Now</small>
                        </Toast.Header>
                        <Toast.Body>{message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </ToastContext.Provider>
    );
};

const toastContainerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    zIndex: 1050,
    maxWidth: '300px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    borderRadius: '8px',
    backgroundColor: '#fff',
};