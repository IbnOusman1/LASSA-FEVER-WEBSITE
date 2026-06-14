
CREATE TABLE symptom_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_name text NOT NULL,
  phone text NOT NULL,
  email text,
  state text NOT NULL,
  lga text NOT NULL,
  symptom_description text NOT NULL,
  onset_date date NOT NULL,
  severity text NOT NULL DEFAULT 'mild',
  submitted_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE symptom_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_can_insert_reports" ON symptom_reports
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "anyone_can_select_own_report" ON symptom_reports
  FOR SELECT TO anon, authenticated
  USING (true);
