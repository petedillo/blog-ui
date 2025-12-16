import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: Props) {
  const variants = {
    primary:
      'bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg hover:shadow-neon-glow-cyan',
    secondary:
      'bg-surface-dark border border-neon-blue text-text-primary hover:border-neon-cyan',
    danger: 'bg-error/10 border border-error text-error hover:bg-error/20',
  };

  return (
    <button
      className={`px-6 py-3 rounded font-semibold transition-all disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
