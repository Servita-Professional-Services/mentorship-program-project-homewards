import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { NotImplemented } from './pages/NotImplemented';
import { DischargeRecordsList } from './pages/DischargeRecordsList';
import { DischargeRecords } from './pages/DischargeRecords';

// ─── DISCHARGE COORDINATION — STEP 2 ─────────────────────────────────────────
//
// Add the discharge records routes below, following the same pattern as the
// existing routes above.
//
// Pages to import:
//   import { DischargeRecordsList } from './pages/DischargeRecordsList';
//   import { DischargeRecords }     from './pages/DischargeRecords';
//
// Routes to add inside <Routes>:
//   <Route path="/discharge-records"     element={<DischargeRecordsList />} />
//   <Route path="/discharge-records/new" element={<DischargeRecords />} />
//
// ─────────────────────────────────────────────────────────────────────────────

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-bg">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/discharge-records" element={<DischargeRecordsList />} />
            {/* STEP 2 — add discharge routes here */}
            <Route path="/discharge-records/new" element={<DischargeRecords />} />
            <Route path="*" element={<NotImplemented />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
