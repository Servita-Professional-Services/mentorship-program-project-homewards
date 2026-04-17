import type { InputHTMLAttributes } from 'react';

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function NumberInput({ label, error, id, className = '', ...props }: NumberInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        id={id}
        type="number"
        className={[
          'rounded-lg border px-3 py-2 text-sm text-text-primary bg-white placeholder:text-text-muted transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error ? 'border-status-escalated' : 'border-surface-border',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-status-escalated">{error}</p>}
    </div>
  );
}
