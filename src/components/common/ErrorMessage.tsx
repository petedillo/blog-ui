import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-overlay border-2 border-red-500/50 rounded-lg p-4 text-center">
      <h4 className="text-sm font-medium text-red-400">Error</h4>
      <p className="text-sm text-neon-cyan mt-1">{message}</p>
    </div>
  );
};

export default ErrorMessage;