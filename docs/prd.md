# Requirements Document

## 1. Application Overview

**Application Name**: LF Surveillance Platform

**Description**: A comprehensive, data-driven public health website focused on Lassa Fever surveillance and awareness in Nigeria. The platform combines real-time infectious disease monitoring dashboard capabilities with educational content and predictive analytics, covering the period from 2020 to 2026. The website serves as an official-style disease intelligence system for public health awareness, academic presentation, and outbreak monitoring, featuring live data feeds and interactive visualizations.

## 2. Users and Usage Scenarios

**Target Users**:
- Public health officials and researchers
- Healthcare professionals and medical students
- General public seeking Lassa Fever information
- Government agencies and NGOs
- Academic institutions

**Core Usage Scenarios**:
- Monitor real-time Lassa Fever outbreak data across Nigeria
- Access educational content about disease prevention and symptoms
- Analyze epidemiological trends and patterns
- Report suspected cases or symptoms
- Access predictive outbreak analysis
- Research historical outbreak data from 2020-2026
- Track live updates and newly reported cases
- Explore interactive Nigeria map with state-level details
- View global Lassa Fever context and alerts

## 3. Page Structure and Functional Description

### 3.1 Page Structure

```
LF Surveillance Platform
├── Home Page (Single-page application with sections)
│   ├── Hero Section
│   ├── Overview Section
│   ├── Live Surveillance Dashboard Section
│   ├── Interactive Nigeria Map Section
│   ├── Epidemiological Analysis Section
│   ├── Machine Learning & Predictive Analysis Section
│   ├── Global Live Monitoring Center Section
│   ├── Public Health Response Section
│   ├── Prevention Section
│   ├── Emergency Contact/Reporting Section
│   └── Footer
├── sitemap.xml
├── robots.txt
└── llms.txt
```

### 3.2 Functional Description by Section

#### 3.2.1 Hero Section
- Display H1 title: \"LF Surveillance Platform\"
- Display H2 subtitle: \"Tracking outbreaks, improving awareness, and supporting public health interventions across Nigeria.\"
- Show dark red/burgundy gradient background with layered medical SVG decorations
- Display animated ECG/heartbeat line SVG running across section
- Display subtle molecular dot-pattern background at low opacity
- Display abstract virus and microorganism SVG illustrations integrated into background
- Use small white accents for text contrast
- Provide two action buttons:
  - \"Explore Dashboard\" button: navigates to Live Surveillance Dashboard Section
  - \"Learn Prevention\" button: navigates to Prevention Section

#### 3.2.2 Overview Section
- Display H2 heading: \"What is Lassa Fever\"
- Present comprehensive information with proper heading hierarchy (H3 for subsections):
  - H3: Causes of the disease
  - H3: Symptoms and clinical presentation
  - H3: Transmission methods
  - H3: Prevention measures
  - H3: Importance of early treatment
- Show dark red/burgundy gradient background with subtle DNA strand patterns
- Display content in semi-transparent cards with darker red backgrounds
- Use medical cross motifs and icons with white accents
- Integrate subtle cell grid patterns at low opacity
- Organize information in visually distinct panels

#### 3.2.3 Live Surveillance Dashboard Section (2020-2026)
- Display H2 heading: \"Live Surveillance Dashboard\"
- Show dark red/burgundy gradient background with ECG line patterns
- Display animated pulse indicators indicating live system status
- Display real-time statistics cards with auto-refresh:
  - Total confirmed cases
  - Total deaths
  - Total recoveries
  - Case Fatality Rate (CFR) percentage
  - Most affected states list
  - Seasonal outbreak periods
- Show \"Last Updated\" timestamp with visible refresh indicator
- Display live ticker/feed showing newly reported cases from symptom_reports table
- Implement Supabase Realtime subscriptions for automatic data updates
- Update statistics dynamically without page reload
- Show 24-hour change indicators with up/down trend arrows and percentage
- Integrate subtle virus SVG illustrations in background

#### 3.2.4 Interactive Nigeria Map Section
- Display H2 heading: \"Nigeria Outbreak Map\"
- Show dark red/burgundy gradient background with molecular dot patterns
- Display Nigeria SVG map with zoom capability using CSS transform
- Implement color-coded risk heatmap with 4 tiers:
  - Dark red: highly affected (500+ cases)
  - Medium red: moderately affected (200-499 cases)
  - Light red/pink: low risk (50-199 cases)
  - White/very light: no/minimal cases (<50 cases)
