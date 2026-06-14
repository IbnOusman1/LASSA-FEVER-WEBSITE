
-- ── symptom_reports: length + logical constraints ──
ALTER TABLE symptom_reports
  ADD CONSTRAINT chk_sr_name_len          CHECK (char_length(name)                <= 100),
  ADD CONSTRAINT chk_sr_phone_len         CHECK (char_length(phone)               <= 20),
  ADD CONSTRAINT chk_sr_email_len         CHECK (email IS NULL OR char_length(email) <= 120),
  ADD CONSTRAINT chk_sr_state_len         CHECK (char_length(state)               <= 60),
  ADD CONSTRAINT chk_sr_lga_len           CHECK (lga IS NULL OR char_length(lga)  <= 80),
  ADD CONSTRAINT chk_sr_symptom_len       CHECK (char_length(symptom_description) <= 1000),
  ADD CONSTRAINT chk_sr_onset_not_future  CHECK (onset_date IS NULL OR onset_date <= CURRENT_DATE),
  ADD CONSTRAINT chk_sr_name_not_empty    CHECK (char_length(trim(name))          >  0),
  ADD CONSTRAINT chk_sr_phone_not_empty   CHECK (char_length(trim(phone))         >  0);

-- ── outbreak_data: numeric bounds + logical constraints ──
ALTER TABLE outbreak_data
  ADD CONSTRAINT chk_od_confirmed_pos     CHECK (confirmed  >= 0),
  ADD CONSTRAINT chk_od_deaths_pos        CHECK (deaths     >= 0),
  ADD CONSTRAINT chk_od_recoveries_pos    CHECK (recoveries >= 0),
  ADD CONSTRAINT chk_od_suspected_pos     CHECK (suspected  >= 0),
  ADD CONSTRAINT chk_od_deaths_lte_confirmed CHECK (deaths  <= confirmed),
  ADD CONSTRAINT chk_od_state_len         CHECK (char_length(state)  <= 60),
  ADD CONSTRAINT chk_od_notes_len         CHECK (notes IS NULL OR char_length(notes) <= 500),
  ADD CONSTRAINT chk_od_entered_by_len    CHECK (entered_by IS NULL OR char_length(entered_by) <= 100),
  ADD CONSTRAINT chk_od_date_not_future   CHECK (report_date <= CURRENT_DATE),
  ADD CONSTRAINT chk_od_confirmed_max     CHECK (confirmed  <= 99999),
  ADD CONSTRAINT chk_od_deaths_max        CHECK (deaths     <= 99999),
  ADD CONSTRAINT chk_od_recoveries_max    CHECK (recoveries <= 99999),
  ADD CONSTRAINT chk_od_suspected_max     CHECK (suspected  <= 99999);
