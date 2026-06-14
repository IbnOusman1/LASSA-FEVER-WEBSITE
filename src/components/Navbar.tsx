import { useState, useEffect } from 'react';
import { Menu, X, Activity, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'Overview',    href: '#overview'    },
  { label: 'Dashboard',   href: '#dashboard'   },
  { label: 'Map',         href: '#map'         },
  { label: 'Analysis',    href: '#analysis'    },
  { label: 'AI Forecast', href: '#prediction'  },
  { label: 'Global',      href: '#global'      },
  { label: 'Prevention',  href: '#prevention'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[hsl(38,30%,97%)] shadow-md border-b border-[hsl(30,18%,82%)]'
          : 'bg-[hsl(38,30%,97%)/0.96] backdrop-blur-sm border-b border-[hsl(30,18%,84%)]'
      }`}
    >
      {/* Subtle crimson ECG accent at very top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); handleNav('#hero'); }}
          className="flex items-center gap-2.5 shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <Activity className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-primary font-bold text-xs tracking-widest uppercase leading-none">
              Lassa Fever Surveillance
            </div>
            <div className="text-muted-foreground text-[10px] tracking-wide leading-none mt-0.5">Nigeria · National Platform</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-foreground/60 hover:text-primary px-3 py-1.5 text-sm rounded-lg hover:bg-accent transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <Button
          className="hidden md:flex shrink-0 h-8 px-3 text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm"
          onClick={() => handleNav('#emergency')}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span className="sr-only md:not-sr-only">Report Symptoms</span>
        </Button>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-foreground/70 p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[hsl(38,30%,97%)] border-t border-border px-4 py-3">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-foreground/65 hover:text-primary text-left px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <Button
              className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-9 gap-2 font-semibold"
              onClick={() => handleNav('#emergency')}
            >
              <AlertTriangle className="w-4 h-4" />
              Report Symptoms
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
