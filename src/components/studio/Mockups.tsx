import type { CSSProperties } from "react";
import Image from "next/image";
import {
  Bell,
  Calendar,
  ChevronDown,
  CheckCircle2,
  FileText,
  Filter,
  LayoutDashboard,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Mic,
  Minus,
  PhoneCall,
  PieChart,
  Plus,
  Route,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Wifi,
} from "lucide-react";
import type { PieceKind, Project, Shot } from "@/lib/studio/projects";
import "./styles/mockups.css";

/*
 * Illustrative product screens used as project imagery for concept studies.
 * Every screen is a full-length page: framed normally it shows the top like a
 * screenshot; with `scroll` the page (or the app's main column) scrolls inside
 * the device. All sizes are em-based and scale with the frame through
 * container units (see .mk-wrap in mockups.css).
 */

const img = (name: string) => `/images/studio/${name}.jpg`;

function themeStyle(project: Project): CSSProperties {
  const t = project.mock.theme;
  return {
    "--mk-bg": t.bg,
    "--mk-surface": t.surface,
    "--mk-ink": t.ink,
    "--mk-muted": t.muted,
    "--mk-accent": t.accent,
    "--mk-line": t.line,
  } as CSSProperties;
}

type KindProps = {
  project: Project;
  /** Rendered width relative to a full-size (≈1100px) screen; keeps photo downloads proportional. */
  k?: number;
  /** The same ratio on small viewports (defaults to `k`). */
  km?: number | undefined;
};

/**
 * `w` is the photo's width in px on a full-size screen and `mv` its width in vw on small
 * viewports (0 = fixed px). Both scale with `k`, so a screen shown at a third of its size
 * in a collage requests a third of the pixels.
 */
function Photo({
  name,
  w = 1100,
  mv = 95,
  k = 1,
  km,
  className = "",
  position,
}: {
  name: string;
  w?: number;
  mv?: number;
  k?: number;
  km?: number | undefined;
  className?: string;
  position?: string;
}) {
  const px = Math.max(64, Math.round(w * k));
  const vw = Math.max(10, Math.round(mv * (km ?? k)));
  const sizes = mv ? `(max-width: 900px) ${vw}vw, ${px}px` : `${px}px`;
  return (
    <span className={`mk-photo ${className}`}>
      <Image
        src={img(name)}
        alt=""
        fill
        sizes={sizes}
        quality={80}
        fetchPriority="low"
        style={position ? { objectPosition: position } : undefined}
      />
    </span>
  );
}

function Initials({ children, tone = 0 }: { children: string; tone?: number }) {
  return (
    <span className={`mk-initials tone-${tone}`} aria-hidden="true">
      {children}
    </span>
  );
}

const trend =
  "M0 70 C18 68 26 58 42 60 S70 66 88 52 S118 40 136 44 S166 34 184 30 S214 36 232 24 S262 18 280 14 L300 10";
const spark = "M0 18 C8 16 12 12 20 13 S32 8 40 9 S52 4 60 3";

