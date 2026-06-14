import { ChevronDown, Shield, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* Virus / microorganism SVG particle */
function VirusParticle({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" className={className} aria-hidden>
      <circle cx="28" cy="28" r="11" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="28" cy="28" r="4.5" fill="currentColor" opacity="0.55" />
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 28 + Math.cos(rad) * 12; const y1 = 28 + Math.sin(rad) * 12;
        const x2 = 28 + Math.cos(rad) * 21; const y2 = 28 + Math.sin(rad) * 21;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />;
      })}
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return <circle key={i} cx={28 + Math.cos(rad) * 22} cy={28 + Math.sin(rad) * 22} r="2" fill="currentColor" opacity="0.7" />;
      })}
    </svg>
  );
}

/* Red blood cell (erythrocyte) SVG */
function BloodCell({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.65} viewBox="0 0 60 38" fill="none" className={className} aria-hidden>
      <ellipse cx="30" cy="19" rx="28" ry="17" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="30" cy="19" rx="16" ry="8" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.12" />
      <ellipse cx="30" cy="19" rx="9" ry="4" fill="currentColor" opacity="0.08" />
    </svg>
  );
}

/* ECG Heartline icon for hero badge */
function EcgIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" fill="none" className={className} aria-hidden>
      <path d="M0,14 L8,14 L11,5 L14,22 L17,2 L20,24 L23,14 L48,14"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function HeroSection() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 section-beige-hero"
      aria-label="Hero"
    >
      {/* ── Fine dot grid ── */}
      <div className="absolute inset-0 bg-molecular-dots pointer-events-none z-0" />

      {/* ── Warm radial glow – center ── */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 42%, hsl(0 50% 88% / 0.7) 0%, transparent 70%)' }} />

      {/* ── Crimson gradient horizon line – bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, hsl(0 35% 88% / 0.45), transparent)' }} />

      {/* ── ECG heartbeat line – mid section ── */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none" style={{ opacity: 0.18 }}>
        <svg viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none">
          <path className="ecg-line"
            d="M0,60 L120,60 L142,60 L162,12 L178,100 L194,4 L210,100 L226,60 L368,60 L388,60 L408,12 L424,100 L440,4 L456,100 L472,60 L614,60 L634,60 L654,12 L670,100 L686,4 L702,100 L718,60 L860,60 L880,60 L900,12 L916,100 L932,4 L948,100 L964,60 L1106,60 L1126,60 L1146,12 L1162,100 L1178,4 L1194,100 L1210,60 L1352,60 L1372,60 L1392,12 L1408,100 L1424,4 L1440,60"
            fill="none" stroke="hsl(0 65% 36%)" strokeWidth="2.5" />
        </svg>
      </div>

      {/* ── Second drifting ECG – upper band ── */}
      <div className="absolute inset-x-0 top-1/4 z-0 pointer-events-none" style={{ opacity: 0.07 }}>
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path className="ecg-drift"
            d="M0,30 L160,30 L174,10 L182,48 L190,5 L198,50 L206,30 L400,30 L414,10 L422,48 L430,5 L438,50 L446,30 L640,30 L654,10 L662,48 L670,5 L678,50 L686,30 L880,30 L894,10 L902,48 L910,5 L918,50 L926,30 L1120,30 L1134,10 L1142,48 L1150,5 L1158,50 L1166,30 L1440,30"
            fill="none" stroke="hsl(0 65% 36%)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* ── Virus / microorganism particles ── */}
      <VirusParticle size={90}  className="absolute top-16 right-[7%]   text-primary/12 virus-float-1 pointer-events-none z-0" />
      <VirusParticle size={58}  className="absolute top-1/3 right-[1%]  text-primary/10 virus-float-2 pointer-events-none z-0" />
      <VirusParticle size={74}  className="absolute bottom-24 right-[14%] text-primary/9 virus-float-3 pointer-events-none z-0" />
      <VirusParticle size={50}  className="absolute top-28 left-[3%]    text-primary/10 virus-float-4 pointer-events-none z-0" />
      <VirusParticle size={100} className="absolute bottom-36 left-[7%]  text-primary/7  virus-float-1 pointer-events-none z-0" />

      {/* ── Blood cells – right panel decoration ── */}
      <BloodCell size={64} className="absolute top-[22%] right-[18%] text-primary/10 pointer-events-none z-0 virus-float-2" />
      <BloodCell size={48} className="absolute bottom-[30%] left-[16%] text-primary/8 pointer-events-none z-0 virus-float-3" />
      <BloodCell size={80} className="absolute top-[55%] right-[5%] text-primary/7 pointer-events-none z-0 virus-float-4" />

      {/* ── ECG icon watermark ── */}
      <div className="absolute bottom-[18%] left-[5%] hidden xl:block pointer-events-none z-0">
        <EcgIcon className="text-primary/10 w-24 h-14" />
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">

        {/* Live badge */}
        <div className="inline-flex items-center gap-2.5 bg-primary/8 border border-primary/20 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
          <span className="relative w-2 h-2 shrink-0">
            <span className="live-pulse absolute inset-0 rounded-full bg-primary" />
            <span className="relative w-2 h-2 rounded-full bg-primary block" />
          </span>
          Live Surveillance Active · Nigeria 2020–2026
        </div>

        {/* Main heading — Cinzel / Algerian style */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-2 gradient-text">
          LF Surveillance
        </h1>
        <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-balance mb-5 text-primary/75 tracking-wide">
          Platform
        </h2>

        <p className="text-foreground/70 text-base md:text-xl max-w-2xl mx-auto mb-2 text-pretty leading-relaxed font-medium">
          Lassa Fever Surveillance &amp; Awareness — Nigeria
        </p>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
          Tracking outbreaks, improving awareness, and supporting public health
          interventions across Nigeria with real-time data intelligence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base gap-2 glow-ring shadow-md"
            onClick={() => scrollTo('dashboard')}
          >
            <BarChart2 className="w-5 h-5" />
            Explore Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full sm:w-auto h-12 px-8 border border-primary/30 text-primary hover:bg-accent font-semibold text-base gap-2"
            onClick={() => scrollTo('prevention')}
          >
            <Shield className="w-5 h-5" />
            Learn Prevention
          </Button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            { label: 'Confirmed Cases', value: '7,617', color: 'text-primary' },
            { label: 'Total Deaths',    value: '1,434', color: 'text-primary' },
            { label: 'Avg CFR',         value: '18.8%', color: 'text-[hsl(var(--warning))]' },
            { label: 'States Affected', value: '25',    color: 'text-[hsl(var(--success))]' },
          ].map(s => (
            <div key={s.label} className="med-card rounded-2xl p-3.5 text-center">
              <div className={`font-bold text-xl md:text-2xl ${s.color}`}>{s.value}</div>
              <div className="text-muted-foreground text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollTo('overview')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/40 hover:text-primary/70 animate-bounce transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
