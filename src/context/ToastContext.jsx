import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success', duration = 3000) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {createPortal(
                <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                    {toasts.map(toast => (
                        <div
                            key={toast.id}
                            className={`
                min-w-[300px] p-4 rounded-lg shadow-lg flex items-start gap-3 transform transition-all duration-300 animate-in slide-in-from-right
                ${toast.type === 'success' ? 'bg-white border-l-4 border-green-500 text-gray-800' : ''}
                ${toast.type === 'error' ? 'bg-white border-l-4 border-red-500 text-gray-800' : ''}
                ${toast.type === 'info' ? 'bg-white border-l-4 border-blue-500 text-gray-800' : ''}
              `}
                        >
                            <div className="shrink-0 mt-0.5">
                                {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                                {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
                            </div>
                            <p className="text-sm font-medium flex-1">{toast.message}</p>
                            <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