/* ── Custom software: private client portal ────────────────────────── */
function Dashboard({ project, k = 1, km }: KindProps) {
  const { brand, headline } = project.mock;
  return (
    <div className="mk-app">
      <aside className="mk-side">
        <div className="mk-brand">
          <span className="mk-monogram">H</span>
          <b className="mk-logo serif">{brand}</b>
        </div>
        <nav className="mk-nav-list">
          {[
            [LayoutDashboard, "Overview", true],
            [PieChart, "Portfolio", false],
            [FileText, "Documents", false],
            [MessageSquare, "Messages", false],
            [Settings, "Settings", false],
          ].map(([Icon, label, active]) => {
            const I = Icon as typeof LayoutDashboard;
            return (
              <span key={String(label)} className={active ? "is-active" : ""}>
                <I size="1.1em" strokeWidth={1.75} />
                {String(label)}
                {label === "Messages" ? <em className="mk-count">2</em> : null}
              </span>
            );
          })}
        </nav>
        <small className="mk-side-label">Accounts</small>
        {[
          ["Family Trust", "£2.91m"],
          ["Stocks & Shares ISA", "£0.62m"],
          ["Pension", "£1.30m"],
        ].map(([name, value]) => (
          <div className="mk-account" key={name}>
            <span>{name}</span>
            <b>{value}</b>
          </div>
        ))}
        <div className="mk-adviser">
          <Initials tone={1}>JW</Initials>
          <div>
            <small>Your adviser</small>
            <b>James Whitfield</b>
          </div>
          <span className="mk-icon-btn">
            <MessageSquare size="1em" />
          </span>
        </div>
      </aside>
      <div className="mk-main mk-scroller">
        <header className="mk-top">
          <div className="mk-search">
            <Search size="1em" />
            Search holdings, documents…
          </div>
          <span className="mk-icon-btn has-dot">
            <Bell size="1em" />
          </span>
          <Initials>EC</Initials>
        </header>
        <div className="mk-greeting">
          <small>Wednesday, 24 September</small>
          <b className="mk-title">{headline}</b>
          <span>Here’s where your portfolio stands this morning.</span>
        </div>
        <div className="mk-banner">
          <Photo name="aerial-river-green" w={800} mv={80} k={k} km={km} />
          <div>
            <small>Quarterly review · Q3</small>
            <b>Your review is ready to read.</b>
            <span className="mk-btn">Open the review</span>
          </div>
        </div>
        <div className="mk-kpis">
          {[
            ["Portfolio value", "£4,826,310", "+2.4% this month"],
            ["Year to date", "+8.1%", "Target 6.3%"],
            ["Income · 12 months", "£96,420", "+£4,110"],
          ].map(([label, value, delta]) => (
            <div className="mk-card" key={label}>
              <small>{label}</small>
              <b>{value}</b>
              <div className="mk-kpi-foot">
                <em>{delta}</em>
                <svg viewBox="0 0 60 22" aria-hidden="true">
                  <path d={spark} />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <div className="mk-split">
          <div className="mk-card mk-chart">
            <div className="mk-card-head">
              <b>Performance</b>
              <span className="mk-segment">
                <i>1M</i>
                <i>6M</i>
                <i className="is-on">1Y</i>
                <i>5Y</i>
              </span>
            </div>
            <div className="mk-chart-area">
              <div className="mk-gridlines" aria-hidden="true">
                {["£4.8m", "£4.6m", "£4.4m", "£4.2m"].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id={`fill-${project.slug}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="var(--mk-accent)" stopOpacity="0.35" />
                    <stop offset="1" stopColor="var(--mk-accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${trend} L300 90 L0 90 Z`} fill={`url(#fill-${project.slug})`} />
                <path d={trend} className="mk-line" />
              </svg>
              <span className="mk-tooltip" style={{ left: "77%", top: "18%" }}>
                <small>Aug</small>£4.71m
              </span>
              <span className="mk-marker" style={{ left: "77.3%", top: "33%" }} />
            </div>
            <div className="mk-axis">
              {["Oct", "Dec", "Feb", "Apr", "Jun", "Aug"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
          <div className="mk-card mk-donut-card">
            <b>Allocation</b>
            <div className="mk-donut">
              <span>
                <b>58%</b>
                <small>Equities</small>
              </span>
            </div>
            <ul className="mk-legend">
              {[
                ["Equities", "58%", 1],
                ["Fixed income", "24%", 2],
                ["Alternatives", "12%", 3],
                ["Cash", "6%", 4],
              ].map(([label, value, tone]) => (
                <li key={String(label)}>
                  <i className={`dot-${tone}`} />
                  {label}
                  <em>{value}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mk-card mk-table">
          <div className="mk-card-head">
            <b>Top holdings</b>
            <small>Updated 09:41</small>
          </div>
          <div className="mk-row is-head">
            <span>Asset</span>
            <span>Class</span>
            <span>Value</span>
            <span>Change</span>
          </div>
          {([
            ["Global Equity Fund", "Equities", "£1,204,500", "+3.1%"],
            ["UK Gilts 2031", "Fixed income", "£612,880", "+0.4%"],
            ["Sustainable Leaders", "Equities", "£548,210", "+2.2%"],
            ["Private Credit II", "Alternatives", "£402,000", "+1.0%"],
            ["Infrastructure Trust", "Alternatives", "£178,340", "−0.3%"],
          ] as const).map(([asset, cls, value, change]) => (
            <div className="mk-row" key={asset}>
              <span>
                <i className="mk-asset-mark" />
                {asset}
              </span>
              <span>{cls}</span>
              <span>{value}</span>
              <em className={change.startsWith("−") ? "is-down" : ""}>{change}</em>
            </div>
          ))}
        </div>
        <div className="mk-split mk-split-even">
          <div className="mk-card mk-docs">
            <div className="mk-card-head">
              <b>Documents</b>
              <small>View all</small>
            </div>
            {[
              ["Q3 Quarterly Review.pdf", "Signed · 12 Sep"],
              ["Tax Pack 2025–26.pdf", "Ready · 3 Sep"],
              ["Rebalancing Proposal.pdf", "Awaiting you"],
            ].map(([name, state]) => (
              <div className="mk-doc" key={name}>
                <span className="mk-file">
                  <FileText size="1em" />
                </span>
                <div>
                  <b>{name}</b>
                  <small>{state}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="mk-card mk-timeline">
            <div className="mk-card-head">
              <b>Recent activity</b>
            </div>
            {[
              ["Dividend received", "Global Equity Fund · £2,140", "Today"],
              ["Meeting booked", "Annual review with James", "Mon"],
              ["Document signed", "Q3 Quarterly Review", "12 Sep"],
            ].map(([title, detail, when]) => (
              <div className="mk-event" key={title}>
                <i />
                <div>
                  <b>{title}</b>
                  <small>{detail}</small>
                </div>
                <em>{when}</em>
              </div>
            ))}
          </div>
        </div>
        <footer className="mk-app-foot">
          <Lock size="0.9em" /> {brand} Private Clients · Secure session
        </footer>
      </div>
    </div>
  );
}

/* ── Custom software: field operations ─────────────────────────────── */
function Field({ project, k = 1, km }: KindProps) {
  const { brand, headline } = project.mock;
  const jobs = [
    ["J-2041", "Harbour Road Depot", "En route · 14 min", "on", "RK"],
    ["J-2042", "Kingsway Retail Park", "On site · 38 min", "live", "AM"],
    ["J-2043", "Northgate Clinic", "Delayed · 12 min", "warn", "TS"],
    ["J-2044", "Mill Lane Warehouse", "Scheduled · 13:30", "off", "JB"],
    ["J-2045", "Riverside Offices", "Scheduled · 15:00", "off", "PL"],
    ["J-2046", "Station Quarter", "Scheduled · 16:15", "off", "RK"],
  ] as const;
  return (
    <div className="mk-app">
      <aside className="mk-side mk-side-wide">
        <div className="mk-brand">
          <span className="mk-monogram">
            <Truck size="0.9em" />
          </span>
          <b className="mk-logo">{brand}</b>
        </div>
        <div className="mk-side-title">
          <b>{headline}</b>
          <small>Wed 24 Sep · 9 crews</small>
        </div>
        <div className="mk-counts">
          {[
            ["24", "Jobs"],
            ["17", "On time"],
            ["1", "Alert"],
          ].map(([n, label]) => (
            <span key={label}>
              <b>{n}</b>
              {label}
            </span>
          ))}
        </div>
        <div className="mk-search">
          <Search size="1em" />
          Find a job or crew
        </div>
        {jobs.map(([id, place, state, tone, crew], index) => (
          <div className={`mk-job tone-${tone} ${index === 1 ? "is-active" : ""}`} key={id}>
            <i />
            <div>
              <small>{id}</small>
              <b>{place}</b>
              <em>{state}</em>
            </div>
            <Initials tone={index % 4}>{crew}</Initials>
          </div>
        ))}
      </aside>
      <div className="mk-main mk-main-flush mk-scroller">
        <div className="mk-map">
          <Photo name="map-city-night" w={900} mv={80} k={k} km={km} />
          <span className="mk-map-tint" />
          <svg viewBox="0 0 400 250" preserveAspectRatio="none" aria-hidden="true">
            <path d="M30 220 C80 196 96 130 150 118 S238 146 282 86 S350 44 384 32" className="mk-route" />
            <path d="M52 36 C96 62 124 96 172 150 S262 204 360 214" className="mk-route is-alt" />
          </svg>
          <span className="mk-pin" style={{ left: "37%", top: "47%" }} />
          <span className="mk-pin is-live" style={{ left: "70%", top: "34%" }} />
          <span className="mk-pin is-warn" style={{ left: "43%", top: "60%" }} />
          <span className="mk-pin" style={{ left: "90%", top: "86%" }} />
          <div className="mk-map-controls">
            <span>
              <Plus size="1em" />
            </span>
            <span>
              <Minus size="1em" />
            </span>
          </div>
          <div className="mk-map-card">
            <div className="mk-map-card-top">
              <Initials tone={1}>AM</Initials>
              <div>
                <small>Crew 04 · J-2042</small>
                <b>Kingsway Retail Park</b>
              </div>
              <span className="mk-live">Live</span>
            </div>
            <div className="mk-progress">
              <i />
            </div>
            <div className="mk-map-card-foot">
              <span>
                <MapPin size="1em" /> On site 38 min
              </span>
              <span>6 photos</span>
            </div>
          </div>
        </div>
        <div className="mk-below">
          <div className="mk-card">
            <div className="mk-card-head">
              <b>Crew utilisation</b>
              <small>Today</small>
            </div>
            {[
              ["Crew 01", 82],
              ["Crew 02", 64],
              ["Crew 03", 91],
              ["Crew 04", 73],
              ["Crew 05", 48],
            ].map(([crew, value]) => (
              <div className="mk-bar-row" key={crew}>
                <span>{crew}</span>
                <i>
                  <i style={{ width: `${value}%` }} />
                </i>
                <em>{value}%</em>
              </div>
            ))}
          </div>
          <div className="mk-card">
            <div className="mk-card-head">
              <b>Exceptions</b>
              <small>1 open</small>
            </div>
            <div className="mk-exception">
              <span className="mk-warn-dot" />
              <div>
                <b>J-2043 running 12 min late</b>
                <small>Customer notified automatically · 09:52</small>
              </div>
            </div>
            <div className="mk-exception is-done">
              <CheckCircle2 size="1.2em" />
              <div>
                <b>Access code updated</b>
                <small>Mill Lane Warehouse · resolved</small>
              </div>
            </div>
          </div>
        </div>
        <div className="mk-below mk-below-stack">
          <div className="mk-card mk-table">
            <div className="mk-card-head">
              <b>Afternoon schedule</b>
              <span className="mk-chip">
                <Calendar size="0.9em" /> Wed 24 Sep
              </span>
            </div>
            <div className="mk-row is-head">
              <span>Job</span>
              <span>Crew</span>
              <span>Window</span>
              <span>Status</span>
            </div>
            {([
              ["Mill Lane Warehouse · J-2044", "Crew 02", "13:30–15:00", "Confirmed"],
              ["Riverside Offices · J-2045", "Crew 05", "15:00–16:30", "Confirmed"],
              ["Station Quarter · J-2046", "Crew 01", "16:15–17:45", "Awaiting access"],
              ["Canal Street Studios · J-2047", "Crew 03", "16:30–18:00", "Confirmed"],
              ["Beacon Retail · J-2048", "Crew 04", "17:00–18:15", "Confirmed"],
            ] as const).map(([job, crew, window, status]) => (
              <div className="mk-row" key={job}>
                <span>
                  <i className="mk-asset-mark" />
                  {job}
                </span>
                <span>{crew}</span>
                <span>{window}</span>
                <em className={status === "Confirmed" ? "" : "is-down"}>{status}</em>
              </div>
            ))}
          </div>
          <div className="mk-split mk-split-even">
            <div className="mk-card mk-timeline">
              <div className="mk-card-head">
                <b>Customer updates</b>
                <small>Sent automatically</small>
              </div>
              {([
                ["Arrival window sent", "Riverside Offices", "12:05"],
                ["Running late notice", "Northgate Clinic", "09:52"],
                ["Job complete · photos", "Harbour Road Depot", "09:31"],
              ] as const).map(([title, detail, when]) => (
                <div className="mk-event" key={title}>
                  <i />
                  <div>
                    <b>{title}</b>
                    <small>{detail}</small>
                  </div>
                  <em>{when}</em>
                </div>
              ))}
            </div>
            <div className="mk-card mk-timeline">
              <div className="mk-card-head">
                <b>Proof of work</b>
                <small>Today · 31 items</small>
              </div>
              <div className="mk-thumbs">
                {["arch-concrete-stair", "arch-concrete-cantilever", "arch-house-evening", "abstract-concrete-curve"].map((name) => (
                  <Photo key={name} name={name} w={120} mv={0} k={k} />
                ))}
              </div>
              <small>Signed off by site contact · 6 of 7 jobs</small>
            </div>
          </div>
        </div>
        <footer className="mk-app-foot">
          <Wifi size="0.9em" /> Live · synced 4 seconds ago
        </footer>
      </div>
    </div>
  );
}

/* ── Enterprise: revenue operations ────────────────────────────────── */
function Pipeline({ project }: KindProps) {
  const { brand, headline } = project.mock;
  const columns: [string, [string, string, string, string][]][] = [
    ["New", [["Castell & Co", "£18,000", "SR", "Intro sent"], ["Brightwell", "£9,500", "AM", "Enriched"], ["Osprey Legal", "£24,000", "SR", "Routed"]]],
    ["Qualified", [["Fenwick Group", "£42,000", "JB", "Call · Thu"], ["Lumen Health", "£16,000", "AM", "Follow-up"]]],
    ["Proposal", [["Arden Partners", "£65,000", "JB", "Viewed"], ["Kestrel Ltd", "£21,000", "SR", "Sent"]]],
    ["Won", [["Halden & Rowe", "£38,000", "AM", "Signed"]]],
  ];
  const log: [typeof Sparkles, string, string][] = [
    [Sparkles, "Lead enriched", "Osprey Legal · 42 employees"],
    [Route, "Routed to Sarah", "Legal sector rule"],
    [Mail, "Intro email sent", "Template · Legal intro"],
    [Calendar, "Call booked", "Fenwick Group · Thu 14:00"],
    [FileText, "Proposal viewed", "Arden Partners · 3rd view"],
  ];
  return (
    <div className="mk-app">
      <aside className="mk-side mk-side-slim">
        <span className="mk-monogram">N</span>
        {[LayoutDashboard, Users, Route, Calendar, Settings].map((I, index) => (
          <span key={index} className={`mk-rail-icon ${index === 0 ? "is-active" : ""}`}>
            <I size="1.1em" strokeWidth={1.75} />
          </span>
        ))}
      </aside>
      <div className="mk-main mk-scroller">
        <header className="mk-top">
          <div>
            <small>{brand} · Revenue</small>
            <b className="mk-title">{headline}</b>
          </div>
          <span className="mk-chip">
            <Filter size="0.9em" /> All owners <ChevronDown size="0.9em" />
          </span>
          <span className="mk-chip">This quarter</span>
          <span className="mk-stack">
            <Initials tone={0}>SR</Initials>
            <Initials tone={1}>AM</Initials>
            <Initials tone={2}>JB</Initials>
          </span>
          <span className="mk-btn">
            <Plus size="1em" /> New deal
          </span>
        </header>
        <div className="mk-kpis mk-kpis-4">
          {[
            ["New leads", "7", "today"],
            ["Calls booked", "12", "this week"],
            ["Win rate", "38%", "+6 pts"],
            ["First response", "4m", "median"],
          ].map(([label, value, note]) => (
            <div className="mk-card" key={label}>
              <small>{label}</small>
              <b>{value}</b>
              <em>{note}</em>
            </div>
          ))}
        </div>
        <div className="mk-board">
          <div className="mk-columns">
            {columns.map(([name, cards]) => (
              <div className="mk-column" key={name}>
                <small>
                  <i className={`stage-${name.toLowerCase()}`} />
                  {name}
                  <em>{cards.length}</em>
                </small>
                {cards.map(([company, value, owner, next]) => (
                  <div className="mk-card mk-deal" key={company}>
                    <div className="mk-deal-top">
                      <span className="mk-logo-mark">{company[0]}</span>
                      <b>{company}</b>
                    </div>
                    <span className="mk-deal-value">{value}</span>
                    <div className="mk-deal-foot">
                      <span className="mk-tag">{next}</span>
                      <Initials tone={owner === "SR" ? 0 : owner === "AM" ? 1 : 2}>{owner}</Initials>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mk-card mk-log">
            <div className="mk-card-head">
              <b>Automation log</b>
              <span className="mk-live">Live</span>
            </div>
            {log.map(([I, title, detail], index) => (
              <div key={title} className="mk-log-item">
                <span className="mk-log-icon">
                  <I size="1em" />
                </span>
                <div>
                  <b>{title}</b>
                  <small>{detail}</small>
                </div>
                <em>{`09:4${index}`}</em>
              </div>
            ))}
          </div>
        </div>
        <div className="mk-card mk-automations">
          <div className="mk-card-head">
            <b>Automations</b>
            <small>4 active · 1,284 runs this month</small>
          </div>
          {[
            ["Lead enrichment", "Every new lead", "412 runs", true],
            ["Owner routing", "Sector & region rules", "412 runs", true],
            ["Follow-up sequence", "3 touches over 10 days", "318 runs", true],
            ["No-show recovery", "Rebook within 24h", "Paused", false],
          ].map(([name, rule, runs, on]) => (
            <div className="mk-automation" key={String(name)}>
              <span className={`mk-toggle ${on ? "is-on" : ""}`}>
                <i />
              </span>
              <div>
                <b>{name}</b>
                <small>{rule}</small>
              </div>
              <em>{runs}</em>
            </div>
          ))}
        </div>
        <div className="mk-split">
          <div className="mk-card mk-chart">
            <div className="mk-card-head">
              <b>Quarter forecast</b>
              <span className="mk-segment">
                <i>Month</i>
                <i className="is-on">Quarter</i>
                <i>Year</i>
              </span>
            </div>
            <div className="mk-bars-v" aria-hidden="true">
              {([
                ["Jul", 46, 38],
                ["Aug", 58, 51],
                ["Sep", 64, 55],
                ["Oct", 72, 0],
                ["Nov", 80, 0],
                ["Dec", 69, 0],
              ] as const).map(([month, target, actual]) => (
                <span key={month}>
                  <i style={{ height: `${target}%` }} className="is-target" />
                  {actual ? <i style={{ height: `${actual}%` }} /> : null}
                  <small>{month}</small>
                </span>
              ))}
            </div>
          </div>
          <div className="mk-card mk-donut-card">
            <b>Lead sources</b>
            <ul className="mk-legend mk-legend-lg">
              {([
                ["Website form", "41%", 1],
                ["Referral", "27%", 2],
                ["Inbound call", "19%", 3],
                ["Events", "13%", 4],
              ] as const).map(([label, value, tone]) => (
                <li key={label}>
                  <i className={`dot-${tone}`} />
                  {label}
                  <em>{value}</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mk-card mk-table">
          <div className="mk-card-head">
            <b>Recent conversations</b>
            <small>Synced from inbox and phone</small>
          </div>
          <div className="mk-row is-head">
            <span>Contact</span>
            <span>Channel</span>
            <span>Owner</span>
            <span>Next step</span>
          </div>
          {([
            ["Eleanor Hart · Arden Partners", "Email", "Jamie B.", "Proposal call"],
            ["Tom Reyes · Fenwick Group", "Phone", "Jamie B.", "Thu 14:00"],
            ["Priya Shah · Lumen Health", "Form", "Amara M.", "Follow-up 2/3"],
            ["Owen Clarke · Osprey Legal", "Form", "Sarah R.", "Intro sent"],
          ] as const).map(([contact, channel, owner, next]) => (
            <div className="mk-row" key={contact}>
              <span>
                <i className="mk-asset-mark" />
                {contact}
              </span>
              <span>{channel}</span>
              <span>{owner}</span>
              <em>{next}</em>
            </div>
          ))}
        </div>
        <footer className="mk-app-foot">
          <ShieldCheck size="0.9em" /> Every automated action is logged and reversible
        </footer>
      </div>
    </div>
  );
}

/* ── Enterprise: AI intake & triage ────────────────────────────────── */
function Agent({ project }: KindProps) {
  const { brand, headline } = project.mock;
  return (
    <div className="mk-app">
      <aside className="mk-side">
        <div className="mk-brand">
          <span className="mk-monogram">C</span>
          <b className="mk-logo serif">{brand}</b>
        </div>
        <small className="mk-side-label">{headline}</small>
        {[
          [PhoneCall, "New patient", "02:14", true],
          [MessageSquare, "Opening hours", "Chat", false],
          [PhoneCall, "Reschedule", "01:02", false],
          [MessageSquare, "Prescription", "Staff", false],
        ].map(([Icon, label, meta, active]) => {
          const I = Icon as typeof PhoneCall;
          return (
            <div key={String(label)} className={`mk-convo-item ${active ? "is-active" : ""}`}>
              <span className="mk-log-icon">
                <I size="1em" />
              </span>
              <b>{String(label)}</b>
              <em>{String(meta)}</em>
            </div>
          );
        })}
        <div className="mk-queue">
          <small>Today</small>
          <div>
            <b>128</b>
            <span>conversations</span>
          </div>
          <div>
            <b>71%</b>
            <span>resolved by agent</span>
          </div>
        </div>
      </aside>
      <div className="mk-main mk-scroller">
        <header className="mk-top mk-call">
          <span className="mk-call-icon">
            <PhoneCall size="1em" />
          </span>
          <div>
            <small>Incoming call · +44 ••• ••• 482</small>
            <b className="mk-title">New patient enquiry</b>
          </div>
          <span className="mk-wave" aria-hidden="true">
            {Array.from({ length: 22 }).map((_, index) => (
              <i key={index} style={{ height: `${24 + ((index * 37) % 76)}%` }} />
            ))}
          </span>
          <span className="mk-live">02:14</span>
        </header>
        <div className="mk-thread">
          <p className="from-them">
            <small>Caller · 09:41</small>
            Hi, I’d like to book a first appointment for my daughter.
          </p>
          <p className="from-agent">
            <small>{brand} assistant</small>
            Of course. Is this for a routine check-up, or is there something specific you’d like looked at?
          </p>
          <p className="from-them">
            <small>Caller</small>
            Routine check-up. Ideally next week, after school.
          </p>
          <span className="mk-action-chip">
            <Calendar size="1em" /> Checked availability · 2 slots found
          </span>
          <p className="from-agent">
            <small>{brand} assistant</small>
            Thursday at 16:10 or Friday at 15:40 are available. Which suits you better?
          </p>
          <p className="from-them">
            <small>Caller</small>
            Thursday works. Can I ask about her allergy medication too?
          </p>
          <span className="mk-action-chip is-guard">
            <ShieldCheck size="1em" /> Clinical question · handed to staff with summary
          </span>
        </div>
        <div className="mk-kpis mk-kpis-4">
          {[
            ["Handled today", "128", ""],
            ["Resolved by agent", "71%", ""],
            ["Avg. handle time", "2m 41s", ""],
            ["Handed to staff", "14", ""],
          ].map(([label, value]) => (
            <div className="mk-card" key={label}>
              <small>{label}</small>
              <b>{value}</b>
            </div>
          ))}
        </div>
        <div className="mk-split mk-split-even">
          <div className="mk-card">
            <div className="mk-card-head">
              <b>Top intents</b>
              <small>This week</small>
            </div>
            {([
              ["Book an appointment", 38],
              ["Opening hours", 22],
              ["Reschedule", 17],
              ["Prescription question", 12],
              ["Directions & parking", 11],
            ] as const).map(([intent, value]) => (
              <div className="mk-bar-row mk-bar-row-wide" key={intent}>
                <span>{intent}</span>
                <i>
                  <i style={{ width: `${value * 2.4}%` }} />
                </i>
                <em>{value}%</em>
              </div>
            ))}
          </div>
          <div className="mk-card mk-docs">
            <div className="mk-card-head">
              <b>Approved knowledge</b>
              <small>Reviewed 22 Sep</small>
            </div>
            {([
              ["Services & fees", "14 answers"],
              ["Opening hours & holidays", "6 answers"],
              ["New patient registration", "9 answers"],
              ["What the assistant never answers", "Clinical · billing disputes"],
            ] as const).map(([name, state]) => (
              <div className="mk-doc" key={name}>
                <span className="mk-file">
                  <FileText size="1em" />
                </span>
                <div>
                  <b>{name}</b>
                  <small>{state}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mk-card mk-table">
          <div className="mk-card-head">
            <b>Staff review queue</b>
            <small>3 to check</small>
          </div>
          <div className="mk-row is-head">
            <span>Conversation</span>
            <span>Outcome</span>
            <span>Duration</span>
            <span>Review</span>
          </div>
          {([
            ["New patient · 09:41", "Booked Thu 16:10", "2m 14s", "Handoff"],
            ["Reschedule · 09:12", "Moved to Fri", "1m 02s", "Approved"],
            ["Opening hours · 08:57", "Answered", "0m 38s", "Approved"],
            ["Prescription · 08:40", "Handed to staff", "1m 25s", "Handoff"],
          ] as const).map(([name, outcome, duration, review]) => (
            <div className="mk-row" key={name}>
              <span>
                <i className="mk-asset-mark" />
                {name}
              </span>
              <span>{outcome}</span>
              <span>{duration}</span>
              <em className={review === "Handoff" ? "is-down" : ""}>{review}</em>
            </div>
          ))}
        </div>
        <footer className="mk-app-foot">
          <Mic size="0.9em" /> Transcripts retained for 30 days · Staff review enabled
        </footer>
      </div>
      <aside className="mk-side mk-intake">
        <small className="mk-side-label">Structured intake</small>
        {[
          ["Reason", "Routine check-up"],
          ["Patient", "New · under 16"],
          ["Preferred", "Weekday after 15:30"],
          ["Booked", "Thu 16:10 · Dr Patel"],
        ].map(([label, value]) => (
          <div key={label} className="mk-intake-field">
            <small>{label}</small>
            <b>{value}</b>
          </div>
        ))}
        <div className="mk-handoff">
          <small>Routed to</small>
          <div>
            <Initials tone={2}>SM</Initials>
            <b>Sarah · Front desk</b>
          </div>
          <span className="mk-btn">Take over call</span>
        </div>
      </aside>
    </div>
  );
}

/* ── Website: architecture studio ──────────────────────────────────── */
function Editorial({ project, k = 1, km }: KindProps) {
  const { brand, headline } = project.mock;
  return (
    <div className="mk-site mk-scroller">
      <section className="mk-hero-full">
        <Photo name="arch-villa-dusk" w={1100} mv={95} k={k} km={km} position="50% 60%" />
        <span className="mk-hero-shade" />
        <nav className="mk-nav is-light">
          <b className="serif">{brand}</b>
          <span>Projects</span>
          <span>Studio</span>
          <span>Journal</span>
          <span className="mk-nav-cta">Enquire</span>
        </nav>
        <div className="mk-hero-copy">
          <small>Residential · Cultural · Civic</small>
          <b className="mk-display">{headline}</b>
        </div>
        <div className="mk-hero-meta">
          <span>The Dune House, 2024</span>
          <span>01 / 12</span>
        </div>
      </section>
      <section className="mk-section mk-statement">
        <small>The studio</small>
        <p className="mk-serif-lg">
          We design calm, enduring buildings that answer to their landscape, their light, and the
          people who live in them.
        </p>
        <div className="mk-facts">
          {[
            ["Founded", "2009"],
            ["Completed", "64 projects"],
            ["Studios", "London · Lisbon"],
          ].map(([label, value]) => (
            <span key={label}>
              <small>{label}</small>
              {value}
            </span>
          ))}
        </div>
      </section>
      <section className="mk-section">
        <div className="mk-section-head">
          <b className="serif">Selected projects</b>
          <span className="mk-link">All projects →</span>
        </div>
        <div className="mk-project-grid">
          <figure className="is-large">
            <Photo name="arch-concrete-cantilever" w={600} mv={60} k={k} km={km} />
            <figcaption>
              <b>The Quarry House</b>
              <small>Residential · 2024</small>
            </figcaption>
          </figure>
          <figure>
            <Photo name="arch-timber-curve" w={400} mv={40} k={k} km={km} />
            <figcaption>
              <b>Aldermoor Library</b>
              <small>Cultural · 2023</small>
            </figcaption>
          </figure>
          <figure>
            <Photo name="arch-house-evening" w={400} mv={40} k={k} km={km} />
            <figcaption>
              <b>Pier Pavilion</b>
              <small>Civic · 2022</small>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="mk-band">
        <Photo name="arch-skylight-timber" w={1100} mv={95} k={k} km={km} />
        <span className="mk-hero-shade" />
        <blockquote className="mk-serif-lg">
          “Light is the first material we design with, and the last one we adjust.”
        </blockquote>
      </section>
      <section className="mk-section mk-split-feature">
        <Photo name="arch-concrete-stair" w={500} mv={50} k={k} km={km} />
        <div>
          <small>Journal</small>
          {[
            ["Designing for slow light", "Essay · 12 Sep"],
            ["Concrete that ages well", "Notes · 28 Aug"],
            ["A library without walls", "Project · 04 Aug"],
          ].map(([title, meta]) => (
            <div className="mk-journal" key={title}>
              <b className="serif">{title}</b>
              <small>{meta}</small>
            </div>
          ))}
        </div>
      </section>
      <footer className="mk-site-foot">
        <b className="mk-display">Start a conversation.</b>
        <div>
          <span>studio@ateliervance.com</span>
          <span>12 Wharf Road, London</span>
          <span>Instagram · LinkedIn</span>
        </div>
      </footer>
    </div>
  );
}

/* ── Website: hospitality group ────────────────────────────────────── */
function Hospitality({ project, k = 1, km }: KindProps) {
  const { brand, headline } = project.mock;
  return (
    <div className="mk-site mk-scroller">
      <section className="mk-hero-full">
        <Photo name="hosp-suite-warm" w={1100} mv={95} k={k} km={km} position="50% 55%" />
        <span className="mk-hero-shade is-warm" />
        <nav className="mk-nav is-light">
          <b className="serif spaced">{brand}</b>
          <span>Stay</span>
          <span>Dine</span>
          <span>Gatherings</span>
          <span>Offers</span>
          <span className="mk-nav-cta is-solid">Book</span>
        </nav>
        <div className="mk-hero-copy">
          <small>Hotels · Restaurants · Gatherings</small>
          <b className="mk-display">{headline}</b>
        </div>
        <div className="mk-booking">
          {[
            ["Hotel", "Maison Alder, Arles"],
            ["Arrive", "Fri 17 Oct"],
            ["Depart", "Sun 19 Oct"],
            ["Guests", "2 adults"],
          ].map(([label, value]) => (
            <span key={label}>
              <small>{label}</small>
              {value}
            </span>
          ))}
          <span className="mk-btn">Check availability</span>
        </div>
      </section>
      <section className="mk-section mk-statement is-center">
        <small>Welcome</small>
        <p className="mk-serif-lg">
          Three houses, two kitchens, and one idea: that the best stays feel unhurried from the
          moment you arrive.
        </p>
      </section>
      <section className="mk-section">
        <div className="mk-section-head">
          <b className="serif">Stay</b>
          <span className="mk-link">All rooms →</span>
        </div>
        <div className="mk-rooms">
          {([
            ["hosp-suite-bright", "Garden Suite", "From €480 / night"],
            ["hosp-infinity-pool", "Pool Pavilion", "From €720 / night"],
          ] as const).map(([photo, name, price]) => (
            <figure key={name}>
              <Photo name={photo} w={520} mv={45} k={k} km={km} />
              <figcaption>
                <div>
                  <b className="serif">{name}</b>
                  <small>{price}</small>
                </div>
                <span className="mk-link">Reserve</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="mk-section mk-split-feature is-dark">
        <Photo name="hosp-dinner-candle" w={520} mv={50} k={k} km={km} />
        <div>
          <small>Dine</small>
          <b className="mk-display is-md">Seasonal, local, slow.</b>
          <p>Two restaurants led by the same kitchen: one by the fire, one under the plane trees.</p>
          <span className="mk-btn">View menus</span>
        </div>
      </section>
      <section className="mk-band is-tall">
        <Photo name="hosp-floating-breakfast" w={1100} mv={95} k={k} km={km} />
        <span className="mk-hero-shade" />
        <blockquote className="mk-serif-lg">Mornings, reconsidered.</blockquote>
      </section>
      <section className="mk-section mk-split-feature is-reverse">
        <Photo name="hosp-bar-candle" w={520} mv={50} k={k} km={km} />
        <div>
          <small>Gatherings</small>
          <b className="mk-display is-md">Rooms for every occasion.</b>
          <p>Private dinners, intimate weddings, and quiet retreats for up to 80 guests.</p>
          <span className="mk-link">Plan an event →</span>
        </div>
      </section>
      <footer className="mk-site-foot is-warm">
        <b className="mk-display">Letters from {brand}</b>
        <div>
          <span className="mk-input">Your email address</span>
          <span className="mk-btn">Subscribe</span>
        </div>
      </footer>
    </div>
  );
}

/* ── Phone screens ─────────────────────────────────────────────────── */
function MobileScreen({ project, k = 1 }: KindProps) {
  const { kind, brand, headline } = project.mock;
  if (kind === "editorial" || kind === "hospitality") {
    const hotel = kind === "hospitality";
    return (
      <div className={`mk-m mk-m-site mk-m-${kind}`}>
        <div className="mk-m-hero">
          <Photo name={hotel ? "hosp-suite-warm" : "arch-villa-dusk"} w={300} mv={0} k={k} position="50% 60%" />
          <span className="mk-hero-shade" />
          <nav>
            <b className="serif">{brand}</b>
            <i />
          </nav>
          <div>
            <small>{hotel ? "Hotels · Restaurants" : "Residential · Cultural"}</small>
            <b className="mk-display">{headline}</b>
          </div>
        </div>
        <div className="mk-m-body">
          <Photo name={hotel ? "hosp-dinner-candle" : "arch-concrete-cantilever"} w={300} mv={0} k={k} />
          <b className="serif">{hotel ? "Dine by the fire" : "The Quarry House"}</b>
          <small>{hotel ? "Seasonal menus · Book a table" : "Residential · 2024"}</small>
        </div>
        <span className="mk-btn">{hotel ? "Book a stay" : "View projects"}</span>
      </div>
    );
  }
  if (kind === "field") {
    return (
      <div className="mk-m mk-m-field">
        <nav>
          <b>{brand}</b>
          <span className="mk-live">Online</span>
        </nav>
        <small>Crew 04 · Wed 24 Sep</small>
        <div className="mk-card mk-m-job">
          <small>J-2042 · Current job</small>
          <b>Kingsway Retail Park</b>
          <span>
            <MapPin size="1em" /> Unit 6, Kingsway · On site 38 min
          </span>
          <div className="mk-progress">
            <i />
          </div>
        </div>
        <ul className="mk-m-checks">
          <li className="is-done">
            <CheckCircle2 size="1.1em" /> Arrived 09:14
          </li>
          <li className="is-done">
            <CheckCircle2 size="1.1em" /> 6 photos captured
          </li>
          <li>
            <i /> Customer sign-off
          </li>
        </ul>
        <div className="mk-m-thumbs">
          {["arch-concrete-stair", "abstract-concrete-curve", "arch-concrete-cantilever"].map((name) => (
            <Photo key={name} name={name} w={90} mv={0} k={k} />
          ))}
        </div>
        <span className="mk-btn mk-m-cta">Capture sign-off</span>
        <div className="mk-m-tabbar">
          <Route size="1.2em" />
          <Calendar size="1.2em" />
          <MapPin size="1.2em" />
          <Settings size="1.2em" />
        </div>
      </div>
    );
  }
  if (kind === "pipeline") {
    return (
      <div className="mk-m mk-m-pipeline">
        <nav>
          <b>{brand}</b>
          <Initials tone={2}>JB</Initials>
        </nav>
        <small>Deal · Proposal stage</small>
        <div className="mk-card mk-m-deal">
          <div className="mk-deal-top">
            <span className="mk-logo-mark">A</span>
            <b>Arden Partners</b>
          </div>
          <b className="mk-m-value">£65,000</b>
          <span className="mk-tag">Viewed 3 times</span>
        </div>
        <small className="mk-m-label">Activity</small>
        {(
          [
            [FileText, "Proposal viewed", "09:44"],
            [Calendar, "Call booked · Thu 14:00", "09:43"],
            [Mail, "Follow-up sent", "Mon"],
          ] as const
        ).map(([I, title, when]) => (
          <div className="mk-m-log" key={title}>
            <span className="mk-log-icon">
              <I size="1em" />
            </span>
            <b>{title}</b>
            <em>{when}</em>
          </div>
        ))}
        <span className="mk-btn mk-m-cta">
          <PhoneCall size="1em" /> Call Eleanor
        </span>
        <div className="mk-m-tabbar">
          <LayoutDashboard size="1.2em" />
          <Users size="1.2em" />
          <Calendar size="1.2em" />
          <Settings size="1.2em" />
        </div>
      </div>
    );
  }
  if (kind === "agent") {
    return (
      <div className="mk-m mk-m-agent">
        <nav className="mk-m-chat-head">
          <span className="mk-monogram">C</span>
          <div>
            <b>{brand}</b>
            <small>Assistant · replies instantly</small>
          </div>
        </nav>
        <div className="mk-thread">
          <p className="from-them">I’d like to book a first appointment for my daughter.</p>
          <p className="from-agent">Of course. Is this a routine check-up?</p>
          <p className="from-them">Yes, ideally next week after school.</p>
          <span className="mk-action-chip">
            <Calendar size="1em" /> 2 slots found
          </span>
          <div className="mk-m-slots">
            <span className="is-on">Thu 16:10</span>
            <span>Fri 15:40</span>
          </div>
        </div>
        <div className="mk-m-input">
          <span>Type a message…</span>
          <i>
            <Mic size="1em" />
          </i>
        </div>
      </div>
    );
  }
  return (
    <div className="mk-m">
      <nav>
        <b className="serif mk-m-brand">{brand}</b>
        <Initials>EC</Initials>
      </nav>
      <small>{headline}</small>
      <div className="mk-card mk-m-hero-card">
        <small>Portfolio value</small>
        <b>£4,826,310</b>
        <em>+2.4% this month</em>
        <svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true">
          <path d={`${trend} L300 90 L0 90 Z`} className="mk-area" />
          <path d={trend} className="mk-line" />
        </svg>
      </div>
      {(
        [
          ["Year to date", "+8.1%"],
          ["Income · 12 months", "£96,420"],
        ] as const
      ).map(([rowLabel, rowValue]) => (
        <div className="mk-card mk-m-row" key={rowLabel}>
          <span>{rowLabel}</span>
          <b>{rowValue}</b>
        </div>
      ))}
      <div className="mk-card mk-m-doc">
        <span className="mk-file">
          <FileText size="1em" />
        </span>
        <div>
          <b>Q3 Quarterly Review</b>
          <small>Ready to sign</small>
        </div>
      </div>
      <div className="mk-m-tabbar">
        <LayoutDashboard size="1.2em" />
        <PieChart size="1.2em" />
        <MessageSquare size="1.2em" />
        <Settings size="1.2em" />
      </div>
    </div>
  );
}

/* ── Pieces: single UI elements lifted out of each product for collages ── */
function PieceBody({ project, kind }: { project: Project; kind: PieceKind }) {
  const { brand } = project.mock;
  switch (kind) {
    case "kpi": {
      const data: Record<string, [string, string, string]> = {
        dashboard: ["Portfolio value", "£4,826,310", "+2.4% this month"],
        field: ["Jobs on time today", "17 / 24", "1 exception open"],
        pipeline: ["Open pipeline", "£233,000", "12 calls booked"],
        agent: ["Conversations today", "128", "14 handed to staff"],
        editorial: ["Projects", "64", "Residential · Civic"],
        hospitality: ["Tonight", "2 rooms left", "Garden Suite"],
      };
      const [label, value, note] = data[project.mock.kind] ?? ["", "", ""];
      return (
        <>
          <small>{label}</small>
          <b className="mk-piece-value">{value}</b>
          <div className="mk-kpi-foot">
            <em>{note}</em>
            <svg viewBox="0 0 60 22" aria-hidden="true">
              <path d={spark} />
            </svg>
          </div>
        </>
      );
    }
    case "docs": {
      const agent = project.mock.kind === "agent";
      const rows = agent
        ? [
            ["Services & fees", "14 approved answers"],
            ["Opening hours", "6 approved answers"],
            ["Never answered", "Clinical · billing"],
          ]
        : [
            ["Q3 Quarterly Review.pdf", "Signed · 12 Sep"],
            ["Tax Pack 2025–26.pdf", "Ready · 3 Sep"],
            ["Rebalancing Proposal.pdf", "Awaiting you"],
          ];
      return (
        <>
          <div className="mk-card-head">
            <b>{agent ? "Approved knowledge" : "Documents"}</b>
            <small>{agent ? "Reviewed 22 Sep" : "View all"}</small>
          </div>
          {rows.map(([name, state]) => (
            <div className="mk-doc" key={name}>
              <span className="mk-file">
                <FileText size="1em" />
              </span>
              <div>
                <b>{name}</b>
                <small>{state}</small>
              </div>
            </div>
          ))}
        </>
      );
    }
    case "adviser":
      return (
        <div className="mk-adviser">
          <Initials tone={1}>JW</Initials>
          <div>
            <small>Your adviser</small>
            <b>James Whitfield</b>
          </div>
          <span className="mk-icon-btn">
            <MessageSquare size="1em" />
          </span>
        </div>
      );
    case "allocation":
      return (
        <>
          <b>Allocation</b>
          <div className="mk-piece-row">
            <div className="mk-donut">
              <span>
                <b>58%</b>
              </span>
            </div>
            <ul className="mk-legend">
              {[
                ["Equities", "58%", 1],
                ["Fixed income", "24%", 2],
                ["Alternatives", "12%", 3],
                ["Cash", "6%", 4],
              ].map(([label, value, tone]) => (
                <li key={String(label)}>
                  <i className={`dot-${tone}`} />
                  {label}
                  <em>{value}</em>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    case "crew":
      return (
        <>
          <div className="mk-map-card-top">
            <Initials tone={1}>AM</Initials>
            <div>
              <small>Crew 04 · J-2042</small>
              <b>Kingsway Retail Park</b>
            </div>
            <span className="mk-live">Live</span>
          </div>
          <div className="mk-progress">
            <i />
          </div>
          <div className="mk-map-card-foot">
            <span>
              <MapPin size="1em" /> On site 38 min
            </span>
            <span>6 photos</span>
          </div>
        </>
      );
    case "alert": {
      const agent = project.mock.kind === "agent";
      return (
        <div className="mk-exception">
          {agent ? <ShieldCheck size="1.3em" className="mk-guard-icon" /> : <span className="mk-warn-dot" />}
          <div>
            <b>{agent ? "Clinical question" : "J-2043 running 12 min late"}</b>
            <small>{agent ? "Handed to Sarah with a summary" : "Customer notified automatically · 09:52"}</small>
          </div>
        </div>
      );
    }
    case "photos":
      return (
        <>
          <div className="mk-card-head">
            <b>Proof of work</b>
            <small>6 of 7 signed</small>
          </div>
          <div className="mk-thumbs">
            {["arch-concrete-stair", "arch-concrete-cantilever", "arch-house-evening", "abstract-concrete-curve"].map(
              (name) => (
                <Photo key={name} name={name} w={96} mv={0} />
              ),
            )}
          </div>
        </>
      );
    case "deal":
      return (
        <>
          <div className="mk-deal-top">
            <span className="mk-logo-mark">A</span>
            <b>Arden Partners</b>
          </div>
          <span className="mk-deal-value">£65,000</span>
          <div className="mk-deal-foot">
            <span className="mk-tag">Proposal viewed</span>
            <Initials tone={2}>JB</Initials>
          </div>
        </>
      );
    case "log":
      return (
        <>
          <div className="mk-card-head">
            <b>Automation log</b>
            <span className="mk-live">Live</span>
          </div>
          {(
            [
              [Sparkles, "Lead enriched", "Osprey Legal · 42 employees", "09:40"],
              [Route, "Routed to Sarah", "Legal sector rule", "09:41"],
              [Calendar, "Call booked", "Fenwick Group · Thu 14:00", "09:43"],
            ] as const
          ).map(([I, title, detail, when]) => (
            <div key={title} className="mk-log-item">
              <span className="mk-log-icon">
                <I size="1em" />
              </span>
              <div>
                <b>{title}</b>
                <small>{detail}</small>
              </div>
              <em>{when}</em>
            </div>
          ))}
        </>
      );
    case "toggles":
      return (
        <>
          <div className="mk-card-head">
            <b>Automations</b>
            <small>4 active</small>
          </div>
          {(
            [
              ["Owner routing", "Sector & region rules", true],
              ["Follow-up sequence", "3 touches over 10 days", true],
              ["No-show recovery", "Rebook within 24h", false],
            ] as const
          ).map(([name, rule, on]) => (
            <div className="mk-automation" key={name}>
              <span className={`mk-toggle ${on ? "is-on" : ""}`}>
                <i />
              </span>
              <div>
                <b>{name}</b>
                <small>{rule}</small>
              </div>
            </div>
          ))}
        </>
      );
    case "bubble":
      return (
        <p className="from-agent">
          <small>{brand} assistant</small>
          Thursday at 16:10 or Friday at 15:40 are available. Which suits you better?
        </p>
      );
    case "call":
      return (
        <div className="mk-top mk-call">
          <span className="mk-call-icon">
            <PhoneCall size="1em" />
          </span>
          <div>
            <small>Incoming call</small>
            <b>New patient enquiry</b>
          </div>
          <span className="mk-wave" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => (
              <i key={index} style={{ height: `${24 + ((index * 37) % 76)}%` }} />
            ))}
          </span>
          <span className="mk-live">02:14</span>
        </div>
      );
    case "intake":
      return (
        <>
          <small className="mk-side-label">Structured intake</small>
          {[
            ["Reason", "Routine check-up"],
            ["Patient", "New · under 16"],
            ["Booked", "Thu 16:10 · Dr Patel"],
          ].map(([label, value]) => (
            <div key={label} className="mk-intake-field">
              <small>{label}</small>
              <b>{value}</b>
            </div>
          ))}
        </>
      );
    case "booking":
      return (
        <div className="mk-booking">
          {[
            ["Arrive", "Fri 17 Oct"],
            ["Depart", "Sun 19 Oct"],
            ["Guests", "2 adults"],
          ].map(([label, value]) => (
            <span key={label}>
              <small>{label}</small>
              {value}
            </span>
          ))}
          <span className="mk-btn">Check availability</span>
        </div>
      );
    case "room":
      return (
        <figure>
          <Photo name="hosp-suite-bright" w={300} mv={0} />
          <figcaption>
            <div>
              <b className="serif">Garden Suite</b>
              <small>From €480 / night</small>
            </div>
            <span className="mk-link">Reserve</span>
          </figcaption>
        </figure>
      );
    case "project":
      return (
        <figure>
          <Photo name="arch-timber-curve" w={300} mv={0} />
          <figcaption>
            <b className="serif">Aldermoor Library</b>
            <small>Cultural · 2023</small>
          </figcaption>
        </figure>
      );
    case "type":
      return (
        <>
          <div className="mk-type-sample">
            <b className="serif">Aa</b>
            <div>
              <small>Display</small>
              <b>Instrument Serif</b>
            </div>
          </div>
          <div className="mk-swatches">
            {[project.mock.theme.ink, project.mock.theme.accent, project.mock.theme.line, project.mock.theme.bg].map(
              (colour, index) => (
                <i key={index} style={{ background: colour }} />
              ),
            )}
          </div>
        </>
      );
  }
}

/** A single element of a product's interface, sized by its container. */
export function Piece({ project, kind }: { project: Project; kind: PieceKind }) {
  return (
    <div className="mk-wrap" style={themeStyle(project)}>
      <div className={`mk-piece mk-piece-${kind} mk-${project.mock.kind}`}>
        <PieceBody project={project} kind={kind} />
      </div>
    </div>
  );
}

/* ── Shipped products: real screenshots in place of the mockups ────── */

/** A screenshot at full container width. `px` / `vw` are its rendered width (as for Photo). */
export function ShotImage({
  shot,
  px,
  vw = 95,
  priority = false,
}: {
  shot: Shot;
  px: number;
  vw?: number;
  /** The page's largest image above the fold: preload it instead of lazy loading. */
  priority?: boolean;
}) {
  const width = Math.max(64, Math.round(px));
  return (
    <Image
      className="mk-shot-img"
      src={shot.src}
      alt=""
      width={shot.w}
      height={shot.h}
      sizes={`(max-width: 900px) ${Math.max(10, Math.round(vw))}vw, ${width}px`}
      quality={85}
      priority={priority}
      // Every other screenshot is decorative: let CSS, fonts and the LCP image go first.
      fetchPriority={priority ? "high" : "low"}
    />
  );
}

/** Screen-height slices of a full page, `first` to `last` (inclusive), stacked seamlessly. */
function Slices({
  page,
  first,
  last,
  px,
  vw,
  priority,
}: {
  page: Shot;
  first: number;
  last: number;
  px: number;
  vw: number;
  priority: boolean;
}) {
  const { base, count } = page.slices!;
  const step = Math.round(page.w * 0.625);
  const items = [];
  for (let i = first; i <= last; i++) {
    const height = Math.min(step, page.h - i * step);
    const overlap = i < count - 1 ? 2 : 0;
    items.push(
      <span key={i} className="mk-slice" style={{ aspectRatio: `${page.w} / ${height}` }}>
        <ShotImage
          shot={{ src: `${base}-${i}.webp`, w: page.w, h: height + overlap }}
          px={px}
          vw={vw}
          priority={priority && i === first}
        />
      </span>,
    );
  }
  return <>{items}</>;
}

/** Phone-only products have no desktop page; a screen-shaped frame shows three phone screens. */
function ShotBoard({ project, k }: { project: Project; k: number }) {
  const shots = project.shots!;
  const keys = (shots.lineup ?? []).slice(0, 2);
  const screens = [keys[0] && shots.more[keys[0]], shots.phone, keys[1] && shots.more[keys[1]]];
  return (
    <div className="mk-shot-board">
      {screens.map((item, index) =>
        item ? (
          <span key={index} className={index === 1 ? "is-centre" : ""}>
            <ShotImage shot={item} px={300 * k} vw={30} />
          </span>
        ) : null,
      )}
    </div>
  );
}

function ShotScreen({
  project,
  shot,
  scroll,
  k,
  km,
  at,
  ar,
  main,
  priority,
}: {
  project: Project;
  shot?: Shot | undefined;
  scroll: boolean;
  k: number;
  km?: number | undefined;
  at: number;
  ar: number;
  main: boolean;
  priority: boolean;
}) {
  const page = shot ?? project.shots?.screen;
  const sidebar = project.shots?.sidebar ?? 0;
  // `main` views crop the sidebar by widening the page, so one page screen spans `scale` frame widths.
  const scale = main ? 1 / (1 - sidebar) : 1;
  const px = 1100 * k * scale;
  const vw = 95 * (km ?? k) * scale;
  let body: React.ReactNode = <ShotBoard project={project} k={k} />;
  if (page && page.slices && scroll) {
    body = (
      <div className="mk-scroller">
        <Slices page={page} first={0} last={page.slices.count - 1} px={px} vw={vw} priority={priority} />
      </div>
    );
  } else if (page && page.slices) {
    // Only the slices this frame shows: from `at` screens down, `ar` frame widths tall.
    const count = page.slices.count;
    const first = Math.min(count - 1, Math.floor(at / scale + 1e-6));
    const last = Math.min(count - 1, Math.max(first, Math.ceil((at * 0.625 + ar) / scale / 0.625 - 1e-6) - 1));
    const offset = at * 0.625 - first * 0.625 * scale;
    body = (
      <div className="mk-shot-page" style={{ marginTop: `${-offset * 100}cqw` }}>
        <Slices page={page} first={first} last={last} px={px} vw={vw} priority={priority} />
      </div>
    );
  } else if (page) {
    body = (
      <div className={scroll ? "mk-scroller" : "mk-shot-page"}>
        <ShotImage shot={page} px={px} vw={vw} priority={priority} />
      </div>
    );
  }
  return (
    <div className="mk-wrap" style={{ ...themeStyle(project), "--sidebar": sidebar } as CSSProperties}>
      <div className={`mk mk-shot ${scroll ? "is-scroll" : ""}`}>{body}</div>
    </div>
  );
}

/** A lifted element of a shipped product's interface, sized by its container. */
export function ShotPiece({ shot, px, vw }: { shot: Shot; px: number; vw: number }) {
  return (
    <div className="mk-shot-piece">
      <ShotImage shot={shot} px={px} vw={vw} />
    </div>
  );
}

const desktop = {
  dashboard: Dashboard,
  field: Field,
  pipeline: Pipeline,
  agent: Agent,
  editorial: Editorial,
  hospitality: Hospitality,
};

export function Screen({
  project,
  scroll = false,
  k = 1,
  km,
  shot,
  at,
  ar,
  main,
  priority,
}: {
  project: Project;
  scroll?: boolean;
  /** Rendered size relative to a full-size screen (for image sizing). */
  k?: number;
  km?: number | undefined;
  /** Shipped products: a screen other than the default page. */
  shot?: Shot | undefined;
  /** Shipped products in a collage: how far the page is scrolled (screens) and the frame's height ÷ width. */
  at?: number | undefined;
  ar?: number | undefined;
  /** Shipped products: crop the app's sidebar off the left. */
  main?: boolean | undefined;
  /** Preload this screen (the largest image above the fold). */
  priority?: boolean | undefined;
}) {
  if (project.shots)
    return (
      <ShotScreen
        project={project}
        shot={shot}
        scroll={scroll}
        k={k}
        km={km}
        at={at ?? 0}
        ar={ar ?? 0.625}
        main={Boolean(main)}
        priority={Boolean(priority)}
      />
    );
  const Kind = desktop[project.mock.kind];
  return (
    <div className="mk-wrap" style={themeStyle(project)}>
      <div className={`mk mk-${project.mock.kind} ${scroll ? "is-scroll" : ""}`}>
        <Kind project={project} k={k} km={km} />
      </div>
    </div>
  );
}

export const domain = (project: Project) =>
  project.mock.domain ?? `${project.mock.brand.toLowerCase().replace(/[^a-z]/g, "")}.com`;

export function Browser({
  project,
  scroll = false,
  k = 1,
  km,
}: {
  project: Project;
  scroll?: boolean;
  k?: number;
  km?: number | undefined;
}) {
  return (
    <div className="device-browser">
      <div className="browser-bar" aria-hidden="true">
        <span className="traffic">
          <i />
          <i />
          <i />
        </span>
        <span className="address">
          <Lock size={9} strokeWidth={2.5} />
          {domain(project)}
        </span>
        <span />
      </div>
      <Screen project={project} scroll={scroll} k={k} km={km} />
    </div>
  );
}

export function Laptop({
  project,
  scroll = false,
  tone = "silver",
  children,
}: {
  project?: Project;
  scroll?: boolean;
  tone?: "silver" | "black";
  /** Replaces the single screen, e.g. to crossfade between several. */
  children?: React.ReactNode;
}) {
  return (
    <div className={`device-laptop is-${tone}`}>
      <div className="laptop-lid">
        <span className="laptop-camera" aria-hidden="true" />
        <div className="laptop-screen">
          {children ?? (project ? <Screen project={project} scroll={scroll} /> : null)}
          <span className="laptop-glare" aria-hidden="true" />
        </div>
      </div>
      <div className="laptop-base" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}

export function Phone({
  project,
  k = 1,
  vw,
  shot,
}: {
  project: Project;
  k?: number;
  /** Rendered width in vw on small viewports, when the caller knows it (collages). */
  vw?: number | undefined;
  /** Shipped products: a screen other than the default phone screen. */
  shot?: Shot | undefined;
}) {
  const screen = shot ?? project.shots?.phone;
  return (
    <div className="device-phone">
      <div className="phone-bezel">
        <div className="phone-screen">
          <span className="phone-island" aria-hidden="true" />
          <div className="mk-wrap" style={themeStyle(project)}>
            {screen ? (
              <div className="mk-shot-phone">
                <ShotImage shot={screen} px={300 * k} vw={vw ?? 60 * k} />
              </div>
            ) : (
              <MobileScreen project={project} k={k} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
