import { useState } from 'react';
import { AlertTriangle, Phone, Mail, MapPin, Clock, Send, CheckCircle2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/db/supabase';

const NIGERIA_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
  'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers',
  'Sokoto','Taraba','Yobe','Zamfara',
];

/* Verified NCDC / Nigeria public-health emergency contacts (June 2026) */
const CONTACTS = [
  { icon: Phone, label: 'NCDC Toll-Free Hotline', value: '0800-9700-0010', href: 'tel:08009700010', note: '24 / 7' },
  { icon: Phone, label: 'Nigeria Emergency (NEMA)', value: '112',           href: 'tel:112',         note: 'All emergencies' },
  { icon: Mail,  label: 'NCDC Email',               value: 'info@ncdc.gov.ng', href: 'mailto:info@ncdc.gov.ng', note: null },
  { icon: Clock, label: 'Response Time',            value: 'Within 2 hours', href: null,             note: 'Confirmed cases' },
];

const EMPTY_FORM = {
  name: '', phone: '', email: '', state: '', lga: '', onset_date: '', symptom_description: '',
};

// Simple sanitizer: strip HTML-like tags to prevent XSS storage
function sanitizeText(val: string): string {
  return val.replace(/<[^>]*>/g, '').trim();
}

// Phone: Nigeria format validation (+234 or 080/090/070/081...)
function isValidPhone(phone: string): boolean {
  return /^(\+?234|0)[789]\d{9}$/.test(phone.replace(/[\s\-]/g, ''));
}

