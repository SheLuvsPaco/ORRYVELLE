import type { LegalDoc } from "@/lib/studio/legal";
import { companyAddress, site } from "@/lib/studio/site";

const company = site.company.name.en;
const eik = site.company.eik ? `\n- **Company number (EIK):** ${site.company.eik}` : "";

const privacy: LegalDoc = {
  slug: "privacy",
  title: "Privacy policy",
  description:
    "What personal data Orryvelle collects through this website, why, who receives it, how long we keep it and how to use your rights under the GDPR.",
  updated: "2026-11-02",
  body: `## Who we are

This website, ${site.url.replace("https://", "")}, is run by ${company}, a company registered in Bulgaria. We decide how the personal data described here is used, which makes us its controller under the EU General Data Protection Regulation (GDPR).

- **Company:** ${company}
- **Registered address:** ${companyAddress("en")}${eik}
- **Email for privacy questions:** [${site.email}](mailto:${site.email})

We are not required to appoint a data protection officer. Write to the address above with any question about your data and we will answer it ourselves.

This policy covers the website and the conversations that start on it. If something isn’t described here, we don’t do it.

## The short version

| What happens | Data | Legal basis (GDPR) | Kept for |
|---|---|---|---|
| You send an enquiry | Name, email, company, chosen service, message | Article 6(1)(b) or 6(1)(f) | Until the enquiry is handled |
| You book a call | Name, email, the time you pick, anything you add to the booking | Article 6(1)(b) or 6(1)(f) | Until the call has taken place or been cancelled |
| You email us | Your email address and what you write | Article 6(1)(f) | Until the conversation is closed |
| You accept analytics | Pages viewed, how you arrived, approximate location, device and browser, a random visitor ID | Article 6(1)(a), your consent | 14 months |
| You visit any page | IP address, browser, page requested, time | Article 6(1)(f) | Short-lived hosting logs |

We don’t sell personal data, we don’t use it for advertising, and we don’t make automated decisions about you.

## What we collect and why

### When you send an enquiry

The form on our contact pages asks for your name, email, company and a message, plus the service you’re interested in if you choose one. We use them only to reply, to ask questions about your project and, if you want one, to prepare a proposal.

The legal basis is Article 6(1)(b) GDPR, steps you ask us to take before a possible contract. When you write on behalf of a company, it is our legitimate interest in answering business enquiries (Article 6(1)(f)). Giving us these details is voluntary, but without a name and an email address we can’t reply.

The form also has a hidden field that people never see. It catches automated spam without a tracking-based CAPTCHA.

### When you book a call

The booking calendar on the contact page is provided by Cal.com. When you book, Cal.com collects your name, your email, the time you choose and anything you add in the booking form, and sends both of us a confirmation. We use these details to hold the call and prepare for it. The legal basis is the same as for enquiries.

### When you email us

If you write to ${site.email}, we receive your email address and whatever your message contains, and we use them to reply. The legal basis is our legitimate interest in answering the people who contact us (Article 6(1)(f)).

### When you visit the website

**Hosting and security.** Every website receives some technical data with each request: your IP address, browser type, the page requested and the time. Our hosting provider, Vercel, processes this data to deliver the site and protect it from abuse, and keeps it in short-lived logs. The legal basis is our legitimate interest in running a secure, working website (Article 6(1)(f)).

**Language.** Visitors from Bulgaria are shown the Bulgarian version of a page. Our host works out your country from your IP address for that one request; we don’t store it. If you choose a language with the language switch, a small cookie remembers your choice. The legal basis is our legitimate interest in showing you the site in your language (Article 6(1)(f)).

**Analytics, only if you accept.** With your consent we use Google Analytics to understand which pages are useful and which lead to an enquiry or a booked call. It records the pages you view, how you arrived (for example, from a search engine), your approximate location at city level, your device and browser, and a random ID stored in a cookie. We also record two events: a sent enquiry (with the service chosen) and a booked call. We never send your name, email or message to Google.

We have switched off Google’s advertising features, Google signals and ad personalisation. According to Google, Google Analytics does not log or store the IP addresses of visitors from the EU. Nothing loads before you choose, and if you decline, nothing loads at all. The legal basis is your consent (Article 6(1)(a) GDPR and Article 4a of the Bulgarian Electronic Commerce Act). You can withdraw it at any time with **Cookie settings** at the bottom of every page; withdrawing doesn’t affect what was collected before. The [cookie policy](/cookies) lists every cookie in detail.

## Who receives your data

We share personal data only with the service providers below, who process it on our behalf under data processing terms, and only as far as each one needs.

| Recipient | What they do for us | Where |
|---|---|---|
| Vercel Inc. | Hosts the website and runs the code that receives the enquiry form | United States and a global network |
| Our own automation server (n8n) | Receives enquiries from the website and passes them to our team. It runs on a server we rent in Germany | European Union |
| Cal.com, Inc. | Provides the booking calendar and its confirmation emails. It uses Cloudflare for security and Sentry for error reports | United States |
| Google | Google Analytics, only if you accept it | European Union collection servers, then Google’s servers worldwide |
| Google (Google Workspace) | Our business email: stores the emails you send us and delivers our replies | European Union and the United States |

Beyond these, we disclose personal data only when the law requires it, for example to a court or a public authority, or when it’s needed to establish, exercise or defend legal claims.

## Transfers outside the EU

Vercel, Cal.com and Google (for Google Analytics and our Google Workspace email) may process data in the United States. Each of them states that it is certified under the EU-U.S. Data Privacy Framework, which the European Commission found to provide an adequate level of protection (Article 45 GDPR). Where the framework doesn’t cover a transfer, they rely on the European Commission’s Standard Contractual Clauses (Article 46 GDPR). Enquiries received by our automation server stay in the European Union.

## How long we keep it

- **Enquiries and email:** until we have handled them, that is, answered your questions and either agreed next steps or closed the conversation. Then we delete them. If an enquiry becomes a project, it becomes part of the client file, which we keep for as long as we work together and afterwards for as long as Bulgarian accounting and tax law requires for contracts and invoices.
- **Bookings:** until the call has taken place or been cancelled, then we remove them.
- **Analytics:** Google Analytics keeps visitor-level data for 14 months and then deletes it automatically. The analytics cookies on your device expire after 13 months.
- **Hosting logs:** for the short period set by Vercel’s own retention rules.
- **Your cookie choice:** six months, on your own device. Then we ask again.

## Your rights

Under the GDPR you have the right to:

- **access** the personal data we hold about you and get a copy (Article 15);
- **correct** data that is wrong or incomplete (Article 16);
- **erase** your data, for example when we no longer need it (Article 17);
- **restrict** how we use it while a question about it is resolved (Article 18);
- **receive** data you gave us in a common, machine-readable format, or have it sent to someone else (Article 20);
- **object** to processing based on our legitimate interests (Article 21);
- **withdraw your consent** to analytics at any time, with Cookie settings at the bottom of every page.

To use any of these rights, email [${site.email}](mailto:${site.email}). It’s free. We answer within one month; if a request is complex, we may extend that by up to two more months and will tell you why. We may ask you to confirm your identity before we act, so we never give your data to someone else.

## Complaints

If you think we have handled your data wrongly, please tell us first so we can put it right. You also have the right to complain to a data protection authority. In Bulgaria that is the Commission for Personal Data Protection (Комисия за защита на личните данни):

- **Address:** 2 Prof. Tsvetan Lazarov Blvd, 1592 Sofia, Bulgaria
- **Email:** [kzld@cpdp.bg](mailto:kzld@cpdp.bg)
- **Website:** [www.cpdp.bg](https://www.cpdp.bg)

If you live or work in another EU country, you can also complain to the authority there.

## Security

The website is served only over an encrypted connection (HTTPS). The enquiry form posts to our own server, which forwards it to our automation server; the address of that server never reaches your browser. Access to enquiries and bookings is limited to our team. No method of sending or storing data is completely secure, but we take reasonable technical and organisational measures to protect it.

## Systems we build for clients

When we build or run software, automations or AI agents for a client, the client decides what personal data those systems process. The client is the controller and we act as its processor, following its instructions under our contract with them (Article 28 GDPR). Where that data is stored and how long it is kept are agreed with each client, project by project. If your question is about a system we built for another company, please contact that company first.

## Children

Our services are for businesses. The website isn’t aimed at children, and we don’t knowingly collect data from anyone under 16.

## Changes to this policy

When we change how we handle personal data, we update this page and the date at the top. If a change affects a choice you made, such as your cookie choice, we ask you again.`,
};

export default privacy;