- Highlight most affected states: Ondo, Edo, Bauchi, Taraba, Ebonyi, Plateau, Benue
- Implement hover tooltip on each state showing:
  - Region name
  - Confirmed cases count
  - Deaths count
  - Risk level
  - 24-hour trend
- Implement click interaction on state regions opening detail panel/card showing:
  - State name
  - Severity badge
  - Total confirmed cases
  - Total deaths
  - Total recoveries
  - CFR percentage
  - Outbreak severity level
  - 24-hour trend sparkline
  - Last updated timestamp
- Provide state-level data filtering capability
- Integrate subtle laboratory-inspired visual patterns in background

#### 3.2.5 Epidemiological Analysis Section
- Display H2 heading: \"Epidemiological Analysis\"
- Show dark red/burgundy gradient background with DNA strand patterns
- Display multiple visual analytics with auto-refresh capability:
  - Yearly confirmed cases graph (2020-2026)
  - Mortality trend graph across years
  - CFR trend chart
  - Monthly seasonal outbreak chart
  - Dry season peak analysis visualization
  - Regional comparison charts
- Show key insights with H3 subheadings:
  - H3: Seasonal Patterns
  - H3: Peak Periods
  - H3: Risk Factors
- Enable interactive chart exploration with tooltips and zoom capabilities
- Charts refresh automatically without page reload
- Integrate subtle microorganism SVG illustrations at low opacity

#### 3.2.6 Machine Learning & Predictive Analysis Section
- Display H2 heading: \"Predictive Analysis\"
- Show dark red/burgundy gradient background with cell grid patterns
- Present AI-powered disease prediction features:
  - Predictive outbreak analysis dashboard
  - Risk detection system indicators
  - Early warning indicators display
  - Feature selection visualization
  - Model comparison charts
  - ROC/AUC curve visualization
  - Accuracy and validation metrics display
- Mention intelligent surveillance technologies: Random Forest, SMOTE, ENN, ALO Feature Optimization
- Display predictions as part of surveillance system
- Show confidence levels and prediction timeframes
- Integrate subtle ECG line patterns running across section

#### 3.2.7 Global Live Monitoring Center Section
- Display H2 heading: \"Global Live Monitoring Center\"
- Show dark red/burgundy gradient background with molecular dot patterns
- Show most affected countries in West Africa context
- Display global Lassa Fever statistics cards:
  - Total global confirmed cases
  - Total global deaths
  - Countries with active outbreaks
  - Global CFR percentage
- Show 24-hour change indicators with up/down trend arrows and percentage
- Display active public health alerts feed
- Show other hemorrhagic fevers context in West Africa
- Implement auto-refresh for live global data
- Integrate subtle virus SVG illustrations in background

#### 3.2.8 Public Health Response Section
- Display H2 heading: \"Public Health Response\"
- Show dark red/burgundy gradient background with DNA strand patterns
- Display information with proper H3 subheadings:
  - H3: Government interventions
  - H3: Community awareness campaigns
  - H3: Hospital preparedness programs
  - H3: Rapid response teams
  - H3: Surveillance systems
  - H3: Rural health education initiatives
- Organize content in semi-transparent cards with darker red backgrounds
- Include relevant medical imagery and icons with white accents
- Integrate subtle laboratory-inspired visual patterns

#### 3.2.9 Prevention Section
- Display H2 heading: \"Prevention Measures\"
- Show dark red/burgundy gradient background with cell grid patterns
- Display prevention measures in semi-transparent cards:
  - H3: Food protection practices
  - H3: Rodent control methods
  - H3: Hand washing guidelines
  - H3: Safe healthcare practices
  - H3: Early symptom reporting importance
- Include medical cross motifs and icons with white accents for each prevention measure
- Provide downloadable prevention guidelines
- Integrate subtle microorganism SVG illustrations at low opacity

#### 3.2.10 Emergency Contact/Reporting Section
- Display H2 heading: \"Report Symptoms\"
- Show dark red/burgundy gradient background with ECG line patterns
- Provide emergency reporting form with fields:
  - Reporter name
  - Contact information (phone, email)
  - Location (state, local government area)
  - Symptom description
  - Date of symptom onset
