import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
  urgent?: boolean;
}

const NAV: NavItem[] = [
  {
    label: 'Wards',
    children: [
      { label: 'All Wards', href: '/wards' },
      { label: 'Ward Capacity', href: '/wards/capacity' },
    ],
  },
  {
    label: 'Patients',
    children: [
      { label: 'All Patients', href: '/patients' },
      { label: 'Admissions', href: '/patients/admissions' },
    ],
  },
  {
    label: 'Observations',
    children: [
      { label: 'Latest Readings', href: '/observations/latest' },
      { label: 'Vital Trends', href: '/observations/trends' },
    ],
  },
  {
    label: 'Discharges',
    children: [
      { label: 'All Discharge Records', href: '/discharge-records' },
      { label: 'New Discharge Record', href: '/discharge-records/new' },
    ],
  },
  {
    label: 'Escalations',
    href: '/escalations',
    urgent: true,
  },
];

function ChevronDown() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-primary shadow-md">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-10 h-[72px]">
          {/* Logo */}
          <Link to="/" aria-label="Go to home" className="flex-shrink-0 no-underline">
            <Logo width={148} className="text-white" />
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1 h-full" aria-label="Main navigation">
            {NAV.map((item) =>
              item.children ? (
                /* Dropdown item */
                <div key={item.label} className="group relative h-full flex items-center">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 transition-colors">
                    {item.label}
                    <span className="opacity-60 transition-[opacity,transform] group-hover:opacity-100 group-hover:rotate-180">
                      <ChevronDown />
                    </span>
                  </button>

                  {/* Dropdown panel — mt-2 is transparent but still inside group so hover holds */}
                  <div className="absolute top-full left-0 hidden group-hover:block">
                    <div className="mt-2 w-52 bg-surface-card rounded-xl shadow-xl border border-surface-border overflow-hidden">
                      {item.children.map((child, i) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={[
                            'block px-4 py-2.5 text-sm text-text-primary no-underline',
                            'hover:bg-surface-bg hover:text-brand-primary transition-colors',
                            i < item.children!.length - 1 ? 'border-b border-surface-border' : '',
                          ].join(' ')}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Direct link */
                <Link
                  key={item.label}
                  to={item.href!}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 no-underline transition-colors"
                >
                  {item.urgent && (
                    <span
                      className="w-2 h-2 rounded-full bg-brand-accent flex-shrink-0"
                      aria-label="Urgent"
                    />
                  )}
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
