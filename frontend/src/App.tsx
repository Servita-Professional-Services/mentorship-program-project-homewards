import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Logo } from './components/Logo/Logo';
import { Dashboard } from './pages/Dashboard';
import { NotImplemented } from './pages/NotImplemented';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-bg">
        <header className="sticky top-0 z-50 bg-brand-primary shadow-md">
          <div className="max-w-7xl mx-auto px-8 py-5">
            <Link to="/" aria-label="Go to home">
              <Logo width={148} className="text-white" />
            </Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wards" element={<NotImplemented />} />
            <Route path="/patients" element={<NotImplemented />} />
            <Route path="/observations" element={<NotImplemented />} />
            <Route path="/escalations" element={<NotImplemented />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
