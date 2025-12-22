interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: Props) {
  return (
    <div className={`bg-surface-dark border border-neon-cyan/30 rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}
