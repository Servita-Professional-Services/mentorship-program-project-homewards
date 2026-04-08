import { useNavigate } from 'react-router-dom';
import { StatusBadge, type DischargeStatus } from '../StatusBadge/StatusBadge';

export interface PatientRow {
  id: string;
  name: string;
  nhsNumber?: string;
  ward: string;
  dischargeStatus: DischargeStatus | null;
  transportRequired?: boolean;
  readySince?: string | null;
}

interface PatientTableProps {
  patients: PatientRow[];
  onRowClick?: (id: string) => void;
}

export function PatientTable({ patients, onRowClick }: PatientTableProps) {
  const navigate = useNavigate();

  function handleRowClick(id: string) {
    if (onRowClick) {
      onRowClick(id);
    } else {
      navigate(`/patients/${id}`);
    }
  }

  return (
    <div className="bg-surface-card rounded-2xl shadow-sm border border-surface-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-border bg-surface-bg">
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
              Patient
            </th>
            {patients[0]?.nhsNumber !== undefined && (
              <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                NHS Number
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
              Ward
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
              Discharge Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
              Transport
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border">
          {patients.map((patient) => {
            const isReady = patient.dischargeStatus === 'READY';
            return (
              <tr
                key={patient.id}
                onClick={() => handleRowClick(patient.id)}
                className="hover:bg-surface-bg cursor-pointer transition-colors"
                style={
                  isReady
                    ? { borderLeft: '3px solid #007f3b' }
                    : { borderLeft: '3px solid transparent' }
                }
              >
                <td className="px-6 py-4 font-medium text-text-primary">{patient.name}</td>
                {patient.nhsNumber !== undefined && (
                  <td className="px-6 py-4 font-mono text-text-muted">{patient.nhsNumber}</td>
                )}
                <td className="px-6 py-4 text-text-muted">{patient.ward}</td>
                <td className="px-6 py-4">
                  {patient.dischargeStatus ? (
                    <StatusBadge status={patient.dischargeStatus} />
                  ) : (
                    <span className="text-text-muted text-xs">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-text-muted">
                  {patient.transportRequired ? 'Required' : 'Not required'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="px-6 py-3 border-t border-surface-border bg-surface-bg text-xs text-text-muted">
        {patients.length} patient{patients.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
