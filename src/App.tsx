import { Toaster } from '@/components/ui/sonner';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import OverviewSection from '@/components/sections/OverviewSection';
import DashboardSection from '@/components/sections/DashboardSection';
import NigeriaMapSection from '@/components/sections/NigeriaMapSection';
import EpidemiologySection from '@/components/sections/EpidemiologySection';
import MLSection from '@/components/sections/MLSection';
import GlobalMonitoringSection from '@/components/sections/GlobalMonitoringSection';
import ResponsePreventionSection from '@/components/sections/ResponsePreventionSection';
import EmergencySection from '@/components/sections/EmergencySection';
import Footer from '@/components/Footer';

const SITE_URL = 'https://lf-surveillance.miaoda.app';
const SITE_TITLE = 'Lassa Fever Surveillance Platform | Nigeria Lassa Fever';
const SITE_DESC =
  'Real-time Lassa Fever surveillance and awareness platform for Nigeria. Track outbreaks, access prevention guidelines, and report symptoms.';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const JSON_LD = JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lassa Fever Surveillance Platform',
    url: SITE_URL,
    description: SITE_DESC,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/#map?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Lassa Fever Surveillance Platform',
    url: SITE_URL,
    description: SITE_DESC,
    about: {
      '@type': 'InfectiousDisease',
      name: 'Lassa Fever',
      code: { '@type': 'MedicalCode', code: 'A96.2', codingSystem: 'ICD-10' },
    },
    audience: {
      '@type': 'MedicalAudience',
      audienceType: 'Clinician, Public Health Professional, General Public',
    },
    specialty: 'Infectious Disease, Epidemiology',
    lastReviewed: new Date().toISOString().split('T')[0],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HealthTopicContent',
    name: 'Lassa Fever Surveillance and Prevention',
    url: SITE_URL,
    description:
      'Comprehensive real-time data on Lassa fever outbreaks in Nigeria, including confirmed cases, deaths, case fatality rates, state-level heatmaps, seasonal trends, and prevention guidelines.',
    hasHealthAspect: [
      {
        '@type': 'HealthAspectEnumeration',
        name: 'Prevention',
        description:
          'Evidence-based Lassa fever prevention measures including food safety, rodent control, hand hygiene, and safe healthcare practices.',
      },
      {
        '@type': 'HealthAspectEnumeration',
        name: 'Symptoms',
        description:
          'Clinical presentation of Lassa fever: fever, headache, sore throat, muscle pain, chest pain, nausea, vomiting, and in severe cases haemorrhagic manifestations.',
      },
      {
        '@type': 'HealthAspectEnumeration',
        name: 'Causes',
        description:
          'Lassa fever is caused by the Lassa virus (an arenavirus) transmitted primarily through contact with the multimammate rat (Mastomys natalensis).',
      },
      {
        '@type': 'HealthAspectEnumeration',
        name: 'Treatment',
        description:
          'Ribavirin antiviral therapy is most effective when administered early. Supportive care including rehydration and symptom management is also essential.',
      },
    ],
    about: {
      '@type': 'InfectiousDisease',
      name: 'Lassa Fever',
      infectiousAgent: 'Lassa virus (Mammarenavirus lassaense)',
      transmissionMethod: 'Contact with infected Mastomys rat excreta; person-to-person via bodily fluids',
      naturalProgression:
        'Incubation 6–21 days; 80% asymptomatic or mild; 20% develop severe multisystem disease; CFR ~15–20% in hospitalised cases',
      geographicArea: {
        '@type': 'Place',
        name: 'West Africa',
        containsPlace: { '@type': 'Country', name: 'Nigeria' },
      },
    },
    mainContentOfPage: SITE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'Lassa Fever Surveillance Platform',
      url: SITE_URL,
    },
  },
]);

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESC} />
        <meta name="theme-color" content="#C0392B" />
        {/* Open Graph */}
        <meta property="og:typ        npm install react react-dom
        npm install -D @types/react @types/react-dome"        content="website" />
        <meta property="og:site_name"   content="Lassa Fever Surveillance Platform" />
        <meta property="og:title"       content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESC} />
        <meta property="og:url"         content={SITE_URL} />
        <meta property="og:image"       content={OG_IMAGE} />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Twitter Card */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:site"        content="@NCDCgov" />
        <meta name="twitter:title"       content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESC} />
        <meta name="twitter:image"       content={OG_IMAGE} />
        {/* Canonical */}
        <link rel="canonical" href={SITE_URL} />
        {/* JSON-LD */}
        <script type="application/ld+json">{JSON_LD}</script>
      </Helmet>
      <Toaster richColors position="top-right" />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <OverviewSection />
          <DashboardSection />
          <NigeriaMapSection />
          <EpidemiologySection />
          <MLSection />
          <GlobalMonitoringSection />
          <ResponsePreventionSection />
          <EmergencySection />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
