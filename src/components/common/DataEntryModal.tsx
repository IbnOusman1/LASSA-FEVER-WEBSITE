import { useState } from 'react';
import { DatabaseBackup, Plus, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/db/supabase';

const NIGERIA_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

const EMPTY_FORM = {
  state: '',
  report_date: new Date().toISOString().split('T')[0],
  confirmed: '',
  deaths: '',
  recoveries: '',
  suspected: '',
  notes: '',
  entered_by: '',
};

interface DataEntryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DataEntryModal({ open, onClose, onSuccess }: DataEntryModalProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof typeof EMPTY_FORM) => (val: string) =>
    setForm(prev => ({ ...prev, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.state || !form.report_date) {
      toast.error('State and report date are required');
      return;
    }
    const confirmed = parseInt(form.confirmed || '0', 10);
    const deaths = parseInt(form.deaths || '0', 10);
    const recoveries = parseInt(form.recoveries || '0', 10);
    const suspected = parseInt(form.suspected || '0', 10);

    if (deaths > confirmed) {
      toast.error('Deaths cannot exceed confirmed cases');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from('outbreak_data')
      .upsert(
        {
          state: form.state,
          report_date: form.report_date,
          confirmed,
          deaths,
          recoveries,
          suspected,
          notes: form.notes.trim() || null,
          entered_by: form.entered_by.trim() || 'Surveillance Officer',
        },
        { onConflict: 'state,report_date' },
      );
    setSubmitting(false);
    if (error) {
      console.error('Data entry error:', error.message);
      toast.error('Failed to save case data. Please try again.');
    } else {
      setSubmitted(true);
      toast.success(`Case data for ${form.state} on ${form.report_date} saved successfully.`);
      onSuccess?.();
    }
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setSubmitted(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) handleClose(); }}>
      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-xl p-0 gap-0 bg-card border-border overflow-hidden flex flex-col max-h-[90dvh]">
        {/* Header */}
        <DialogHeader className="px-5 py-4 border-b border-border flex-row items-center justify-between space-y-0 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <DatabaseBackup className="w-4 h-4 text-primary" />
            </div>
            <DialogTitle className="text-foreground text-sm font-semibold">
              Enter Surveillance Case Data
            </DialogTitle>
          </div>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-muted-foreground hover:bg-secondary shrink-0"
            onClick={handleClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto p-5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-green-600/10 border-2 border-green-600/25 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-green-700" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-base mb-1">Data Saved</h3>
                <p className="text-muted-foreground text-sm text-pretty max-w-xs">
                  Case data for <strong>{form.state}</strong> on <strong>{form.report_date}</strong> has
                  been recorded. Dashboards and predictive models will reflect this update in real time.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  className="h-9 border border-border text-muted-foreground hover:bg-secondary text-sm"
                  onClick={reset}
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Enter More Data
                </Button>
                <Button
                  className="h-9 bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Info banner */}
              <div className="rounded-xl p-3 border border-blue-500/20 bg-blue-50/50 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-blue-700 text-xs leading-relaxed text-pretty">
                  Entering data here updates the live surveillance dashboard, heatmap, and AI prediction
                  models in real time. If a record already exists for the same state + date, it will be updated.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* State */}
                <div className="space-y-1.5">
                  <Label className="text-foreground/80 text-sm font-normal">
                    State <span className="text-primary">*</span>
                  </Label>
                  <Select value={form.state} onValueChange={setField('state')}>
                    <SelectTrigger className="bg-muted/50 border-border h-10 text-foreground rounded-lg">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(38,30%,97%)]">
                      {NIGERIA_STATES.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Report Date */}
                <div className="space-y-1.5">
                  <Label className="text-foreground/80 text-sm font-normal">
                    Report Date <span className="text-primary">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={form.report_date}
                    onChange={e => setField('report_date')(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="bg-muted/50 border-border h-10 text-foreground rounded-lg"
                  />
                </div>

                {/* Confirmed */}
                <div className="space-y-1.5">
                  <Label className="text-foreground/80 text-sm font-normal">Confirmed Cases</Label>
                  <Input
                    type="number"
                    min="0"
                    max="99999"
                    value={form.confirmed}
                    onChange={e => setField('confirmed')(e.target.value)}
                    placeholder="0"
                    className="bg-muted/50 border-border h-10 text-foreground rounded-lg"
                  />
                </div>

                {/* Deaths */}
                <div className="space-y-1.5">
                  <Label className="text-foreground/80 text-sm font-normal">Deaths</Label>
                  <Input
                    type="number"
                    min="0"
                    max="99999"
                    value={form.deaths}
                    onChange={e => setField('deaths')(e.target.value)}
                    placeholder="0"
                    className="bg-muted/50 border-border h-10 text-foreground rounded-lg"
                  />
                </div>

                {/* Recoveries */}
                <div className="space-y-1.5">
                  <Label className="text-foreground/80 text-sm font-normal">Recoveries</Label>
                  <Input
                    type="number"
                    min="0"
                    max="99999"
                    value={form.recoveries}
                    onChange={e => setField('recoveries')(e.target.value)}
                    placeholder="0"
                    className="bg-muted/50 border-border h-10 text-foreground rounded-lg"
                  />
                </div>

                {/* Suspected */}
                <div className="space-y-1.5">
                  <Label className="text-foreground/80 text-sm font-normal">Suspected Cases</Label>
                  <Input
                    type="number"
                    min="0"
                    max="99999"
                    value={form.suspected}
                    onChange={e => setField('suspected')(e.target.value)}
                    placeholder="0"
                    className="bg-muted/50 border-border h-10 text-foreground rounded-lg"
                  />
                </div>
              </div>

              {/* Entered by */}
              <div className="space-y-1.5">
                <Label className="text-foreground/80 text-sm font-normal">Entered By (Officer / Facility)</Label>
                <Input
                  value={form.entered_by}
                  onChange={e => setField('entered_by')(e.target.value)}
                  placeholder="e.g. NCDC State Epidemiologist, Ondo"
                  maxLength={120}
                  className="bg-muted/50 border-border h-10 text-foreground rounded-lg"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label className="text-foreground/80 text-sm font-normal">Notes (optional)</Label>
                <Textarea
                  value={form.notes}
                  onChange={e => setField('notes')(e.target.value)}
                  placeholder="Weekly aggregate, outbreak cluster, data source, etc."
                  rows={2}
                  maxLength={500}
                  className="bg-muted/50 border-border text-foreground resize-none px-3 rounded-lg"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 rounded-xl"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving…
                  </span>
                ) : (
                  <><DatabaseBackup className="w-4 h-4" /> Save Case Data</>
                )}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
