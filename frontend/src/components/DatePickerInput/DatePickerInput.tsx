import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerInputProps {
  label?: string;
  error?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePickerInput({
  label,
  error,
  selected,
  onChange,
  placeholder = 'DD/MM/YYYY',
  disabled,
  id,
  minDate,
  maxDate,
}: DatePickerInputProps) {
  const inputClass = [
    'w-full rounded-lg border px-3 py-2 text-sm text-text-primary bg-white placeholder:text-text-muted transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    error ? 'border-status-escalated' : 'border-surface-border',
  ].join(' ');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <DatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        placeholderText={placeholder}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat="dd/MM/yyyy"
        className={inputClass}
        wrapperClassName="w-full"
      />
      {error && <p className="text-xs text-status-escalated">{error}</p>}
    </div>
  );
}
