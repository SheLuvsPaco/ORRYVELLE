import type { Solution } from "@/lib/studio/solutions";

export const enterpriseSolutions: Solution[] = [
  {
    slug: "ai-receptionist",
    kind: "service",
    service: "enterprise-solutions",
    name: "AI Receptionist",
    seo: {
      title: "AI Receptionist for Small Businesses",
      description:
        "An AI receptionist that answers every call 24/7, books appointments into your calendar and hands tricky calls to your team. Book a free 30-minute call.",
    },
    heading: "AI receptionist for small businesses",
    headline: ["Every call answered,", "even when you can’t."],
    lead: "Calls come in while you’re with a customer, on a job or closed for the night. An AI receptionist picks up every one, answers questions, books the appointment straight into your calendar and passes anything tricky to your team.",
    answer:
      "An AI receptionist for small businesses: a voice agent that answers every call around the clock, books appointments into your calendar and hands complex calls to a person.",
    pains: [
      { title: "Missed calls go to competitors", body: "When nobody picks up, many callers don’t leave a voicemail. They ring the next business on the list." },
      { title: "Your team is interrupted all day", body: "The same questions about prices, hours and availability pull people away from paying work." },
      { title: "After-hours enquiries wait until morning", body: "Bookings that come in at night or at weekends sit unanswered while the customer moves on." },
    ],
    features: [
      { icon: "agent", title: "Answers every call, day and night", body: "A natural voice picks up instantly, takes several calls at once and never puts anyone on hold." },
      { icon: "workflow", title: "Books, moves and cancels appointments", body: "It checks live availability in your calendar and confirms the booking while the caller is still on the line." },
      { icon: "clarity", title: "Answers from information you approve", body: "Services, prices, hours, location and policies come from a knowledge base you control." },
      { icon: "support", title: "Hands over when it should", body: "Upset callers and unusual requests go to a person, or it takes a detailed message for your team." },
      { icon: "crm", title: "Logs every call", body: "Each call is summarised and recorded in your CRM or sheet, with an alert to your team when it matters." },
      { icon: "integration", title: "Confirms new bookings", body: "An outbound agent can call each new booking to thank them and explain what to prepare, which helps cut no-shows." },
    ],
    steps: [
      { title: "Free consultation", body: "We learn how calls work today: the common questions, your booking rules and when a person must take over." },
      { title: "We build and test it", body: "We build the agent by hand in n8n with a natural ElevenLabs voice, connect your calendar and CRM, and test it against real scenarios, including awkward callers." },
      { title: "Live, with 30 days of oversight", body: "We switch it on for your number and watch real calls for the first 30 days, tuning answers until it runs exactly as intended." },
    ],
    proof: [
      { slug: "ai-voice-receptionist", note: "An inbound agent that books, reschedules and cancels appointments against Cal.com and Google Calendar, plus an outbound agent that calls every new booking to confirm it." },
    ],
    faqs: [
      { question: "How much does an AI receptionist cost?", answer: "There are two parts. Building it is scoped and priced in a written proposal after a free consultation. Running it has usage costs you pay directly to the providers, such as call minutes and AI usage, which depend on your call volume. Our guide to AI receptionist costs breaks those running costs down." },
      { question: "Will callers know they’re speaking to an AI?", answer: "In the EU, yes: our voice agents tell callers they’re speaking to an AI assistant, as the law requires. Where disclosure isn’t legally required, it’s your decision, and we explain the pros and cons of each choice before launch." },
      { question: "Which calendars and tools does it work with?", answer: "We’ve built receptionists on Cal.com and Google Calendar, and we connect to most calendars, CRMs and booking tools that offer an API. We confirm your setup in the consultation." },
      { question: "What happens when it can’t handle a call?", answer: "It hands over. The agent transfers the call to a person, or takes a detailed message when nobody is available, so the caller is never stuck in a loop." },
      { question: "Can it speak languages other than English?", answer: "Yes, most major languages, including Bulgarian, wherever both speech recognition and a natural voice are available. Quality varies between languages, so we test in yours before launch." },
    ],
  },
  {
    slug: "ai-cold-calling",
    kind: "service",
    service: "enterprise-solutions",
    name: "AI Cold Calling Agent",
    seo: {
      title: "AI Cold Calling Agent That Books Meetings",
      description:
        "An AI cold calling agent that researches each lead, writes a script for that one business, makes the call and books meetings into your calendar.",
    },
    heading: "AI cold calling agent",
    headline: ["Outbound calls that", "start with homework."],
    lead: "Cold calling eats hours and most calls go nowhere. Our AI cold caller researches every lead first, writes a script for that one business, makes the call and books meetings straight into your calendar.",
    answer:
      "An AI cold calling agent that researches each lead, writes a tailored script, calls the business and books qualified meetings into your calendar.",
    pains: [
      { title: "Hours of dialling, few conversations", body: "Most of a sales day goes on calls that never connect or never get past the first sentence." },
      { title: "Generic scripts get hung up on", body: "Prospects can tell when a caller knows nothing about their business, and they end the call." },
      { title: "Leads slip through the cracks", body: "When calling depends on someone finding the time, good leads wait days or never get a call at all." },
    ],
    features: [
      { icon: "search", title: "Researches every lead first", body: "It reads the prospect’s website, spots problems worth raising and finds the decision maker before dialling." },
      { icon: "craft", title: "A script for each business", body: "The opening line and talking points are rewritten around what it found, so every call starts with something specific." },
      { icon: "agent", title: "Natural, confident calls", body: "Calls run on Vapi with a natural ElevenLabs voice, within boundaries you approve." },
      { icon: "workflow", title: "Books meetings directly", body: "When a prospect says yes, the meeting goes straight into your calendar and they get a confirmation text." },
      { icon: "reporting", title: "Every outcome recorded", body: "Booked or not, each call’s result is written back to your lead list and CRM, with an alert for every meeting." },
    ],
    steps: [
      { title: "Free consultation", body: "We agree your offer, who to call, what a good meeting looks like and the rules for the markets you call." },
      { title: "We build and test it", body: "We build the research and calling workflow by hand in n8n and rehearse it against realistic prospects until the calls sound right." },
      { title: "Live, with 30 days of oversight", body: "We start with a small batch of leads, review every call and refine the script and research for the first 30 days." },
    ],
    proof: [
      { slug: "ai-cold-caller", note: "Built to sell websites: it audits each lead’s current site, finds the owner on LinkedIn, writes a personal opener and books meetings, logging every outcome." },
    ],
    faqs: [
      { question: "Is AI cold calling legal?", answer: "It depends on where and whom you call. Many countries regulate automated calls, consent and do-not-call lists, and EU law requires telling people they’re speaking to an AI. We design the agent around the rules of the markets you call, and you should confirm the specifics with legal advice for your market." },
      { question: "Does an AI cold caller sound like a robot?", answer: "Modern voices sound natural, and because each call opens with something specific to the prospect’s business, conversations feel far less scripted than a typical cold call." },
      { question: "What do I need to get started?", answer: "A clear offer, a list of leads or a source for them, and a calendar for booked meetings. We help shape the rest in the consultation." },
      { question: "Can it handle objections?", answer: "Within the boundaries you approve, yes: it answers common questions and objections about your offer. When a prospect needs a person, it books a call with your team instead of improvising." },
      { question: "Who owns the system?", answer: "You choose: build and hand over, a managed monthly retainer, or a full IP buyout. In every model you can use and adapt it; only a buyout also lets you resell it." },
    ],
  },
  {
    slug: "n8n-automation",
    kind: "service",
    service: "enterprise-solutions",
    name: "n8n Automation",
    seo: {
      title: "n8n Automation Agency: Workflows Built by Hand",
      description:
        "n8n workflows and AI agents designed and built by hand, with error handling, monitoring and clear ownership. Self-hosted or n8n Cloud. Book a free call.",
    },
    heading: "n8n automation agency",
    headline: ["Your busywork,", "running on its own."],
    lead: "If your team copies data between tools, chases the same follow-ups or rebuilds the same report every week, n8n can do it for them. We design and build n8n workflows by hand, node by node, and make sure they never fail silently.",
    answer:
      "An n8n automation agency: we design, build and maintain n8n workflows and AI agents by hand, self-hosted or on n8n Cloud, with error handling and monitoring.",
    pains: [
      { title: "Manual work between tools", body: "Leads, orders and bookings get copied from one system to another by hand, and mistakes creep in." },
      { title: "Automations that break quietly", body: "Do-it-yourself workflows handle the happy path, then fail without telling anyone when something changes." },
      { title: "Bills that grow with every step", body: "On per-step platforms, long workflows that run often get expensive fast." },
    ],
    features: [
      { icon: "integration", title: "Connects the tools you use", body: "CRM, calendar, email, SMS, spreadsheets, forms and any service with an API, working as one system." },
      { icon: "agent", title: "AI where it does a real job", body: "AI steps that read messages, research leads or parse dates, inside workflows you control." },
      { icon: "security", title: "Built not to fail silently", body: "Retries, alerts to a named person and manual fallbacks, tested before launch, not just the happy path." },
      { icon: "data", title: "Self-hosted or n8n Cloud", body: "Run it on your own server for full data control, or on n8n’s managed cloud. We help you set up your own n8n at no extra cost." },
      { icon: "clarity", title: "Documented and handed over", body: "Every workflow is documented so your team, or any developer, can understand and change it." },
      { icon: "support", title: "Maintained on retainer", body: "Optionally, we host, monitor and update your workflows, adjust them as you grow, and report on them monthly." },
    ],
    steps: [
      { title: "Free consultation", body: "We map the work that repeats every day or week and pick the automations that will save the most time first." },
      { title: "We build by hand", body: "We design each workflow node by node in n8n, including how it handles errors, and test it against real data." },
      { title: "Live, with 30 days of oversight", body: "We switch it on and watch it run in production for 30 days, fixing anything that doesn’t behave exactly as intended." },
    ],
    proof: [
      { slug: "sales-pipeline-system", note: "Three n8n workflows triggered by GoHighLevel: timed confirmations before every call, six no-show follow-ups and reactivation of cold leads." },
      { slug: "ai-voice-receptionist", note: "Voice agents orchestrated in n8n, routing each call by intent and syncing bookings with Cal.com and Google Calendar in real time." },
      { slug: "ai-cold-caller", note: "An n8n workflow that loops through a lead list, researches each business and passes a personal script to every call." },
    ],
    faqs: [
      { question: "Why n8n instead of Zapier or Make?", answer: "n8n bills per complete workflow run rather than per step, handles complex branching and AI agents well, and can be self-hosted for full control of your data. For short, simple automations Zapier or Make can be the better fit, and we’ll say so." },
      { question: "Do we need our own n8n account?", answer: "It depends on the model you choose. With build and hand over, the workflows run in your own n8n, and we help set it up at no extra cost. On a managed retainer they run in our accounts unless you ask otherwise. With a full IP buyout they run in yours." },
      { question: "Are your workflows built by hand or generated with AI?", answer: "By hand. Every workflow is designed node by node by a person who understands your process, then tested against real scenarios, including the ways it can fail." },
      { question: "What happens when an n8n update breaks something?", answer: "On a managed retainer, updates are part of the service: we test them and adjust your workflows when a platform or package changes. If you run it yourselves, the documentation shows any developer how each workflow works." },
      { question: "What can n8n connect to?", answer: "Hundreds of tools have built-in n8n nodes, and anything with an API can be connected through HTTP requests. If your tool has an API, we can almost certainly automate it." },
    ],
  },
  {
    slug: "crm-automation",
    kind: "service",
    service: "enterprise-solutions",
    name: "CRM & GoHighLevel Automation",
    seo: {
      title: "GoHighLevel & CRM Automation: Follow-Ups and No-Shows",
      description:
        "Confirmation, no-show and reactivation sequences by email and SMS, built in n8n around GoHighLevel or your CRM, so every lead gets followed up.",
    },
    heading: "CRM and GoHighLevel automation",
    headline: ["Follow-ups that", "never forget."],
    lead: "Booked calls that no-show, leads that go quiet, follow-ups that depend on someone remembering. We automate the sequences around your CRM, so every lead gets the right email or text at the right moment.",
    answer:
      "CRM and GoHighLevel automation: confirmation, no-show and reactivation sequences by email and SMS, built in n8n around your CRM.",
    pains: [
      { title: "No-shows waste your calendar", body: "Prospects book a call, forget about it and leave a hole in your day." },
      { title: "Paid-for leads go cold", body: "People who engaged once and went quiet never hear from you again, so leads you paid for go to waste." },
      { title: "Follow-up depends on memory", body: "When someone has to remember every follow-up, the busiest weeks are when leads slip away." },
    ],
    features: [
      { icon: "workflow", title: "Confirmation sequences", body: "Emails and texts timed to each appointment that answer common questions and build trust, so prospects arrive ready." },
      { icon: "security", title: "Checks before every send", body: "Each message first checks that the booking still stands and the time hasn’t moved, so nobody gets the wrong reminder." },
      { icon: "support", title: "No-show recovery", body: "Anyone who misses a call gets a series of follow-ups to rebook, stopping the moment they book again." },
      { icon: "crm", title: "Cold-lead reactivation", body: "Leads who went silent get a well-judged message, filtered by do-not-disturb status and their conversation history." },
      { icon: "reporting", title: "Every touch recorded", body: "Each message is noted on the contact in your CRM, and recovered bookings are logged so you can see what works." },
    ],
    steps: [
      { title: "Free consultation", body: "We look at your pipeline, where leads drop off and what each message should say." },
      { title: "We write and build the sequences", body: "We draft the messages with you, build each sequence by hand in n8n around your CRM, and test them against real bookings." },
      { title: "Live, with 30 days of oversight", body: "We watch every send for the first 30 days and refine timing and wording until it runs exactly as intended." },
    ],
    proof: [
      { slug: "sales-pipeline-system", note: "For a tax and residency advisory firm: five timed confirmation touches before each call, six no-show follow-ups and reactivation of cold leads, all triggered by GoHighLevel." },
    ],
    faqs: [
      { question: "Do you work with GoHighLevel?", answer: "Yes. Our Sales Pipeline System is built around GoHighLevel, with n8n running the sequences and every touch noted on the contact." },
      { question: "What about other CRMs, like HubSpot?", answer: "We connect to most CRMs that offer an API, including HubSpot. We confirm the integration options for your CRM in the consultation." },
      { question: "Can the sequences use both email and SMS?", answer: "Yes. Most sequences combine both, timed to the appointment or to how long a lead has been quiet." },
      { question: "Will the messages sound like us?", answer: "Yes. We write the messages with you and you approve every one before launch. Where AI is used, it handles tasks like reading dates or conversation history, not writing unapproved messages." },
      { question: "Who owns the automations?", answer: "You choose: build and hand over, a managed monthly retainer, or a full IP buyout. In every model you can use and adapt them; only a buyout also lets you resell them." },
    ],
  },
  {
    slug: "business-process-automation",
    kind: "service",
    service: "enterprise-solutions",
    name: "Business Process Automation",
    seo: {
      title: "Business Process Automation for Small Businesses",
      description:
        "We find the repetitive work costing you the most hours and automate it with n8n workflows and AI, with a person in control. Book a free 30-minute call.",
    },
    heading: "Business process automation for small businesses",
    headline: ["Stop doing work", "a system could do."],
    lead: "Every business has tasks that follow the same steps every time: entering orders, sending reminders, updating spreadsheets, producing reports. We find the ones costing you the most hours and automate them, with a person firmly in control.",
    answer:
      "Business process automation for small and growing businesses: we map repetitive work and automate it with hand-built n8n workflows and AI agents.",
    pains: [
      { title: "Hours lost to admin", body: "Skilled people spend their week on data entry, reminders and reports instead of the work that grows the business." },
      { title: "Mistakes from retyping", body: "Every time information is copied by hand between systems, errors slip in and customers notice." },
      { title: "Growth means more paperwork", body: "More customers shouldn’t mean hiring someone just to move information around." },
    ],
    features: [
      { icon: "clarity", title: "Find the biggest wins first", body: "We map how work actually flows and start with the tasks that cost the most hours each week." },
      { icon: "integration", title: "Data that moves itself", body: "Orders, bookings and contacts flow between your tools automatically, without retyping." },
      { icon: "workflow", title: "Reminders and follow-ups", body: "Customers, staff and suppliers get the right message at the right time, every time." },
      { icon: "reporting", title: "Reports that build themselves", body: "Weekly numbers and documents are generated and delivered, not assembled by hand." },
      { icon: "agent", title: "AI for messy inputs", body: "AI steps that read emails, messages and documents and turn them into structured data your systems can use." },
      { icon: "security", title: "A person in control", body: "Clear checkpoints, alerts and fallbacks, so automation never runs unchecked." },
    ],
    steps: [
      { title: "Free consultation", body: "We talk through your week and spot the repetitive tasks worth automating." },
      { title: "Map, build and test", body: "We map each process, build the automations by hand in n8n and test them against your real data." },
      { title: "Live, with 30 days of oversight", body: "We switch them on and watch them in production for 30 days, adjusting until everything runs as intended." },
    ],
    proof: [
      { slug: "sales-pipeline-system", note: "Follow-up work that used to depend on people, from call confirmations to no-show recovery, now runs on its own around the CRM." },
      { slug: "ai-voice-receptionist", note: "Calls, bookings and confirmations handled automatically, with outcomes logged to Airtable and alerts sent to the team." },
    ],
    faqs: [
      { question: "What should we automate first?", answer: "Start with the tasks that repeat most often and cost the most hours: data entry between tools, reminders and follow-ups, and recurring reports are the usual winners. We pinpoint yours in the consultation." },
      { question: "Will automation replace our staff?", answer: "It replaces the repetitive parts of their day, not the people. Your team spends its time on customers and work that needs judgement, with automation handling the busywork." },
      { question: "What happens if our process changes later?", answer: "Workflows can be adjusted. On a managed retainer we make those changes for you; with hand over, the documentation lets your team or any developer update them." },
      { question: "Do you use AI to build the automations?", answer: "No. Our automations are designed and built by hand in n8n. AI appears inside them only where it does a real job, such as reading an email or a document." },
      { question: "How does pricing work?", answer: "Every system is different, so there’s no fixed price list. After a free consultation you get a written proposal with the scope, what it includes and the price, before any work begins." },
    ],
  },
];
