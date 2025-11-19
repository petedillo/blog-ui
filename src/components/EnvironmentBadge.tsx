import React from 'react';
import { useEnvironment } from '../hooks/useEnvironment';

export const EnvironmentBadge: React.FC = () => {
  const { environment } = useEnvironment();

  // Only show badge in production
  if (environment !== 'prod') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-red-600 text-white px-3 py-1 rounded-full shadow-lg text-xs font-bold tracking-wider">
        PROD
      </div>
    </div>
  );
};
