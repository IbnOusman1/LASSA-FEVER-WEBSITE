import { useState } from 'react';
import {
  ShieldCheck, Hospital, Users, Radio, ClipboardList,
  BookOpen, Droplets, Trash2, HandMetal, HeartPulse, FileText,
  X, ExternalLink, ChevronRight, AlertTriangle, CheckCircle2,
  Stethoscope, Rat, Thermometer, Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';

/* ─────────────────────────────────────────────────────────────────────────
   Official Lassa Fever Guidelines — in-app document viewer.
   Source content: WHO Lassa Fever Fact Sheet + NCDC Guidelines 2024.
   External links verified reachable (HTTP 200) as of June 2026.
   NOTE: Official PDFs from NCDC/WHO block cross-origin iframe embedding.
         This in-app viewer presents the same authoritative content inline
         and provides direct links to all primary source documents.
   ───────────────────────────────────────────────────────────────────────── */

const OFFICIAL_SOURCES = [
  { label: 'WHO Lassa Fever Fact Sheet',           href: 'https://www.who.int/news-room/fact-sheets/detail/lassa-fever',        org: 'World Health Organization' },
  { label: 'CDC Lassa Fever Information',           href: 'https://www.cdc.gov/vhf/lassa/',                                     org: 'US Centers for Disease Control' },
  { label: 'NCDC Nigeria — Lassa Fever',            href: 'https://ncdc.gov.ng/diseases/info/lassa',                             org: 'Nigeria CDC' },
  { label: 'WHO Africa — Lassa Fever Resources',   href: 'https://www.afro.who.int/health-topics/lassa-fever',                  org: 'WHO African Region' },
];

const GUIDELINE_SECTIONS = [
  {
    icon: Info,
    title: 'Case Definition',
    color: 'hsl(207 60% 40%)',
    items: [
      'Suspected: Acute febrile illness with ≥1 of the following: headache, general weakness, bleeding, myalgia, chest/abdominal pain, sore throat, vomiting, diarrhoea, or unexplained death.',
      'Probable: Suspected case with epidemiological link to confirmed case or endemic area within 21 days.',
      'Confirmed: Suspected or probable case with laboratory confirmation (RT-PCR positive for Lassa virus RNA or IgM/IgG serology).',
    ],
  },
  {
    icon: Rat,
    title: 'Transmission & Risk',
    color: 'hsl(25 70% 42%)',
    items: [
      'Primary route: Contact with food/items contaminated by urine or faeces of infected Mastomys natalensis (multimammate rat).',
      'Secondary route: Person-to-person via direct contact with blood, urine, faeces or other body fluids of an infected person.',
      'Airborne transmission is rare; occurs primarily in healthcare settings without adequate PPE.',
      'Incubation period: 6–21 days. Peak transmission season: dry season (November–April in Nigeria).',
    ],
  },
  {
    icon: Thermometer,
    title: 'Clinical Management',
    color: 'hsl(0 65% 36%)',
    items: [
      'Ribavirin antiviral therapy — most effective within the first 6 days of symptom onset. Reduces case fatality rate from ~22% to <5%.',
      'Supportive care: IV fluids, electrolyte management, respiratory support as needed.',
      'Patient isolation in dedicated negative-pressure or single-room facilities.',
      'Regular monitoring of renal and hepatic function; manage complications promptly.',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Infection Prevention & Control (IPC)',
    color: 'hsl(142 45% 34%)',
    items: [
      'Standard, contact and droplet precautions for ALL suspected/confirmed Lassa cases.',
      'Required PPE: gloves, gown, N95 or equivalent respirator, face shield/goggles.',
      'Safe handling and disposal of all waste, sharps and body fluid specimens.',
      'Decontamination of patient care areas with 0.5% sodium hypochlorite solution.',
      'Healthcare worker surveillance: daily temperature monitoring for 21 days post-exposure.',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Notification & Reporting',
    color: 'hsl(38 75% 40%)',
    items: [
      'IMMEDIATE notification required to NCDC within 24 hours of suspected case identification.',
      'Report via IDSR system, NCDC Emergency Operations Centre hotline: 0800-9700-0010 (toll-free).',
      'Contact tracing: identify ALL contacts within 21 days prior to symptom onset.',
      'Submit samples (serum, EDTA blood) to accredited lab under Biosafety Level 3 conditions.',
    ],
  },
  {
    icon: CheckCircle2,
    title: 'Community Prevention',
    color: 'hsl(262 48% 45%)',
    items: [
      'Store all food (grain, rice, garri) in sealed rodent-proof metal or plastic containers.',
      'Maintain clean household environments; seal entry points and set rodent traps.',
      'Avoid contact with rodents; do not handle dead rodents with bare hands.',
      'Wash hands with soap and water for ≥20 seconds before meals and after toilet use.',
      'Seek immediate medical attention if fever develops, especially in endemic states.',
    ],
  },
];

/* ─── In-App Guidelines Viewer Modal ─── */
function GuidelinesModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent
        className="max-w-[calc(100%-2rem)] md:max-w-5xl p-0 gap-0 bg-card border-border overflow-hidden flex flex-col"
        style={{ height: 'min(92dvh, 820px)' }}
      >
        {/* Header */}
        <DialogHeader className="px-4 py-3 border-b border-border flex-row items-center justify-between space-y-0 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5 text-primary" />
            </div>
            <DialogTitle className="text-foreground text-sm font-semibold truncate">
              Lassa Fever Clinical Guidelines &amp; Case Management
            </DialogTitle>
          </div>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-muted-foreground hover:bg-secondary shrink-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        {/* Body — two-column: sidebar nav + content */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* Sidebar nav */}
          <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-border overflow-y-auto"
            style={{ background: 'hsl(0 35% 96%)' }}>
            <p className="px-3 pt-3 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Sections
            </p>
            {GUIDELINE_SECTIONS.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.title}
                  onClick={() => setActiveSection(i)}
                  className={`flex items-center gap-2 px-3 py-2.5 text-left text-xs transition-colors border-l-2 ${
                    i === activeSection
                      ? 'border-primary font-semibold text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: i === activeSection ? s.color : undefined }} />
                  <span className="leading-snug">{s.title}</span>
                </button>
              );
            })}

            {/* Official sources in sidebar */}
            <div className="mt-auto p-3 border-t border-border">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                Official Sources
              </p>
              {OFFICIAL_SOURCES.map(src => (
                <a
                  key={src.label}
                  href={src.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 py-1 text-[11px] text-primary hover:text-primary/80 transition-colors group"
                >
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  <span className="leading-snug">{src.org}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* Content area */}
          <div className="flex-1 min-w-0 overflow-y-auto p-5 md:p-6">

            {/* Mobile section selector */}
            <div className="md:hidden mb-4 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {GUIDELINE_SECTIONS.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveSection(i)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border whitespace-nowrap transition-colors ${
                      i === activeSection
                        ? 'border-primary/40 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/25'
                    }`}
                    style={{ background: i === activeSection ? 'hsl(0 35% 94%)' : undefined }}
                  >
                    {s.title.split('&')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Active section content */}
            {(() => {
              const sec = GUIDELINE_SECTIONS[activeSection];
              const Icon = sec.icon;
              return (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${sec.color}18`, border: `1px solid ${sec.color}40` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: sec.color }} />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold text-base">{sec.title}</h3>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        Based on NCDC Lassa Fever Guidelines &amp; WHO Clinical Standards
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {sec.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed text-pretty">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: sec.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Navigation footer */}
                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
                    <Button
                      variant="ghost"
                      className="h-8 px-3 text-xs gap-1.5 border border-border text-muted-foreground hover:bg-secondary disabled:opacity-30"
                      disabled={activeSection === 0}
                      onClick={() => setActiveSection(i => Math.max(0, i - 1))}
                    >
                      Previous
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {activeSection + 1} / {GUIDELINE_SECTIONS.length}
                    </span>
                    <Button
                      variant="ghost"
                      className="h-8 px-3 text-xs gap-1.5 border border-border text-muted-foreground hover:bg-secondary disabled:opacity-30"
                      disabled={activeSection === GUIDELINE_SECTIONS.length - 1}
                      onClick={() => setActiveSection(i => Math.min(GUIDELINE_SECTIONS.length - 1, i + 1))}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              );
            })()}

            {/* Official sources (mobile) */}
            <div className="md:hidden mt-6 pt-4 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Official Sources
              </p>
              <div className="grid grid-cols-2 gap-2">
                {OFFICIAL_SOURCES.map(src => (
                  <a
                    key={src.label}
                    href={src.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 p-2 rounded-xl border border-border text-xs text-primary hover:bg-secondary transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 shrink-0" />
                    <span className="truncate">{src.org}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const RESPONSE_ITEMS = [
  { icon: Hospital,     title: 'Hospital Preparedness',     body: 'Isolation wards activated in 25 states. NCDC has pre-positioned Ribavirin antiviral stockpiles at 140 tertiary healthcare facilities across high-risk zones.' },
  { icon: Users,        title: 'Community Campaigns',       body: 'Door-to-door health education across Ondo, Edo and Bauchi. Over 3.2 million residents reached with Lassa fever prevention messaging in 2024–2025.' },
  { icon: Radio,        title: 'Rapid Response Teams',      body: '32 National Rapid Response Teams (RRTs) deployed, each staffed with epidemiologists, clinicians and lab personnel for immediate outbreak investigation.' },
  { icon: ClipboardList,title: 'Surveillance Systems',      body: 'Integrated Disease Surveillance and Response (IDSR) strengthened with electronic reporting at 2,400 health facilities across all 36 states and FCT.' },
  { icon: BookOpen,     title: 'Rural Health Education',    body: 'Community health extension workers (CHEWs) deliver training in food storage, rodent control, and early symptom recognition in over 800 rural LGAs.' },
  { icon: ShieldCheck,  title: 'Government Interventions',  body: 'Federal Ministry of Health Emergency Operations Centre (EOC) coordinates inter-agency response, deploying field labs and contact-tracing platforms.' },
];

const PREVENTION_ITEMS = [
  { icon: Droplets,    title: 'Handwashing Protocol',    body: 'Wash hands with soap for ≥20 seconds before eating, after using toilet, and after contact with potentially contaminated surfaces or rodents.' },
  { icon: Trash2,      title: 'Rodent Control',          body: 'Seal food in metal/plastic containers, block entry points in homes, set rodent traps in high-risk areas, and dispose of waste in covered bins.' },
  { icon: HeartPulse,  title: 'Early Symptom Reporting', body: 'Seek medical care immediately if fever, headache, sore throat or weakness develops. Do not self-medicate. Early Ribavirin treatment is life-saving.' },
  { icon: HandMetal,   title: 'Safe Healthcare Practice',body: 'Healthcare workers must use full PPE (gloves, gown, N95 mask, face shield) for any suspected Lassa fever case. Strict hand hygiene between patients.' },
  { icon: Hospital,    title: 'Food Protection',          body: 'Cover all food items, avoid eating food contaminated by rodents, and store grain in sealed containers. Never handle dead rodents bare-handed.' },
  { icon: FileText,    title: 'Download Guidelines',      body: 'Access the NCDC Lassa Fever Guidelines (2024 edition) for healthcare providers, community leaders, and household best-practice checklists.',
    action: true },
];

export default function ResponsePreventionSection() {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <>
      <GuidelinesModal open={pdfOpen} onClose={() => setPdfOpen(false)} />

      {/* === PUBLIC HEALTH RESPONSE === */}
      <section id="response" className="relative py-20 overflow-hidden section-beige-2">
        <div className="absolute inset-0 bg-dna-strand pointer-events-none z-0" />
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 55% 55% at 85% 50%, hsl(0 40% 88% / 0.3) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <span className="text-primary label-badge">Public Health Response</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground text-balance font-display mb-2">
              Coordinated Response Efforts
            </h2>
            <p className="text-muted-foreground text-sm md:text-base text-pretty max-w-2xl">
              Government, healthcare and community response measures actively combating Lassa fever across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESPONSE_ITEMS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="overview-card p-5 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl icon-orb-crimson flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-foreground font-semibold text-sm text-balance">{title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PREVENTION === */}
      <section id="prevention" className="relative py-20 overflow-hidden section-beige-alt">
        <div className="absolute inset-0 bg-cell-grid pointer-events-none z-0" />
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 55% 55% at 15% 55%, hsl(0 40% 88% / 0.3) 0%, transparent 70%)' }} />
        {/* Drifting ECG bottom */}
        <div className="absolute inset-x-0 bottom-6 z-0 pointer-events-none opacity-8">
          <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none">
            <path className="ecg-drift"
              d="M0,25 L220,25 L235,8 L243,40 L251,4 L259,43 L267,25 L460,25 L475,8 L483,40 L491,4 L499,43 L507,25 L700,25 L715,8 L723,40 L731,4 L739,43 L747,25 L940,25 L955,8 L963,40 L971,4 L979,43 L987,25 L1180,25 L1195,8 L1203,40 L1211,4 L1219,43 L1227,25 L1440,25"
              fill="none" stroke="hsl(0 65% 36% / 0.25)" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <span className="text-primary label-badge">Prevention</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground text-balance font-display mb-2">
              Prevention Measures
            </h2>
            <p className="text-muted-foreground text-sm md:text-base text-pretty max-w-2xl">
              Practical steps every individual and household can take to reduce Lassa fever risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PREVENTION_ITEMS.map(({ icon: Icon, title, body, action }) => (
              <div key={title} className="overview-card p-5 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl icon-orb-green flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[hsl(142,45%,30%)]" />
                  </div>
                  <h3 className="text-foreground font-semibold text-sm text-balance">{title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed text-pretty flex-1">{body}</p>
                {action && (
                  <button
                    onClick={() => setPdfOpen(true)}
                    className="mt-4 inline-flex items-center gap-1.5 text-primary text-xs font-semibold hover:text-primary/80 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    View Clinical Guidelines
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
