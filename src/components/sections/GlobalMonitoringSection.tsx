import { Globe, TrendingUp, TrendingDown, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const GLOBAL_STATS = [
  { label: 'Global Confirmed Cases',  value: '12,480', trend: '+6.2%', up: true,  icon: Globe },
  { label: 'Global Deaths',           value: '2,240',  trend: '+4.8%', up: true,  icon: TrendingUp },
  { label: 'Countries Active',        value: '7',      trend: '+1',    up: true,  icon: AlertTriangle },
  { label: 'Global CFR',              value: '17.9%',  trend: '-0.8%', up: false, icon: TrendingDown },
];

const COUNTRIES = [
  { country: 'Nigeria',       cases: 7617, deaths: 1434, status: 'Critical',  change: +4.2 },
  { country: 'Sierra Leone',  cases: 2100, deaths: 380,  status: 'High',      change: +1.8 },
  { country: 'Guinea',        cases: 1240, deaths: 223,  status: 'High',      change: +0.5 },
  { country: 'Liberia',       cases: 680,  deaths: 122,  status: 'Moderate',  change: -0.3 },
  { country: 'Benin',         cases: 440,  deaths: 79,   status: 'Moderate',  change: +0.2 },
  { country: 'Togo',          cases: 210,  deaths: 38,   status: 'Low',       change: -0.1 },
  { country: 'Ghana',         cases: 80,   deaths: 14,   status: 'Low',       change: +0.1 },
];

const ALERTS = [
  { date: 'Jun 3, 2026',  region: 'Ondo, Nigeria',   msg: 'Case surge detected — 47 new confirmed cases in 48h', level: 'Critical' },
  { date: 'Jun 1, 2026',  region: 'Western Nigeria',  msg: 'NCDC activates enhanced surveillance protocol',        level: 'High'     },
  { date: 'May 28, 2026', region: 'Sierra Leone',     msg: 'Cross-border transmission alert issued',              level: 'High'     },
  { date: 'May 25, 2026', region: 'West Africa',      msg: 'WHO AFRO convenes emergency Lassa fever task force',  level: 'Moderate' },
];

const STATUS_COLOR: Record<string, string> = {
  Critical: 'hsl(0 65% 36%)', High: 'hsl(0 65% 54%)', Moderate: 'hsl(38 80% 55%)', Low: 'hsl(142 50% 50%)',
};
const LEVEL_BG: Record<string, string> = {
  Critical: 'bg-primary/10 border-primary/25 text-primary',
  High:     'bg-primary/8 border-primary/20 text-primary/80',
  Moderate: 'bg-[hsl(38_60%_16%)] border-[hsl(38_60%_30%)] text-[hsl(38_85%_68%)]',
};

export default function GlobalMonitoringSection() {
  return (
    <section id="global" className="relative py-20 overflow-hidden section-beige-1">
      {/* Molecular dots */}
      <div className="absolute inset-0 bg-molecular-dots pointer-events-none z-0" />
      {/* Right glow */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 55% 55% at 90% 50%, hsl(0 40% 90% / 0.30) 0%, transparent 70%)' }} />
      {/* Virus particles */}
      <div className="absolute top-10 left-6 pointer-events-none z-0 text-primary/10 virus-float-1">
        <svg width="72" height="72" viewBox="0 0 56 56" fill="none" aria-hidden>
          <circle cx="28" cy="28" r="12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="28" cy="28" r="5" fill="currentColor" opacity="0.5"/>
          {[0,45,90,135,180,225,270,315].map((deg,i)=>{const r=(deg*Math.PI)/180;return <g key={i}><line x1={28+Math.cos(r)*13} y1={28+Math.sin(r)*13} x2={28+Math.cos(r)*22} y2={28+Math.sin(r)*22} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx={28+Math.cos(r)*23} cy={28+Math.sin(r)*23} r="2" fill="currentColor" opacity="0.7"/></g>;})}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <span className="text-primary label-badge">Global Monitoring</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground text-balance font-display mb-2">
            Global Live Monitoring Center
          </h2>
          <p className="text-muted-foreground text-sm md:text-base text-pretty max-w-2xl">
            Real-time West African outbreak surveillance and international Lassa fever tracking.
          </p>
        </div>

        {/* Global stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {GLOBAL_STATS.map(({ label, value, trend, up, icon: Icon }) => (
            <div key={label} className="stat-card-premium stat-critical p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-muted-foreground text-xs mb-1">{label}</p>
                  <p className="text-foreground font-bold text-xl md:text-2xl">{value}</p>
                  <div className={`flex items-center gap-1 text-xs mt-1 font-medium ${up ? 'text-[hsl(var(--error))]' : 'text-[hsl(var(--success))]'}`}>
                    {up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {trend} 24h
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl icon-orb-crimson flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Country table */}
          <div className="lg:col-span-2">
            <div className="chart-card h-full p-5">
              <h3 className="text-foreground font-semibold text-sm mb-4">Affected Countries — West Africa</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-border">
                      {['Country','Cases','Deaths','Status','24h'].map(h => (
                        <th key={h} className="text-muted-foreground font-medium text-left py-2 pr-4 last:text-right">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COUNTRIES.map(c => (
                      <tr key={c.country} className="border-b border-border/40 hover:bg-muted/50 transition-colors">
                        <td className="text-foreground py-2.5 pr-4 font-medium">{c.country}</td>
                        <td className="text-primary font-semibold py-2.5 pr-4">{c.cases.toLocaleString()}</td>
                        <td className="text-muted-foreground py-2.5 pr-4">{c.deaths.toLocaleString()}</td>
                        <td className="py-2.5 pr-4">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${STATUS_COLOR[c.status]}22`, color: STATUS_COLOR[c.status], border: `1px solid ${STATUS_COLOR[c.status]}44` }}>
                            {c.status}
                          </span>
                        </td>
                        <td className={`text-right py-2.5 font-semibold ${c.change >= 0 ? 'text-[hsl(var(--error))]' : 'text-[hsl(var(--success))]'}`}>
                          {c.change >= 0 ? '+' : ''}{c.change}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="glass-card-accent rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-primary" />
              <h3 className="text-foreground font-semibold text-sm">Active Alerts</h3>
              <Badge className="ml-auto text-xs bg-primary/10 text-primary border-primary/20">Live</Badge>
            </div>
            <ul className="space-y-3">
              {ALERTS.map((a, i) => (
                <li key={i} className={`rounded-xl p-3 border text-xs ${LEVEL_BG[a.level] ?? 'bg-muted/60 border-border text-foreground/80'}`}>
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="font-semibold truncate">{a.region}</span>
                    <span className="text-foreground/40 shrink-0">{a.date}</span>
                  </div>
                  <p className="leading-relaxed text-pretty opacity-80">{a.msg}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
