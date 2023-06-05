import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessagePortal: React.FC<ErrorMessageProps> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  useEffect(() => {
    const errorContainer = document.createElement('div');
    document.body.appendChild(errorContainer);

    return () => {
      document.body.removeChild(errorContainer);
    };
  }, []);

  return ReactDOM.createPortal(<ErrorMessagePortal message={message} />, document.body);
};

export default ErrorMessage;
