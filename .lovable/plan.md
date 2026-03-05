

## Replace WhatsApp Button with Market & News Widget

### Overview
Replace the floating WhatsApp button (bottom-left) with a stock market / news / weather floating button. Clicking it opens a popup panel showing live data from free APIs.

### Free API Sources (No API Key Required)
- **Stock Market**: Yahoo Finance via `query1.finance.yahoo.com` (free, no key) for major indices (S&P 500, NASDAQ, DOW)
- **Top News**: Google News RSS feed parsed via a lightweight edge function, or use `gnews.io` free tier (10 requests/day, requires free key). Better approach: use **NewsData.io** free tier or simply embed curated RSS. Simplest: fetch from `https://newsapi.org` free tier or use a backend function that scrapes Google News RSS.
- **Weather**: **Open-Meteo API** (completely free, no API key, open source) - `https://api.open-meteo.com/v1/forecast`

**Recommended approach**: Create an edge function that fetches all three data sources server-side to avoid CORS issues, then the frontend calls that single edge function.

### Changes

**1. New Edge Function: `supabase/functions/market-news-weather/index.ts`**
- Fetches stock indices from Yahoo Finance API (S&P 500, NASDAQ, DOW JONES)
- Fetches top tech/business news headlines from Google News RSS (XML parse, no key needed)
- Fetches weather using Open-Meteo API based on lat/lon passed from frontend (user's browser geolocation or a default like New York)
- Returns combined JSON response
- No API keys required

**2. Replace `src/components/WhatsAppButton.tsx` → `src/components/MarketNewsWidget.tsx`**
- Floating button (bottom-left) with a TrendingUp icon (from lucide-react)
- On click, opens a popup/dialog with three tabs:
  - **Stocks**: Major indices with price, change %, up/down color indicators
  - **News**: Scrollable list of top headlines with source and link
  - **Weather**: Country selector dropdown, shows current temperature, condition, humidity, wind
- Uses `useQuery` for data fetching with 5-minute stale time
- Animated with framer-motion (same style as current WhatsApp button)
- Responsive: on mobile it opens as a near-full-screen sheet; on desktop as a positioned popup

**3. Update `src/App.tsx`**
- Replace `WhatsAppButton` import with `MarketNewsWidget`

### UI Design
- Dark-themed popup card with glassmorphism effect
- Tabs component (Stocks | News | Weather) using existing Radix tabs
- Stock cards show ticker, price, change with green/red indicators
- News items show headline, source, time ago, clickable to open article
- Weather shows icon, temperature, description, with a country/city search input

### Technical Notes
- Open-Meteo geocoding API (`https://geocoding-api.open-meteo.com/v1/search`) is also free and can resolve city names to coordinates
- Yahoo Finance endpoint: `https://query1.finance.yahoo.com/v8/finance/chart/^GSPC` (may need proxy via edge function due to CORS)
- Google News RSS: `https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pWVXlnQVAB` (business/tech)
- All data fetched server-side in the edge function to avoid CORS and rate-limit issues on the client

