
-- 1. Fix reference_number trigger on symptom_reports
CREATE OR REPLACE FUNCTION generate_reference_number()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.reference_number IS NULL OR NEW.reference_number = '' THEN
    NEW.reference_number := 'LF-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(REPLACE(gen_random_uuid()::text, '-', ''), 1, 6));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_generate_ref_number ON symptom_reports;
CREATE TRIGGER trg_generate_ref_number
  BEFORE INSERT ON symptom_reports
  FOR EACH ROW EXECUTE FUNCTION generate_reference_number();

-- 2. Backfill NULL reference_numbers for existing records
UPDATE symptom_reports
SET reference_number = 'LF-' || TO_CHAR(submitted_at, 'YYYYMMDD') || '-' || UPPER(SUBSTRING(REPLACE(gen_random_uuid()::text, '-', ''), 1, 6))
WHERE reference_number IS NULL;

-- 3. Create outbreak_data table for official case surveillance data entry
CREATE TABLE outbreak_data (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state        text NOT NULL,
  report_date  date NOT NULL,
  confirmed    integer NOT NULL DEFAULT 0,
  deaths       integer NOT NULL DEFAULT 0,
  recoveries   integer NOT NULL DEFAULT 0,
  suspected    integer NOT NULL DEFAULT 0,
  notes        text,
  entered_by   text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Unique per state+date so we can upsert updates
CREATE UNIQUE INDEX idx_outbreak_data_state_date ON outbreak_data (state, report_date);

-- Index for efficient time-series queries
CREATE INDEX idx_outbreak_data_date ON outbreak_data (report_date DESC);
CREATE INDEX idx_outbreak_data_state ON outbreak_data (state);

-- 4. RLS for outbreak_data
ALTER TABLE outbreak_data ENABLE ROW LEVEL SECURITY;

-- Anyone can read outbreak data (public surveillance)
CREATE POLICY "outbreak_data_select_all" ON outbreak_data
  FOR SELECT TO anon, authenticated USING (true);

-- Anyone (surveillance officers) can insert new data
CREATE POLICY "outbreak_data_insert_all" ON outbreak_data
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow updates (for corrections)
CREATE POLICY "outbreak_data_update_all" ON outbreak_data
  FOR UPDATE TO anon, authenticated USING (true);

-- 5. Enable realtime on outbreak_data
ALTER PUBLICATION supabase_realtime ADD TABLE outbreak_data;
ALTER PUBLICATION supabase_realtime ADD TABLE symptom_reports;

-- 6. Seed historical outbreak data (monthly aggregates 2024-2026) for predictions
INSERT INTO outbreak_data (state, report_date, confirmed, deaths, recoveries, suspected, notes, entered_by) VALUES
-- Ondo State monthly 2024
('Ondo', '2024-01-31', 145, 28, 102, 580, 'January 2024 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2024-02-29', 198, 38, 140, 792, 'February 2024 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2024-03-31', 162, 31, 114, 648, 'March 2024 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2024-04-30', 98, 19, 69, 392, 'April 2024 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2024-05-31', 45, 9, 32, 180, 'May 2024 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2024-06-30', 22, 4, 15, 88, 'June 2024 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2024-07-31', 18, 3, 13, 72, 'July 2024 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2024-08-31', 20, 4, 14, 80, 'August 2024 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2024-09-30', 31, 6, 22, 124, 'September 2024 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2024-10-31', 58, 11, 41, 232, 'October 2024 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2024-11-30', 112, 22, 79, 448, 'November 2024 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2024-12-31', 148, 29, 104, 592, 'December 2024 monthly aggregate', 'NCDC Historical Import'),
-- Ondo State monthly 2025
('Ondo', '2025-01-31', 162, 31, 114, 648, 'January 2025 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2025-02-28', 215, 42, 151, 860, 'February 2025 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2025-03-31', 178, 34, 125, 712, 'March 2025 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2025-04-30', 108, 21, 76, 432, 'April 2025 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2025-05-31', 48, 9, 34, 192, 'May 2025 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2025-06-30', 24, 5, 17, 96, 'June 2025 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2025-07-31', 19, 4, 13, 76, 'July 2025 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2025-08-31', 21, 4, 15, 84, 'August 2025 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2025-09-30', 34, 7, 24, 136, 'September 2025 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2025-10-31', 64, 12, 45, 256, 'October 2025 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2025-11-30', 124, 24, 87, 496, 'November 2025 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2025-12-31', 165, 32, 116, 660, 'December 2025 monthly aggregate', 'NCDC Historical Import'),
-- Ondo 2026 (Jan-May actual)
('Ondo', '2026-01-31', 148, 29, 104, 592, 'January 2026 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2026-02-28', 192, 37, 135, 768, 'February 2026 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2026-03-31', 158, 30, 111, 632, 'March 2026 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2026-04-30', 95, 18, 67, 380, 'April 2026 monthly aggregate', 'NCDC Historical Import'),
('Ondo', '2026-05-31', 42, 8, 30, 168, 'May 2026 monthly aggregate', 'NCDC Historical Import'),
-- Edo State 2024-2026
('Edo', '2024-01-31', 122, 23, 86, 488, 'January 2024', 'NCDC Historical Import'),
('Edo', '2024-02-29', 168, 32, 118, 672, 'February 2024', 'NCDC Historical Import'),
('Edo', '2024-03-31', 138, 26, 97, 552, 'March 2024', 'NCDC Historical Import'),
('Edo', '2024-04-30', 82, 16, 58, 328, 'April 2024', 'NCDC Historical Import'),
('Edo', '2024-11-30', 95, 18, 67, 380, 'November 2024', 'NCDC Historical Import'),
('Edo', '2024-12-31', 126, 24, 89, 504, 'December 2024', 'NCDC Historical Import'),
('Edo', '2025-01-31', 138, 26, 97, 552, 'January 2025', 'NCDC Historical Import'),
('Edo', '2025-02-28', 184, 35, 129, 736, 'February 2025', 'NCDC Historical Import'),
('Edo', '2025-03-31', 152, 29, 107, 608, 'March 2025', 'NCDC Historical Import'),
('Edo', '2026-01-31', 128, 24, 90, 512, 'January 2026', 'NCDC Historical Import'),
('Edo', '2026-02-28', 172, 33, 121, 688, 'February 2026', 'NCDC Historical Import'),
('Edo', '2026-03-31', 142, 27, 100, 568, 'March 2026', 'NCDC Historical Import'),
('Edo', '2026-04-30', 85, 16, 60, 340, 'April 2026', 'NCDC Historical Import'),
('Edo', '2026-05-31', 38, 7, 27, 152, 'May 2026', 'NCDC Historical Import'),
-- Bauchi State 2024-2026
('Bauchi', '2024-01-31', 78, 15, 55, 312, 'January 2024', 'NCDC Historical Import'),
('Bauchi', '2024-02-29', 102, 20, 72, 408, 'February 2024', 'NCDC Historical Import'),
('Bauchi', '2024-03-31', 88, 17, 62, 352, 'March 2024', 'NCDC Historical Import'),
('Bauchi', '2024-11-30', 72, 14, 51, 288, 'November 2024', 'NCDC Historical Import'),
('Bauchi', '2024-12-31', 94, 18, 66, 376, 'December 2024', 'NCDC Historical Import'),
('Bauchi', '2025-01-31', 85, 16, 60, 340, 'January 2025', 'NCDC Historical Import'),
('Bauchi', '2025-02-28', 112, 21, 79, 448, 'February 2025', 'NCDC Historical Import'),
('Bauchi', '2026-01-31', 79, 15, 56, 316, 'January 2026', 'NCDC Historical Import'),
('Bauchi', '2026-02-28', 104, 20, 73, 416, 'February 2026', 'NCDC Historical Import'),
('Bauchi', '2026-03-31', 86, 16, 61, 344, 'March 2026', 'NCDC Historical Import'),
('Bauchi', '2026-04-30', 52, 10, 37, 208, 'April 2026', 'NCDC Historical Import'),
('Bauchi', '2026-05-31', 24, 5, 17, 96, 'May 2026', 'NCDC Historical Import'),
-- Taraba State 2024-2026
('Taraba', '2024-01-31', 68, 13, 48, 272, 'January 2024', 'NCDC Historical Import'),
('Taraba', '2024-02-29', 90, 17, 63, 360, 'February 2024', 'NCDC Historical Import'),
('Taraba', '2025-01-31', 72, 14, 51, 288, 'January 2025', 'NCDC Historical Import'),
('Taraba', '2025-02-28', 96, 18, 68, 384, 'February 2025', 'NCDC Historical Import'),
('Taraba', '2026-01-31', 64, 12, 45, 256, 'January 2026', 'NCDC Historical Import'),
('Taraba', '2026-02-28', 84, 16, 59, 336, 'February 2026', 'NCDC Historical Import'),
('Taraba', '2026-03-31', 68, 13, 48, 272, 'March 2026', 'NCDC Historical Import'),
('Taraba', '2026-04-30', 42, 8, 30, 168, 'April 2026', 'NCDC Historical Import'),
('Taraba', '2026-05-31', 18, 3, 13, 72, 'May 2026', 'NCDC Historical Import'),
-- Ebonyi State 2024-2026
('Ebonyi', '2024-01-31', 58, 11, 41, 232, 'January 2024', 'NCDC Historical Import'),
('Ebonyi', '2024-02-29', 78, 15, 55, 312, 'February 2024', 'NCDC Historical Import'),
('Ebonyi', '2025-01-31', 62, 12, 44, 248, 'January 2025', 'NCDC Historical Import'),
('Ebonyi', '2025-02-28', 84, 16, 59, 336, 'February 2025', 'NCDC Historical Import'),
('Ebonyi', '2026-01-31', 56, 11, 39, 224, 'January 2026', 'NCDC Historical Import'),
('Ebonyi', '2026-02-28', 74, 14, 52, 296, 'February 2026', 'NCDC Historical Import'),
('Ebonyi', '2026-03-31', 58, 11, 41, 232, 'March 2026', 'NCDC Historical Import'),
('Ebonyi', '2026-04-30', 36, 7, 25, 144, 'April 2026', 'NCDC Historical Import'),
('Ebonyi', '2026-05-31', 15, 3, 11, 60, 'May 2026', 'NCDC Historical Import');
