interface Props {
  variant: 'published' | 'draft' | 'dev' | 'stage' | 'prod';
  children: React.ReactNode;
}

export function Badge({ variant, children }: Props) {
  const variants = {
    published: 'bg-success/20 text-success border-success',
    draft: 'bg-warning/20 text-warning border-warning',
    dev: 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan',
    stage: 'bg-neon-orange/20 text-neon-orange border-neon-orange',
    prod: 'bg-success/20 text-success border-success',
  };

  return (
    <span
      className={`inline-block px-3 py-1 border rounded-full text-xs font-semibold uppercase ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
