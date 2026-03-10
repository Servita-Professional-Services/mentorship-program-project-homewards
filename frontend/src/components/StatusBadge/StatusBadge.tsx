import type { PatientStatus } from '@health-wards/shared';

// TODO [CHALLENGE: Component Design]
// 1. Add a Storybook story showing all four states side by side
// 2. Each status should meet WCAG AA contrast — verify with a contrast checker
// 3. Should this badge also convey status via an icon, not just colour and text?
//    (Consider users with colour vision deficiency)

const STATUS_CONFIG: Record<PatientStatus, { label: string; color: string }> = {
  ESCALATED: { label: 'Escalated', color: '#d5281b' },
  MONITORING: { label: 'Monitoring', color: '#005eb8' },
  ADMITTED: { label: 'Admitted', color: '#007f3b' },
  DISCHARGED: { label: 'Discharged', color: '#768692' },
};

interface StatusBadgeProps {
  status: PatientStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, color } = STATUS_CONFIG[status];
  return (
    <span
      style={{
        backgroundColor: color + '18',
        color,
        border: `1px solid ${color}35`,
      }}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
    >
      {label}
    </span>
  );
}
