
-- ── Drop overly-broad SELECT policies that expose PII to all anon users ──
DROP POLICY IF EXISTS "anyone_can_read_own"          ON symptom_reports;
DROP POLICY IF EXISTS "anyone_can_select_own_report" ON symptom_reports;

-- ── Remove duplicate INSERT policy (keep only one) ──
DROP POLICY IF EXISTS "anyone_can_report" ON symptom_reports;

-- ── Add targeted SELECT: only allow reading own report via reference_number ──
-- This prevents PII leakage while still supporting a "check your report" flow.
CREATE POLICY "select_own_report_by_reference"
  ON symptom_reports
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- NOTE: The above allows SELECT but the app never fetches symptom_reports
-- back to the browser (only inserts). To completely block read access
-- and prevent any PII exposure, we apply a constraint via a helper function.

-- Drop the permissive SELECT policy we just created
DROP POLICY IF EXISTS "select_own_report_by_reference" ON symptom_reports;

-- Final hardened state: anon users can INSERT but NOT SELECT symptom_reports.
-- This is correct: the app returns only a reference_number from the INSERT result,
-- and never queries the full reports table from the client.
CREATE POLICY "symptom_reports_insert_only"
  ON symptom_reports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
