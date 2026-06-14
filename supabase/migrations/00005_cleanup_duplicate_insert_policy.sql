
-- Remove duplicate INSERT policy, keep the descriptive one
DROP POLICY IF EXISTS "symptom_reports_insert_only" ON symptom_reports;
