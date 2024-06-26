import { createContext, useContext, useState } from 'react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: '', icon: null });
  const [visible, setVisible] = useState(false);

  const showToast = (show, message, icon) => {
    setVisible(true);
    setToast({ show, message, icon });
    setTimeout(() => setVisible(false), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.show && (
        <div className={`toast-container ${visible ? 'show' : ''}`}>
          <img src={toast?.icon} alt='toast-icon' />
          <p className='body-m'>{toast?.message}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
};
