import { useState, useEffect } from 'react';

export type Environment = 'dev' | 'stage' | 'prod' | 'unknown';

interface EnvironmentInfo {
  environment: Environment;
  version: string;
  apiStatus: 'connected' | 'disconnected';
}

export const useEnvironment = (): EnvironmentInfo => {
  const [info, setInfo] = useState<EnvironmentInfo>({
    environment: 'unknown',
    version: '0.0.0',
    apiStatus: 'disconnected'
  });

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        const response = await fetch('/api/v1/info');
        if (response.ok) {
          const data = await response.json();
          setInfo({
            environment: data.environment as Environment,
            version: data.version,
            apiStatus: 'connected'
          });
        }
      } catch (error) {
        console.error('Failed to fetch environment info:', error);
      }
    };

    fetchEnvironment();
  }, []);

  return info;
};
