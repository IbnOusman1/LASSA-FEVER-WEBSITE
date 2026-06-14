import {
  Bug, AlertCircle, Thermometer, ArrowRight,
  MousePointerClick, Stethoscope, ShieldCheck, Clock,
} from 'lucide-react';

const OVERVIEW_CARDS = [
  { icon: Bug,             title: 'What is Lassa Fever?',  color: 'hsl(0 65% 36%)',   content: 'Lassa fever is an acute viral hemorrhagic illness caused by the Lassa virus — a member of the Arenaviridae family. Endemic in West Africa, it places an estimated 100,000–300,000 Nigerians at risk annually.' },
  { icon: AlertCircle,     title: 'Primary Causes',         color: 'hsl(25 70% 42%)',  content: 'The natural reservoir is the multimammate rat (Mastomys natalensis). Humans become infected through contact with food or household items contaminated by infected rodent urine, feces, or blood.' },
  { icon: Thermometer,     title: 'Key Symptoms',           color: 'hsl(207 60% 40%)', content: 'Symptoms include fever, general weakness, headache, sore throat, muscle pain, chest pain, nausea, vomiting, and in severe cases, bleeding from gums, eyes, or nose — escalating within 1–4 weeks.' },
  { icon: MousePointerClick,title:'Transmission Routes',   color: 'hsl(262 48% 45%)', content: 'Transmission occurs via direct contact with infected rodents, contaminated food/water, or person-to-person in healthcare settings. Airborne transmission is rare. Dry season increases human-rodent contact significantly.' },
  { icon: ShieldCheck,     title: 'Prevention',             color: 'hsl(142 45% 34%)', content: 'Store food in rodent-proof containers, maintain clean homes, avoid contact with rodents, practice regular handwashing, and use PPE in healthcare settings. Community rodent control is critical in endemic areas.' },
  { icon: Clock,           title: 'Early Treatment',        color: 'hsl(38 75% 40%)',  content: 'Ribavirin antiviral therapy is most effective when initiated within the first 6 days of illness onset. Early hospital presentation can reduce the case fatality rate from ~22% to under 5% in treated patients.' },
];

const FACT_STATS = [
  { label: 'Endemic States in Nigeria', value: '25+' },
  { label: 'Annual at-risk population', value: '~300K' },
  { label: 'Incubation period', value: '6–21 days' },
  { label: 'Ribavirin efficacy (early)', value: '>80%' },
];

export default function OverviewSection() {
  return (
    <section id="overview" className="relative py-20 overflow-hidden section-beige-1">
      {/* Cell grid pattern */}
      <div className="absolute inset-0 bg-cell-grid pointer-events-none z-0" />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, hsl(0 35% 90% / 0.30) 0%, transparent 70%)' }} />
      {/* DNA strand strip on right edge */}
      <div className="absolute top-0 right-0 bottom-0 w-32 pointer-events-none z-0 opacity-10 bg-dna-strand" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Disease Overview</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground text-balance font-display mb-3">
            Understanding Lassa Fever
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl text-pretty">
            Comprehensive information about Lassa Fever — from causes and symptoms to transmission,
            prevention, and the critical importance of early intervention.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {OVERVIEW_CARDS.map(({ icon: Icon, title, color, content }) => (
            <div
              key={title}
              className="overview-card p-6 flex flex-col gap-4 h-full"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: `${color}18`, border: `1.5px solid ${color}40` }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base mb-2 text-balance">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">{content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Facts bar */}
        <div className="facts-bar p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Stethoscope className="w-5 h-5 text-primary" />
            <h3 className="text-foreground font-semibold text-lg">Key Facts at a Glance</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FACT_STATS.map(f => (
              <div key={f.label}>
                <div className="text-2xl font-bold text-primary mb-1">{f.value}</div>
                <div className="text-muted-foreground text-sm">{f.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-primary/15 flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-primary/80 mt-0.5 shrink-0" />
            <p className="text-muted-foreground text-sm text-pretty">
              Lassa fever outbreaks in Nigeria peak during the dry season (November–April),
              with February and March historically recording the highest caseloads due to
              increased human-rodent contact as food stores shrink.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
