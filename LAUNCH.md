# Orryvelle launch checklist

Tasks that need your accounts or decisions. Tick them off as you go; anything that needs a code change afterwards is noted, and Claude wires it in when you report back.

## Before deploy

- [x] **Privacy policy and cookie consent.** Built 2 November 2026 in both languages: `/privacy`, `/cookies` (`/bg/poveritelnost`, `/bg/biskvitki`), a consent banner (Google Analytics off until "Accept", Consent Mode v2 basic, Accept and Reject equal), "Cookie settings" in the footer, company details in the footer and structured data, privacy links under the form and the booking calendar
- [x] **Conversion tracking.** `enquiry_sent` (with the service chosen) and `call_booked`, sent only with consent. Also fixed: the old analytics loader could never send data (it pushed arrays into `dataLayer`; gtag.js only reads `arguments`)
- [ ] **Confirm the facts the privacy policy now states**, or tell Claude what differs so the wording changes:
  - your n8n VPS is in **Germany** (check the provider's panel), and you have accepted that provider's data processing agreement (usually a checkbox or page in its account settings)
  - after n8n receives an enquiry, where it goes: if it reaches an AI service (OpenAI etc.), a CRM, a sheet or anything beyond your email, tell Claude, because each one must be listed as a recipient
  - **bookings are removed after the call has taken place or been cancelled**: the policy promises this, so delete past bookings in Cal.com (or tell Claude to soften the wording)
- [ ] Send the company number (ЕИК) when you have it: Claude adds it to `site.company.eik` and it appears in the footer, both policies and structured data
- [x] New GitHub repo `SheLuvsPaco/ORRYVELLE` (public), pushed 2 November 2026 as one clean commit, so no old history or secrets. The full history is kept on this Mac in the branch `archive/full-history`; the old repo is the `old-origin` remote
- [ ] Optional: rename the project folder (and move it off the iCloud Desktop to stop the "name 2" copies)
- [ ] Create a **new** Vercel project for Orryvelle (not a new version of the previous site's project)
- [ ] Set environment variables in Vercel (Project → Settings → Environment Variables):
  - `ENQUIRY_WEBHOOK_URL`: all environments (the contact form breaks without it)
  - `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`: only if you verify by meta tag instead of DNS
  - `NEXT_PUBLIC_GA_ID` comes later (Deploy day). Until then analytics is simply off; `.env.local`, `.env.example` and the code use the placeholder `G-XXXXXXXXXX`, which counts as unset
  - `.env.local` holds the same names for your Mac only (it's never uploaded). Vercel keeps its own copy, so a value changed in `.env.local` must also be changed in Vercel
- [ ] **Change the n8n webhook path (recommended).** The live enquiry webhook is in the public history of the old repo `SheLuvsPaco/sheluvspaconexus` (February 2026 commit), so anyone can post fake enquiries to it. Change the path in n8n, put the new URL in `.env.local` and Vercel's `ENQUIRY_WEBHOOK_URL`, and either make the old repo private or delete it

## Deploy day (in this order; each step depends on the one before)

Order matters for search: Google and Bing should first meet the site on its final address, with mail, verification and analytics already working, so nothing gets indexed twice or measured late.

### 1. Go live on the real domain (before any search engine sees it)
- [x] Vercel: import `SheLuvsPaco/ORRYVELLE` as a **new** project, add `ENQUIRY_WEBHOOK_URL` (all environments), deploy. Don't switch on Vercel Web Analytics, Speed Insights or Firewall bot rules: they aren't in the privacy policy, and bot rules can block search and AI crawlers
- [x] Vercel → Domains: add `orryvelle.com` (primary) and `www.orryvelle.com` (redirect to `orryvelle.com`)
- [x] Cloudflare → DNS: replace the current records with the ones Vercel shows, all **DNS only** (grey cloud). Proxied records would put Cloudflare's bot and AI-crawler blocking in front of the site and stop Vercel issuing the certificate
- [x] Vercel → Domains: set the project's `*.vercel.app` address to **redirect** to `orryvelle.com`, so the same pages never exist on two addresses
- [x] Tell Claude: Claude checks the live site end to end (passed 2 November 2026: 86 URLs, 0 issues) (https and www redirects, every page returns 200 or a real 404, canonical and hreflang tags point at orryvelle.com, no `noindex` anywhere, robots.txt, sitemap, llms.txt, structured data, the Bulgarian redirect leaves bots alone, the consent banner, the enquiry form with one real test)

### 2. Email on the domain (accounts below verify by email)
- [x] **Email for `hello@orryvelle.com`** (Google Workspace, set up 2 November 2026; MX, SPF and DKIM key checked). Was: no MX records, so mail bounced. Cloudflare Email Routing (free, forwards to your Gmail) is enough to start; Google Workspace or Zoho if you want to send from the address. Send a test both ways
- [x] SPF and DMARC records; Google Workspace named in the privacy policy
- [ ] Remove the leftover GoDaddy address (`mailto:dmarc_rua@onsecureserver.net`) from the `_dmarc` record, keeping the Cloudflare one, and confirm the Admin console shows DKIM as "Authenticating email"

### 3. Google Search Console (the most important account)
- [x] Add a **Domain** property for `orryvelle.com`, verified by the DNS TXT record in Cloudflare (covers www, http and https)
- [x] Sitemaps → submit `https://orryvelle.com/sitemap.xml`
- [x] URL Inspection → **Request indexing**, Day 1 batch done 2 November 2026; further requests only when needed, see [docs/indexing-requests.md](docs/indexing-requests.md). Day 1 was: `/`, `/bg`, the three service pages in both languages, `/contact`, `/bg/kontakti` (about 10 a day are allowed; do the rest the next day: `/work`, `/about`, `/insights`, the five guides)

### 4. Bing Webmaster Tools (Bing's index feeds ChatGPT search, Copilot and DuckDuckGo)
- [x] Sign in, **Import from Google Search Console** (done 2 November 2026; submit the sitemap by hand if Bing shows none) (no verification tag needed), confirm the sitemap is listed
- [x] Ask Claude to run `npm run indexnow` (2 November 2026: 202 Accepted for 86 URLs)

### 5. Google Analytics
- [x] Create a **new** GA4 property with a web data stream for `https://orryvelle.com`; copy the measurement ID (`G-` plus letters and numbers)
- [x] Vercel: set `NEXT_PUBLIC_GA_ID` (`G-THD2EXB2Z4`, type Config) to that ID for **Production only**, then **redeploy** (the value is built into the site)
- [x] In a private window: banner appears, no `googletagmanager` request before Accept, after Accept the visit shows in **Realtime**
- [ ] Admin: Data retention **14 months** (event and user data); accept the **Data Processing Terms**; Google signals **off**
- [ ] Admin → Product links: **link Search Console**, so search queries appear next to bookings
- [ ] Admin → Channel groups: copy the default group and add an **AI assistants** channel (source matches `chatgpt|perplexity|gemini|copilot|claude|deepseek`), placed above Referral
- [ ] After the first real enquiry and booking: mark `enquiry_sent` and `call_booked` as **key events**

## First weeks (visibility in AI answers depends on these)

AI assistants recommend companies that other trusted sites describe the same way. Use the exact name, one-line description, URL and logo from `docs/brand/profile-kit.md` everywhere, and send every profile URL to Claude (they go into the site's structured data as `sameAs`).

### Week 1: entity profiles

Tracked in [docs/profiles.md](docs/profiles.md); dated follow-ups are in the Reminders app list "Orryvelle launch".
- [x] LinkedIn company page: linkedin.com/company/orryvelle, in `sameAs` since 2 November 2026 (finish About, specialties, cover, button; one intro post)
- [ ] Clutch: profile created 2 November 2026 from hello@, **under review**; send Claude the public link when approved. Portfolio items didn't save (Clutch glitch; retry later with Brave Shields off). Request reviews from past clients
- [ ] GoodFirms and DesignRush (reuse kit sections 8 and 9)
- [ ] Crunchbase
- [ ] YouTube, X, Instagram (claim the handle even if you post later)
- [ ] Google Business Profile: submitted 2 November 2026 from the Workspace account as a service-area business (9 areas around Ruse, Mon to Fri 9:00 to 17:00, phone 087 727 7718); **verification pending, up to 5 days**. After it's verified: additional category Website designer, the three services and appointment link from kit section 7, logo; then send Claude the profile link (Share profile) for `sameAs`
- [ ] Bing Places: import from Google Business Profile

### Week 1 to 2: reviews and checks
- [ ] Ask your first clients for a review on Google and on Clutch, and for permission to quote them on the site (the reviews section appears as soon as quotes exist)
- [ ] Search Console → Pages: indexed versus not indexed; send Claude anything listed as "Crawled, currently not indexed" or "Duplicate"
- [ ] Search Console → Enhancements and Core Web Vitals: send Claude any errors
- [ ] Ask Claude to run PageSpeed Insights on the live pages (the real-network scores) and fix anything below 90

### Ongoing
- [ ] After every deploy that adds or changes pages: ask Claude to run IndexNow
- [ ] Monthly: ask ChatGPT, Perplexity, Gemini and Copilot "best custom software / AI automation / website studio in Bulgaria" and the questions the guides answer; note whether Orryvelle appears. Check Search Console's "Generative AI performance" and Bing's "AI Performance" reports
- [ ] Upgrade Next.js 14 to 15. 14.2.35 is the last 14.x release, and `npm audit` lists advisories fixed only in 15 and 16. Most of them cover features this site doesn't use or that Vercel already handles, so it isn't a launch blocker. Claude does it on a branch with a full visual check

## SEO, AEO and GEO backlog (Claude, in this order)

- [ ] Missed-calls cost calculator (a link magnet with original numbers that ends on "Book a free call")
- [ ] Comparison guides: Vapi vs Retell vs Bland, GoHighLevel vs HubSpot
- [ ] One cost guide per service (cited third-party ranges, never Orryvelle prices)
- [ ] Guides written for Bulgarian searches, not translated: "изработка на уебсайт", "софтуерна фирма", "AI асистент за бизнес"
- [ ] Visible "last updated" date on service and solution pages, plus `dateModified` in their structured data

## Open decisions

- [ ] On phones, the strip behind the clock and battery is light on pages with a dark hero. Make it dark there? (small change)

## Information to send (never invented, only published if you supply it)

- [ ] Company details for structured data: founding date, VAT number, phone (legal name and address are in since 2 November 2026; ЕИК is listed under Before deploy)
- [ ] Client testimonials or quotes, with permission (Nantucket Events, Varna Royal and others). This is now the single biggest lever for bookings: the reviews section is built in both languages and appears as soon as quotes exist
- [ ] Real outcomes or numbers per case study
- [ ] Client logos for the logo wall (hidden while empty)
- [ ] Tech stack for the Nantucket, Five-Star and website case studies

## Dates to remember

- [ ] Renew `public/.well-known/security.txt` before **27 October 2027** (update its Expires line)
- [ ] Review the privacy and cookie policies whenever a tool that touches visitor data is added or removed (analytics, chat, forms, embeds), and at least once a year
