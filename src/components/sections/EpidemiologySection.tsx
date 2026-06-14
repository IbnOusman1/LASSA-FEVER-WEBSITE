import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend,
} from 'recharts';
import { TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

const YEARLY = [
  { year: '2020', cases: 833,  deaths: 174, cfr: 20.9 },
  { year: '2021', cases: 916,  deaths: 173, cfr: 18.9 },
  { year: '2022', cases: 1067, deaths: 214, cfr: 20.1 },
  { year: '2023', cases: 1340, deaths: 243, cfr: 18.1 },
  { year: '2024', cases: 1548, deaths: 271, cfr: 17.5 },
  { year: '2025', cases: 1502, deaths: 272, cfr: 18.1 },
  { year: '2026', cases: 411,  deaths: 87,  cfr: 21.2 },
];

const MONTHLY = [
  { month: 'Jan', cases: 420 }, { month: 'Feb', cases: 610 }, { month: 'Mar', cases: 540 },
  { month: 'Apr', cases: 310 }, { month: 'May', cases: 180 }, { month: 'Jun', cases: 120 },
  { month: 'Jul', cases: 95  }, { month: 'Aug', cases: 88  }, { month: 'Sep', cases: 105 },
  { month: 'Oct', cases: 190 }, { month: 'Nov', cases: 340 }, { month: 'Dec', cases: 380 },
];

const REGIONAL = [
  { region: 'South West', cases: 3855 },
  { region: 'North East', cases: 1986 },
  { region: 'South East', cases: 862  },
  { region: 'North Central', cases: 614 },
  { region: 'South South', cases: 420 },
  { region: 'North West', cases: 80   },
];

const TOOLTIP_STYLE = {
  fontSize: 12, borderRadius: 4,
  border: '1px solid hsl(30 18% 80%)',
  background: 'hsl(38 30% 97%)',
  color: 'hsl(20 25% 10%)',
};

export default function EpidemiologySection() {
  return (
    <section id="analysis" className="relative py-20 overflow-hidden section-beige-2">
      {/* DNA strand pattern */}
      <div className="absolute inset-0 bg-dna-strand pointer-events-none z-0" />
      {/* Drifting ECG line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-8">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path className="ecg-drift"
            d="M0,40 L200,40 L215,15 L223,58 L231,8 L239,60 L247,40 L440,40 L455,15 L463,58 L471,8 L479,60 L487,40 L680,40 L695,15 L703,58 L711,8 L719,60 L727,40 L920,40 L935,15 L943,58 L951,8 L959,60 L967,40 L1160,40 L1175,15 L1183,58 L1191,8 L1199,60 L1207,40 L1440,40"
            fill="none" stroke="hsl(0 65% 36% / 0.25)" strokeWidth="1.5" />
        </svg>
      </div>
      {/* Virus particle */}
      <div className="absolute bottom-10 right-8 pointer-events-none z-0 text-primary/10 virus-float-3">
        <svg width="80" height="80" viewBox="0 0 56 56" fill="none" aria-hidden>
          <circle cx="28" cy="28" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="28" cy="28" r="5" fill="currentColor" opacity="0.5" />
          {[0,51,103,154,206,257,309].map((deg, i) => { const r=(deg*Math.PI)/180; return <g key={i}><line x1={28+Math.cos(r)*13} y1={28+Math.sin(r)*13} x2={28+Math.cos(r)*22} y2={28+Math.sin(r)*22} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx={28+Math.cos(r)*23} cy={28+Math.sin(r)*23} r="2" fill="currentColor" opacity="0.7"/></g>; })}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <span className="text-primary label-badge">Epidemiology</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground text-balance font-display mb-2">
            Epidemiological Analysis
          </h2>
          <p className="text-muted-foreground text-sm md:text-base text-pretty max-w-2xl">
            Trend analysis, seasonal patterns, regional distribution and CFR tracking across Nigeria 2020–2026.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Annual trend */}
          <div className="chart-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Annual Case &amp; Mortality Trend</h3>
            </div>
            <div className="w-full min-w-0 overflow-hidden" style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={YEARLY} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="epCases" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0 65% 36%)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="hsl(0 65% 36%)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="epDeaths" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(25 75% 45%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(25 75% 45%)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 18% 84%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'hsl(20 12% 42%)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(20 12% 42%)' }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: 'hsl(20 25% 10%)' }} />
                  <Legend wrapperStyle={{ fontSize: 11, color: 'hsl(20 12% 42%)' }} layout="horizontal" />
                  <Area type="monotone" dataKey="cases"  stroke="hsl(0 65% 36%)" fill="url(#epCases)"  strokeWidth={2} name="Cases" />
                  <Area type="monotone" dataKey="deaths" stroke="hsl(25 75% 45%)" fill="url(#epDeaths)" strokeWidth={2} name="Deaths" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Seasonal pattern */}
          <div className="chart-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Monthly Seasonal Distribution (avg)</h3>
            </div>
            <div className="w-full min-w-0 overflow-hidden" style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 18% 84%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(20 12% 42%)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(20 12% 42%)' }} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: 'hsl(20 25% 10%)' }} />
                  <Bar dataKey="cases" fill="hsl(0 65% 36%)" name="Cases" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CFR trend */}
          <div className="chart-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Case Fatality Rate Trend (%)</h3>
            </div>
            <div className="w-full min-w-0 overflow-hidden" style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={YEARLY} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 18% 84%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'hsl(20 12% 42%)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(20 12% 42%)' }} domain={[15, 25]} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: 'hsl(20 25% 10%)' }} formatter={(v: number) => [`${v}%`, 'CFR']} />
                  <Line type="monotone" dataKey="cfr" stroke="hsl(38 85% 60%)" strokeWidth={2.5} dot={{ fill: 'hsl(38 85% 60%)', r: 4 }} name="CFR %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional */}
          <div className="chart-card p-5">
            <h3 className="font-semibold text-foreground text-sm mb-4">Regional Case Distribution</h3>
            <ul className="space-y-3">
              {REGIONAL.map((r) => {
                const max = REGIONAL[0].cases;
                const pct = Math.round((r.cases / max) * 100);
                return (
                  <li key={r.region}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-foreground/80 text-sm">{r.region}</span>
                      <span className="text-primary text-xs font-semibold">{r.cases.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-gradient-to-r from-primary to-primary/70" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { icon: Calendar,      title: 'Seasonal Patterns',   body: 'Lassa fever peaks Nov–Apr. February and March consistently record the highest monthly caseloads, driven by dry-season rodent migration into human dwellings.' },
            { icon: TrendingUp,    title: 'Peak Periods',         body: 'Year-over-year case counts rose 85% from 2020 to 2024. The 2024 peak (1,548 confirmed) represents the highest single-year incidence in the 2020–2026 dataset.' },
            { icon: AlertTriangle, title: 'Key Risk Factors',     body: 'Poor food storage, inadequate sanitation, healthcare worker exposure, and high rodent density in rural South West and North East Nigeria drive transmission.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="overview-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl icon-orb-crimson flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-foreground font-semibold text-sm">{title}</h3>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed text-pretty">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
