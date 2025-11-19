import React from 'react';
import { useEnvironment, Environment } from '../hooks/useEnvironment';

const getEnvironmentStyles = (env: Environment) => {
  switch (env) {
    case 'dev':
      return {
        bg: 'bg-cyan-500',
        text: 'text-[#0A0F24]',
        border: 'border-cyan-400',
        label: 'DEV ENVIRONMENT'
      };
    case 'stage':
      return {
        bg: 'bg-yellow-500',
        text: 'text-gray-900',
        border: 'border-yellow-400',
        label: 'STAGING ENVIRONMENT'
      };
    case 'prod':
      return {
        bg: 'bg-red-600',
        text: 'text-white',
        border: 'border-red-500',
        label: 'PRODUCTION'
      };
    default:
      return {
        bg: 'bg-gray-500',
        text: 'text-white',
        border: 'border-gray-400',
        label: 'UNKNOWN ENVIRONMENT'
      };
  }
};

export const EnvironmentBanner: React.FC = () => {
  const { environment, version, apiStatus } = useEnvironment();

  // Don't show banner in production (use corner badge instead)
  if (environment === 'prod') {
    return null;
  }

  // Don't show if environment is unknown
  if (environment === 'unknown') {
    return null;
  }

  const styles = getEnvironmentStyles(environment);

  return (
    <div className={`${styles.bg} ${styles.text} border-b-2 ${styles.border} py-2 px-4`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-sm tracking-wider">
            {styles.label}
          </span>
          <span className="text-xs opacity-80">
            v{version}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            apiStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'
          }`} />
          <span className="text-xs">
            API {apiStatus}
          </span>
        </div>
      </div>
    </div>
  );
};
