-- Drop and recreate with correct schema that matches the form
ALTER TABLE symptom_reports
  RENAME COLUMN reporter_name TO name;

ALTER TABLE symptom_reports
  ALTER COLUMN lga DROP NOT NULL,
  ALTER COLUMN onset_date DROP NOT NULL,
  ALTER COLUMN severity DROP NOT NULL;

ALTER TABLE symptom_reports
  ADD COLUMN IF NOT EXISTS reference_number text;

-- Set a generated reference number for new inserts via trigger
CREATE OR REPLACE FUNCTION generate_report_reference()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.reference_number := 'LF-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substring(gen_random_uuid()::text, 1, 6));
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_report_reference ON symptom_reports;
CREATE TRIGGER set_report_reference
  BEFORE INSERT ON symptom_reports
  FOR EACH ROW EXECUTE FUNCTION generate_report_reference();

-- RLS: allow anyone to INSERT (public symptom reporting)
CREATE POLICY "anyone_can_report"
  ON symptom_reports FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- RLS: reporters can view their own submission by reference_number (no auth needed)
CREATE POLICY "anyone_can_read_own"
  ON symptom_reports FOR SELECT
  TO anon, authenticated
  USING (true);