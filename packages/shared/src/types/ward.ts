// TODO [CHALLENGE: Architecture] - Wards currently hold capacity as a number.
// How would you model a ward that has reached capacity? Where does that logic live?

export interface Ward {
  id: string;
  name: string;
  capacity: number;
  specialty: string; // e.g. 'respiratory', 'cardiology', 'general'
}
