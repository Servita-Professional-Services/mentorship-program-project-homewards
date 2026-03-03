import { useNavigate, useLocation } from 'react-router-dom';

// TODO [CHALLENGE: Software Engineering] - SE-01
// Replace this stub with a real page.
// See docs/challenges/software-engineering.md for requirements.

export function NotImplemented() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const section = pathname.replace('/', '');

  return (
    <section className="bg-brand-primary min-h-[calc(100vh-72px)] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-white/10 leading-none select-none mb-6">
          🚧
        </div>
        <h1 className="text-4xl font-bold text-white capitalize">{section}</h1>
        <p className="mt-4 text-lg text-white/70 leading-relaxed">
          This page hasn't been built yet — it's your challenge to implement it.
        </p>
        <div className="mt-4 w-12 h-1 rounded-full mx-auto" style={{ backgroundColor: '#D10F3F' }} />
        <button
          onClick={() => navigate('/')}
          className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-brand-primary bg-white hover:bg-white/90 transition-colors"
        >
          ← Back to dashboard
        </button>
      </div>
    </section>
  );
}
