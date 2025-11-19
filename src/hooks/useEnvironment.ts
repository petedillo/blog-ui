import { useState, useEffect } from 'react';

export interface EnvironmentInfo {
  environment: 'dev' | 'stage' | 'prod';
  name: string;
  version: string;
}

export const useEnvironment = () => {
  const [info, setInfo] = useState<EnvironmentInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
        const response = await fetch(`${apiBaseUrl}/info`);
        
        if (response.ok) {
          const data = await response.json();
          setInfo({
            environment: data.environment,
            name: data.name,
            version: data.version
          });
        }
      } catch (error) {
        console.error('Failed to fetch environment info:', error);
        // Fallback to local env var
        setInfo({
          environment: (import.meta.env.VITE_ENVIRONMENT || 'dev') as 'dev' | 'stage' | 'prod',
          name: 'Blog API',
          version: 'unknown'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironment();
  }, []);

  return { info, loading };
};