// Loose email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function EmergencySection() {
  const [form, setForm]           = useState(EMPTY_FORM);
  const [errors, setErrors]       = useState<Partial<typeof EMPTY_FORM>>({});
  const [submitting, setSubmitting] = useState(false);
  const [refNumber, setRefNumber]   = useState<string | null>(null);

  const setField = (field: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [field]: e.target.value }));

  const validate = (): boolean => {
    const errs: Partial<typeof EMPTY_FORM> = {};
    if (!form.name.trim())              errs.name = 'Full name is required';
    if (!form.phone.trim())             errs.phone = 'Phone number is required';
    else if (!isValidPhone(form.phone)) errs.phone = 'Enter a valid Nigerian phone number';
    if (form.email && !isValidEmail(form.email)) errs.email = 'Enter a valid email address';
    if (!form.state)                    errs.state = 'Please select a state';
    if (!form.symptom_description.trim())     errs.symptom_description = 'Please describe your symptoms';
    else if (form.symptom_description.trim().length < 10) errs.symptom_description = 'Please provide more detail (at least 10 characters)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the highlighted errors before submitting');
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from('symptom_reports')
      .insert({
        name:                sanitizeText(form.name).slice(0, 100),
        phone:               form.phone.replace(/[\s\-]/g, '').slice(0, 20),
        email:               form.email ? sanitizeText(form.email).slice(0, 120) : null,
        state:               form.state,
        lga:                 form.lga ? sanitizeText(form.lga).slice(0, 80) : null,
        onset_date:          form.onset_date || null,
        symptom_description: sanitizeText(form.symptom_description).slice(0, 1000),
        submitted_at:        new Date().toISOString(),
      })
      .select('reference_number')
      .maybeSingle();
    setSubmitting(false);
    if (error) {
      console.error('Report submission error:', error.message);
      toast.error('Submission failed. Please call the NCDC hotline directly: 0800-9700-0010');
    } else {
      const ref = data?.reference_number ?? null;
      setRefNumber(ref);
      setForm(EMPTY_FORM);
      setErrors({});
      toast.success('Report submitted successfully. Keep your reference number safe.');
    }
  };

  const copyRef = () => {
    if (refNumber) {
      navigator.clipboard.writeText(refNumber).then(() => toast.success('Reference number copied!'));
    }
  };

  return (
    <section id="emergency" className="relative py-16 md:py-20 overflow-hidden section-beige-1">
      {/* Molecular dots */}
      <div className="absolute inset-0 bg-molecular-dots pointer-events-none z-0" />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, hsl(0 40% 88% / 0.3) 0%, transparent 70%)' }} />
      {/* ECG line */}
      <div className="absolute inset-x-0 top-1/3 z-0 pointer-events-none opacity-12">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path className="ecg-drift"
            d="M0,40 L200,40 L215,12 L223,60 L231,6 L239,63 L247,40 L440,40 L455,12 L463,60 L471,6 L479,63 L487,40 L680,40 L695,12 L703,60 L711,6 L719,63 L727,40 L920,40 L935,12 L943,60 L951,6 L959,63 L967,40 L1160,40 L1175,12 L1183,60 L1191,6 L1199,63 L1207,40 L1440,40"
            fill="none" stroke="hsl(0 65% 36% / 0.25)" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 border-2 border-primary/30 mb-4 relative">
            <span className="alert-pulse absolute inset-0 rounded-full" />
            <AlertTriangle className="w-7 h-7 text-primary relative z-10" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground text-balance font-display mb-2">
            Report Symptoms
          </h2>
          <p className="text-muted-foreground text-sm md:text-base text-pretty max-w-xl mx-auto">
            If you or someone you know shows Lassa fever symptoms, report immediately.
            Early detection saves lives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card-premium rounded-2xl p-6 md:p-8">

              {/* ── Success state ── */}
              {refNumber ? (
                <div className="flex flex-col items-center justify-center gap-5 py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-600/10 border-2 border-green-600/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold text-lg mb-1">Report Received</h3>
                    <p className="text-muted-foreground text-sm text-pretty max-w-sm">
                      Your symptom report has been submitted to the NCDC surveillance system.
                      A health officer will contact you within 2 hours at the number you provided.
                    </p>
                  </div>
                  <div className="rounded-xl border border-primary/25 px-5 py-3 flex items-center gap-3"
                    style={{ background: 'hsl(0 35% 96%)' }}>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Your reference number</p>
                      <p className="text-foreground font-bold text-base tracking-wider">{refNumber}</p>
                    </div>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 text-primary hover:bg-accent shrink-0"
                      onClick={copyRef}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-xs text-pretty max-w-xs">
                    Keep this number safe — you may be asked to quote it when the health team calls.
                    If symptoms worsen, call the NCDC hotline immediately:{' '}
                    <a href="tel:08009700010" className="text-primary font-semibold hover:underline">0800-9700-0010</a>.
                  </p>
                  <Button
                    variant="ghost"
                    className="h-9 text-sm border border-border text-muted-foreground hover:bg-secondary rounded-xl"
                    onClick={() => setRefNumber(null)}
                  >
                    Submit another report
                  </Button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label className="text-foreground/80 text-sm font-normal">Full Name <span className="text-primary">*</span></Label>
                      <Input
                        value={form.name}
                        onChange={setField('name')}
                        placeholder="Your full name"
                        maxLength={100}
                        autoComplete="name"
                        className={`bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/20 h-10 rounded-lg ${errors.name ? 'border-destructive' : ''}`}
                      />
                      {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                    </div>
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label className="text-foreground/80 text-sm font-normal">Phone Number <span className="text-primary">*</span></Label>
                      <Input
                        value={form.phone}
                        onChange={setField('phone')}
                        placeholder="+234 800 000 0000"
                        type="tel"
                        maxLength={20}
                        autoComplete="tel"
                        className={`bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/20 h-10 rounded-lg ${errors.phone ? 'border-destructive' : ''}`}
                      />
                      {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
                    </div>
                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label className="text-foreground/80 text-sm font-normal">Email Address</Label>
                      <Input
                        value={form.email}
                        onChange={setField('email')}
                        placeholder="you@example.com"
                        type="email"
                        maxLength={120}
                        autoComplete="email"
                        className={`bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/20 h-10 rounded-lg ${errors.email ? 'border-destructive' : ''}`}
                      />
                      {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                    </div>
                    {/* State */}
                    <div className="space-y-1.5">
                      <Label className="text-foreground/80 text-sm font-normal">State <span className="text-primary">*</span></Label>
                      <Select value={form.state} onValueChange={v => { setForm(p => ({ ...p, state: v })); setErrors(p => ({ ...p, state: '' })); }}>
                        <SelectTrigger className={`bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 h-10 rounded-lg ${errors.state ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="bg-[hsl(38,30%,97%)] border-[hsl(0_30%_28%)] max-h-64">
                          {NIGERIA_STATES.map(s => (
                            <SelectItem key={s} value={s} className="text-foreground focus:bg-accent focus:text-accent-foreground">{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && <p className="text-destructive text-xs">{errors.state}</p>}
                    </div>
                    {/* LGA */}
                    <div className="space-y-1.5">
                      <Label className="text-foreground/80 text-sm font-normal">Local Government Area</Label>
                      <Input
                        value={form.lga}
                        onChange={setField('lga')}
                        placeholder="LGA name"
                        maxLength={80}
                        className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/20 h-10 rounded-lg"
                      />
                    </div>
                    {/* Onset Date */}
                    <div className="space-y-1.5">
                      <Label className="text-foreground/80 text-sm font-normal">Symptom Onset Date</Label>
                      <Input
                        value={form.onset_date}
                        onChange={setField('onset_date')}
                        type="date"
                        max={new Date().toISOString().split('T')[0]}
                        className="bg-muted/50 border-border text-foreground focus:border-primary focus:ring-primary/20 h-10 rounded-lg"
                      />
                    </div>
                  </div>
                  {/* Symptoms */}
                  <div className="space-y-1.5">
                    <Label className="text-foreground/80 text-sm font-normal">Symptom Description <span className="text-primary">*</span></Label>
                    <Textarea
                      value={form.symptom_description}
                      onChange={setField('symptom_description')}
                      placeholder="Describe symptoms in detail — fever, weakness, sore throat, bleeding, etc."
                      rows={4}
                      maxLength={1000}
                      className={`bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-primary/20 resize-none px-3 rounded-lg ${errors.symptom_description ? 'border-destructive' : ''}`}
                    />
                    <div className="flex items-center justify-between">
                      {errors.symptom_description
                        ? <p className="text-destructive text-xs">{errors.symptom_description}</p>
                        : <span />
                      }
                      <span className="text-muted-foreground text-xs">{form.symptom_description.length}/1000</span>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 glow-ring rounded-xl"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting…
                      </span>
                    ) : (
                      <><Send className="w-4 h-4" />Submit Emergency Report</>
                    )}
                  </Button>
                  <p className="text-muted-foreground text-xs text-center text-pretty">
                    Reports are received directly by the NCDC surveillance team.
                    For life-threatening emergencies, call{' '}
                    <a href="tel:08009700010" className="text-primary font-semibold hover:underline">0800-9700-0010</a> immediately.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Contacts sidebar */}
          <div className="flex flex-col gap-4">
            <div className="glass-card-accent rounded-2xl p-5">
              <h3 className="text-foreground font-semibold text-base mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Emergency Contacts
              </h3>
              <ul className="space-y-3">
                {CONTACTS.map(({ icon: Icon, label, value, href, note }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{label}</p>
                      {href ? (
                        <a href={href} className="text-foreground font-semibold text-sm hover:text-primary transition-colors">{value}</a>
                      ) : (
                        <p className="text-foreground font-semibold text-sm">{value}</p>
                      )}
                      {note && <p className="text-muted-foreground text-[11px] mt-0.5">{note}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card-premium rounded-2xl p-5 flex-1">
              <h3 className="text-foreground font-semibold text-sm mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Nearest Treatment Centres
              </h3>
              <ul className="space-y-2">
                {[
                  'UNTH Enugu — Lassa Fever Unit',
                  'Irrua Specialist Hospital, Edo',
                  'LUTH Lagos — Isolation Ward',
                  'ABUTH Kaduna — VHF Unit',
                  'Abubakar Tafawa Balewa — Bauchi',
                ].map(c => (
                  <li key={c} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
