import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(username, password);
      toast.success('Login successful!');
      navigate('/admin/posts');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const googleEnabled = import.meta.env.VITE_OAUTH_GOOGLE_ENABLED === 'true';
  const appleEnabled = import.meta.env.VITE_OAUTH_APPLE_ENABLED === 'true';

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-surface-dark border-2 border-neon-cyan rounded-lg p-8">
        <h1 className="text-3xl font-bold text-neon-cyan mb-2 text-center">Admin</h1>
        <p className="text-text-secondary text-center mb-8">Enter your credentials</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-neon w-full"
              placeholder="Enter username"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-neon w-full"
              placeholder="Enter password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-bold rounded-lg hover:shadow-neon-glow-cyan transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {(googleEnabled || appleEnabled) && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neon-blue/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface-dark text-text-secondary">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {googleEnabled && (
                <button
                  type="button"
                  className="py-2 border border-neon-blue text-neon-blue rounded-lg hover:border-neon-cyan hover:text-neon-cyan transition-all"
                >
                  Google
                </button>
              )}
              {appleEnabled && (
                <button
                  type="button"
                  className="py-2 border border-neon-blue text-neon-blue rounded-lg hover:border-neon-cyan hover:text-neon-cyan transition-all"
                >
                  Apple
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
