/**
 * The small, client-safe slice of site content: identity, service links and the logo lists.
 * Client components import from here so the full service copy in content.ts stays on the server.
 */
/** Cal.com event path: the inline booking embed and every "book a call" link use it. */
const calLink = "orrvelle/consultation";

export const site = {
  name: "Orryvelle",
  /** Canonical origin for metadata, the sitemap, feeds and llms.txt. */
  url: "https://orryvelle.com",
  email: "hello@orryvelle.com",
  calLink,
  booking: `https://cal.com/${calLink}`,
  /** One-line description reused by metadata, structured data and llms.txt. */
  description:
    "A design and engineering studio building custom software, enterprise solutions (AI agents, automation and integrations) and premium websites.",
  base: { country: "Bulgaria", countryCode: "BG" },
  /** Shown in the footer; structured data and llms.txt say the same. */
  location: "Based in Bulgaria, working with clients worldwide",
  /** Profiles that exist and represent the studio (schema.org sameAs). Add LinkedIn here once it's live. */
  profiles: [] as string[],
  /**
   * The registered company: the data controller in the privacy policy, the footer line and
   * structured data. Bulgarian law asks for name, address and registration number on the site.
   */
  company: {
    name: { en: "Orryvelle Ltd", bg: "Orryvelle ООД" },
    address: {
      street: { en: "10 Mihail Hadjikostov St", bg: "ул. Михаил Хаджикостов 10" },
      city: { en: "Ruse", bg: "Русе" },
      postcode: "7000",
      country: { en: "Bulgaria", bg: "България" },
    },
    /** Company number (ЕИК); shown wherever the company is named once it's filled in. */
    eik: "",
  },
};

/** The registered address on one line, in the given language. */
export const companyAddress = (locale: "en" | "bg") => {
  const { street, city, postcode, country } = site.company.address;
  return `${street[locale]}, ${postcode} ${city[locale]}, ${country[locale]}`;
};

export type ServiceSlug = "custom-software" | "enterprise-solutions" | "websites";
export type IconName =
  | "software"
  | "enterprise"
  | "website"
  | "platform"
  | "portal"
  | "mobile"
  | "api"
  | "data"
  | "security"
  | "agent"
  | "workflow"
  | "integration"
  | "crm"
  | "reporting"
  | "brand"
  | "cms"
  | "performance"
  | "search"
  | "craft"
  | "partner"
  | "clarity"
  | "support";

export type ServiceLink = {
  slug: ServiceSlug;
  number: string;
  name: string;
  /** Two-part title: the second part renders in the muted tone. */
  title: [string, string];
  menuLine: string;
  icon: IconName;
};

export const serviceLinks: ServiceLink[] = [
  {
    slug: "custom-software",
    number: "01",
    name: "Custom Software",
    title: ["Custom", "Software"],
    menuLine: "Platforms, portals and internal tools, built to last.",
    icon: "software",
  },
  {
    slug: "enterprise-solutions",
    number: "02",
    name: "Enterprise Solutions",
    title: ["Enterprise", "Solutions"],
    menuLine: "AI agents, automation and connected operations.",
    icon: "enterprise",
  },
  {
    slug: "websites",
    number: "03",
    name: "Websites",
    title: ["Premium", "Websites"],
    menuLine: "Considered websites that carry your brand.",
    icon: "website",
  },
];

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Vercel",
  "AWS",
  "OpenAI",
  "Anthropic",
  "Stripe",
  "HubSpot",
  "n8n",
];

export const integrations = {
  left: ["Salesforce", "HubSpot", "Stripe", "Shopify", "Xero", "Airtable"],
  right: ["Slack", "Google Workspace", "Microsoft 365", "Notion", "Twilio", "OpenAI"],
};
