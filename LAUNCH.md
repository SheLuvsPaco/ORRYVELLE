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
- [ ] Rename the project folder, create the new GitHub repo and push `main`. Push `main` only: the old remote branch `remove-sections` (February 2026, before the rebrand) isn't needed
- [ ] Create a **new** Vercel project for Orryvelle (not a new version of the previous site's project)
- [ ] Set environment variables in Vercel (Project → Settings → Environment Variables):
  - `ENQUIRY_WEBHOOK_URL`: all environments (the contact form breaks without it)
  - `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`: only if you verify by meta tag instead of DNS
  - `NEXT_PUBLIC_GA_ID` comes later (Deploy day). Until then analytics is simply off; `.env.local`, `.env.example` and the code use the placeholder `G-XXXXXXXXXX`, which counts as unset
  - `.env.local` holds the same names for your Mac only (it's never uploaded). Vercel keeps its own copy, so a value changed in `.env.local` must also be changed in Vercel
- [ ] Optional: change the n8n webhook path, since the old URL is in git history

## Deploy day

- [ ] Add `orryvelle.com` and `www.orryvelle.com` to the Vercel project; set `orryvelle.com` as primary and make www redirect to it (Vercel forces https on its own). DNS is on Cloudflare and currently points at Cloudflare's proxy: replace those records with the ones Vercel shows, set to "DNS only" (grey cloud), or Vercel can't issue the certificate
- [ ] Check the live site: home, a Bulgarian page, the contact form (one real test enquiry), `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/privacy`, `/cookies`
- [ ] **Google Analytics**, once the site is live:
  - Create a **new** GA4 property for Orryvelle (don't reuse the old site's property) with a web data stream for `https://orryvelle.com`; copy its measurement ID (`G-` followed by letters and numbers)
  - In Vercel, set `NEXT_PUBLIC_GA_ID` to that ID for **Production only**, then **redeploy**: `NEXT_PUBLIC_` values are built into the site, so a new value only takes effect after a new deploy
  - In the property (Admin): Data retention **14 months** for event and user data (the privacy policy says 14 months); accept the **Data Processing Terms** in Account settings; leave Google signals **off**
  - After the first real enquiry and booking: Events → mark `enquiry_sent` and `call_booked` as **key events**
- [ ] Check consent on the live site: in a private window the banner appears and the browser's Network tab shows no `googletagmanager` request until you click Accept; after Accept, the visit appears in Analytics → Realtime
- [ ] **Email for `hello@orryvelle.com`** (right after deploy). The domain has no MX records yet, so mail to the address on every page bounces. Set up a mailbox (Google Workspace, Zoho, iCloud+ custom domain or Cloudflare Email Routing to Gmail) and send a test message. Tell Claude which provider, so the privacy policy can name it
- [ ] Google Search Console: add a **Domain** property (DNS verification covers www, http and https), submit `https://orryvelle.com/sitemap.xml`
- [ ] Bing Webmaster Tools: import the site from Search Console, confirm the sitemap
- [ ] Ask Claude to run `npm run indexnow` (tells Bing, Yandex, Seznam and Naver about every page)
- [ ] In Search Console, request indexing for the home page and the three service pages, in both languages

## First weeks

- [ ] Google Business Profile as a service-area business (Bulgaria), if you want map and local visibility
- [ ] Profiles, using the text and images in `docs/brand/profile-kit.md`: LinkedIn company page, YouTube, X, Instagram, Clutch, GoodFirms, DesignRush, Crunchbase. Send the URLs to Claude (they go into the site's structured data)
- [ ] Watch Search Console's "Generative AI performance" report and Bing's "AI Performance" report
- [ ] After every deploy that adds or changes pages: ask Claude to run IndexNow
- [ ] Upgrade Next.js 14 to 15. 14.2.35 is the last 14.x release, and `npm audit` lists advisories fixed only in 15 and 16. Most of them cover features this site doesn't use or that Vercel already handles, so it isn't a launch blocker. Claude does it on a branch with a full visual check
- [ ] In Analytics, add an "AI assistants" channel group so ChatGPT, Perplexity, Gemini and Copilot visits show as their own source

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
