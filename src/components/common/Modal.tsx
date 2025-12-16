interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-surface-dark border-2 border-neon-cyan rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex justify-between items-center p-6 border-b border-neon-cyan">
          <h2 className="text-2xl font-bold text-neon-cyan">{title}</h2>
          <button
            onClick={onClose}
            className="text-text-primary hover:text-neon-cyan text-2xl transition-colors"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
        {onConfirm && (
          <div className="flex gap-4 p-6 border-t border-neon-cyan justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-neon-blue text-neon-blue rounded-lg hover:border-neon-cyan transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg rounded-lg hover:shadow-neon-glow-cyan transition-all"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
