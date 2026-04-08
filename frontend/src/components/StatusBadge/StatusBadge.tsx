import type { PatientStatus } from '@health-wards/shared';

export type DischargeStatus = 'READY' | 'NOT_READY' | 'DISCHARGED';
export type AnyStatus = PatientStatus | DischargeStatus;

const STATUS_CONFIG: Record<AnyStatus, { label: string; color: string }> = {
  // Patient statuses
  ESCALATED: { label: 'Escalated', color: '#d5281b' },
  MONITORING: { label: 'Monitoring', color: '#005eb8' },
  ADMITTED: { label: 'Admitted', color: '#007f3b' },
  // Discharge statuses
  READY: { label: 'Ready', color: '#007f3b' },
  NOT_READY: { label: 'Not Ready', color: '#d67f00' },
  DISCHARGED: { label: 'Discharged', color: '#768692' },
};

interface StatusBadgeProps {
  status: AnyStatus;
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
