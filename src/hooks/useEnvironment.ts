import { useState, useEffect } from 'react';
import api from '../services/api';

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
        const response = await api.get('/info');
        setInfo({
          environment: response.data.environment,
          name: response.data.name,
          version: response.data.version
        });
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