- Display hotline section with H3 heading: \"Emergency Contacts\"
- Show emergency contact numbers
- Show \"Report Symptoms\" call-to-action button
- Include nearby healthcare center locator
- Store submitted reports in Supabase symptom_reports table
- Integrate subtle molecular dot patterns in background

#### 3.2.11 Footer
- Show dark red/burgundy gradient background with subtle medical patterns
- Display public health awareness message
- Show social media icons with links
- Provide contact information section
- Display copyright: \"Developed by Adam Ibn\"
- Include navigation links to main sections
- Use white accents for text and icons

### 3.3 Cross-Section Features

#### 3.3.1 Navigation
- Provide sticky navigation bar with links to all major sections
- Implement smooth scrolling between sections
- Show mobile-friendly hamburger menu for small screens
- Use dark red/burgundy background with white text

#### 3.3.2 Search Functionality
- Enable search for specific states
- Allow filtering of data by year, state, or outbreak period
- Display search results dynamically

#### 3.3.3 Responsive Design
- Adapt layout for desktop, tablet, and mobile devices
- Ensure all charts and maps are mobile-friendly
- Optimize touch interactions for mobile users
- Maintain dark red/burgundy color palette across all screen sizes
- Ensure medical SVG decorations scale appropriately on smaller screens

#### 3.3.4 Animations and Transitions
- Implement smooth scrolling effects
- Add loading transitions between data updates
- Use animated counters for statistics
- Apply hover effects on interactive elements
- Display animated ECG/heartbeat line in hero section and other sections
- Show pulse indicators for live data feeds
- Ensure animations enhance user experience without causing distraction

#### 3.3.5 SEO and Technical Optimization
- Implement proper heading hierarchy (H1→H2→H3) across all sections
- Set homepage title under 60 characters: \"LF Surveillance Platform | Nigeria Lassa Fever Monitoring\"
- Add Open Graph meta tags:
  - og:title: \"LF Surveillance Platform\"
  - og:description: \"Real-time Lassa Fever surveillance and awareness platform for Nigeria. Track outbreaks, access prevention guidelines, and report symptoms.\"
  - og:image: platform preview image
  - og:url: https://domain.com/
- Add Twitter Card meta tags:
  - twitter:card: summary_large_image
  - twitter:title: \"LF Surveillance Platform\"
  - twitter:description: \"Real-time Lassa Fever surveillance and awareness platform for Nigeria. Track outbreaks, access prevention guidelines, and report symptoms.\"
  - twitter:image: platform preview image
- Add JSON-LD structured data:
  - WebSite schema with name, url, potentialAction (search)
  - MedicalWebPage schema with about, audience, specialty
  - HealthTopicContent schema with hasHealthAspect, about
