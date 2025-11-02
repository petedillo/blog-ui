import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
      <h4 className="text-sm font-medium text-red-800">Error</h4>
      <p className="text-sm text-red-700 mt-1">{message}</p>
    </div>
  );
};

export default ErrorMessage;