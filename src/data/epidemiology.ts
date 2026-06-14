// Lassa Fever epidemiological data for Nigeria 2020–2026
// Based on realistic NCDC outbreak patterns

export const YEARLY_DATA = [
  { year: 2020, confirmed: 1189, deaths: 237, cfr: 19.9, suspected: 4631 },
  { year: 2021, confirmed: 763,  deaths: 141, cfr: 18.5, suspected: 3820 },
  { year: 2022, confirmed: 906,  deaths: 174, cfr: 19.2, suspected: 4210 },
  { year: 2023, confirmed: 1074, deaths: 208, cfr: 19.4, suspected: 4980 },
  { year: 2024, confirmed: 1312, deaths: 245, cfr: 18.7, suspected: 5430 },
  { year: 2025, confirmed: 1481, deaths: 271, cfr: 18.3, suspected: 5890 },
  { year: 2026, confirmed: 892,  deaths: 158, cfr: 17.7, suspected: 3640 },
];

export const MONTHLY_SEASONAL_DATA = [
  { month: 'Jan', cases: 284, deaths: 52 },
  { month: 'Feb', cases: 312, deaths: 60 },
  { month: 'Mar', cases: 248, deaths: 45 },
  { month: 'Apr', cases: 156, deaths: 28 },
  { month: 'May', cases: 72,  deaths: 12 },
  { month: 'Jun', cases: 38,  deaths: 6  },
  { month: 'Jul', cases: 28,  deaths: 5  },
  { month: 'Aug', cases: 32,  deaths: 5  },
  { month: 'Sep', cases: 48,  deaths: 8  },
  { month: 'Oct', cases: 88,  deaths: 15 },
  { month: 'Nov', cases: 162, deaths: 30 },
  { month: 'Dec', cases: 224, deaths: 42 },
];

export const STATE_DATA: Record<string, {
  name: string;
  confirmed: number;
  deaths: number;
  cfr: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  lat: number;
  lng: number;
}> = {
  ondo:    { name: 'Ondo',    confirmed: 1842, deaths: 358, cfr: 19.4, severity: 'critical', lat: 7.25, lng: 5.20 },
  edo:     { name: 'Edo',     confirmed: 1543, deaths: 289, cfr: 18.7, severity: 'critical', lat: 6.34, lng: 5.63 },
  bauchi:  { name: 'Bauchi',  confirmed: 987,  deaths: 191, cfr: 19.4, severity: 'high',     lat: 10.30, lng: 9.84 },
  taraba:  { name: 'Taraba',  confirmed: 876,  deaths: 172, cfr: 19.6, severity: 'high',     lat: 7.87, lng: 11.36 },
  ebonyi:  { name: 'Ebonyi',  confirmed: 743,  deaths: 144, cfr: 19.4, severity: 'high',     lat: 6.26, lng: 8.01 },
  plateau: { name: 'Plateau', confirmed: 612,  deaths: 118, cfr: 19.3, severity: 'medium',   lat: 9.22, lng: 9.52 },
  benue:   { name: 'Benue',   confirmed: 521,  deaths: 98,  cfr: 18.8, severity: 'medium',   lat: 7.34, lng: 8.78 },
  kogi:    { name: 'Kogi',    confirmed: 312,  deaths: 58,  cfr: 18.6, severity: 'low',      lat: 7.80, lng: 6.74 },
  nasarawa:{ name: 'Nasarawa',confirmed: 287,  deaths: 54,  cfr: 18.8, severity: 'low',      lat: 8.56, lng: 8.32 },
  gombe:   { name: 'Gombe',   confirmed: 198,  deaths: 36,  cfr: 18.2, severity: 'low',      lat: 10.29, lng: 11.17 },
};

export const CUMULATIVE_STATS = {
  totalConfirmed: 7617,
  totalDeaths: 1434,
  cfr: 18.8,
  statesAffected: 25,
  peakYear: 2026,
  peakMonth: 'February',
};

export const ML_MODEL_DATA = {
  models: [
    { name: 'Random Forest + ALO', accuracy: 94.7, auc: 0.967, precision: 93.8, recall: 95.2, f1: 94.5 },
    { name: 'Decision Tree',       accuracy: 87.3, auc: 0.901, precision: 86.1, recall: 88.2, f1: 87.1 },
    { name: 'Logistic Regression', accuracy: 82.6, auc: 0.871, precision: 81.4, recall: 83.5, f1: 82.4 },
    { name: 'SVM',                 accuracy: 89.1, auc: 0.921, precision: 88.3, recall: 89.7, f1: 89.0 },
    { name: 'Naive Bayes',         accuracy: 78.4, auc: 0.824, precision: 77.2, recall: 79.1, f1: 78.1 },
  ],
  featureImportance: [
    { feature: 'Rodent Exposure Index', importance: 0.234 },
    { feature: 'Seasonal Dryness Score', importance: 0.198 },
    { feature: 'Population Density', importance: 0.167 },
    { feature: 'Healthcare Access', importance: 0.143 },
    { feature: 'Temperature Anomaly', importance: 0.112 },
    { feature: 'Rainfall Deficit', importance: 0.089 },
    { feature: 'Poverty Index', importance: 0.057 },
  ],
  rocData: [
    { fpr: 0.00, tpr: 0.00 },
    { fpr: 0.02, tpr: 0.38 },
    { fpr: 0.04, tpr: 0.62 },
    { fpr: 0.06, tpr: 0.74 },
    { fpr: 0.10, tpr: 0.84 },
    { fpr: 0.15, tpr: 0.90 },
    { fpr: 0.20, tpr: 0.93 },
    { fpr: 0.30, tpr: 0.96 },
    { fpr: 0.50, tpr: 0.98 },
    { fpr: 1.00, tpr: 1.00 },
  ],
  predictions: [
    { month: 'Jul 2026', riskLevel: 'Low',      predictedCases: 42,  confidenceLow: 28,  confidenceHigh: 58 },
    { month: 'Aug 2026', riskLevel: 'Low',      predictedCases: 38,  confidenceLow: 24,  confidenceHigh: 54 },
    { month: 'Sep 2026', riskLevel: 'Moderate', predictedCases: 65,  confidenceLow: 48,  confidenceHigh: 84 },
    { month: 'Oct 2026', riskLevel: 'Moderate', predictedCases: 112, confidenceLow: 88,  confidenceHigh: 138 },
    { month: 'Nov 2026', riskLevel: 'High',     predictedCases: 198, confidenceLow: 162, confidenceHigh: 236 },
    { month: 'Dec 2026', riskLevel: 'High',     predictedCases: 267, confidenceLow: 224, confidenceHigh: 312 },
  ],
};

export const TIMELINE_EVENTS = [
  { year: 2020, event: 'Record 1,189 confirmed cases; NCDC activates Emergency Operations Center', severity: 'critical' },
  { year: 2021, event: 'Outbreak subsides; multi-state SMOTE-based prediction model deployed', severity: 'medium' },
  { year: 2022, event: 'Secondary surge linked to Ondo & Edo; rapid response teams mobilized', severity: 'high' },
  { year: 2023, event: 'Community surveillance expanded to 18 endemic states; new diagnostic labs opened', severity: 'high' },
  { year: 2024, event: 'Highest caseload since records began; nationwide rodent control campaign launched', severity: 'critical' },
  { year: 2025, event: 'AI early-warning system integrated into NCDC surveillance platform', severity: 'medium' },
  { year: 2026, event: 'Improved containment; CFR drops to 17.7% with enhanced clinical protocols', severity: 'low' },
];

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];
