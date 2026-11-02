import { bgProjects } from "@/content/bg/projects";
import type { ServiceSlug } from "./content";
import type { Locale } from "./i18n";
import { overlay } from "./localize";

export type MockKind = "dashboard" | "field" | "pipeline" | "agent" | "editorial" | "hospitality";

export type MockTheme = {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  line: string;
};

/** Single UI elements lifted out of a product for collages (rendered by `Piece` in Mockups.tsx). */
export type PieceKind =
  | "kpi"
  | "docs"
  | "adviser"
  | "allocation"
  | "crew"
  | "alert"
  | "photos"
  | "deal"
  | "log"
  | "toggles"
  | "bubble"
  | "call"
  | "intake"
  | "booking"
  | "room"
  | "project"
  | "type";

/** A real product screenshot in /public/images/work, with its pixel size. */
export type Shot = {
  src: string;
  w: number;
  h: number;
  /**
   * Full-length pages are also cut into 16:10 screen-height slices (`<name>-<i>.webp`, each
   * with a 2px overlap; see the slicing script), so a frame loads only the screens it shows.
   */
  slices?: { base: string; count: number };
};

const shot = (src: string, w: number, h: number): Shot => ({ src: `/images/work/${src}.webp`, w, h });

const pageShot = (src: string, w: number, h: number): Shot => ({
  ...shot(src, w, h),
  slices: { base: `/images/work/${src}`, count: Math.ceil(h / Math.round(w * 0.625)) },
});

/**
 * Screenshots of a shipped product. When present they replace the illustrative mockups
 * everywhere the project appears (collages, devices, the scrolling preview).
 */
export type ProductShots = {
  /** Desktop page from the top, full length (a 16:10 viewport at the top). Phone-only products omit it. */
  screen?: Shot;
  /** Desktop sidebar width as a fraction of the screenshot width, cropped by `main` page layers. */
  sidebar?: number;
  /** The phone screen shown in device frames. Products without a phone UI omit it (and use no phone layers). */
  phone?: Shot;
  /** Further screens and lifted UI elements, named by collage layers. */
  more: Record<string, Shot>;
  /** Phone-only products: `more` screens either side of the phone screen, nearest first. */
  lineup?: string[];
};

/**
 * One element of a collage. Positions and sizes are percentages of the collage width
 * (y too), so compositions scale without distortion; a shorter frame crops the bottom.
 */
export type CollageLayer = {
  /** page: a region of the desktop product · phone: the mobile screen · piece: one UI element · shot: a lifted screenshot element */
  t: "page" | "phone" | "piece" | "shot";
  piece?: PieceKind;
  /** page / phone: show this screen from `shots.more` instead of the default · shot: the element to show. */
  shot?: string;
  x: number;
  y: number;
  w: number;
  /** Rotation in degrees (kept within about ±8°). */
  r?: number;
  /** Stacking order. */
  z?: number;
  /** page: visible height ÷ width (0.625 = one 16:10 screen). */
  ar?: number;
  /** page: how far the page is scrolled, in screen heights. */
  at?: number;
  /** page (apps): show the whole main column instead of one viewport. */
  long?: boolean;
  /** page (apps): content only, without the app's sidebars. */
  main?: boolean;
  /** page: slim browser bar above the view. */
  bar?: boolean;
  /** Tilted compositions: height above the plane, in % of the collage width. */
  lift?: number;
};

export type CollageSet = {
  /** Brand-colour field: light stop, deep stop. */
  field: [string, string];
  /** Optional plane tilt for the square composition: rotateX, rotateY, rotateZ in degrees. */
  tilt?: [number, number, number];
  /** Deep stops for the paired case-study panels (light stops are `mock.panels`). */
  pairFields?: [string, string];
  /** Rail cards and /work rows (authored for 1:1). */
  square: CollageLayer[];
  /** Case-study cover (authored for 2:1). */
  wide: CollageLayer[];
  /** Case-study paired panels: A authored for 1.4:1, B for 1:1. */
  pair: [CollageLayer[], CollageLayer[]];
  /** Pager thumbnails (1.3:1); defaults to a page with a phone. */
  mini?: CollageLayer[];
};

export type Project = {
  slug: string;
  title: string;
  service: ServiceSlug;
  sector: string;
  /** "concept" studies are illustrative; switch to "client" once real work is approved for publication. */
  status: "concept" | "client";
  client: string;
  /** Concept studies: a typical build time. */
  timeline?: string;
  /** Shipped products: the devices it runs on. */
  platforms?: string;
  summary: string;
  /** Meta description (≤155 characters) when the summary is too long for search results. */
  seoDescription?: string;
  overview: string;
  approach: string;
  deliverables: string[];
  /** Two-tone title for large headings: [ink, tone]. */
  titleParts: [string, string];
  /** A short second paragraph for index rows: the problem this study answers. */
  lede: string;
  /** Captions for the paired case-study panels. */
  captions: [string, string];
  mock: {
    kind: MockKind;
    brand: string;
    headline: string;
    theme: MockTheme;
    /** Background colours for the paired detail panels. */
    panels: [string, string];
    /** Address shown in browser chrome; defaults to the brand name as a .com. */
    domain?: string;
  };
  shots?: ProductShots;
  collage: CollageSet;
};

