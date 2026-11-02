import type { LegalDoc } from "@/lib/studio/legal";
import { site } from "@/lib/studio/site";

const cookies: LegalDoc = {
  slug: "cookies",
  title: "Cookie policy",
  description:
    "Every cookie and similar technology on the Orryvelle website: what it does, who sets it, how long it lasts, and how to accept, refuse or withdraw analytics.",
  updated: "2026-11-02",
  body: `## What cookies are

Cookies are small text files a website stores in your browser. Similar technologies, such as local storage and session storage, keep small pieces of information on your device in the same way. This policy uses “cookies” for all of them.

Under Article 4a of the Bulgarian Electronic Commerce Act and the EU ePrivacy Directive, a website needs no consent only for what is strictly necessary to provide a service you have asked for. Everything else needs your consent first. On this website, the only cookies that need consent are Google Analytics cookies.

## Your choice

On your first visit, a banner asks whether you accept analytics cookies. Accepting and refusing take one click each, and the site works the same either way. Until you choose, no analytics cookies are set and no analytics code loads.

You can change your mind at any time with **Cookie settings** at the bottom of every page, or with the button at the top of this page. If you withdraw consent, analytics stops straight away and we delete the analytics cookies from your browser. We remember your choice for six months and then ask again.

## Strictly necessary

These make the website and the booking calendar work. They don’t need consent, and none of them is used to track you.

| Name | Set by | Purpose | Type | Expires |
|---|---|---|---|---|
| \`orryvelle-consent\` | Orryvelle | Remembers whether you accepted or refused analytics | Local storage | 6 months |
| \`lang\` | Orryvelle | Remembers the language you picked with the language switch. Set only if you use the switch | Cookie | 1 year |
| \`announcement-dismissed\` | Orryvelle | Keeps the announcement bar closed after you close it | Session storage | When you close the tab |
| \`__cf_bm\` | Cloudflare, for Cal.com | Tells people apart from bots to protect the booking calendar. Contact page only | Cookie | 30 minutes |
| \`reserverUid\` | Cal.com | Keeps track of the time slot you are booking while you complete the booking. Contact page only | Local storage | Until cleared |

## Analytics (only with your consent)

| Name | Set by | Purpose | Expires |
|---|---|---|---|
| \`_ga\` | Google Analytics | Distinguishes visitors with a random ID, so visits can be counted without knowing who you are | 13 months |
| \`_ga_<ID>\` | Google Analytics | Keeps the state of your current visit | 13 months |

We set both to expire after 13 months instead of Google’s default of two years. Google’s advertising features, Google signals and ad personalisation are switched off, and we never send Google your name, email or anything you type into our forms. What Google Analytics records, and who receives it, is described in our [privacy policy](/privacy).

## The booking calendar

The contact page shows a booking calendar provided by Cal.com, Inc. Loading it connects your browser to Cal.com, which receives your IP address and sets the two Cal.com entries listed under strictly necessary. Cal.com also sends error reports to Sentry, its error-monitoring provider, if the calendar fails. It sets no advertising or analytics cookies in the calendar. Because booking a call is the purpose of that page, the calendar loads with it. If you’d rather not load it, email us at [${site.email}](mailto:${site.email}) instead and we’ll arrange a time.

## Controlling cookies in your browser

You can also block or delete cookies in your browser settings. Blocking the strictly necessary ones may stop the language choice or the booking calendar from working. Browser settings apply to all websites, so the banner is the easier way to control analytics here.

## Changes to this policy

If we add, remove or change a cookie, we update this page and the date at the top. If a new cookie needs consent, the banner asks you again.`,
};

export default cookies;
