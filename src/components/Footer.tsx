import { Activity, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const NAV_SECTIONS = [
  { label: 'Overview',    href: '#overview'    },
  { label: 'Dashboard',   href: '#dashboard'   },
  { label: 'Map',         href: '#map'         },
  { label: 'Analysis',    href: '#analysis'    },
  { label: 'AI Forecast', href: '#prediction'  },
  { label: 'Global',      href: '#global'      },
  { label: 'Prevention',  href: '#prevention'  },
  { label: 'Report',      href: '#emergency'   },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: 'hsl(38, 28%, 90%)' }}>
      {/* Top border ECG line */}
      <div className="absolute top-0 inset-x-0 h-px overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 2" className="w-full" preserveAspectRatio="none" style={{ height: 2 }}>
          <path
            d="M0,1 L200,1 L215,0 L222,2 L229,0 L236,2 L243,1 L440,1 L455,0 L462,2 L469,0 L476,2 L483,1 L680,1 L695,0 L702,2 L709,0 L716,2 L723,1 L920,1 L935,0 L942,2 L949,0 L956,2 L963,1 L1160,1 L1175,0 L1182,2 L1189,0 L1196,2 L1203,1 L1440,1"
            fill="none" stroke="hsl(0 72% 40% / 0.5)" strokeWidth="1.5" className="ecg-drift"
          />
        </svg>
      </div>
      {/* Cell grid */}
      <div className="absolute inset-0 bg-cell-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center glow-ring">
                <Activity className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <span className="text-foreground font-bold text-base tracking-wide">LF Surveillance Platform</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed text-pretty max-w-sm mb-5">
              A comprehensive, data-driven public health platform for real-time Lassa Fever surveillance,
              outbreak tracking, and awareness across Nigeria. Serving public health officials, healthcare
              professionals, and communities.
            </p>
            <div className="rounded-2xl px-4 py-3 border border-primary/25 inline-flex items-center gap-2"
              style={{ background: 'hsl(0 35% 94%)' }}>
              <span className="relative w-2 h-2 shrink-0">
                <span className="live-pulse absolute inset-0 rounded-full bg-primary" />
                <span className="relative w-2 h-2 rounded-full bg-primary block" />
              </span>
              <span className="text-foreground/80 text-xs font-medium">Live Surveillance Active · Nigeria 2020–2026</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_SECTIONS.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: Phone,  text: '0800-9700-0010', sub: 'NCDC 24/7 Hotline' },
                { icon: Mail,   text: 'info@ncdc.gov.ng', sub: 'Official Email' },
                { icon: MapPin, text: 'Abuja, Nigeria', sub: 'NCDC Headquarters' },
              ].map(({ icon: Icon, text, sub }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground/80 text-sm font-medium">{text}</p>
                    <p className="text-foreground/40 text-xs">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <h4 className="text-muted-foreground text-xs uppercase tracking-wider mb-3">External Resources</h4>
              <ul className="space-y-1.5">
                {[
                  { label: 'NCDC Nigeria', href: 'https://ncdc.gov.ng' },
                  { label: 'WHO Lassa Fever', href: 'https://www.who.int/news-room/fact-sheets/detail/lassa-fever' },
                ].map(link => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary text-xs transition-colors flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-foreground/35">
          <p>© 2026 LF Surveillance Platform. For public health awareness purposes only.</p>
          <p>Developed by <span className="text-muted-foreground font-medium">Adam Ibn</span></p>
        </div>
      </div>
    </footer>
  );
}
