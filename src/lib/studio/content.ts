import { bgGeneralFaqs, bgProcessSteps, bgServices, bgValues } from "@/content/bg/studio";
import { serviceLinksIn, type Locale } from "./i18n";
import { overlay } from "./localize";
import { serviceLinks, type IconName, type ServiceLink, type ServiceSlug } from "./site";

export { integrations, serviceLinks, site, stack } from "./site";
export type { IconName, ServiceLink, ServiceSlug } from "./site";

const link = (slug: ServiceSlug) => serviceLinks.find((item) => item.slug === slug)!;

/**
 * Illustrative UI fragment drawn inside a service card (see Fragments.tsx).
 * Content inside fragments is generic product UI, never client data.
 */
export type FragmentName =
  | "software"
  | "members"
  | "vault"
  | "kpi"
  | "api"
  | "mobile"
  | "checks"
  | "agent"
  | "runlog"
  | "pipeline"
  | "sync"
  | "chart"
  | "audit"
  | "editor"
  | "outline"
  | "cms"
  | "speed"
  | "serp"
  | "enquiry";

export type Service = ServiceLink & {
  headline: [string, string];
  description: string;
  /** One plain sentence (≤160 chars) on what the service is: structured data, llms.txt. */
  answer: string;
  /** Search-facing title tag (brand is appended), the plain line inside the H1, and the meta description. */
  seo: { title: string; heading: string; description: string };
  summary: string;
  highlights: string[];
  offerTitle: [string, string];
  offerIntro: string;
  whyTitle: [string, string];
  offer: {
    icon: IconName;
    title: [string, string];
    body: string;
    fragment: FragmentName;
  }[];
  /** UI fragment for the discipline's card in the homepage bento. */
  fragment: FragmentName;
  /** Index into `offer` of the offering featured beside the discipline on the homepage. */
  featured: number;
  why: { icon: IconName; title: string; body: string }[];
  engagement: { name: string; lead: string; body: string; includes: string[] }[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    ...link("custom-software"),
    seo: {
      title: "Custom Software Development for Small Businesses",
      heading: "Custom software development for small and growing businesses",
      description:
        "Custom CRMs, client portals, internal tools and mobile apps, built around how your business actually works. Scoped up front. Book a free 30-minute call.",
    },
    fragment: "software",
    featured: 1,
    headline: ["Software built around", "how you actually work."],
    description:
      "Bespoke platforms, client portals, and internal tools, designed with care and engineered to hold up under real use.",
    answer:
      "Custom software for businesses that have outgrown spreadsheets and off-the-shelf tools: client portals, internal tools, operations platforms and mobile apps.",
    summary:
      "Spreadsheets, copy and paste, and tools that almost fit. Every workaround costs your team hours each week. We build the software that actually fits: one place for your jobs, clients and team, designed around the way you work.",
    highlights: [
      "Web platforms & SaaS products",
      "Client & partner portals",
      "Internal tools & dashboards",
      "APIs & mobile companions",
    ],
    offerTitle: ["Designed for the product,", "not just the launch."],
    whyTitle: ["Why teams trust us", "with their product."],
    offerIntro:
      "From the first workshop to launch day, one team owns the product thinking, the interface and the engineering, so nothing gets lost between people.",
    offer: [
      {
        icon: "platform",
        title: ["Product", "Platforms"],
        body: "Multi-user web applications with roles, billing, and the workflows your customers rely on every day.",
        fragment: "members",
      },
      {
        icon: "portal",
        title: ["Client", "Portals"],
        body: "A private, branded space where clients see their information, documents, and progress without chasing your team.",
        fragment: "vault",
      },
      {
        icon: "reporting",
        title: ["Internal", "Tools"],
        body: "Dashboards and operational tools that replace spreadsheets and give your team one reliable source of truth.",
        fragment: "kpi",
      },
      {
        icon: "api",
        title: ["APIs &", "Integrations"],
        body: "Clean, documented interfaces that connect your product to payment, identity, data, and third-party services.",
        fragment: "api",
      },
      {
        icon: "mobile",
        title: ["Mobile", "Companions"],
        body: "Responsive and installable experiences for the people who use your software away from a desk.",
        fragment: "mobile",
      },
      {
        icon: "security",
        title: ["Built To", "Last"],
        body: "Typed code, automated checks, sensible architecture, and documentation that makes future work straightforward.",
        fragment: "checks",
      },
    ],
    why: [
      {
        icon: "craft",
        title: "Designed and engineered together",
        body: "The people designing your interface are in the same conversation as the people building it. Nothing is lost in translation.",
      },
      {
        icon: "clarity",
        title: "A scoped first release",
        body: "We define a focused version one with clear acceptance criteria, then plan what comes next once it is in real hands.",
      },
      {
        icon: "support",
        title: "Handover you can build on",
        body: "Repository, documentation, and environments are organised so your team, or ours, can keep improving it.",
      },
    ],
    engagement: [
      {
        name: "Discovery",
        lead: "Define it",
        body: "Workshops, requirements, and a technical plan so the build starts with shared certainty.",
        includes: [
          "Stakeholder workshops",
          "User journeys & requirements",
          "Architecture outline",
          "Scoped proposal & timeline",
        ],
      },
      {
        name: "Build",
        lead: "Ship it",
        body: "Design and engineering in reviewed milestones, with a working product to test along the way.",
        includes: [
          "Interface design system",
          "Full-stack development",
          "Milestone reviews",
          "Testing & launch",
        ],
      },
      {
        name: "Partnership",
        lead: "Grow it",
        body: "Ongoing improvement for products that keep evolving after launch. Scope agreed separately.",
        includes: [
          "Roadmap planning",
          "Feature development",
          "Monitoring & maintenance",
          "Priority support",
        ],
      },
    ],
    faqs: [
      {
        question: "Should we build custom software or use an off-the-shelf tool?",
        answer:
          "Use off-the-shelf software when your process is standard: accounting, payroll, email and basic CRM are solved problems. Build custom when your process is the business, when tools force workarounds, data lives in five places or the way you operate is your advantage. In the consultation we’ll tell you honestly which side you’re on; sometimes the answer is to configure what you already have.",
      },
      {
        question: "Is custom software worth it for a small business?",
        answer:
          "It’s worth it when one core process runs your business and existing tools handle it badly. Our platform for Nantucket Events Company, for example, replaced scattered schedules with one season calendar, a job card for every event and a brief for each crew member. If a mature product already fits, buying it is cheaper, and we’ll say so.",
      },
      {
        question: "How long does it take to build custom software?",
        answer:
          "It depends on the number of screens, user roles and integrations. We scope a focused first release with clear acceptance criteria and deliver it in milestones you can use and review, rather than one long build. Your proposal sets out a dated plan.",
      },
      {
        question: "What affects the cost of custom software?",
        answer:
          "The main drivers are the number of screens and user roles, integrations with other systems, data migration, the platforms it runs on (web, tablet, phone), any AI features and the ownership model you choose. A tightly scoped first release costs far less than building everything at once, which is why we start there. Your proposal prices the agreed scope, and anything beyond it is quoted separately.",
      },
      {
        question: "Who owns the source code?",
        answer:
          "That depends on the model you choose. With build and hand over, or a managed retainer, you get the right to use the software and to hire any developer to change it, but not to resell it. With a full IP buyout the software is entirely yours, including the right to sell it. A buyout costs more and can be combined with a retainer.",
      },
      {
        question: "Can you take over or rebuild software someone else built?",
        answer:
          "Yes. We start with a technical review of the current system, then recommend whether to extend, refactor or rebuild it, with the trade-offs of each option.",
      },
      {
        question: "Do you build mobile apps?",
        answer:
          "Yes, where your team or customers need them. Five-Star Priorities, for example, is an iPhone app that lays out each crew’s day as a route of stops, with every job approved by the owner. Our web platforms also work on tablets and phones for staff in the field.",
      },
      {
        question: "What technology do you build with?",
        answer:
          "We choose the stack for the problem: typically TypeScript, React and Next.js on the web, PostgreSQL or Supabase for data, and managed cloud hosting. We build with AI-powered tools, and our developers review and test everything before it ships. Your proposal names the technology and explains why it fits.",
      },
      {
        question: "Will we need ongoing maintenance?",
        answer:
          "Plan for some: software needs hosting, security updates and small improvements as your business changes. After the 30-day oversight period you can handle that yourselves, or we take care of it on a monthly retainer covering hosting, updates, adjustments and a monthly performance report. Running costs such as hosting and third-party services are covered by you in either case.",
      },
    ],
  },
  {
    ...link("enterprise-solutions"),
    seo: {
      title: "AI Receptionists, AI Agents & Business Automation",
      heading: "AI receptionists, AI agents and business automation",
      description:
        "AI receptionists that answer and book calls 24/7, plus n8n and CRM automation that removes manual work. Built by hand, scoped up front. Book a free call.",
    },
    fragment: "agent",
    featured: 1,
    headline: ["An operation that", "runs as one system."],
    description:
      "AI agents, workflow automation, and integrations that connect your teams, tools, and data into one dependable operation.",
    answer:
      "AI agents and automation for businesses: AI voice receptionists that answer and book calls, CRM follow-up sequences, and integrations between your tools.",
    summary:
      "Missed calls, leads that go cold, hours of copying data between tools. We build AI receptionists and automations that handle the repetitive work around the clock, so you stop losing customers and your team gets its time back.",
    highlights: [
      "AI agents & assistants",
      "Workflow automation",
      "CRM & revenue operations",
      "Systems integration & reporting",
    ],
    offerTitle: ["Built for the whole", "operation."],
    whyTitle: ["Automation with", "judgement built in."],
    offerIntro:
      "We work across the whole operation (sales, service, and back office), so improvements in one area don’t create friction in another.",
    offer: [
      {
        icon: "agent",
        title: ["AI", "Agents"],
        body: "Voice and chat agents that answer, qualify, and route with approved knowledge and clear escalation to your team.",
        fragment: "agent",
      },
      {
        icon: "workflow",
        title: ["Workflow", "Automation"],
        body: "Multi-step processes that run reliably in the background, with visible status and failure handling built in.",
        fragment: "runlog",
      },
      {
        icon: "crm",
        title: ["Revenue", "Operations"],
        body: "Lead capture, routing, follow-up, and booking connected to your CRM so no opportunity depends on memory.",
        fragment: "pipeline",
      },
      {
        icon: "integration",
        title: ["Systems", "Integration"],
        body: "Your platforms exchanging the right data at the right time, instead of people copying it between tabs.",
        fragment: "sync",
      },
      {
        icon: "reporting",
        title: ["Reporting &", "Visibility"],
        body: "Live dashboards that give leadership an accurate picture without anyone building the same report twice.",
        fragment: "chart",
      },
      {
        icon: "security",
        title: ["Governance &", "Control"],
        body: "Permissions, audit trails, and human checkpoints designed in from the start, not added as an afterthought.",
        fragment: "audit",
      },
    ],
    why: [
      {
        icon: "clarity",
        title: "Process before technology",
        body: "We start with how the work actually happens, so the system reflects your operation rather than a vendor’s template.",
      },
      {
        icon: "integration",
        title: "Your existing stack, connected",
        body: "We integrate the tools you already rely on and recommend changes only where they clearly earn their place.",
      },
      {
        icon: "partner",
        title: "People stay in control",
        body: "Every agent and automation has defined boundaries, escalation routes, and an owner on your team.",
      },
    ],
    engagement: [
      {
        name: "Operations Audit",
        lead: "Map it",
        body: "A structured review of workflows, systems, and data to find where automation will make the biggest difference.",
        includes: [
          "Workflow mapping",
          "Systems & data review",
          "Opportunity assessment",
          "Prioritised roadmap",
        ],
      },
      {
        name: "Implementation",
        lead: "Build it",
        body: "Agents, automations, and integrations delivered in stages and tested against real scenarios.",
        includes: [
          "Solution design",
          "Agent & workflow build",
          "Integration & testing",
          "Team training",
        ],
      },
      {
        name: "Managed Partnership",
        lead: "Run it",
        body: "Monitoring, tuning, and continuous improvement as your operation changes. Scope agreed separately.",
        includes: [
          "Monitoring & alerts",
          "Performance reviews",
          "New workflow delivery",
          "Priority support",
        ],
      },
    ],
    faqs: [
      {
        question: "What’s the difference between an AI agent and a chatbot?",
        answer:
          "A chatbot answers questions; an AI agent completes tasks. Our AI receptionist doesn’t just tell a caller your opening hours: it checks your calendar, books, reschedules or cancels the appointment and logs the call. Agents connect to your real systems and follow rules you approve.",
      },
      {
        question: "What can be automated in my business?",
        answer:
          "Anything repetitive that follows rules: answering and booking calls, confirming appointments, chasing no-shows, following up leads, moving data between your CRM, calendar and spreadsheets, and producing reports. Our projects include an AI voice receptionist, an AI cold caller that researches each lead before dialling, and email and SMS sequences around a CRM. In the consultation we pinpoint which tasks cost you the most time.",
      },
      {
        question: "What is an AI receptionist, and does it sound like a robot?",
        answer:
          "An AI receptionist is a voice agent that answers your phone around the clock, handles common questions and books appointments straight into your calendar. Modern voices, such as the ElevenLabs voices we use, sound natural in everyday calls. When a caller is upset or a request is unusual, the agent hands over to a person.",
      },
      {
        question: "Can an AI receptionist book into my calendar and transfer calls to a person?",
        answer:
          "Yes. Ours checks real availability, books, reschedules or cancels appointments and sends confirmations. When a call is outside its scope, it transfers to a person or takes a detailed message. An outbound agent can also call every new booking to confirm it.",
      },
      {
        question: "Will callers know they’re speaking to an AI?",
        answer:
          "In the EU, yes: our voice agents tell callers they’re speaking to an AI assistant, as the law requires. Where disclosure isn’t legally required, it’s your decision, and we walk you through the pros and cons of each choice before launch.",
      },
      {
        question: "Is our data safe, and are you GDPR compliant?",
        answer:
          "Yes. We follow GDPR in everything we build. Agents only access the systems and data their job requires, and personal data is handled lawfully, kept to a minimum and secured.",
      },
      {
        question: "Will AI replace my staff?",
        answer:
          "It replaces the repetitive parts of their day, not the people. An AI receptionist catches the calls nobody can answer and handles routine bookings, so your team spends its time on customers and work that needs judgement. Every system we build has a person in control and a clear handover point.",
      },
      {
        question: "What happens when an automation fails?",
        answer:
          "Failure handling is part of the design: retries, alerts to a named person and a manual fallback, so nothing is silently lost. We test those failure paths before launch, not just the happy path.",
      },
      {
        question: "How do you keep AI agents accurate and on-brand?",
        answer:
          "Agents answer from knowledge you approve, work within defined boundaries and hand off to a person when a request falls outside them. We test them against realistic scenarios, including awkward callers, before launch and review real conversations afterwards.",
      },
      {
        question: "Are your automations built by hand or generated with AI?",
        answer:
          "By hand. Every workflow is designed and built node by node in n8n by a person who understands your process, then tested against real scenarios, including the ways it can fail. AI appears inside the systems where it does a job, such as understanding a caller or writing a script for one lead, but never as a shortcut in how we build them.",
      },
      {
        question: "Who hosts and owns the automations?",
        answer:
          "You choose. With build and hand over, we deliver the system and help you set up your own n8n at no extra cost; you then run it yourselves. On a managed retainer it runs in our accounts, unless you ask otherwise, and you can request access at any time. With a full IP buyout you own it outright and it runs in your accounts. In every case you can hire a developer to change it, but only a buyout lets you resell it.",
      },
      {
        question: "What are the running costs of an AI agent?",
        answer:
          "Besides the build, an AI system has running costs, such as the automation platform, AI usage, phone minutes and voice. You cover these directly, and they depend on volume. On a managed retainer, hosting, maintenance, updates and a monthly performance report are added on top.",
      },
      {
        question: "Does it work with my CRM?",
        answer:
          "Most likely. We’ve built around GoHighLevel and Supabase, and we connect to common CRMs, calendars, email and SMS tools through their APIs. If your tool has an API, we can usually connect it, and we check this in the consultation.",
      },
      {
        question: "What languages can a voice agent speak?",
        answer:
          "Most major languages. A voice agent needs both speech recognition and a natural voice in your language, and the leading providers now cover dozens, including English, Bulgarian, German, French, Spanish and Italian. Quality still varies between languages, so we test in yours before launch.",
      },
    ],
  },
  {
    ...link("websites"),
    seo: {
      title: "Custom Website Design & Shopify Development",
      heading: "Custom website design and Shopify development",
      description:
        "Custom websites and Shopify stores, designed from scratch, fast and easy to find on Google. Fully built in as little as 48 hours. Book a free call.",
    },
    fragment: "editor",
    featured: 3,
    headline: ["A website that", "earns its first impression."],
    description:
      "Custom-designed, fast, and meticulously built websites for brands that want their online presence to match the quality of their work.",
    answer:
      "Premium websites and Shopify stores designed from scratch: fast, search-ready and easy to update, built to win customers rather than just exist.",
    summary:
      "Customers judge your business by your website before they ever call. We design it from scratch around your business and your buyers, make it fast and easy to find on Google, and build it to turn visitors into enquiries.",
    highlights: [
      "Custom design from scratch",
      "Content & page strategy",
      "Headless CMS & e-commerce",
      "Performance & search foundations",
    ],
    offerTitle: ["Every page", "earns its place."],
    whyTitle: ["Websites with", "purpose and polish."],
    offerIntro:
      "No templates. Every page is planned around what your visitors need to see before they are ready to get in touch.",
    offer: [
      {
        icon: "brand",
        title: ["Custom", "Design"],
        body: "A distinctive visual direction built around your brand, your audience, and the impression you need to make.",
        fragment: "editor",
      },
      {
        icon: "clarity",
        title: ["Content", "Strategy"],
        body: "Page structure and messaging planned around your buyers’ questions, so every section has a job to do.",
        fragment: "outline",
      },
      {
        icon: "cms",
        title: ["Editable", "Content"],
        body: "A content management setup your team can use confidently, without risking the design.",
        fragment: "cms",
      },
      {
        icon: "performance",
        title: ["Built For", "Speed"],
        body: "Modern engineering, optimised media, and careful loading behaviour on every device.",
        fragment: "speed",
      },
      {
        icon: "search",
        title: ["Search", "Foundations"],
        body: "Semantic structure, metadata, and technical SEO fundamentals in place from launch day.",
        fragment: "serp",
      },
      {
        icon: "integration",
        title: ["Connected", "Journeys"],
        body: "Forms, booking, analytics, and CRM connected so every enquiry arrives with context.",
        fragment: "enquiry",
      },
    ],
    why: [
      {
        icon: "craft",
        title: "Designed from a blank page",
        body: "Your website is created for your brand, not adapted from a theme that thousands of others also use.",
      },
      {
        icon: "performance",
        title: "Engineered, not assembled",
        body: "Hand-built components and a clean codebase mean the site stays fast and flexible as it grows.",
      },
      {
        icon: "support",
        title: "Launch is not the finish line",
        body: "You receive a practical handover, with ongoing care available when you want it.",
      },
    ],
    engagement: [
      {
        name: "Essentials",
        lead: "Launch",
        body: "A focused, custom-designed site for brands that need a strong presence quickly.",
        includes: [
          "Custom visual direction",
          "Core page set",
          "Responsive build",
          "Search & analytics setup",
        ],
      },
      {
        name: "Signature",
        lead: "Elevate",
        body: "A complete brand website with deeper content strategy, richer interactions, and editable content.",
        includes: [
          "Content & page strategy",
          "Extended page set",
          "CMS integration",
          "Motion & interaction design",
        ],
      },
      {
        name: "Bespoke",
        lead: "Let’s talk",
        body: "For complex, multi-audience, or commerce websites with integrations and custom functionality.",
        includes: [
          "Dedicated discovery phase",
          "Custom functionality",
          "E-commerce & integrations",
          "Ongoing partnership",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you use templates or page builders?",
        answer:
          "No. Every website is designed from scratch for the brand and built in code, which makes it faster and more distinctive than a template. For online stores we build on Shopify, so you get its payments, inventory and checkout with a design that’s entirely yours.",
      },
      {
        question: "Should my website be custom-built, WordPress, Webflow or Shopify?",
        answer:
          "It depends on the job. If you sell products, Shopify is usually right, and our Magnolia Blooms store runs on it. For a service business that wants a fast, distinctive site that wins enquiries, we design and build it custom. We recommend the platform in the consultation and explain why.",
      },
      {
        question: "How long does it take to build a website?",
        answer:
          "Fast. When you send your content and details up front and stay responsive, we deliver a fully built website, with its domain set up, in around 48 hours. Larger sites, online stores and complex integrations take longer and are scheduled in your proposal.",
      },
      {
        question: "Who owns the website, domain and hosting?",
        answer:
          "You do, outright. On payment you receive full rights to the website, including its design and code, and the domain and hosting are yours. If we manage them for you on a retainer, ownership doesn’t change.",
      },
      {
        question: "Will we be able to update the website ourselves?",
        answer:
          "Yes. We agree what your team needs to edit and set up content management that lets you update pages, services and images safely, without touching code.",
      },
      {
        question: "Do you write the content?",
        answer:
          "Yes. We write the initial copy for your website, based on what we learn about your business and your buyers. On a retainer we also keep optimising it over time.",
      },
      {
        question: "Will a redesign hurt our Google rankings?",
        answer:
          "Not if it’s done properly. We map every existing page to its new address with permanent redirects, keep the content that already ranks and check indexing after launch. A brief dip while Google re-crawls is normal; a lasting drop usually means broken redirects, which is exactly what we prevent.",
      },
      {
        question: "Is SEO included, and will the site show up in Google and AI assistants?",
        answer:
          "Every site we build is search-ready: fast pages, clean structure, metadata, structured data and a sitemap, so Google and AI assistants like ChatGPT can understand and recommend it. Ongoing SEO campaigns aren’t a standard service, though we can discuss them for the right project.",
      },
      {
        question: "Can you redesign our existing website?",
        answer:
          "Yes. We review your current content, performance and what already works, then agree what to keep, improve and replace.",
      },
      {
        question: "Can you build an online store?",
        answer:
          "Yes, on Shopify. Magnolia Blooms, a boutique florist in Bendigo, sells fresh and preserved flowers and gifts online through a storefront we designed and built, with weddings and workshops given their own place.",
      },
    ],
  },
];

/* Bulgarian text is overlaid on the English entries (src/content/bg/studio.ts). */
const bgLinks = serviceLinksIn("bg");
const servicesBg = services.map((service) =>
  overlay({ ...service, ...bgLinks.find((link) => link.slug === service.slug)! }, bgServices[service.slug]),
);

export const servicesIn = (locale: Locale) => (locale === "bg" ? servicesBg : services);
export const serviceBySlug = (slug: string, locale: Locale = "en") =>
  servicesIn(locale).find((service) => service.slug === slug);

export const processSteps = [
  {
    number: "01",
    icon: "clarity" as IconName,
    title: "Discovery & Scope",
    titleParts: ["Discovery", "& Scope"] as [string, string],
    text: "A free 30-minute call about your goals, then a short discovery to define what’s needed. You get a written proposal with scope, timeline and price before you commit to anything.",
  },
  {
    number: "02",
    icon: "craft" as IconName,
    title: "Design & Build",
    titleParts: ["Design", "& Build"] as [string, string],
    text: "We design first, agree the direction with you, then build in milestones. You review working progress, not just status updates.",
  },
  {
    number: "03",
    icon: "support" as IconName,
    title: "Launch & Handover",
    titleParts: ["Launch", "& Handover"] as [string, string],
    text: "We test thoroughly, launch carefully and stay on hand for 30 days after launch. Then you run it yourself, or we look after it on a monthly retainer.",
  },
];

export const valuesIn = (locale: Locale) => (locale === "bg" ? valuesBg : values);
export const processStepsIn = (locale: Locale) => (locale === "bg" ? processStepsBg : processSteps);
export const generalFaqsIn = (locale: Locale) => (locale === "bg" ? generalFaqsBg : generalFaqs);

export const values = [
  {
    icon: "craft" as IconName,
    title: "Craft over templates",
    body: "Everything we deliver is designed and built for the business it serves. We would rather do fewer projects properly than many projects quickly.",
  },
  {
    icon: "clarity" as IconName,
    title: "Clarity at every step",
    body: "You always know what we are building, why, and what happens next. Scope, decisions, and trade-offs are written down, not implied.",
  },
  {
    icon: "partner" as IconName,
    title: "Built for the long run",
    body: "We make choices your future team will thank us for: readable code, sensible architecture, and documentation that outlasts the project.",
  },
];

export const generalFaqs = [
  {
    question: "What does Orryvelle do?",
    answer:
      "Orryvelle is a design and engineering studio with three disciplines: custom software (portals, internal tools and apps), enterprise solutions (AI agents, voice receptionists, automation and integrations) and premium websites. Most clients come to us with a problem, such as missed calls, hours lost to admin or a website that doesn’t sell, and we design and build what fixes it.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Every system is different, so there’s no fixed price list. After a free 30-minute consultation you receive a written proposal that sets out exactly what the scope includes, what it doesn’t, and the price for it. Anything added outside that scope is quoted and billed separately, so there are no surprises.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on the scope. Websites are the fastest: when you provide your content and details up front and stay responsive, a fully built website with its domain can be live in around 48 hours. Software and automations are scoped individually, and your proposal sets out a dated plan with milestones.",
  },
  {
    question: "What happens on the free consultation?",
    answer:
      "It’s a 30-minute call about your business, what’s slowing it down and what you want to achieve. We ask questions, tell you honestly whether we’re the right fit and outline how we’d approach it. If it makes sense to continue, a written proposal follows. There’s no obligation.",
  },
  {
    question: "Who owns the work when the project is finished?",
    answer:
      "It depends on the service. Websites are yours outright: on payment you get full rights to the design, code, domain and hosting, even if we manage them for you on a retainer. Software and automations come in three models: build and hand over, managed on a monthly retainer, or a full IP buyout. In every model you can use and adapt the system; only a buyout also lets you resell it.",
  },
  {
    question: "What kinds of businesses do you work with?",
    answer:
      "Service businesses and growing companies that want something built properly, from event-rental and property-services companies to advisory firms, salons, retailers and trades. Size matters less than the problem: if manual work, missed leads or an underperforming website is costing you, we’re a fit.",
  },
  {
    question: "Where are you based, and do you work with clients abroad?",
    answer:
      "We’re based in Bulgaria and work with clients worldwide, entirely remotely. Recent projects include an event-rental company in Nantucket (USA), a florist in Bendigo (Australia) and businesses in Sofia and Varna. Calls are scheduled around your time zone.",
  },
  {
    question: "Can you work with our existing team and tools?",
    answer:
      "Yes. We start by reviewing what you already use, such as your CRM, calendar, website platform and spreadsheets, and build around it where it works. If we recommend replacing something, we explain why and what it costs before the build.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every delivery includes 30 days of oversight in production, so we can make sure everything runs exactly as intended. After that you can run it yourselves, or move to a monthly retainer where we handle hosting, maintenance, updates and adjustments, with a performance report every month.",
  },
  {
    question: "Do you use AI to build?",
    answer:
      "It depends on the work. Our automations and AI agents are designed and built entirely by hand in n8n. For software and websites we use AI-powered tools to move faster, and our developers design, review and test everything that ships, so every decision that matters has human judgement behind it.",
  },
];

const processStepsBg = overlay(processSteps, bgProcessSteps);
const valuesBg = overlay(values, bgValues);
const generalFaqsBg = overlay(generalFaqs, bgGeneralFaqs);
