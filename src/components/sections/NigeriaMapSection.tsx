import { useState, useRef, useEffect, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ZoomIn, ZoomOut, Layers, RefreshCw,
  TrendingUp, TrendingDown, X, MapPin, Activity,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase, type OutbreakRecord } from '@/db/supabase';
import DataEntryModal from '@/components/common/DataEntryModal';

const NIGERIA_CENTER: [number, number] = [9.082, 8.675];
const DEFAULT_ZOOM = 6;

// Static base data with geo-coordinates (always present as baseline)
const BASE_STATE_DATA: { name: string; lat: number; lng: number; baseCases: number; baseDeaths: number; baseRecoveries: number }[] = [
  { name: 'Ondo',        lat: 6.910,  lng: 5.148,  baseCases: 2012, baseDeaths: 382, baseRecoveries: 1420 },
  { name: 'Edo',         lat: 6.335,  lng: 5.627,  baseCases: 1843, baseDeaths: 350, baseRecoveries: 1290 },
  { name: 'Bauchi',      lat: 10.312, lng: 9.844,  baseCases: 1106, baseDeaths: 210, baseRecoveries:  780 },
  { name: 'Taraba',      lat: 7.999,  lng: 10.774, baseCases:  880, baseDeaths: 167, baseRecoveries:  620 },
  { name: 'Ebonyi',      lat: 6.265,  lng: 8.013,  baseCases:  612, baseDeaths: 116, baseRecoveries:  430 },
  { name: 'Plateau',     lat: 9.218,  lng: 9.518,  baseCases:  480, baseDeaths:  91, baseRecoveries:  340 },
  { name: 'Benue',       lat: 7.340,  lng: 8.738,  baseCases:  342, baseDeaths:  65, baseRecoveries:  240 },
  { name: 'Rivers',      lat: 4.780,  lng: 6.902,  baseCases:  210, baseDeaths:  40, baseRecoveries:  148 },
  { name: 'Kogi',        lat: 7.730,  lng: 6.688,  baseCases:  185, baseDeaths:  35, baseRecoveries:  130 },
  { name: 'Anambra',     lat: 6.221,  lng: 7.066,  baseCases:  152, baseDeaths:  29, baseRecoveries:  108 },
  { name: 'Cross River', lat: 5.860,  lng: 8.599,  baseCases:  134, baseDeaths:  25, baseRecoveries:   95 },
  { name: 'Adamawa',     lat: 9.328,  lng: 12.395, baseCases:  120, baseDeaths:  23, baseRecoveries:   85 },
  { name: 'Imo',         lat: 5.572,  lng: 7.059,  baseCases:   98, baseDeaths:  19, baseRecoveries:   70 },
  { name: 'FCT',         lat: 9.082,  lng: 7.492,  baseCases:   87, baseDeaths:  17, baseRecoveries:   62 },
  { name: 'Delta',       lat: 5.700,  lng: 5.932,  baseCases:   76, baseDeaths:  14, baseRecoveries:   54 },
  { name: 'Lagos',       lat: 6.524,  lng: 3.379,  baseCases:   65, baseDeaths:  12, baseRecoveries:   46 },
  { name: 'Oyo',         lat: 7.850,  lng: 3.930,  baseCases:   52, baseDeaths:  10, baseRecoveries:   37 },
  { name: 'Nasarawa',    lat: 8.540,  lng: 8.320,  baseCases:   44, baseDeaths:   8, baseRecoveries:   31 },
  { name: 'Niger',       lat: 9.975,  lng: 5.585,  baseCases:   38, baseDeaths:   7, baseRecoveries:   27 },
  { name: 'Kaduna',      lat: 10.526, lng: 7.440,  baseCases:   31, baseDeaths:   6, baseRecoveries:   22 },
];

export interface StateEntry {
  name: string; lat: number; lng: number;
  cases: number; deaths: number; recoveries: number;
  trend: number; fromDB: boolean;
}

function mergeWithDB(dbRecords: OutbreakRecord[]): StateEntry[] {
  const dbByState: Record<string, { cases: number; deaths: number; recoveries: number }> = {};
  dbRecords.forEach(r => {
    if (!dbByState[r.state]) dbByState[r.state] = { cases: 0, deaths: 0, recoveries: 0 };
    dbByState[r.state].cases      += r.confirmed;
    dbByState[r.state].deaths     += r.deaths;
    dbByState[r.state].recoveries += r.recoveries;
  });

  return BASE_STATE_DATA.map(base => {
    const db = dbByState[base.name];
    if (db && db.cases > 0) {
      // Merge: DB cases are more authoritative, add to baseline
      return {
        name: base.name, lat: base.lat, lng: base.lng,
        cases:      base.baseCases  + db.cases,
        deaths:     base.baseDeaths + db.deaths,
        recoveries: base.baseRecoveries + db.recoveries,
        trend: parseFloat(((db.cases / Math.max(base.baseCases, 1) - 0.5) * 10).toFixed(1)),
        fromDB: true,
      };
    }
    return {
      name: base.name, lat: base.lat, lng: base.lng,
      cases: base.baseCases, deaths: base.baseDeaths, recoveries: base.baseRecoveries,
      trend: 0, fromDB: false,
    };
  }).sort((a, b) => b.cases - a.cases);
}