- Generate sitemap.xml with absolute URLs (https://domain.com/)
- Create robots.txt referencing sitemap location
- Create llms.txt file describing site purpose and structure for AI assistants
- Implement lazy loading for below-fold sections to improve page load performance

#### 3.3.6 Real-time Data Integration
- Implement Supabase Realtime subscriptions for:
  - symptom_reports table updates
  - statistics table updates
  - outbreak_data table updates
- Auto-refresh dashboard statistics every 30 seconds
- Display visible \"Last Updated\" timestamp on all live data sections
- Show loading indicators during data refresh

#### 3.3.7 CSS Design System
- Update index.css with new dark red/burgundy HSL color tokens:
  - Primary burgundy: hsl(0, 60%, 25%)
  - Dark red gradient start: hsl(0, 65%, 20%)
  - Dark red gradient end: hsl(0, 55%, 30%)
  - Accent white: hsl(0, 0%, 95%)
  - Semi-transparent card background: hsla(0, 60%, 20%, 0.8)
- Define reusable medical background pattern classes:
  - .bg-virus-pattern: subtle virus SVG illustrations
  - .bg-ecg-line: ECG/heartbeat line patterns
  - .bg-dna-strand: DNA strand patterns
  - .bg-molecular-dots: molecular dot patterns
  - .bg-cell-grid: cell grid patterns
  - .bg-lab-pattern: laboratory-inspired visual patterns
- All decorative elements set to low opacity (0.1-0.3) to remain subtle and non-distracting
- Ensure all background patterns are vector-based (SVG) for scalability

## 4. Business Rules and Logic

### 4.1 Data Display Rules
- All data must reflect realistic trends from 2020 to 2026
- Statistics must be consistent across all sections
- CFR calculation: (Total Deaths / Total Confirmed Cases) × 100
- Seasonal patterns: Higher cases during November-April, peak in February-March
- Live data updates every 30 seconds via Supabase Realtime
- \"Last Updated\" timestamp displayed in format: \"Last updated: June 3, 2026 12:50 PM\"

### 4.2 Map Interaction Rules
- State color intensity based on confirmed cases:
  - Dark red: highly affected (500+ cases)
  - Medium red: moderately affected (200-499 cases)
  - Light red/pink: low risk (50-199 cases)
  - White/very light: no/minimal cases (<50 cases)
- Hover displays tooltip with region name, cases, deaths, risk level, 24-hour trend
- Click on state opens slide-in detail panel showing:
  - State name and severity badge
  - Confirmed cases, deaths, recoveries, mortality rate
  - 24-hour trend sparkline
  - Last update timestamp
- Click outside panel or close button closes the detail panel
- Zoom capability using CSS transform (zoom in/out buttons or mouse wheel)

### 4.3 Emergency Reporting Rules
- All form fields are required before submission
- Phone number must be valid Nigerian format
- Email must be valid format
- Submission stores data in Supabase symptom_reports table
- User receives confirmation message after successful submission
- New reports appear in live ticker/feed within 30 seconds

### 4.4 Predictive Analysis Display Rules
- Predictions shown for next 3-6 months
- Confidence intervals displayed alongside predictions
- Risk levels categorized as: Low, Moderate, High, Critical
- Early warning triggers when prediction exceeds historical average by 30%

### 4.5 Content Presentation Rules
- All content must be in English
- No academic references or citations displayed publicly
- No research paper sources mentioned in headers
- Information presented as current and realistic up to 2026
- Platform appears as official infectious disease monitoring system
- Dominant dark red/burgundy gradient backgrounds throughout all sections
- Small white accents for text contrast and icons
- Semi-transparent cards with darker red backgrounds
- All decorative medical SVG elements (virus, ECG lines, DNA strands, molecular dots, cell grids, lab patterns) must be subtle, low-opacity (0.1-0.3), and non-distracting
- Clean, premium, professional design suitable for real-time disease surveillance platform
- Modern and high-end UX, immersive but not cluttered

### 4.6 Global Monitoring Rules
- Global statistics include West African countries with Lassa Fever cases
- 24-hour change indicators show percentage increase/decrease with up/down arrows
- Active alerts feed displays most recent public health alerts
- Global data refreshes automatically every 60 seconds

### 4.7 SEO and Technical Rules
- Homepage title must be under 60 characters
- All sections must follow H1→H2→H3 heading hierarchy
- sitemap.xml must contain absolute URLs starting with https://domain.com/
- robots.txt must reference sitemap.xml location
- llms.txt must describe site purpose, structure, and key sections
- Open Graph and Twitter Card descriptions must not be truncated
- JSON-LD structured data must be valid and complete
- Below-fold sections must lazy load to improve initial page load time

### 4.8 Background Design Rules
- Every section must have a cohesive dark red/burgundy gradient background
- Layered medical SVG decorations must be integrated into each section background
- Medical decorative elements include: virus illustrations, microorganism SVGs, ECG/heartbeat lines, DNA strands, cell grids, molecular dot patterns, laboratory-inspired patterns
- All decorative elements must be elegant, abstract, and non-cartoon-like
- Decorative elements must be subtle, low-opacity (0.1-0.3), and non-distracting
- Background patterns must be vector-based (SVG) for scalability and quality
- Color palette must remain primarily red-toned throughout all sections
- White accents used sparingly for contrast and readability

## 5. Exceptions and Boundary Conditions

| Scenario | Handling Method |
|----------|----------------|
| No data available for specific state/year | Display \"Data not available\" message |
| Map fails to load | Show fallback text-based state list with statistics |
| Chart rendering error | Display data in table format as fallback |
| Form submission failure | Show error message and allow retry |
| Invalid phone/email format | Display inline validation error |
| Search returns no results | Show \"No results found\" message with suggestions |
| Slow network connection | Display loading indicators and skeleton screens |
| Browser does not support animations | Gracefully degrade to static content |
| Mobile device with small screen | Simplify charts and use vertical scrolling |
| User attempts to access future data beyond 2026 | Display message: \"Data not yet available\" |
| Supabase Realtime connection fails | Display \"Live updates temporarily unavailable\" message and fall back to manual refresh |
| Live ticker has no new reports | Display \"No new reports in the last 24 hours\" |
| State detail panel fails to load | Show error message and close button |
| Global monitoring data unavailable | Display \"Global data temporarily unavailable\" message |
| Zoom function not supported | Disable zoom controls and show map at default size |
| JSON-LD structured data invalid | Ensure fallback to basic meta tags |
| sitemap.xml generation fails | Log error and ensure manual sitemap creation |
| SVG background patterns fail to load | Fall back to solid dark red/burgundy gradient backgrounds |
| Browser does not support CSS gradients | Use solid dark red background color |

## 6. Acceptance Criteria

1. User opens the website and sees Hero Section with H1 title \"LF Surveillance Platform\", H2 subtitle, dark red/burgundy gradient background with layered medical SVG decorations (virus illustrations, ECG line, molecular dots), and two action buttons with white accents
2. User clicks \"Explore Dashboard\" button and smoothly scrolls to Live Surveillance Dashboard Section displaying real-time statistics cards with visible \"Last Updated\" timestamp, animated pulse indicators, and dark red/burgundy gradient background with ECG line patterns and subtle virus SVG illustrations
3. User views live ticker/feed showing newly reported cases updating automatically without page reload
4. User views Interactive Nigeria Map with color-coded risk heatmap on dark red/burgundy gradient background with molecular dot patterns, hovers over Ondo state to see tooltip with region name, cases, deaths, risk level, and 24-hour trend
5. User clicks on Edo state and sees slide-in detail panel showing state name, severity badge, confirmed cases, deaths, recoveries, CFR percentage, 24-hour trend sparkline, and last updated timestamp
6. User scrolls to Global Live Monitoring Center Section with dark red/burgundy gradient background, molecular dot patterns, and subtle virus SVG illustrations, and views global statistics cards with 24-hour change indicators showing up/down trend arrows and percentage
7. User scrolls to Emergency Contact/Reporting Section with H2 heading \"Report Symptoms\", dark red/burgundy gradient background with ECG line patterns, fills out the reporting form with name, contact, location, and symptoms, then submits successfully
8. User receives confirmation message and sees the new report appear in live ticker/feed within 30 seconds
9. User views sitemap.xml file containing absolute URLs starting with https://domain.com/
10. User views page source and confirms proper heading hierarchy (H1→H2→H3), Open Graph meta tags, Twitter Card meta tags, and JSON-LD structured data are present
11. User views index.css and confirms new dark red/burgundy HSL color tokens and reusable medical background pattern classes (.bg-virus-pattern, .bg-ecg-line, .bg-dna-strand, .bg-molecular-dots, .bg-cell-grid, .bg-lab-pattern) are defined
12. User scrolls through all sections and confirms every section has a cohesive dark red/burgundy gradient background with layered medical SVG decorations that are subtle, low-opacity, and non-distracting

## 7. Out of Scope for Current Release

- User account registration and login system
- Multi-language support (only English in current release)
- Real-time data integration with external health databases beyond Supabase
- Mobile native applications (iOS/Android)
- Email notification system for outbreak alerts
- Advanced data export functionality (CSV, PDF reports)
- Integration with third-party mapping services beyond basic Nigeria SVG map
- Community forum or discussion board
- Healthcare provider directory with detailed facility information
- Telemedicine or virtual consultation features
- Patient case management system
- Inventory management for medical supplies
- Staff scheduling and resource allocation tools
- Integration with laboratory information systems
- Automated SMS alerts for outbreak warnings
- Social media sharing with custom messages
- Advanced analytics dashboard for administrators
- API access for third-party developers
- Offline mode functionality
- Print-optimized layouts for reports
- Custom domain configuration beyond https://domain.com/
- A/B testing for different design variations
- User feedback and rating system
- Integration with WHO or NCDC official data feeds
- Real-time chat support for users
- Advanced map features (satellite view, street view, custom markers)
- Historical data comparison tool beyond existing charts
- Predictive model retraining interface
- Custom alert configuration for users
- Data anonymization and privacy controls beyond basic form validation