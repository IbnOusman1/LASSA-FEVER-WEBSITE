import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for outbreak_data table
export interface OutbreakRecord {
  id: string;
  state: string;
  report_date: string;
  confirmed: number;
  deaths: number;
  recoveries: number;
  suspected: number;
  notes?: string | null;
  entered_by?: string | null;
  created_at: string;
}

// Types for symptom_reports table
export interface SymptomReport {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  state?: string | null;
  lga?: string | null;
  onset_date?: string | null;
  symptom_description?: string | null;
  severity?: string | null;
  reference_number?: string | null;
  submitted_at: string;
}