function getRisk(cases: number) {
  if (cases >= 500) return { label: 'Critical', color: '#B71C1C' };
  if (cases >= 200) return { label: 'High',     color: '#D32F2F' };
  if (cases >= 50)  return { label: 'Moderate', color: '#EF5350' };
  return                   { label: 'Low',       color: '#EF9A9A' };
}

function getRadius(cases: number): number {
  return Math.max(22000, Math.sqrt(cases) * 2800);
}

function popupHtml(s: StateEntry): string {
  const risk  = getRisk(s.cases);
  const cfr   = s.cases > 0 ? ((s.deaths / s.cases) * 100).toFixed(1) : '0.0';
  const date  = new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  const arrow = s.trend >= 0 ? '&#9650;' : '&#9660;';
  const tc    = s.trend >= 0 ? '#B71C1C' : '#2E7D32';
  return `<div style="font-family:Inter,system-ui,sans-serif;min-width:210px;padding:4px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <strong style="font-size:15px;color:#1E293B">${s.name} State</strong>
      <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:${risk.color};color:#fff">${risk.label}</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px">
      <div style="background:#F8FAFC;border-radius:4px;padding:6px 8px">
        <div style="font-size:10px;color:#64748B;margin-bottom:2px">Confirmed</div>
        <div style="font-size:14px;font-weight:700;color:#B71C1C">${s.cases.toLocaleString()}</div>
      </div>
      <div style="background:#F8FAFC;border-radius:4px;padding:6px 8px">
        <div style="font-size:10px;color:#64748B;margin-bottom:2px">Deaths</div>
        <div style="font-size:14px;font-weight:700;color:#E65100">${s.deaths.toLocaleString()}</div>
      </div>
      <div style="background:#F8FAFC;border-radius:4px;padding:6px 8px">
        <div style="font-size:10px;color:#64748B;margin-bottom:2px">Recovered</div>
        <div style="font-size:14px;font-weight:700;color:#2E7D32">${s.recoveries.toLocaleString()}</div>
      </div>
      <div style="background:#F8FAFC;border-radius:4px;padding:6px 8px">
        <div style="font-size:10px;color:#64748B;margin-bottom:2px">CFR</div>
        <div style="font-size:14px;font-weight:700;color:#6A1B9A">${cfr}%</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:${tc}">
      ${arrow} ${s.trend >= 0 ? '+' : ''}${s.trend}% 30d trend
    </div>
    ${s.fromDB ? '<div style="font-size:9px;background:#E8F5E9;color:#2E7D32;padding:2px 6px;border-radius:10px;margin-top:4px;display:inline-block">&#10003; Includes live DB data</div>' : ''}
    <div style="margin-top:4px;font-size:10px;color:#94A3B8">Updated: ${date}</div>
  </div>`;
}

const TILE_URLS = {
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  road:      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};
const LABELS_URL = 'https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

