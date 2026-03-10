import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { NotImplemented } from './pages/NotImplemented';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-bg">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="*" element={<NotImplemented />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