export const projects: Project[] = [
  {
    slug: "nantucket-events",
    title: "Nantucket Events Company",
    service: "custom-software",
    sector: "Event Rentals",
    status: "client",
    client: "Nantucket Events Company",
    platforms: "Desktop · Tablet · Phone",
    seoDescription:
      "Case study: custom operations software for a Nantucket event-rental company, with one season calendar, a job card per event and crew briefs on the phone.",
    summary:
      "The operations system behind a Nantucket event-rental company: one season calendar, a job card for every event, and a field brief each crew member reads before leaving the warehouse.",
    overview:
      "Tents, tables, trucks, and crews move between branches all season, and schedules arrive as WhatsApp messages and PDF picklists. The platform puts every event on one calendar, filterable by branch. Each job card holds crew call times, a timeline, a pack list drawn from live inventory, vehicles and drivers, and the notes the crew needs on site.",
    approach:
      "Two audiences, two views. Owners and leads get dense desk tools: AI Quick Add turns a pasted message into job cards and checks it against what is already booked before anything changes, PDF picklists are matched to inventory, and invoices and team access sit behind roles. Crews get a phone-first brief: read-this-first notes, the day’s timeline, who drives what, and a live pack list they tick off as they load.",
    deliverables: [
      "Season calendar across branches",
      "Job cards: crew, timeline, vehicles, pack list",
      "AI Quick Add from pasted messages",
      "PDF picklist import",
      "Inventory & fleet with photos",
      "Crew field brief & live pack list",
    ],
    titleParts: ["Nantucket Events", "Company"],
    lede: "Schedules arrive as WhatsApp messages and PDF picklists. The platform turns them into job cards, checks them against what is already booked, and hands every crew member a brief for the day.",
    captions: ["AI Quick Add · desktop", "Crew field brief · mobile"],
    mock: {
      kind: "field",
      brand: "Nantucket Events Company",
      headline: "Friday, September 25",
      theme: {
        bg: "#fffdf9",
        surface: "#ffffff",
        ink: "#1b2a3d",
        muted: "#6b7686",
        accent: "#124a85",
        line: "#e4e8ee",
      },
      panels: ["#0e2a4d", "#8fb2dc"],
      domain: "",
    },
    shots: {
      screen: pageShot("nantucket-events/page", 2400, 12985),
      sidebar: 528 / 2880,
      phone: shot("nantucket-events/m-brief", 1080, 2341),
      more: {
        calendar: shot("nantucket-events/calendar", 2000, 1250),
        "quick-add": shot("nantucket-events/quick-add", 2000, 1250),
        "pdf-import": shot("nantucket-events/pdf-import", 2000, 1250),
        inventory: shot("nantucket-events/inventory", 2000, 1250),
        vehicles: shot("nantucket-events/vehicles", 2000, 1250),
        "crew-brief": shot("nantucket-events/crew-brief", 2000, 1250),
        timeline: shot("nantucket-events/timeline", 2000, 1250),
        "m-packlist": shot("nantucket-events/m-packlist", 1080, 2341),
        "m-timeline": shot("nantucket-events/m-timeline", 1080, 2341),
        "m-quick-add": shot("nantucket-events/m-quick-add", 1080, 2341),
        "m-calendar": shot("nantucket-events/m-calendar", 1080, 2341),
        "p-review": shot("nantucket-events/p-review", 1100, 552),
        "p-composer": shot("nantucket-events/p-composer", 1200, 1036),
        "p-tent": shot("nantucket-events/p-tent", 668, 776),
        "p-jobs": shot("nantucket-events/p-jobs", 460, 1084),
        "p-chip": shot("nantucket-events/p-chip", 708, 180),
      },
    },
    collage: {
      field: ["#4f82c4", "#123f73"],
      tilt: [22, 0, -6],
      pairFields: ["#173f6e", "#5b8bc8"],
      square: [
        { t: "page", shot: "calendar", x: 6, y: 9, w: 74, bar: true, z: 1 },
        { t: "page", shot: "inventory", x: 54, y: 40, w: 52, ar: 0.62, main: true, z: 1 },
        { t: "phone", x: 10, y: 50, w: 25, z: 3, lift: 8 },
        { t: "shot", shot: "p-review", x: 38, y: 62, w: 40, z: 4, lift: 12 },
      ],
      wide: [
        { t: "page", x: 4, y: 6, w: 56, bar: true, z: 1 },
        { t: "page", shot: "calendar", x: 64, y: 4, w: 34, ar: 0.62, main: true, z: 1 },
        { t: "phone", shot: "m-packlist", x: 50, y: 13, w: 12.5, r: -3, z: 4 },
        { t: "shot", shot: "p-review", x: 24, y: 31, w: 25, z: 5 },
        { t: "shot", shot: "p-tent", x: 74, y: 24, w: 14, r: 2, z: 5 },
      ],
      pair: [
        [
          { t: "page", shot: "calendar", x: 9, y: 9, w: 82, bar: true, z: 1 },
          { t: "shot", shot: "p-composer", x: 54, y: 34, w: 40, z: 3 },
        ],
        [
          { t: "phone", shot: "m-packlist", x: 12, y: 16, w: 34, r: -5, z: 1 },
          { t: "phone", x: 50, y: 9, w: 37, r: 3, z: 2 },
          { t: "shot", shot: "p-chip", x: 30, y: 80, w: 42, z: 3 },
        ],
      ],
    },
  },
  {
    slug: "five-star-priorities",
    title: "Five-Star Priorities",
    service: "custom-software",
    sector: "Property Services",
    status: "client",
    client: "Five-Star Priorities",
    platforms: "iPhone",
    seoDescription:
      "Case study: an iPhone app for a property-services team, with each crew’s day as a route of stops, owner approval for every job and a weekly calendar.",
    summary:
      "An iPhone app for a property-services team: each crew’s day laid out as a route of stops, every job approved by the owner, and the week on one calendar.",
    overview:
      "The owner plans the day as routes. Each two-person team gets an ordered run of jobs (move-in walkthroughs, turnover cleans, bathroom details) that the crew taps through like stories, stop by stop. Jobs carry photos, access instructions, and notes for the team, and the owner approves each one before it goes out. Day, week, and month calendars and a tenant directory complete the picture.",
    approach:
      "We built it phone-first and kept close to iOS conventions: native sheets, a familiar tab bar, and forms that behave the way people expect. Routes, jobs, and notes are stored on the device, so the team’s plan is there when the crew is on site.",
    deliverables: [
      "iPhone app",
      "Team routes & job stories",
      "Owner approval flow",
      "Photos, access notes & team comments",
      "Day, week & month calendar",
      "Tenant directory",
    ],
    titleParts: ["Five-Star", "Priorities"],
    lede: "Each team’s day is a route of stops. Crews tap through their jobs like stories, and the owner approves every one before it goes out.",
    captions: ["Job approval · iPhone", "Week calendar · iPhone"],
    mock: {
      kind: "field",
      brand: "Five-Star Priorities",
      headline: "Afternoon plan",
      theme: {
        bg: "#fafafa",
        surface: "#ffffff",
        ink: "#111111",
        muted: "#6e6e73",
        accent: "#1f7aff",
        line: "#e5e5ea",
      },
      panels: ["#1f2328", "#f0cf7a"],
      domain: "",
    },
    shots: {
      phone: shot("five-star/home", 1080, 2347),
      more: {
        job: shot("five-star/job", 1080, 2347),
        "job-done": shot("five-star/job-done", 1080, 2347),
        week: shot("five-star/week", 1080, 2347),
        day: shot("five-star/day", 1080, 2347),
        month: shot("five-star/month", 1080, 2347),
        tenant: shot("five-star/tenant", 1080, 2347),
        "p-route": shot("five-star/p-route", 1000, 484),
        "p-slot": shot("five-star/p-slot", 1000, 463),
        "p-job": shot("five-star/p-job", 1000, 545),
        "p-approve": shot("five-star/p-approve", 380, 138),
        "p-stories": shot("five-star/p-stories", 1200, 290),
      },
      lineup: ["job", "week", "month", "job-done"],
    },
    collage: {
      field: ["#f8e09a", "#e2b04a"],
      tilt: [18, 0, 6],
      pairFields: ["#363b42", "#e6b955"],
      // Lifted pieces never float over the screen they were cut from.
      square: [
        { t: "phone", shot: "job", x: 10, y: 15, w: 36, z: 2, lift: 4 },
        { t: "phone", shot: "week", x: 54, y: 23, w: 34, z: 1 },
        { t: "shot", shot: "p-stories", x: 24, y: 9, w: 58, z: 5, lift: 14 },
        { t: "shot", shot: "p-route", x: 32, y: 54, w: 58, z: 4, lift: 12 },
        { t: "shot", shot: "p-approve", x: 13, y: 68, w: 24, z: 5, lift: 16 },
      ],
      wide: [
        { t: "phone", shot: "month", x: 8, y: 8, w: 18, r: -4, z: 1 },
        { t: "phone", shot: "job", x: 39.5, y: 3, w: 21, z: 3 },
        { t: "phone", shot: "week", x: 74, y: 8, w: 18, r: 4, z: 1 },
        { t: "shot", shot: "p-stories", x: 4, y: 4, w: 31, z: 4 },
        { t: "shot", shot: "p-route", x: 63, y: 29, w: 28, z: 4 },
        { t: "shot", shot: "p-slot", x: 19, y: 33, w: 22, z: 4 },
      ],
      pair: [
        [
          { t: "phone", shot: "job", x: 59, y: 7, w: 31, r: 3, z: 2 },
          { t: "shot", shot: "p-slot", x: 6, y: 15, w: 50, z: 3 },
          { t: "shot", shot: "p-approve", x: 24, y: 46, w: 24, z: 4 },
        ],
        [
          { t: "phone", shot: "week", x: 30, y: 8, w: 40, z: 2 },
          { t: "shot", shot: "p-stories", x: 8, y: 62, w: 84, z: 3 },
        ],
      ],
      mini: [
        { t: "phone", shot: "job", x: 14, y: 10, w: 34, r: -4, z: 1 },
        { t: "phone", shot: "week", x: 52, y: 18, w: 34, r: 4, z: 2 },
      ],
    },
  },
  {
    slug: "sales-pipeline-system",
    title: "Sales Pipeline System",
    service: "enterprise-solutions",
    sector: "Tax & Residency Advisory",
    status: "client",
    client: "International tax & residency advisory",
    platforms: "n8n · GoHighLevel · Supabase",
    seoDescription:
      "Case study: n8n email and SMS sequences on GoHighLevel that pre-sell booked calls, win back no-shows and revive cold leads for an advisory firm.",
    summary:
      "Three automated email and SMS sequences around the CRM of a firm advising on tax, second passports, and banking: pre-sell every booked call, win back no-shows while they are still warm, and revive leads that went cold.",
    overview:
      "Every lead this firm buys arrives in the CRM, and three things decide whether it turns into a client: the first contact, the call itself, and what happens when someone goes quiet. The confirmation sequence starts the moment a form is filled or a call is booked, with emails and texts that answer common questions and build trust, so prospects arrive at the call already pre-sold and fewer miss it. The no-show sequence catches anyone who skips their call and works to rebook them while the decision is fresh. The recovery sequence finds leads who engaged once and then went silent, and reaches back out, so contacts the firm has already paid for stop going to waste.",
    approach:
      "Each sequence is an n8n workflow triggered by GoHighLevel. Confirmation messages are timed to the appointment (immediately, then 19 hours, 12 hours, 5 hours, and 10 minutes before), with an AI step that normalises the booked date and time, and every send first checks that the booking still stands and the time has not moved. No-shows get six follow-ups spaced days apart, each stopping as soon as a new booking appears. Reactivation filters out do-not-disturb contacts and unqualified tags, reads the conversation history, and only writes to leads silent past the cut-off. Every touch is noted on the contact in GoHighLevel, and recovered bookings are logged to Supabase.",
    deliverables: [
      "Confirmation sequence: 5 timed touches",
      "Booking checks before every send",
      "No-show recovery: 6 follow-ups",
      "Cold-lead reactivation",
      "AI date & time parsing",
      "CRM notes & Supabase lead log",
    ],
    titleParts: ["Sales pipeline", "system"],
    lede: "Booked calls get pre-sold, missed calls get rebooked, and leads the firm has already paid for stop going cold in the CRM.",
    captions: ["Confirmation sequence · n8n", "No-show recovery · n8n"],
    mock: {
      kind: "pipeline",
      brand: "Sales Pipeline",
      headline: "Confirmation sequence",
      theme: {
        bg: "#181818",
        surface: "#222222",
        ink: "#f2f2f2",
        muted: "#9a9a9a",
        accent: "#ff6d5a",
        line: "#2e2e2e",
      },
      panels: ["#141414", "#a9b6c8"],
      domain: "",
    },
    shots: {
      // Stacked canvases; tops in screen heights: confirmation 0, no-show 0.92, reactivation 2.57.
      screen: pageShot("sales-pipeline/page", 1400, 2978),
      more: {
        confirm: shot("sales-pipeline/confirm", 1390, 764),
        noshow: shot("sales-pipeline/noshow", 925, 1124),
        reactivation: shot("sales-pipeline/reactivation", 1388, 726),
        "p-first": shot("sales-pipeline/p-first", 530, 138),
        "p-wait": shot("sales-pipeline/p-wait", 566, 656),
        "p-followup": shot("sales-pipeline/p-followup", 714, 140),
        "p-execute": shot("sales-pipeline/p-execute", 455, 80),
        "p-note": shot("sales-pipeline/p-note", 220, 114),
      },
    },
    collage: {
      field: ["#dde2e9", "#8894a8"],
      pairFields: ["#1c1f25", "#9aa7ba"],
      // All three sequences side by side; lifted blocks are zoom-ins set away from their source,
      // and never show something the canvas beside them already shows.
      square: [
        { t: "page", shot: "confirm", x: 4, y: 8, w: 64, ar: 0.55, bar: true, z: 1 },
        { t: "page", shot: "noshow", x: 63, y: 21, w: 33, ar: 0.95, z: 2 },
        { t: "page", shot: "reactivation", x: 7, y: 55, w: 50, ar: 0.523, z: 2 },
        { t: "shot", shot: "p-execute", x: 53, y: 66, w: 40, z: 4 },
      ],
      wide: [
        { t: "page", shot: "confirm", x: 3, y: 7, w: 46, ar: 0.55, bar: true, z: 1 },
        { t: "page", shot: "noshow", x: 52, y: 4, w: 21, ar: 1.215, z: 1 },
        { t: "page", shot: "reactivation", x: 76, y: 9, w: 21, ar: 0.523, z: 1 },
        { t: "shot", shot: "p-followup", x: 33, y: 36, w: 34, r: -1, z: 4 },
        { t: "shot", shot: "p-note", x: 81, y: 25, w: 13, r: 2, z: 4 },
      ],
      pair: [
        [
          { t: "page", shot: "confirm", x: 9, y: 9, w: 82, ar: 0.55, bar: true, z: 1 },
          { t: "shot", shot: "p-first", x: 4, y: 50, w: 46, r: -2, z: 3 },
        ],
        [
          { t: "page", shot: "noshow", x: 14, y: 8, w: 72, ar: 0.87, z: 1 },
          { t: "shot", shot: "p-execute", x: 26, y: 80, w: 48, z: 3 },
        ],
      ],
      mini: [
        { t: "page", shot: "confirm", x: 8, y: 10, w: 84, ar: 0.55, z: 1 },
        { t: "page", shot: "noshow", x: 58, y: 30, w: 34, ar: 0.9, z: 2 },
      ],
    },
  },
  {
    slug: "ai-voice-receptionist",
    title: "AI Voice Receptionist",
    service: "enterprise-solutions",
    sector: "Service Businesses",
    status: "client",
    client: "Service business",
    platforms: "n8n · Vapi · ElevenLabs",
    seoDescription:
      "Case study: an AI voice receptionist that answers every call and books, moves or cancels appointments, plus an outbound agent that confirms new bookings.",
    summary:
      "Two voice agents on one calendar: an inbound receptionist that answers every call and books, reschedules, or cancels appointments, and an outbound agent that calls every new booking to say thank you and set expectations.",
    overview:
      "Missed calls are missed bookings, and booked calls that nobody follows up are where no-shows come from. The inbound agent answers every call in a natural voice, looks up the caller's booking and live availability, and schedules, moves, or cancels the appointment while they are still on the line, against the business's own calendar. The outbound agent picks up every new booking, researches who booked, and calls to thank them, explain what the meeting will cover, and tell them what to prepare.",
    approach:
      "Both agents run on n8n with Vapi handling the call and ElevenLabs the voice. Inbound requests are routed by intent (schedule, reschedule, or cancel), checked against Cal.com and Google Calendar, and answered back to the call in real time. The outbound agent uses xAI Grok to research the lead and write a personal opener and prompt for each call, then reads the finished call to record the outcome: a calendar event, an Airtable record, a text to the lead, and a Telegram alert to the team.",
    deliverables: [
      "Inbound voice receptionist",
      "Schedule, reschedule & cancel by phone",
      "Live Cal.com & Google Calendar sync",
      "Outbound confirmation calls",
      "Per-lead research & personal opener",
      "Outcome logging & team alerts",
    ],
    titleParts: ["AI voice", "receptionist"],
    lede: "Every inbound call is answered and handled on the spot, and every new booking gets a personal call before the meeting.",
    captions: ["Inbound: the receptionist", "Outbound: the confirmation call"],
    mock: {
      kind: "agent",
      brand: "Voice Receptionist",
      headline: "Every call answered.",
      theme: {
        bg: "#0e1013",
        surface: "#161920",
        ink: "#f3f4f6",
        muted: "#9aa1ad",
        accent: "#46d39a",
        line: "#272c37",
      },
      panels: ["#0b0d10", "#7fc4a2"],
      domain: "",
    },
    shots: {
      // The "how it works" board; tops in screen heights: inbound 1.0, outbound 2.2, under the hood 3.4.
      screen: pageShot("voice-receptionist/page", 2400, 6007),
      phone: shot("voice-receptionist/m-phone", 720, 1562),
      more: {
        "m-phone-out": shot("voice-receptionist/m-phone-out", 720, 1562),
        "p-call": shot("voice-receptionist/p-call", 940, 692),
        "p-outcome": shot("voice-receptionist/p-outcome", 940, 196),
        "p-opener": shot("voice-receptionist/p-opener", 1376, 482),
        "p-summary": shot("voice-receptionist/p-summary", 1102, 482),
        "p-strip": shot("voice-receptionist/p-strip", 1400, 264),
      },
    },
    collage: {
      field: ["#d6eee1", "#78b394"],
      pairFields: ["#0f1a15", "#86c4a6"],
      // Everything sits above the rail card's crop line.
      square: [
        { t: "page", x: 4, y: 6, w: 66, z: 1 },
        { t: "phone", x: 67, y: 9, w: 27, r: 3, z: 3 },
        { t: "shot", shot: "p-strip", x: 5, y: 50, w: 60, z: 4 },
        { t: "shot", shot: "p-summary", x: 7, y: 62, w: 50, z: 4 },
      ],
      wide: [
        { t: "page", x: 3, y: 8, w: 48, z: 1 },
        { t: "phone", x: 53, y: 5, w: 14, r: -3, z: 3 },
        { t: "phone", shot: "m-phone-out", x: 69, y: 10, w: 14, r: 3, z: 2 },
        { t: "shot", shot: "p-strip", x: 9, y: 39, w: 36, z: 4 },
        { t: "shot", shot: "p-opener", x: 70, y: 37, w: 27, r: 2, z: 4 },
      ],
      pair: [
        [
          { t: "page", x: 9, y: 9, w: 82, at: 1, z: 1 },
          { t: "shot", shot: "p-call", x: 58, y: 36, w: 36, r: 2, z: 3 },
        ],
        [
          { t: "phone", shot: "m-phone-out", x: 30, y: 6, w: 40, z: 2 },
          { t: "shot", shot: "p-opener", x: 11, y: 66, w: 78, z: 3 },
        ],
      ],
    },
  },
  {
    slug: "ai-cold-caller",
    title: "AI Cold Caller",
    service: "enterprise-solutions",
    sector: "Outbound Sales",
    status: "client",
    client: "Website sales",
    platforms: "n8n · Vapi · ElevenLabs",
    seoDescription:
      "Case study: an AI cold-calling agent that researches each lead and their website, writes a script for that business, makes the call and books meetings.",
    summary:
      "An AI sales caller that researches every lead before dialling: it audits the business's website, finds the owner, writes a script for that one lead, makes the call, and books the meeting.",
    overview:
      "Generic cold calls get hung up on. This agent works through a lead list one business at a time and does the homework a good salesperson would: it reads the company's website, audits it for problems that cost them customers, and finds the decision maker on LinkedIn. It then rewrites the caller's prompt and opening line around what it found, so the call starts with something specific to that business. This build sold websites, so the research centres on each lead's current site.",
    approach:
      "The workflow runs in n8n: leads come from Google Sheets, xAI Grok extracts names and researches each prospect, the website is scraped and converted for analysis, a series of checks prepares and validates the issues found, and Apify pulls the LinkedIn profile. Grok then writes the first message and system prompt, which are passed to Vapi as call overrides with an ElevenLabs voice. After the call, the agent reads the result to decide whether a meeting was booked: booked calls create a calendar event, an Airtable record, a text to the lead, and a Telegram alert; every outcome is written back to the lead sheet.",
    deliverables: [
      "Lead list loop",
      "Website audit & LinkedIn research",
      "Personal prompt & opener per lead",
      "Vapi calls with an ElevenLabs voice",
      "Booked / not-booked detection",
      "Calendar, CRM, SMS & Telegram logging",
    ],
    titleParts: ["AI cold", "caller"],
    lede: "Every lead gets its own research, its own script, and its own call, opening with a problem the agent found on their website.",
    captions: ["Research & personal script", "The call"],
    mock: {
      kind: "agent",
      brand: "AI Cold Caller",
      headline: "Researches every lead.",
      theme: {
        bg: "#0e1013",
        surface: "#161920",
        ink: "#f3f4f6",
        muted: "#9aa1ad",
        accent: "#ffb547",
        line: "#272c37",
      },
      panels: ["#0e0c08", "#e0a94c"],
      domain: "",
    },
    shots: {
      // The "how it works" board; tops in screen heights: steps 1.0, outcomes 2.3, under the hood 2.85.
      screen: pageShot("ai-cold-caller/page", 2400, 4416),
      phone: shot("ai-cold-caller/m-phone", 720, 1562),
      more: {
        "p-dossier": shot("ai-cold-caller/p-dossier", 940, 722),
        "p-opener": shot("ai-cold-caller/p-opener", 1376, 482),
        "p-summary": shot("ai-cold-caller/p-summary", 1102, 482),
        "p-strip": shot("ai-cold-caller/p-strip", 1400, 264),
      },
    },
    collage: {
      field: ["#f5e3c0", "#cf9640"],
      pairFields: ["#17130c", "#e0a94c"],
      // Everything sits above the rail card's crop line.
      square: [
        { t: "page", x: 4, y: 6, w: 66, z: 1 },
        { t: "phone", x: 67, y: 9, w: 27, r: 3, z: 3 },
        { t: "shot", shot: "p-strip", x: 5, y: 50, w: 60, z: 4 },
        { t: "shot", shot: "p-summary", x: 7, y: 62, w: 50, z: 4 },
      ],
      wide: [
        { t: "page", x: 3, y: 8, w: 48, z: 1 },
        { t: "phone", x: 53, y: 5, w: 14, r: -3, z: 3 },
        { t: "shot", shot: "p-opener", x: 69, y: 10, w: 28, r: 2, z: 4 },
        { t: "shot", shot: "p-summary", x: 70, y: 33, w: 25, z: 4 },
        { t: "shot", shot: "p-strip", x: 9, y: 39, w: 36, z: 4 },
      ],
      pair: [
        [
          { t: "page", x: 9, y: 9, w: 82, at: 1, z: 1 },
          { t: "shot", shot: "p-dossier", x: 60, y: 30, w: 34, r: 2, z: 3 },
        ],
        [
          { t: "phone", x: 30, y: 6, w: 40, z: 2 },
          { t: "shot", shot: "p-opener", x: 11, y: 66, w: 78, z: 3 },
        ],
      ],
    },
  },
  {
    slug: "pet-grooming",
    title: "Pet Grooming",
    service: "websites",
    sector: "Pet Care",
    status: "client",
    client: "Polina Tsvetkova Grooming Studio",
    platforms: "Desktop · Phone",
    summary:
      "A warm, playful website for a dog-grooming studio: four services with photography, clear prices by dog size, a story-led gallery, and booking in two steps.",
    overview:
      "Before booking, owners want to know three things: what the studio does, what it costs for their dog, and how to get an appointment. The site answers in that order: services shown with photography, prices set by dog size with the most popular package highlighted, a gallery that tells the studio’s story, and a two-step booking form with phone, hours, and a map beside it.",
    approach:
      "The brand’s sunny yellow and deep plum run through every section, with cut-out dog photography and paw-print details keeping it friendly. Every section ends in a way to book: each service card, each price card, and the floating navigation lead to the same short form. The layout is designed to read as well on a phone as on a desktop.",
    deliverables: [
      "Brand-led one-page website",
      "Services with photography",
      "Price cards by dog size",
      "Story-led gallery",
      "Two-step booking form",
      "Responsive phone layout",
    ],
    titleParts: ["Pet", "grooming"],
    lede: "Owners want to know what the studio does, what it costs for their dog, and how to book. The site answers in that order, with a way to book at the end of every section.",
    captions: ["Booking in two steps · desktop", "Gallery & booking · phone"],
    mock: {
      kind: "hospitality",
      brand: "Polina Tsvetkova",
      headline: "Подстригване и СПА грижи, създадени с любов",
      theme: {
        bg: "#fdf4e5",
        surface: "#fff8e7",
        ink: "#2b1a24",
        muted: "#7a6470",
        accent: "#5b2e48",
        line: "#ecdcc4",
      },
      panels: ["#2b1622", "#ffc233"],
      domain: "",
    },
    shots: {
      // Full page; section tops in screen heights: services 1.0, prices 2.14, gallery 3.63, booking 7.4.
      screen: pageShot("grooming/page", 2400, 12733),
      phone: shot("grooming/m-hero", 1080, 2341),
      more: {
        "m-services": shot("grooming/m-services", 1080, 2341),
        "m-prices": shot("grooming/m-prices", 1080, 2341),
        "m-gallery": shot("grooming/m-gallery", 1080, 2341),
        "m-booking": shot("grooming/m-booking", 1080, 2341),
        "p-service": shot("grooming/p-service", 1000, 710),
        "p-schedule": shot("grooming/p-schedule", 900, 1374),
      },
    },
    collage: {
      field: ["#9a5d84", "#4a2239"],
      pairFields: ["#3a1d2e", "#f2a91c"],
      // The hero's cut-out dogs stay clear: pieces sit beside, below, and on the polaroid corner.
      square: [
        { t: "page", x: 4, y: 6, w: 70, bar: true, z: 1 },
        { t: "shot", shot: "p-schedule", x: 76.5, y: 13, w: 19.5, r: 2, z: 4 },
        { t: "shot", shot: "p-service", x: 45, y: 53, w: 48, z: 4 },
        { t: "phone", shot: "m-gallery", x: 8, y: 40, w: 24, r: -4, z: 3 },
      ],
      wide: [
        { t: "page", x: 3, y: 7, w: 50, bar: true, z: 1 },
        { t: "page", x: 67, y: -4, w: 22, ar: 2.1, at: 3.63, z: 1 },
        { t: "page", x: 91, y: 14, w: 22, ar: 0.62, at: 7.4, z: 1 },
        { t: "phone", shot: "m-booking", x: 53.5, y: 10, w: 12.5, r: -3, z: 4 },
        { t: "shot", shot: "p-service", x: 6, y: 31, w: 21, r: -2, z: 5 },
      ],
      pair: [
        [
          { t: "page", x: 9, y: 9, w: 82, bar: true, at: 7.4, z: 1 },
          { t: "shot", shot: "p-schedule", x: 66, y: 16, w: 26, r: 2, z: 3 },
        ],
        [
          { t: "phone", shot: "m-gallery", x: 12, y: 16, w: 34, r: -5, z: 1 },
          { t: "phone", shot: "m-booking", x: 50, y: 9, w: 37, r: 3, z: 2 },
        ],
      ],
    },
  },
  {
    slug: "grooming-salon",
    title: "Grooming Salon",
    service: "websites",
    sector: "Pet Care",
    status: "client",
    client: "Grooming salon, Sofia",
    platforms: "Desktop · Phone",
    seoDescription:
      "Case study: a calm, premium website for a Sofia grooming salon, with a stress-free promise, three signature services, a gallery and online booking.",
    summary:
      "A calm, editorial website for a premium grooming salon in Sofia: a stress-free promise up front, three signature services, a gallery, and booking laid out around a date-and-time picker.",
    overview:
      "Owners choosing a groomer worry most about how their dog will be treated. The site leads with that: an editorial hero about calm, stress-free grooming, then the salon’s standards (no sedation, no cages, a free first consultation), three signature services, a photo gallery, and a booking form built around picking a date and time.",
    approach:
      "A restrained palette of warm cream, charcoal, and soft caramel, set in Cormorant Garamond, gives the salon a premium, unhurried voice. Generous spacing, an arched hero photograph, and a dark services band set the rhythm down the page, while booking stays one tap away from every section, with a quick-contact button on phones.",
    deliverables: [
      "Editorial one-page website",
      "Standards & promises section",
      "Signature services",
      "Photo gallery",
      "Booking with date & time picker",
      "Phone layout with quick contact",
    ],
    titleParts: ["Grooming", "salon"],
    lede: "Owners worry most about how their dog will be treated. The site leads with a stress-free promise and ends in a booking form built around the date and time.",
    captions: ["Booking · desktop", "Hero & gallery · phone"],
    mock: {
      kind: "editorial",
      brand: "Pet Grooming",
      headline: "Изкуството на спокойния груминг.",
      theme: {
        bg: "#faf8f4",
        surface: "#ffffff",
        ink: "#1f1d1a",
        muted: "#77706a",
        accent: "#c9a27e",
        line: "#e8e2d8",
      },
      panels: ["#1f1d1a", "#dcbb98"],
      domain: "",
    },
    shots: {
      // Full page; section tops in screen heights: promises 1.05, services 1.91, gallery 2.97, booking 3.95.
      screen: pageShot("grooming-salon/page", 2400, 8108),
      phone: shot("grooming-salon/m-hero", 1080, 2341),
      more: {
        "m-promises": shot("grooming-salon/m-promises", 1080, 2341),
        "m-services": shot("grooming-salon/m-services", 1080, 2341),
        "m-gallery": shot("grooming-salon/m-gallery", 1080, 2341),
        "m-booking": shot("grooming-salon/m-booking", 1080, 2341),
        "p-arch": shot("grooming-salon/p-arch", 900, 1200),
        "p-booking": shot("grooming-salon/p-booking", 1000, 1373),
        "p-promise": shot("grooming-salon/p-promise", 700, 606),
      },
    },
    collage: {
      field: ["#dcbb98", "#9b7350"],
      pairFields: ["#2e2b27", "#bb9068"],
      // The hero's arched photo is never lifted beside a view that already shows it.
      square: [
        { t: "page", x: 4, y: 7, w: 70, bar: true, z: 1 },
        { t: "shot", shot: "p-booking", x: 73, y: 19, w: 23, r: 2, z: 4 },
        { t: "phone", shot: "m-services", x: 8, y: 52, w: 24, r: -4, z: 3 },
        { t: "shot", shot: "p-promise", x: 50, y: 61, w: 30, z: 4 },
      ],
      wide: [
        { t: "page", x: 3, y: 8, w: 49, bar: true, z: 1 },
        { t: "phone", shot: "m-promises", x: 51, y: 12, w: 12.5, r: -3, z: 4 },
        { t: "page", x: 66, y: 5, w: 24, ar: 0.96, at: 1.91, z: 1 },
        { t: "shot", shot: "p-booking", x: 79, y: 19, w: 15, r: 2, z: 4 },
      ],
      pair: [
        [
          { t: "page", x: 9, y: 9, w: 82, bar: true, at: 3.95, z: 1 },
          { t: "shot", shot: "p-arch", x: 3, y: 49, w: 15, r: -3, z: 3 },
        ],
        [
          { t: "phone", shot: "m-gallery", x: 12, y: 16, w: 34, r: -5, z: 1 },
          { t: "phone", x: 50, y: 9, w: 37, r: 3, z: 2 },
        ],
      ],
    },
  },
  {
    slug: "magnolia-blooms",
    title: "Magnolia Blooms",
    service: "websites",
    sector: "Florist",
    status: "client",
    client: "Magnolia Blooms, Bendigo",
    platforms: "Desktop · Phone",
    seoDescription:
      "Case study: a custom Shopify store for a Bendigo florist, selling fresh and dried flowers and gifts online, with room for weddings and floral workshops.",
    summary:
      "A Shopify storefront for a boutique florist in Bendigo: fresh and preserved blooms and gifts to buy online, with weddings and floral workshops given their own place on the page.",
    overview:
      "The florist sells in three ways: bouquets and gifts online, wedding flowers by enquiry, and floral workshops. The home page gives each its own path, starting from a hero with Shop Blooms and Wedding Enquiry side by side, then three category tiles, a wedding banner, rows of fresh blooms, preserved and dried blooms, and gifts that can be added to the cart straight from the row, a workshop feature, Google reviews, and a newsletter sign-up.",
    approach:
      "Soft blush, ivory, and deep plum with Cormorant Garamond headings keep the store feeling like a boutique, not a catalogue. The flowers carry the design: large, bright product photography on quiet grounds, with prices and add-to-cart kept small beneath each one. Same-day delivery sits in the announcement bar, and the phone layout stacks every row for one-thumb shopping.",
    deliverables: [
      "Shopify storefront",
      "Category tiles: blooms, workshops, gifts",
      "Product rows with add to cart",
      "Wedding enquiry & workshop features",
      "Google reviews section",
      "Newsletter sign-up",
    ],
    titleParts: ["Magnolia", "blooms"],
    lede: "A florist that sells bouquets online, takes wedding enquiries, and runs workshops. The home page gives each its own path, with the flowers doing the selling.",
    captions: ["Preserved blooms · desktop", "Store · phone"],
    mock: {
      kind: "editorial",
      brand: "Magnolia Blooms",
      headline: "Bendigo's Boutique Florist",
      theme: {
        bg: "#fbf5ef",
        surface: "#ffffff",
        ink: "#4a1f2e",
        muted: "#8a6f78",
        accent: "#6e3a55",
        line: "#efdde2",
      },
      panels: ["#4a1f2e", "#efc6d3"],
      domain: "magnoliablooms.com.au",
    },
    shots: {
      // Full page; section tops in screen heights: categories 0.88, wedding 1.83, fresh 2.46,
      // preserved 3.27, gifts 4.08, reviews 5.24.
      screen: pageShot("magnolia-blooms/page", 2400, 10137),
      phone: shot("magnolia-blooms/m-hero", 1080, 2341),
      more: {
        "m-categories": shot("magnolia-blooms/m-categories", 1080, 2341),
        "m-wedding": shot("magnolia-blooms/m-wedding", 1080, 2341),
        "m-fresh": shot("magnolia-blooms/m-fresh", 1080, 2341),
        "m-reviews": shot("magnolia-blooms/m-reviews", 1080, 2341),
        "p-product": shot("magnolia-blooms/p-product", 676, 1006),
        "p-preserved": shot("magnolia-blooms/p-preserved", 676, 1006),
        "p-workshops": shot("magnolia-blooms/p-workshops", 900, 1197),
        "p-review": shot("magnolia-blooms/p-review", 888, 270),
      },
    },
    collage: {
      field: ["#f3d6df", "#c98aa0"],
      pairFields: ["#3a1a26", "#d9a3b5"],
      square: [
        { t: "page", x: 4, y: 7, w: 70, bar: true, z: 1 },
        { t: "shot", shot: "p-workshops", x: 72, y: 15, w: 24, r: 2, z: 4 },
        { t: "phone", shot: "m-fresh", x: 8, y: 49, w: 24, r: -4, z: 3 },
        { t: "shot", shot: "p-preserved", x: 42, y: 52, w: 20, r: -2, z: 4 },
        { t: "shot", shot: "p-review", x: 60, y: 69, w: 34, z: 5 },
      ],
      wide: [
        { t: "page", x: 3, y: 8, w: 49, bar: true, z: 1 },
        { t: "phone", shot: "m-wedding", x: 50.5, y: 11, w: 12.5, r: -3, z: 4 },
        { t: "page", x: 66, y: 5, w: 24, ar: 0.96, at: 2.46, z: 1 },
        { t: "shot", shot: "p-workshops", x: 87, y: 14, w: 11, r: 3, z: 4 },
        { t: "shot", shot: "p-review", x: 63, y: 35, w: 25, z: 5 },
      ],
      pair: [
        [
          { t: "page", x: 9, y: 9, w: 82, bar: true, at: 3.27, z: 1 },
          { t: "shot", shot: "p-product", x: 69, y: 17, w: 22, r: 2, z: 3 },
        ],
        [
          { t: "phone", shot: "m-categories", x: 12, y: 14, w: 34, r: -5, z: 1 },
          { t: "phone", x: 50, y: 8, w: 37, r: 3, z: 2 },
          { t: "shot", shot: "p-review", x: 27, y: 81, w: 50, z: 3 },
        ],
      ],
    },
  },
  {
    slug: "varna-royal",
    title: "Varna Royal",
    service: "websites",
    sector: "Home Services",
    status: "client",
    client: "Varna Royal, Varna",
    platforms: "Desktop · Phone",
    seoDescription:
      "Case study: a premium website for a Varna window and door repair company, with interior photography, a three-step process and a free-quote form.",
    summary:
      "A premium website for a window and door repair company in Varna: a calm, interior-led look, every service shown with photography, a three-step process, and a free-quote form.",
    overview:
      "Window repair is usually sold with stock photos and loud offers. This site takes the opposite route: warm interiors and quiet typography that make the company look as careful as the work it promises. It sets out why to choose the company (same-day repairs, a precise diagnosis with an honest price, and a two-year guarantee), the full range of services, a three-step process from inspection to finished repair, a gallery of finished projects, and a free-quote form.",
    approach:
      "Deep forest green, warm cream, and a soft gold accent, with Cormorant Garamond headings, give a trade business the voice of an interiors brand. Each service gets a full photograph rather than an icon, the process reads in three numbered steps, and the free-quote form asks only for a name, phone, the type of problem, and a good time to call.",
    deliverables: [
      "Brand-led one-page website",
      "Services with photography",
      "Why-us & guarantee section",
      "Three-step process",
      "Project gallery",
      "Free-quote request form",
    ],
    titleParts: ["Varna", "Royal"],
    lede: "Window repair is usually sold with stock photos and loud offers. This site makes the company look as careful as its work, and ends every visit at a short free-quote form.",
    captions: ["Services & quote form · desktop", "Hero & contact · phone"],
    mock: {
      kind: "editorial",
      brand: "Varna Royal",
      headline: "Кристална яснота. Безупречна изолация.",
      theme: {
        bg: "#fafaf7",
        surface: "#f2f0ea",
        ink: "#1a1a17",
        muted: "#6d6b63",
        accent: "#1a3a2a",
        line: "#e0ddd4",
      },
      panels: ["#142b20", "#c9b48a"],
      domain: "",
    },
    shots: {
      // Full page; section tops in screen heights: why us 1.0, services 3.05, testimonials 5.31,
      // process 6.25, gallery 7.14, contact 9.18.
      screen: pageShot("varna-royal/page", 2400, 16193),
      phone: shot("varna-royal/m-hero", 1080, 2341),
      more: {
        "m-why": shot("varna-royal/m-why", 1080, 2341),
        "m-services": shot("varna-royal/m-services", 1080, 2341),
        "m-process": shot("varna-royal/m-process", 1080, 2341),
        "m-gallery": shot("varna-royal/m-gallery", 1080, 2341),
        "m-contact": shot("varna-royal/m-contact", 1080, 2341),
        "p-form": shot("varna-royal/p-form", 900, 1055),
        "p-service": shot("varna-royal/p-service", 1400, 495),
      },
    },
    collage: {
      field: ["#dfe5d8", "#93a796"],
      pairFields: ["#142b20", "#b8a074"],
      square: [
        { t: "page", x: 4, y: 7, w: 70, bar: true, z: 1 },
        { t: "shot", shot: "p-form", x: 73, y: 14, w: 23, r: 2, z: 4 },
        { t: "phone", shot: "m-process", x: 8, y: 48, w: 24, r: -4, z: 3 },
        { t: "shot", shot: "p-service", x: 37, y: 57, w: 57, z: 4 },
      ],
      wide: [
        { t: "page", x: 3, y: 8, w: 49, bar: true, z: 1 },
        { t: "phone", shot: "m-services", x: 50.5, y: 11, w: 12.5, r: -3, z: 4 },
        { t: "page", x: 66, y: 5, w: 24, ar: 0.96, at: 7.14, z: 1 },
        { t: "shot", shot: "p-form", x: 84, y: 17, w: 13, r: 2, z: 4 },
      ],
      pair: [
        [
          { t: "page", x: 9, y: 9, w: 82, bar: true, at: 3.05, z: 1 },
          { t: "shot", shot: "p-form", x: 67, y: 15, w: 26, r: 2, z: 3 },
        ],
        [
          { t: "phone", shot: "m-contact", x: 12, y: 16, w: 34, r: -5, z: 1 },
          { t: "phone", x: 50, y: 9, w: 37, r: 3, z: 2 },
        ],
      ],
    },
  },
  {
    slug: "revenue-operations-hub",
    title: "Revenue Operations Hub",
    service: "enterprise-solutions",
    sector: "Professional Services",
    status: "concept",
    client: "Concept study",
    timeline: "Typical: 6–10 weeks",
    summary:
      "Lead capture, routing, follow-up, and booking connected to the CRM, with an automation log leadership can actually read.",
    overview:
      "When enquiries arrive from forms, calls, and referrals, context gets lost between the inbox and the CRM. This study connects every entry point to a single pipeline: leads are enriched, routed to the right owner, followed up on schedule, and booked straight into calendars, with every automated action logged.",
    approach:
      "We would map the current journey first: who touches a lead, when, and with what information. Automation handles the predictable steps; people keep the conversations. A visible activity log and exception queue make sure nothing fails silently.",
    deliverables: [
      "Lead capture & enrichment",
      "Routing & ownership rules",
      "Follow-up sequences",
      "Calendar booking integration",
      "Automation activity log",
      "Pipeline reporting",
    ],
    titleParts: ["Revenue operations", "hub"],
    lede: "When enquiries arrive from forms, calls, and referrals, context gets lost between the inbox and the CRM. This study gives every lead one path, one owner, and a log anyone can read.",
    captions: ["Pipeline & automation log", "Deal view · mobile"],
    mock: {
      kind: "pipeline",
      brand: "Northpoint",
      headline: "Pipeline",
      theme: {
        bg: "#17151f",
        surface: "#211e2c",
        ink: "#f1eff7",
        muted: "#9d98b3",
        accent: "#9b87f5",
        line: "#2f2b3d",
      },
      panels: ["#100e16", "#9b87f5"],
    },
    collage: {
      field: ["#ad9cf8", "#6f58d8"],
      pairFields: ["#1c1928", "#7d67e0"],
      square: [
        { t: "page", x: 12, y: 10, w: 82, bar: true, r: -3, z: 1 },
        { t: "page", x: -12, y: 55, w: 64, at: 0.72, main: true, r: -3, z: 2 },
        { t: "piece", piece: "log", x: 50, y: 60, w: 44, r: -3, z: 3 },
        { t: "piece", piece: "deal", x: 6, y: 30, w: 26, r: -3, z: 4 },
      ],
      wide: [
        { t: "page", x: 18, y: 6, w: 56, bar: true, r: -2, z: 1 },
        { t: "page", x: -4, y: 26, w: 34, at: 0.72, r: -2, z: 2 },
        { t: "phone", x: 77, y: 8, w: 13, r: 3, z: 3 },
        { t: "piece", piece: "log", x: 56, y: 28, w: 26, r: -2, z: 4 },
        { t: "piece", piece: "deal", x: 6, y: 8, w: 15, r: -2, z: 4 },
      ],
      pair: [
        [
          { t: "page", x: 9, y: 9, w: 82, bar: true, z: 1 },
          { t: "piece", piece: "toggles", x: 58, y: 38, w: 34, z: 3 },
        ],
        [
          { t: "phone", x: 31, y: 12, w: 38, z: 2 },
          { t: "piece", piece: "deal", x: 8, y: 50, w: 32, z: 3 },
        ],
      ],
    },
  },
];

/**
 * The project without its long-form copy, for props passed to client components (rail
 * collages, the home stage, the scrolling preview). Everything a project is rendered from
 * is kept; the case-study text would only bloat the page's serialized payload.
 */
export const visualOnly = (project: Project): Project => ({
  ...project,
  summary: "",
  overview: "",
  approach: "",
  deliverables: [],
  lede: "",
});

/* Bulgarian text is overlaid on each project (src/content/bg/projects.ts); visuals are shared. */
const projectsBg = projects.map((project) => overlay(project, bgProjects[project.slug]));

export const projectsIn = (locale: Locale) => (locale === "bg" ? projectsBg : projects);

export const projectBySlug = (slug: string, locale: Locale = "en") =>
  projectsIn(locale).find((project) => project.slug === slug);

export const projectsForService = (slug: ServiceSlug, locale: Locale = "en") =>
  projectsIn(locale).filter((project) => project.service === slug);