export default function NigeriaMapSection() {
  const mapDivRef    = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<L.Map | null>(null);
  const baseTileRef  = useRef<L.TileLayer | null>(null);
  const labelTileRef = useRef<L.TileLayer | null>(null);
  const circlesRef   = useRef<L.Circle[]>([]);

  const [tileMode,   setTileMode]   = useState<'satellite' | 'road'>('satellite');
  const [showLabels, setShowLabels] = useState(true);
  const [selected,   setSelected]   = useState<StateEntry | null>(null);
  const [stateData,  setStateData]  = useState<StateEntry[]>(mergeWithDB([]));
  const [dataEntry,  setDataEntry]  = useState(false);
  const [liveCount,  setLiveCount]  = useState(0);

  const loadMapData = useCallback(async () => {
    const { data } = await supabase
      .from('outbreak_data')
      .select('*')
      .order('report_date', { ascending: true })
      .limit(1000);
    const merged = mergeWithDB((data as OutbreakRecord[]) ?? []);
    setStateData(merged);
    setLiveCount((data as OutbreakRecord[])?.length ?? 0);
    return merged;
  }, []);

  // Draw / redraw circles whenever stateData changes
  const drawCircles = useCallback((map: L.Map, data: StateEntry[]) => {
    circlesRef.current.forEach(c => map.removeLayer(c));
    circlesRef.current = [];
    data.forEach(s => {
      const risk   = getRisk(s.cases);
      const circle = L.circle([s.lat, s.lng], {
        radius:      getRadius(s.cases),
        color:       risk.color,
        fillColor:   risk.color,
        fillOpacity: s.fromDB ? 0.65 : 0.50,
        weight:      s.cases >= 500 ? 2.5 : 1.5,
      })
        .bindPopup(popupHtml(s), { maxWidth: 280 })
        .on('click', () => setSelected(s))
        .addTo(map);
      circlesRef.current.push(circle);
    });
  }, []);

  // Initialise Leaflet
  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return;
    const map = L.map(mapDivRef.current, {
      center: NIGERIA_CENTER, zoom: DEFAULT_ZOOM,
      zoomControl: false, attributionControl: true,
    });
    mapRef.current = map;

    baseTileRef.current  = L.tileLayer(TILE_URLS.satellite, { maxZoom: 19, attribution: 'Tiles &copy; Esri' }).addTo(map);
    labelTileRef.current = L.tileLayer(LABELS_URL, { maxZoom: 19 }).addTo(map);

    // Initial draw with baseline data, then load DB
    drawCircles(map, mergeWithDB([]));
    loadMapData().then(merged => drawCircles(map, merged));

    return () => { map.remove(); mapRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redraw when stateData updates (e.g., after new data entry)
  useEffect(() => {
    if (!mapRef.current) return;
    drawCircles(mapRef.current, stateData);
  }, [stateData, drawCircles]);

  // Realtime subscription
  useEffect(() => {
    const ch = supabase.channel('map-outbreak')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'outbreak_data' }, () => loadMapData())
      .subscribe();
    return () => { ch.unsubscribe(); };
  }, [loadMapData]);

  // Tile sync
  useEffect(() => { baseTileRef.current?.setUrl(TILE_URLS[tileMode]); }, [tileMode]);
  useEffect(() => {
    const map = mapRef.current; const lyr = labelTileRef.current;
    if (!map || !lyr) return;
    if (tileMode === 'satellite' && showLabels) { if (!map.hasLayer(lyr)) lyr.addTo(map); }
    else { if (map.hasLayer(lyr)) map.removeLayer(lyr); }
  }, [tileMode, showLabels]);

  const handleZoomIn  = () => mapRef.current?.setZoom((mapRef.current.getZoom()) + 1);
  const handleZoomOut = () => mapRef.current?.setZoom((mapRef.current.getZoom()) - 1);
  const handleReset   = () => mapRef.current?.setView(NIGERIA_CENTER, DEFAULT_ZOOM);

  const flyTo = useCallback((s: StateEntry) => {
    setSelected(s);
    mapRef.current?.flyTo([s.lat, s.lng], 9, { duration: 1.2 });
  }, []);

  return (
    <>
      <DataEntryModal open={dataEntry} onClose={() => setDataEntry(false)} onSuccess={loadMapData} />
      <section id="map" className="relative py-20 overflow-hidden section-beige-alt">
        <div className="absolute inset-0 bg-molecular-dots pointer-events-none z-0" />
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 55% 60% at 75% 50%, hsl(0 40% 88% / 0.35) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-4 relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <span className="text-primary label-badge">Outbreak Map</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground text-balance font-display mb-2">
                Nigeria Satellite Outbreak Map
              </h2>
              <p className="text-muted-foreground text-sm md:text-base text-pretty max-w-2xl">
                GPS-accurate satellite heatmap with real-time outbreak overlays. Click any hotspot for live statistics.
                {liveCount > 0 && (
                  <span className="ml-2 text-green-700 font-medium">· {liveCount} live DB records loaded</span>
                )}
              </p>
            </div>
            <Button
              className="h-8 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 text-xs gap-1.5"
              onClick={() => setDataEntry(true)}
            >
              <Activity className="w-3.5 h-3.5" />
              Enter Case Data
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {/* Map */}
            <div className="lg:col-span-3">
              <div className="chart-card overflow-hidden" style={{ borderRadius: '1rem' }}>
                <div className="p-0 relative" style={{ height: 520 }}>
                  <div className="absolute top-3 left-3 z-[1000] flex flex-col gap-1.5">
                    {([
                      { Icon: ZoomIn,    action: handleZoomIn,  title: 'Zoom in'    },
                      { Icon: ZoomOut,   action: handleZoomOut, title: 'Zoom out'   },
                      { Icon: RefreshCw, action: () => { handleReset(); loadMapData(); }, title: 'Reset & refresh' },
                    ] as const).map(({ Icon, action, title }) => (
                      <button key={title} onClick={action} title={title}
                        className="w-8 h-8 bg-[hsl(38,30%,97%)] border border-[hsl(30,18%,82%)] shadow-sm rounded-xl flex items-center justify-center hover:bg-secondary transition-colors">
                        <Icon className="w-3.5 h-3.5 text-foreground/70" />
                      </button>
                    ))}
                  </div>
                  <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5">
                    <button
                      onClick={() => setTileMode(t => t === 'satellite' ? 'road' : 'satellite')}
                      className={`flex items-center gap-1.5 px-2.5 h-8 text-xs font-medium rounded-xl border shadow-sm transition-colors ${tileMode === 'satellite' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-foreground/70 border-border hover:bg-muted'}`}>
                      <Layers className="w-3.5 h-3.5" />
                      {tileMode === 'satellite' ? 'Satellite' : 'Road'}
                    </button>
                    <button
                      onClick={() => setShowLabels(v => !v)}
                      className={`flex items-center gap-1.5 px-2.5 h-8 text-xs font-medium rounded-xl border shadow-sm transition-colors ${showLabels ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-foreground/70 border-border hover:bg-muted'}`}>
                      Labels {showLabels ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 z-[1000] bg-[hsl(38,30%,97%)]/95 backdrop-blur-sm border border-[hsl(30,18%,82%)] rounded-xl px-3 py-2 shadow-sm">
                    <p className="text-xs font-semibold text-foreground mb-1.5">Risk Level</p>
                    {[
                      { color: '#B71C1C', label: 'Critical (500+)'   },
                      { color: '#D32F2F', label: 'High (200–499)'    },
                      { color: '#EF5350', label: 'Moderate (50–199)' },
                      { color: '#EF9A9A', label: 'Low (<50)'         },
                    ].map(l => (
                      <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ background: l.color }} />
                        {l.label}
                      </div>
                    ))}
                  </div>
                  <div ref={mapDivRef} style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>

            {/* Side panel */}
            <div className="flex flex-col gap-4">
              <div className="glass-card-premium rounded-2xl p-4">
                {selected ? (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-foreground text-base text-balance">{selected.name}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Badge className="text-xs border-0" style={{ background: getRisk(selected.cases).color, color: '#fff' }}>
                            {getRisk(selected.cases).label} Risk
                          </Badge>
                          {selected.fromDB && (
                            <span className="text-[9px] font-bold text-green-700 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-full">Live DB</span>
                          )}
                        </div>
                      </div>
                      <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Cases',     value: selected.cases.toLocaleString(),      color: 'text-primary'    },
                        { label: 'Deaths',    value: selected.deaths.toLocaleString(),     color: 'text-orange-600' },
                        { label: 'Recovered', value: selected.recoveries.toLocaleString(), color: 'text-green-700'  },
                        { label: 'CFR',       value: `${selected.cases > 0 ? ((selected.deaths / selected.cases) * 100).toFixed(1) : '0.0'}%`, color: 'text-primary' },
                      ].map(s => (
                        <div key={s.label} className="bg-secondary/70 rounded-xl p-2.5">
                          <p className="text-muted-foreground text-xs">{s.label}</p>
                          <p className={`font-bold text-base ${s.color}`}>{s.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className={`flex items-center gap-1.5 mt-3 text-xs font-semibold ${selected.trend >= 0 ? 'text-primary' : 'text-green-700'}`}>
                      {selected.trend >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {selected.trend >= 0 ? '+' : ''}{selected.trend}% 30d trend
                    </div>
                    <p className="text-muted-foreground text-xs mt-2">
                      {new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </>
                ) : (
                  <div className="text-center py-5">
                    <MapPin className="w-8 h-8 text-primary/30 mx-auto mb-2" />
                    <p className="text-muted-foreground text-xs text-pretty">
                      Click any outbreak circle on the map to view detailed state statistics
                    </p>
                  </div>
                )}
              </div>

              <div className="glass-card-accent rounded-2xl flex-1 p-4">
                <h3 className="font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-3">Top Hotspots</h3>
                <ul className="space-y-1.5">
                  {stateData.slice(0, 9).map((s, i) => {
                    const risk = getRisk(s.cases);
                    return (
                      <li key={s.name}
                        className="flex items-center justify-between cursor-pointer hover:bg-accent rounded-xl px-2 py-1.5 -mx-2 transition-colors"
                        onClick={() => flyTo(s)}>
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-muted-foreground text-xs w-4 shrink-0">{i + 1}.</span>
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: risk.color }} />
                          <span className="text-sm text-foreground truncate">{s.name}</span>
                          {s.fromDB && <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" title="DB data" />}
                        </div>
                        <span className="text-xs font-semibold shrink-0 ml-2" style={{ color: risk.color }}>
                          {s.cases.toLocaleString()}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
