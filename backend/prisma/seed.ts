import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ─── Wards ────────────────────────────────────────────────────────────────

  await prisma.ward.upsert({
    where: { id: 'ward-001' },
    update: {},
    create: {
      id: 'ward-001',
      name: 'Respiratory Virtual Ward',
      capacity: 20,
      speciality: 'respiratory',
      location: 'Manchester University NHS Foundation Trust',
    },
  });

  await prisma.ward.upsert({
    where: { id: 'ward-002' },
    update: {},
    create: {
      id: 'ward-002',
      name: 'Cardiology Virtual Ward',
      capacity: 15,
      speciality: 'cardiology',
      location: 'Nottingham University Hospitals NHS Trust',
    },
  });

  await prisma.ward.upsert({
    where: { id: 'ward-003' },
    update: {},
    create: {
      id: 'ward-003',
      name: 'General Medicine Virtual Ward',
      capacity: 30,
      speciality: 'general',
      location: 'University Hospitals Birmingham NHS Foundation Trust',
    },
  });

  // ─── Patients ─────────────────────────────────────────────────────────────

  const patients = [
    // ward-001 Respiratory
    { id: 'pat-001', firstName: 'Margaret', lastName: 'Thornton',   nhsNumber: '943-476-5919', wardId: 'ward-001', dateOfBirth: '1952-03-14' },
    { id: 'pat-003', firstName: 'Priya',    lastName: 'Patel',      nhsNumber: '801-234-6612', wardId: 'ward-001', dateOfBirth: '1989-01-09' },
    { id: 'pat-006', firstName: 'Eleanor',  lastName: 'Bassett',    nhsNumber: '318-762-4401', wardId: 'ward-001', dateOfBirth: '1961-08-27' },
    { id: 'pat-007', firstName: 'Thomas',   lastName: 'Adeyemi',    nhsNumber: '557-109-3382', wardId: 'ward-001', dateOfBirth: '1978-04-15' },
    { id: 'pat-012', firstName: 'Sandra',   lastName: 'Fletcher',   nhsNumber: '224-893-6610', wardId: 'ward-001', dateOfBirth: '1956-11-03' },
    { id: 'pat-016', firstName: 'Callum',   lastName: 'Drummond',   nhsNumber: '489-201-7734', wardId: 'ward-001', dateOfBirth: '1983-07-19' },
    // ward-002 Cardiology
    { id: 'pat-002', firstName: 'Derek',    lastName: 'Okafor',     nhsNumber: '512-382-7741', wardId: 'ward-002', dateOfBirth: '1967-07-22' },
    { id: 'pat-005', firstName: 'Aisha',    lastName: 'Nkrumah',    nhsNumber: '772-543-8819', wardId: 'ward-002', dateOfBirth: '1944-06-03' },
    { id: 'pat-008', firstName: 'Frances',  lastName: 'Kwan',       nhsNumber: '631-047-2295', wardId: 'ward-002', dateOfBirth: '1971-02-11' },
    { id: 'pat-009', firstName: 'Robert',   lastName: 'Singh',      nhsNumber: '745-338-9901', wardId: 'ward-002', dateOfBirth: '1958-09-30' },
    { id: 'pat-013', firstName: 'Ahmed',    lastName: 'Al-Hassan',  nhsNumber: '362-510-8847', wardId: 'ward-002', dateOfBirth: '1969-12-07' },
    { id: 'pat-017', firstName: 'Beatrice', lastName: 'Mwangi',     nhsNumber: '508-774-1123', wardId: 'ward-002', dateOfBirth: '1948-03-25' },
    // ward-003 General Medicine
    { id: 'pat-004', firstName: 'James',    lastName: 'Whitfield',  nhsNumber: '634-901-2281', wardId: 'ward-003', dateOfBirth: '1975-11-30' },
    { id: 'pat-010', firstName: 'Catherine',lastName: "O'Brien",    nhsNumber: '891-423-5567', wardId: 'ward-003', dateOfBirth: '1964-05-18' },
    { id: 'pat-011', firstName: 'Michael',  lastName: 'Osei',       nhsNumber: '173-665-4420', wardId: 'ward-003', dateOfBirth: '1980-10-22' },
    { id: 'pat-014', firstName: 'Patricia', lastName: 'Nwosu',      nhsNumber: '447-218-3309', wardId: 'ward-003', dateOfBirth: '1955-01-14' },
    { id: 'pat-015', firstName: 'William',  lastName: 'Kowalski',   nhsNumber: '926-584-7712', wardId: 'ward-003', dateOfBirth: '1972-06-09' },
    { id: 'pat-018', firstName: 'Deepa',    lastName: 'Ramachandran',nhsNumber:'659-332-0081', wardId: 'ward-003', dateOfBirth: '1987-08-04' },
  ];

  for (const p of patients) {
    await prisma.patient.upsert({
      where: { nhsNumber: p.nhsNumber },
      update: {},
      create: { ...p, dateOfBirth: new Date(p.dateOfBirth) },
    });
  }

  // ─── Discharge records ────────────────────────────────────────────────────
  // Dates span past (overdue), present, and near future relative to Apr 2026.

  const dischargeRecords: Array<{
    id: string;
    patientId: string;
    dateOfBloodwork: string;
    preferredDateOfDischarge: string;
    supportPlanNeeded: boolean;
    dischargeReason: string;
    medications: Array<{ id: string; medicationName: string; amount: number; measurement: string }>;
  }> = [
    // ── Respiratory ward-001 ─────────────────────────────────────────────
    {
      id: 'dr-001',
      patientId: 'pat-001',
      dateOfBloodwork: '2026-04-06T09:00:00Z',
      preferredDateOfDischarge: '2026-04-08T12:00:00Z',
      supportPlanNeeded: true,
      dischargeReason: 'Patient stable, ready for home care with community nurse follow-up.',
      medications: [
        { id: 'med-001', medicationName: 'Lisinopril',   amount: 10,  measurement: 'mg' },
        { id: 'med-002', medicationName: 'Atorvastatin', amount: 20,  measurement: 'mg' },
      ],
    },
    {
      id: 'dr-002',
      patientId: 'pat-001',
      dateOfBloodwork: '2025-06-10T08:30:00Z',
      preferredDateOfDischarge: '2025-06-12T11:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Respiratory episode resolved. Discharged with GP follow-up.',
      medications: [
        { id: 'med-004', medicationName: 'Salbutamol', amount: 100, measurement: 'mcg' },
      ],
    },
    {
      id: 'dr-003',
      patientId: 'pat-003',
      dateOfBloodwork: '2026-04-10T08:00:00Z',
      preferredDateOfDischarge: '2026-04-17T10:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Pneumonia resolved, oxygen saturations stable on room air.',
      medications: [
        { id: 'med-010', medicationName: 'Amoxicillin',   amount: 500, measurement: 'mg' },
        { id: 'med-011', medicationName: 'Prednisolone',  amount: 30,  measurement: 'mg' },
      ],
    },
    {
      id: 'dr-006',
      patientId: 'pat-006',
      dateOfBloodwork: '2026-04-12T09:30:00Z',
      preferredDateOfDischarge: '2026-04-14T11:00:00Z',
      supportPlanNeeded: true,
      dischargeReason: 'COPD exacerbation resolved. Requires home oxygen assessment.',
      medications: [
        { id: 'med-020', medicationName: 'Tiotropium',   amount: 18,  measurement: 'mcg' },
        { id: 'med-021', medicationName: 'Prednisolone', amount: 40,  measurement: 'mg' },
        { id: 'med-022', medicationName: 'Doxycycline',  amount: 100, measurement: 'mg' },
      ],
    },
    {
      id: 'dr-007',
      patientId: 'pat-007',
      dateOfBloodwork: '2026-04-13T10:00:00Z',
      preferredDateOfDischarge: '2026-04-20T09:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Asthma attack managed. Peak flow within normal range for 48hrs.',
      medications: [
        { id: 'med-023', medicationName: 'Salbutamol',   amount: 100, measurement: 'mcg' },
        { id: 'med-024', medicationName: 'Beclometasone', amount: 200, measurement: 'mcg' },
      ],
    },
    {
      id: 'dr-014',
      patientId: 'pat-012',
      dateOfBloodwork: '2026-04-08T08:00:00Z',
      preferredDateOfDischarge: '2026-04-11T10:00:00Z',
      supportPlanNeeded: true,
      dischargeReason: 'Pulmonary embolism treated. Anticoagulation initiated, district nurse arranged.',
      medications: [
        { id: 'med-040', medicationName: 'Apixaban',     amount: 10,  measurement: 'mg' },
        { id: 'med-041', medicationName: 'Omeprazole',   amount: 20,  measurement: 'mg' },
      ],
    },
    {
      id: 'dr-015',
      patientId: 'pat-012',
      dateOfBloodwork: '2025-02-18T09:00:00Z',
      preferredDateOfDischarge: '2025-02-21T11:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Viral pneumonitis resolved, patient independently mobile.',
      medications: [
        { id: 'med-042', medicationName: 'Salbutamol', amount: 100, measurement: 'mcg' },
      ],
    },
    {
      id: 'dr-022',
      patientId: 'pat-016',
      dateOfBloodwork: '2026-04-14T09:00:00Z',
      preferredDateOfDischarge: '2026-04-22T10:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Bronchitis resolved following antibiotic course.',
      medications: [
        { id: 'med-060', medicationName: 'Clarithromycin', amount: 500, measurement: 'mg' },
      ],
    },
    // ── Cardiology ward-002 ──────────────────────────────────────────────
    {
      id: 'dr-008',
      patientId: 'pat-002',
      dateOfBloodwork: '2026-04-09T08:30:00Z',
      preferredDateOfDischarge: '2026-04-13T10:00:00Z',
      supportPlanNeeded: true,
      dischargeReason: 'AF rate controlled. Anticoagulation commenced, cardiology outpatient follow-up booked.',
      medications: [
        { id: 'med-025', medicationName: 'Bisoprolol', amount: 5,   measurement: 'mg' },
        { id: 'med-026', medicationName: 'Warfarin',   amount: 3,   measurement: 'mg' },
        { id: 'med-027', medicationName: 'Ramipril',   amount: 2.5, measurement: 'mg' },
      ],
    },
    {
      id: 'dr-009',
      patientId: 'pat-002',
      dateOfBloodwork: '2024-11-05T08:00:00Z',
      preferredDateOfDischarge: '2024-11-08T11:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Hypertensive crisis managed. BP stable on adjusted medication.',
      medications: [
        { id: 'med-028', medicationName: 'Amlodipine', amount: 10, measurement: 'mg' },
        { id: 'med-029', medicationName: 'Ramipril',   amount: 5,  measurement: 'mg' },
      ],
    },
    {
      id: 'dr-005',
      patientId: 'pat-005',
      dateOfBloodwork: '2024-10-20T08:00:00Z',
      preferredDateOfDischarge: '2024-10-22T10:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Treatment complete. No further clinical intervention required.',
      medications: [
        { id: 'med-003', medicationName: 'Metformin', amount: 500, measurement: 'mg' },
      ],
    },
    {
      id: 'dr-010',
      patientId: 'pat-008',
      dateOfBloodwork: '2026-04-11T09:00:00Z',
      preferredDateOfDischarge: '2026-04-16T10:00:00Z',
      supportPlanNeeded: true,
      dischargeReason: 'Heart failure exacerbation stabilised. Community heart failure nurse to follow up.',
      medications: [
        { id: 'med-030', medicationName: 'Furosemide',   amount: 40, measurement: 'mg' },
        { id: 'med-031', medicationName: 'Spironolactone',amount: 25, measurement: 'mg' },
        { id: 'med-032', medicationName: 'Bisoprolol',   amount: 2.5,measurement: 'mg' },
      ],
    },
    {
      id: 'dr-011',
      patientId: 'pat-008',
      dateOfBloodwork: '2025-08-14T09:00:00Z',
      preferredDateOfDischarge: '2025-08-17T11:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Palpitations investigated, benign SVT confirmed. No intervention required.',
      medications: [
        { id: 'med-033', medicationName: 'Bisoprolol', amount: 2.5, measurement: 'mg' },
      ],
    },
    {
      id: 'dr-012',
      patientId: 'pat-009',
      dateOfBloodwork: '2026-04-07T08:00:00Z',
      preferredDateOfDischarge: '2026-04-10T12:00:00Z',
      supportPlanNeeded: true,
      dischargeReason: 'NSTEMI managed medically. Cardiology review in 6 weeks.',
      medications: [
        { id: 'med-034', medicationName: 'Aspirin',      amount: 75,  measurement: 'mg' },
        { id: 'med-035', medicationName: 'Ticagrelor',   amount: 90,  measurement: 'mg' },
        { id: 'med-036', medicationName: 'Atorvastatin', amount: 80,  measurement: 'mg' },
        { id: 'med-037', medicationName: 'Bisoprolol',   amount: 5,   measurement: 'mg' },
      ],
    },
    {
      id: 'dr-016',
      patientId: 'pat-013',
      dateOfBloodwork: '2026-04-13T09:30:00Z',
      preferredDateOfDischarge: '2026-04-19T10:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Chest pain investigated — musculoskeletal cause confirmed. Discharged with analgesia.',
      medications: [
        { id: 'med-044', medicationName: 'Naproxen',   amount: 500, measurement: 'mg' },
        { id: 'med-045', medicationName: 'Omeprazole', amount: 20,  measurement: 'mg' },
      ],
    },
    {
      id: 'dr-023',
      patientId: 'pat-017',
      dateOfBloodwork: '2026-04-10T08:30:00Z',
      preferredDateOfDischarge: '2026-04-24T10:00:00Z',
      supportPlanNeeded: true,
      dischargeReason: 'Slow AF managed. Requires carer support and weekly INR monitoring.',
      medications: [
        { id: 'med-061', medicationName: 'Digoxin',    amount: 125, measurement: 'mcg' },
        { id: 'med-062', medicationName: 'Warfarin',   amount: 4,   measurement: 'mg' },
        { id: 'med-063', medicationName: 'Furosemide', amount: 80,  measurement: 'mg' },
      ],
    },
    // ── General Medicine ward-003 ─────────────────────────────────────────
    {
      id: 'dr-004',
      patientId: 'pat-004',
      dateOfBloodwork: '2026-04-05T08:00:00Z',
      preferredDateOfDischarge: '2026-04-09T10:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Cellulitis resolved following IV antibiotics. Oral course to complete at home.',
      medications: [
        { id: 'med-012', medicationName: 'Flucloxacillin', amount: 500, measurement: 'mg' },
      ],
    },
    {
      id: 'dr-017',
      patientId: 'pat-010',
      dateOfBloodwork: '2026-04-12T09:00:00Z',
      preferredDateOfDischarge: '2026-04-18T11:00:00Z',
      supportPlanNeeded: true,
      dischargeReason: 'Decompensated T2DM stabilised. Insulin regimen adjusted, diabetic nurse to follow up.',
      medications: [
        { id: 'med-046', medicationName: 'Insulin Glargine', amount: 20, measurement: 'units' },
        { id: 'med-047', medicationName: 'Metformin',        amount: 1000,measurement: 'mg' },
        { id: 'med-048', medicationName: 'Empagliflozin',    amount: 10,  measurement: 'mg' },
      ],
    },
    {
      id: 'dr-018',
      patientId: 'pat-010',
      dateOfBloodwork: '2025-03-20T09:00:00Z',
      preferredDateOfDischarge: '2025-03-24T10:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Urinary tract infection treated. MSU clear on repeat culture.',
      medications: [
        { id: 'med-049', medicationName: 'Trimethoprim', amount: 200, measurement: 'mg' },
      ],
    },
    {
      id: 'dr-019',
      patientId: 'pat-011',
      dateOfBloodwork: '2026-04-14T08:30:00Z',
      preferredDateOfDischarge: '2026-04-21T10:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Acute kidney injury resolved. Nephrology to review in outpatients.',
      medications: [
        { id: 'med-050', medicationName: 'Amlodipine',  amount: 5,  measurement: 'mg' },
        { id: 'med-051', medicationName: 'Omeprazole',  amount: 20, measurement: 'mg' },
      ],
    },
    {
      id: 'dr-020',
      patientId: 'pat-014',
      dateOfBloodwork: '2026-04-08T09:00:00Z',
      preferredDateOfDischarge: '2026-04-12T10:00:00Z',
      supportPlanNeeded: true,
      dischargeReason: 'Hip fracture post-operative recovery. Physio and OT package arranged.',
      medications: [
        { id: 'med-052', medicationName: 'Co-codamol',    amount: 30,  measurement: 'mg' },
        { id: 'med-053', medicationName: 'Rivaroxaban',   amount: 10,  measurement: 'mg' },
        { id: 'med-054', medicationName: 'Levothyroxine', amount: 100, measurement: 'mcg' },
      ],
    },
    {
      id: 'dr-021',
      patientId: 'pat-014',
      dateOfBloodwork: '2024-07-10T08:00:00Z',
      preferredDateOfDischarge: '2024-07-15T10:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Hypothyroidism review — medication adjusted, patient stable.',
      medications: [
        { id: 'med-055', medicationName: 'Levothyroxine', amount: 75, measurement: 'mcg' },
      ],
    },
    {
      id: 'dr-013',
      patientId: 'pat-015',
      dateOfBloodwork: '2026-04-15T08:00:00Z',
      preferredDateOfDischarge: '2026-04-25T10:00:00Z',
      supportPlanNeeded: false,
      dischargeReason: 'Abdominal pain investigated. Gallstones confirmed, surgical referral made.',
      medications: [
        { id: 'med-038', medicationName: 'Omeprazole', amount: 20, measurement: 'mg' },
        { id: 'med-039', medicationName: 'Buscopan',   amount: 10, measurement: 'mg' },
      ],
    },
    {
      id: 'dr-024',
      patientId: 'pat-018',
      dateOfBloodwork: '2026-04-13T08:30:00Z',
      preferredDateOfDischarge: '2026-04-28T10:00:00Z',
      supportPlanNeeded: true,
      dischargeReason: 'Crohn\'s flare managed with steroids. Gastroenterology follow-up arranged.',
      medications: [
        { id: 'med-064', medicationName: 'Prednisolone',  amount: 40, measurement: 'mg' },
        { id: 'med-065', medicationName: 'Azathioprine',  amount: 100,measurement: 'mg' },
        { id: 'med-066', medicationName: 'Omeprazole',    amount: 20, measurement: 'mg' },
      ],
    },
  ];

  for (const dr of dischargeRecords) {
    const { medications, ...record } = dr;

    await prisma.dischargeRecord.upsert({
      where: { id: record.id },
      update: {},
      create: {
        ...record,
        dateOfBloodwork: new Date(record.dateOfBloodwork),
        preferredDateOfDischarge: new Date(record.preferredDateOfDischarge),
      },
    });

    for (const med of medications) {
      await prisma.medicationRecord.upsert({
        where: { id: med.id },
        update: {},
        create: { ...med, dischargeRecordId: record.id },
      });
    }
  }

  console.log(
    `Seed complete — ${patients.length} patients, ${dischargeRecords.length} discharge records.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
