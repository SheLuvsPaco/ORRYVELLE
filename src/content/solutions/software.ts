import type { Solution } from "@/lib/studio/solutions";

const ownership =
  "You choose: build and hand over, a managed monthly retainer, or a full IP buyout. In every model you can use the software and hire any developer to change it; only a buyout also lets you resell it.";

export const softwareSolutions: Solution[] = [
  {
    slug: "custom-crm-development",
    kind: "service",
    service: "custom-software",
    name: "Custom CRM Development",
    seo: {
      title: "Custom CRM Development for Small Businesses",
      description:
        "A CRM built around how your business works: clients, jobs, bookings and teams in one place, with the automations you need. Book a free 30-minute call.",
    },
    heading: "Custom CRM development for small businesses",
    headline: ["A CRM shaped like", "your business."],
    lead: "Off-the-shelf CRMs are built for a typical sales team. If your work revolves around jobs, bookings, projects or field crews, a custom CRM keeps every client, job and conversation in one place, organised the way you actually work.",
    answer:
      "Custom CRM development: client, job and pipeline management built around your process, with the integrations and automations your team needs.",
    pains: [
      { title: "Paying for what you don’t use", body: "Big CRMs charge per seat for features you never touch, while missing the ones your business actually needs." },
      { title: "Information in five places", body: "Client details live in the CRM, jobs in a spreadsheet and updates in WhatsApp, and nobody has the full picture." },
      { title: "Workarounds become the process", body: "The team bends how it works to fit the software, and every new hire learns the workarounds." },
    ],
    features: [
      { icon: "crm", title: "Clients, jobs and pipeline, your way", body: "Records, stages and fields that match how you sell and deliver, not a generic template." },
      { icon: "security", title: "Roles and permissions", body: "Owners, managers and crews each see what they need, and nothing they shouldn’t." },
      { icon: "workflow", title: "Automations built in", body: "Reminders, follow-ups and status changes happen on their own, without anyone remembering to do them." },
      { icon: "integration", title: "Connected to your tools", body: "Email, calendars, accounting and payments linked through their APIs, so data is entered once." },
      { icon: "reporting", title: "Dashboards that answer questions", body: "See the numbers that matter to your business at a glance, without exporting to a spreadsheet." },
      { icon: "mobile", title: "Works on every device", body: "Desk tools on desktop, quick updates on a phone for anyone in the field." },
    ],
    steps: [
      { title: "Free consultation", body: "We learn how clients, jobs and information move through your business today, and where it breaks." },
      { title: "Scoped first release", body: "We design and build a focused first version with clear acceptance criteria, delivered in milestones you can use and review." },
      { title: "Live, with 30 days of oversight", body: "We launch, move your data across, and stay close for 30 days in production to make sure it works exactly as intended." },
    ],
    proof: [
      { slug: "nantucket-events", note: "An operations system for an event-rental company: one season calendar across branches and a job card for every event, with crew, timeline, vehicles and a pack list drawn from live inventory." },
      { slug: "five-star-priorities", note: "An iPhone app where the owner plans each team’s day as a route of jobs and approves every job before it goes out." },
    ],
    faqs: [
      { question: "Should we build a custom CRM or use HubSpot or GoHighLevel?", answer: "If your process is a standard sales pipeline, an off-the-shelf CRM is usually the better buy, and we can automate it for you. A custom CRM pays off when your work revolves around jobs, bookings or crews that standard tools handle badly." },
      { question: "Can you move our existing data across?", answer: "Yes. Migrating clients, jobs and history from your current tools and spreadsheets is planned as part of the scope." },
      { question: "How long does it take to build a custom CRM?", answer: "It depends on scope. We start with a focused first release delivered in milestones, and your proposal sets out a dated plan." },
      { question: "Who owns the CRM we pay for?", answer: ownership },
      { question: "Can it grow with us?", answer: "Yes. We build a scoped first release, then plan later phases once it’s in real use, so the system grows with the business instead of being rebuilt." },
    ],
  },
  {
    slug: "client-portal-development",
    kind: "service",
    service: "custom-software",
    name: "Client Portal Development",
    seo: {
      title: "Client Portal Development for Service Businesses",
      description:
        "A secure client portal with documents, progress, invoices and messages in one place, so clients stop chasing updates. Book a free 30-minute call.",
    },
    heading: "Client portal development",
    headline: ["One place for clients", "to find everything."],
    lead: "Clients emailing for updates, files lost in inboxes, the same questions every week. A client portal gives every customer a secure login with their documents, progress, invoices and messages, so they stop chasing and you stop answering.",
    answer:
      "Client portal development: secure, branded portals where clients see their documents, progress, invoices and messages in one place.",
    pains: [
      { title: "Status updates by email", body: "Your team spends hours answering “where are we with this?” instead of doing the work." },
      { title: "Files scattered everywhere", body: "Contracts, briefs and deliverables live across email threads and shared drives, and the latest version is anyone’s guess." },
      { title: "A clunky client experience", body: "Premium service deserves better than a chain of attachments and a shared spreadsheet." },
    ],
    features: [
      { icon: "portal", title: "Secure client logins", body: "Each client sees only their own projects, documents and history." },
      { icon: "clarity", title: "Progress at a glance", body: "Clear stages and status for every job or project, updated as work moves forward." },
      { icon: "data", title: "Documents in one place", body: "Contracts, briefs, files and deliverables, organised and always current." },
      { icon: "integration", title: "Invoices and payments", body: "Connected to your billing tools, so clients can see and pay what they owe." },
      { icon: "brand", title: "Your brand, not ours", body: "Designed to match your business, so the portal feels like part of your service." },
      { icon: "workflow", title: "Notifications that matter", body: "Clients hear about changes automatically, without your team writing every update." },
    ],
    steps: [
      { title: "Free consultation", body: "We look at what clients ask for most and what they need to see, sign and pay." },
      { title: "Scoped first release", body: "We design the portal around your clients and build a focused first version, delivered in milestones you review." },
      { title: "Live, with 30 days of oversight", body: "We launch to your clients and stay close for 30 days in production, refining anything that needs it." },
    ],
    proof: [
      { slug: "nantucket-events", note: "Role-based access in practice: owners and leads get dense desk tools, while each crew member gets a phone-first brief with only what they need on site." },
    ],
    faqs: [
      { question: "What does a client portal include?", answer: "Typically secure logins, project or job status, documents, messages and invoices. We scope exactly what your clients need in the consultation, so you don’t pay for features they won’t use." },
      { question: "Can it connect to the tools we already use?", answer: "Yes. Portals usually connect to your CRM, file storage and billing tools through their APIs, so information is entered once." },
      { question: "Is a client portal secure?", answer: "Security is designed in from the start: each client sees only their own information, access is controlled by role, and personal data is handled under GDPR." },
      { question: "Who owns the portal?", answer: ownership },
      { question: "How does pricing work?", answer: "There’s no fixed price list. After a free consultation you get a written proposal with the scope, what it includes and the price, before any work begins." },
    ],
  },
  {
    slug: "internal-tools",
    kind: "service",
    service: "custom-software",
    name: "Internal Tools & Operations Software",
    seo: {
      title: "Internal Tools & Operations Software, Built to Fit",
      description:
        "Custom internal tools and operations software that replace spreadsheets and WhatsApp threads with one system your team actually uses.",
    },
    heading: "Internal tools and operations software",
    headline: ["Run the business,", "not the spreadsheets."],
    lead: "Schedules in WhatsApp, stock in a spreadsheet, job details in someone’s head. We build internal tools that put your operations in one place, with desk tools for the people planning and simple phone views for the people doing the work.",
    answer:
      "Internal tools and operations software: custom systems for scheduling, jobs, inventory and teams that replace spreadsheets and message threads.",
    pains: [
      { title: "Operations run on messages", body: "Bookings, changes and instructions arrive by WhatsApp and email, and something always gets missed." },
      { title: "Spreadsheets that only one person understands", body: "When the person who built the sheet is away, the business slows down." },
      { title: "Crews without the full picture", body: "People in the field call the office for details that should already be on their phone." },
    ],
    features: [
      { icon: "platform", title: "One calendar for everything", body: "Every job, booking and team on one schedule, filterable by branch, crew or status." },
      { icon: "data", title: "Inventory and resources", body: "Stock, equipment and vehicles tracked live, so plans are checked against what’s actually available." },
      { icon: "mobile", title: "Phone-first briefs for the field", body: "Crews get the day’s timeline, notes and checklists on their phone, nothing more." },
      { icon: "agent", title: "AI that reads the mess", body: "Paste a message or import a PDF, and AI turns it into structured jobs, checked against what’s already booked." },
      { icon: "security", title: "Roles and access", body: "Owners, leads and crews each see the tools and information meant for them." },
    ],
    steps: [
      { title: "Free consultation", body: "We learn how a job moves from the first message to the finished work, and where time is lost." },
      { title: "Scoped first release", body: "We design for each audience in your team and build a focused first version, delivered in milestones." },
      { title: "Live, with 30 days of oversight", body: "We roll it out with your team and stay close for 30 days in production, refining it as real work flows through." },
    ],
    proof: [
      { slug: "nantucket-events", note: "AI Quick Add turns a pasted WhatsApp message into job cards, PDF picklists are matched to live inventory, and crews tick off a live pack list as they load." },
      { slug: "five-star-priorities", note: "Each two-person team taps through an ordered route of jobs with photos, access notes and comments, even without a signal on site." },
    ],
    faqs: [
      { question: "What are internal tools?", answer: "Software your own team uses to run the business: scheduling, job management, inventory, dashboards and approvals. They replace the spreadsheets, message threads and workarounds that slow a growing business down." },
      { question: "Can it work for people in the field?", answer: "Yes. We design separate views for different roles, so planners get full desk tools and people on site get simple phone-first screens." },
      { question: "Can it import what we already have?", answer: "Usually, yes. We’ve built AI import from pasted messages and PDF picklists, and existing spreadsheets can be migrated as part of the scope." },
      { question: "Who owns the software?", answer: ownership },
      { question: "How long does it take?", answer: "It depends on scope. We deliver a focused first release in milestones you can use and review, and your proposal sets out a dated plan." },
    ],
  },
  {
    slug: "mobile-app-development",
    kind: "service",
    service: "custom-software",
    name: "Mobile App Development",
    seo: {
      title: "Mobile App Development for Small Businesses",
      description:
        "Custom iPhone and mobile apps for teams and customers, designed around real work and built to feel native. Book a free 30-minute consultation.",
    },
    heading: "Mobile app development for small businesses",
    headline: ["An app your team", "actually opens."],
    lead: "Your team works from their phones, but the tools they use were built for a desk. We design and build mobile apps around the jobs people do on the move, so the plan, the details and the next step are always in their pocket.",
    answer:
      "Mobile app development for small businesses: custom iPhone and mobile apps for teams and customers, built around real work and native conventions.",
    pains: [
      { title: "Desk software in the field", body: "Crews squint at desktop screens on a phone, or call the office for details instead." },
      { title: "Plans that change by phone call", body: "When the day’s plan lives in calls and texts, changes get missed and jobs get repeated." },
      { title: "No signal, no information", body: "On site, a weak connection shouldn’t mean the team can’t see their jobs." },
    ],
    features: [
      { icon: "mobile", title: "Built phone-first", body: "Designed around one-thumb use and native iOS conventions, so the app feels familiar from day one." },
      { icon: "workflow", title: "The day as a clear route", body: "Ordered jobs, stop by stop, with everything needed for each one." },
      { icon: "security", title: "Approvals and control", body: "Owners and managers approve work before it goes out to the team." },
      { icon: "data", title: "Works with a weak signal", body: "Plans and notes stored on the device, so the team has them on site." },
      { icon: "integration", title: "Connected to the office", body: "Calendars, directories and job data shared between the app and your desk tools." },
    ],
    steps: [
      { title: "Free consultation", body: "We learn who uses the app, where and what they need to do in a few taps." },
      { title: "Scoped first release", body: "We design screens for real situations and build a focused first version, delivered in milestones you test on your phone." },
      { title: "Live, with 30 days of oversight", body: "We roll the app out to your team and stay close for 30 days, refining it as they use it." },
    ],
    proof: [
      { slug: "five-star-priorities", note: "An iPhone app for a property-services team: team routes, job stories with photos and access notes, owner approval, day, week and month calendars and a tenant directory." },
      { slug: "nantucket-events", note: "A phone-first crew brief alongside the desk platform: read-this-first notes, the day’s timeline, who drives what and a live pack list." },
    ],
    faqs: [
      { question: "Do you build iPhone apps?", answer: "Yes. Five-Star Priorities is an iPhone app we designed and built for a property-services team, following native iOS conventions." },
      { question: "Do we need an app, or would a mobile website do?", answer: "If people only need to look things up, a well-built mobile site or web app is often enough and cheaper. A native app pays off when your team uses it all day, needs it to work offline or relies on phone features." },
      { question: "Can the app work offline?", answer: "Yes, where it matters. We store the data the team needs on the device, so routes, jobs and notes are there even with a weak signal." },
      { question: "Who owns the app?", answer: ownership },
      { question: "How does pricing work?", answer: "There’s no fixed price list. After a free consultation you get a written proposal with the scope, what it includes and the price, before any work begins." },
    ],
  },
];
