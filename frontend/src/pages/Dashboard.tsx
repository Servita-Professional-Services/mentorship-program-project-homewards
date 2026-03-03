// TODO [CHALLENGE: Software Engineering] - SE-01
// Expand this dashboard to fetch real data from the API.
// See docs/challenges/software-engineering.md for requirements.

import { Link } from 'react-router-dom';

interface TileProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  href: string;
}

function Tile({ title, description, icon, accent, href }: TileProps) {
  return (
    <Link
      to={href}
      className="bg-surface-card rounded-2xl shadow-sm border border-surface-border p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow group no-underline"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
        style={{ backgroundColor: accent + '1a' }}
      >
        <div style={{ color: accent }}>{icon}</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="mt-1 text-sm text-text-muted leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}

const tiles: TileProps[] = [
  {
    title: 'Wards',
    description: 'View all active virtual wards, capacity, and specialty breakdown.',
    accent: '#181818',
    href: '/wards',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Patients',
    description: 'Monitor all patients currently admitted across virtual wards.',
    accent: '#007f3b',
    href: '/patients',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: 'Observations',
    description: 'Review the latest clinical observations and vital signs trends.',
    accent: '#b45309',
    href: '/observations',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Escalations',
    description: 'Patients flagged for urgent clinical review or immediate escalation.',
    accent: '#D10F3F',
    href: '/escalations',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

export function Dashboard() {
  return (
    <>
      {/* Hero — dark band continuing from the header */}
      <section className="bg-brand-primary py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight">
            Project HomeWards
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed">
            A virtual ward management platform supporting remote monitoring, clinical
            observations, and patient escalation across community care settings.
          </p>
          <div className="mt-8 w-16 h-1 rounded-full mx-auto" style={{ backgroundColor: '#D10F3F' }} />
        </div>
      </section>

      {/* Tiles */}
      <section className="bg-surface-bg py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiles.map((tile) => (
              <Tile key={tile.title} {...tile} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
