import Image from "next/image";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarCheck,
  Check,
  ChevronDown,
  CornerUpRight,
  Eye,
  FileText,
  GripVertical,
  KeyRound,
  LayoutTemplate,
  LineChart,
  Lock,
  Mic,
  Monitor,
  Network,
  Palette,
  PenLine,
  Plug,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Tablet,
  Bot,
  Users,
  Workflow,
  Gauge,
  Compass,
  type LucideIcon,
} from "lucide-react";
import type { FragmentName } from "@/lib/studio/content";
import BrandLogo from "./BrandLogo";
import { translateTree } from "./tr";
import { Corners } from "./ui";
import "./styles/fragments.css";

/*
 * Small, precise pieces of illustrative product UI drawn inside service and
 * process cards. Everything is sized in em (1em = 12px at desktop) so a whole
 * fragment scales from one font-size. Content is generic by design: no client
 * names, no real data.
 */

/* ── Primitives ──────────────────────────────────────── */

/** Square icon tile with crosshair corners that floats at a fragment's edge. */
export function Tile({ icon: Glyph, className = "" }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={`fr-tile ${className}`}>
      <Glyph size="1.5em" strokeWidth={1.5} />
      <Corners />
    </span>
  );
}

/** Dark translucent tile with crosshair corners. */
export function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`fr-glass ${className}`}>
      {children}
      <Corners />
    </div>
  );
}

/** White product surface inside a thin dark rim. */
export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`fr-panel ${className}`}>{children}</div>;
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "ok" | "accent" | "neutral" | "dark";
}) {
  return <span className={`fr-pill is-${tone}`}>{children}</span>;
}

export function Toggle({ on = false }: { on?: boolean }) {
  return <i className={`fr-toggle ${on ? "is-on" : ""}`} />;
}

function Tick({ tone = "ok" }: { tone?: "ok" | "ink" | "pending" }) {
  return (
    <span className={`fr-tick is-${tone}`}>
      {tone === "pending" ? null : <Check size="0.85em" strokeWidth={3} />}
    </span>
  );
}

function Bar({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`fr-bar ${className}`}>{children}</div>;
}

function Photo({ name, position }: { name: string; position?: string }) {
  return (
    <Image
      src={`/images/studio/${name}.jpg`}
      alt=""
      fill
      sizes="420px"
      fetchPriority="low"
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

function Swatches() {
  return (
    <Glass className="fr-swatches">
      <i style={{ background: "#fcfbf7" }} />
      <i style={{ background: "#d8c8ae" }} />
      <i style={{ background: "#cf4921" }} />
      <i style={{ background: "#252721" }} />
    </Glass>
  );
}

/* ── Custom software ─────────────────────────────────── */

function CodeBody({ lines }: { lines: [string, string][] }) {
  return (
    <ol className="fr-code">
      <li>{"{"}</li>
      {lines.map(([key, value], index) => (
        <li key={key}>
          <b>&quot;{key}&quot;</b>: <span className={value.startsWith('"') ? "is-str" : "is-num"}>{value}</span>
          {index < lines.length - 1 ? "," : ""}
        </li>
      ))}
      <li>{"}"}</li>
    </ol>
  );
}

function ApiBar({ path }: { path: string }) {
  return (
    <Bar className="fr-api-bar">
      <span className="fr-method">GET</span>
      <code>{path}</code>
      <Pill tone="ok">200 OK</Pill>
      <small>84 ms</small>
    </Bar>
  );
}

function Software() {
  return (
    <div className="fr fr-software">
      <Panel className="fr-software-panel">
        <ApiBar path="/v1/accounts/acc_7Hq2" />
        <CodeBody
          lines={[
            ["id", '"acc_7Hq2"'],
            ["plan", '"team"'],
            ["seats", "12"],
            ["role", '"finance"'],
            ["mfa", "true"],
            ["status", '"active"'],
          ]}
        />
        <ul className="fr-requests">
          {[
            ["POST", "/v1/invoices", "201"],
            ["PATCH", "/v1/roles/finance", "200"],
            ["GET", "/v1/audit-log", "200"],
          ].map(([method, path, code]) => (
            <li key={path}>
              <code className="fr-verb">{method}</code>
              <code>{path}</code>
              <code className="fr-status">{code}</code>
            </li>
          ))}
        </ul>
      </Panel>
      <Glass className="fr-perm">
        <span className="fr-perm-head">
          <small>Role</small>
          <b>Finance lead</b>
          <ChevronDown size="1.1em" />
        </span>
        <span>
          View invoices <Toggle on />
        </span>
        <span>
          Approve payouts <Toggle />
        </span>
        <span>
          Export reports <Toggle on />
        </span>
      </Glass>
      <Tile icon={KeyRound} className="fr-software-tile-a" />
      <Tile icon={Plug} className="fr-software-tile-b" />
    </div>
  );
}

function Members() {
  const rows: [string, string, string, string][] = [
    ["OL", "Operations lead", "ops@company.com", "Owner"],
    ["FI", "Finance", "finance@company.com", "Admin"],
    ["FT", "Field team", "6 members", "Member"],
    ["CO", "Contractors", "2 members", "Viewer"],
  ];
  return (
    <div className="fr fr-members">
      <Panel className="fr-members-panel">
        <Bar>
          <b>Workspace</b>
          <span className="fr-tabs">
            <i className="is-active">Members</i>
            <i>Roles</i>
            <i>Billing</i>
          </span>
          <span className="fr-btn is-dark">
            <Plus size="1em" /> Invite
          </span>
        </Bar>
        <div className="fr-seats">
          <span>
            Seats <b>12 of 20</b>
          </span>
          <i>
            <i style={{ width: "60%" }} />
          </i>
        </div>
        <ul className="fr-rows">
          {rows.map(([initials, name, meta, role], index) => (
            <li key={name} className={index === 1 ? "is-selected" : ""}>
              <span className="fr-avatar">{initials}</span>
              <span>
                <b>{name}</b>
                <small>{meta}</small>
              </span>
              <span className="fr-select">
                {role} <ChevronDown size="1em" />
              </span>
            </li>
          ))}
        </ul>
        <small className="fr-foot">Role changes are recorded in the audit log</small>
      </Panel>
      <Glass className="fr-roleswitch">
        <small>Change role</small>
        <span className="fr-segment">
          <i>Admin</i>
          <i className="is-active">Editor</i>
          <i>Viewer</i>
        </span>
      </Glass>
      <Tile icon={Users} className="fr-members-tile" />
    </div>
  );
}

function Vault() {
  const docs: [string, string, "ok" | "neutral" | "accent", string][] = [
    ["Quarterly report.pdf", "PDF · 2.4 MB", "neutral", "Viewed"],
    ["Engagement letter.pdf", "PDF · 180 KB", "ok", "Signed"],
    ["Onboarding pack.zip", "ZIP · 12 MB", "accent", "New"],
  ];
  return (
    <div className="fr fr-vault">
      <Panel className="fr-vault-panel">
        <Bar>
          <b>Documents</b>
          <span className="fr-muted">
            <Lock size="1em" /> Private
          </span>
          <Search size="1.1em" className="fr-end" />
        </Bar>
        <ul className="fr-rows">
          {docs.map(([name, meta, tone, status]) => (
            <li key={name}>
              <span className="fr-file">
                <FileText size="1.15em" strokeWidth={1.5} />
              </span>
              <span>
                <b>{name}</b>
                <small>{meta}</small>
              </span>
              <Pill tone={tone}>
                {status === "Viewed" ? <Eye size="1em" /> : status === "Signed" ? <Check size="1em" /> : null}
                {status}
              </Pill>
            </li>
          ))}
        </ul>
        <small className="fr-foot is-end">3 files · visible to your account team</small>
      </Panel>
      <Glass className="fr-vault-glass">
        <Eye size="1.2em" />
        <span>
          <b>Opened by client</b>
          <small>Read receipt · 09:14</small>
        </span>
      </Glass>
      <Tile icon={KeyRound} className="fr-vault-tile" />
    </div>
  );
}

function Spark({ points, className = "" }: { points: string; className?: string }) {
  return (
    <svg className={`fr-spark ${className}`} viewBox="0 0 100 32" preserveAspectRatio="none">
      <polyline points={points} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Kpi() {
  return (
    <div className="fr fr-kpi">
      <Panel className="fr-kpi-panel">
        <Bar>
          <b>Operations</b>
          <span className="fr-muted">Today</span>
          <span className="fr-select fr-end">
            All sites <ChevronDown size="1em" />
          </span>
        </Bar>
        <div className="fr-kpis">
          <div>
            <small>Open orders</small>
            <b>128</b>
            <Spark points="0,26 12,22 24,24 36,15 48,18 60,11 72,13 84,6 100,8" />
          </div>
          <div>
            <small>Awaiting approval</small>
            <b>
              14 <i className="fr-dot is-accent" />
            </b>
            <Spark points="0,10 14,14 28,12 42,20 56,17 70,22 84,19 100,24" className="is-muted" />
          </div>
        </div>
        <ul className="fr-rows is-compact">
          <li>
            <code>#4471</code>
            <span>Refund request</span>
            <span className="fr-btn is-dark">Approve</span>
          </li>
          <li>
            <code>#4468</code>
            <span>Stock transfer</span>
            <span className="fr-btn">Review</span>
          </li>
        </ul>
      </Panel>
      <Glass className="fr-kpi-glass">
        <RefreshCw size="1.1em" />
        <span>
          <b>Synced from ERP</b>
          <small>just now</small>
        </span>
      </Glass>
      <Tile icon={LineChart} className="fr-kpi-tile" />
    </div>
  );
}

function Api() {
  return (
    <div className="fr fr-api">
      <Panel className="fr-api-panel">
        <ApiBar path="/v1/orders/4471" />
        <CodeBody
          lines={[
            ["id", '"ord_4471"'],
            ["status", '"paid"'],
            ["total", "240.00"],
            ["currency", '"GBP"'],
          ]}
        />
      </Panel>
      <Glass className="fr-api-glass">
        <Send size="1.1em" />
        <span>
          <b>Webhook · order.paid</b>
          <small>Delivered · 2 endpoints</small>
        </span>
      </Glass>
      <Tile icon={Plug} className="fr-api-tile" />
    </div>
  );
}

function Mobile() {
  return (
    <div className="fr fr-mobile">
      <div className="fr-phone">
        <div className="fr-phone-screen">
          <span className="fr-phone-status">
            <b>9:41</b>
            <i />
          </span>
          <span className="fr-phone-head">
            <small>Thursday</small>
            <b>Today</b>
          </span>
          <ul>
            <li className="is-active">
              <small>09:30 · Site visit</small>
              <b>North depot</b>
              <Pill tone="ok">Confirmed</Pill>
            </li>
            <li>
              <small>13:00 · Inspection</small>
              <b>Unit 4 handover</b>
              <Pill>3 photos</Pill>
            </li>
            <li>
              <small>15:30 · Delivery</small>
              <b>Warehouse B</b>
            </li>
          </ul>
        </div>
      </div>
      <Glass className="fr-mobile-glass">
        <Bell size="1.1em" />
        <span>
          <b>Job updated</b>
          <small>Photos uploaded from site</small>
        </span>
      </Glass>
      <Tile icon={Smartphone} className="fr-mobile-tile" />
    </div>
  );
}

function Checks() {
  const stages: [string, string][] = [
    ["Type check", "12s"],
    ["Lint", "8s"],
    ["Unit tests", "41s"],
    ["End-to-end", "1m 52s"],
    ["Preview", "Deployed"],
  ];
  return (
    <div className="fr fr-checks">
      <Panel className="fr-checks-panel">
        <Bar>
          <b>Add invoice export</b>
          <span className="fr-branch">feature/invoices → main</span>
          <Pill tone="ok">
            <Check size="1em" /> All checks passed
          </Pill>
        </Bar>
        <ol className="fr-pipeline">
          {stages.map(([name, time]) => (
            <li key={name}>
              <Tick />
              <b>{name}</b>
              <small>{time}</small>
            </li>
          ))}
        </ol>
        <div className="fr-docs">
          {["README.md", "ARCHITECTURE.md", "RUNBOOK.md", "CHANGELOG.md"].map((file) => (
            <span key={file}>
              <FileText size="1em" strokeWidth={1.5} />
              {file}
            </span>
          ))}
        </div>
      </Panel>
      <Glass className="fr-checks-glass">
        <ShieldCheck size="1.2em" />
        <span>
          <b>Ready to merge</b>
          <small>1 approving review</small>
        </span>
      </Glass>
      <Tile icon={ShieldCheck} className="fr-checks-tile" />
    </div>
  );
}

/* ── Enterprise solutions ────────────────────────────── */

function Agent() {
  return (
    <div className="fr fr-agent">
      <Panel className="fr-agent-panel">
        <Bar>
          <span className="fr-avatar is-ink">
            <Bot size="1.2em" strokeWidth={1.5} />
          </span>
          <span className="fr-stack">
            <b>Assistant</b>
            <small>
              <i className="fr-dot is-live" /> Online · chat &amp; voice
            </small>
          </span>
          <span className="fr-muted fr-end">
            <BookOpen size="1em" /> Approved sources
          </span>
        </Bar>
        <div className="fr-thread">
          <p className="fr-bubble is-them">Can you change the delivery address on order #4471?</p>
          <p className="fr-bubble is-agent">
            It’s already with the courier, so a person needs to approve that. I’ve passed it to
            the support team with the order details.
          </p>
          <span className="fr-escalated">
            <CornerUpRight size="1em" /> Escalated to staff
            <small>Support queue</small>
          </span>
        </div>
        <div className="fr-input">
          Reply as staff…
          <Send size="1.1em" />
        </div>
      </Panel>
      <Glass className="fr-voice">
        <Mic size="1.1em" />
        <span className="fr-wave" aria-hidden="true">
          {[5, 9, 14, 8, 12, 6, 10, 15, 7, 11, 5, 8].map((height, index) => (
            <i key={index} style={{ height: `${height / 12}em` }} />
          ))}
        </span>
        <small>02:14</small>
      </Glass>
      <Tile icon={Bot} className="fr-agent-tile" />
    </div>
  );
}

function RunLog() {
  const steps: [string, string, string, "ok" | "pending"][] = [
    ["Trigger", "Form submitted", "0.0s", "ok"],
    ["Enrich", "Company lookup", "0.6s", "ok"],
    ["Route", "Sales · EMEA", "0.9s", "ok"],
    ["Notify", "Slack #new-leads", "1.1s", "ok"],
    ["Follow up", "Email in 2 days", "queued", "pending"],
  ];
  return (
    <div className="fr fr-runlog">
      <Panel className="fr-runlog-panel">
        <Bar>
          <Workflow size="1.2em" strokeWidth={1.5} />
          <b>New enquiry → CRM</b>
          <span className="fr-muted fr-end">
            <i className="fr-dot is-live" /> Live
          </span>
        </Bar>
        <ol className="fr-steps">
          {steps.map(([name, detail, time, state]) => (
            <li key={name} className={state === "pending" ? "is-pending" : ""}>
              <Tick tone={state} />
              <b>{name}</b>
              <span>{detail}</span>
              <code>{time}</code>
            </li>
          ))}
        </ol>
        <small className="fr-foot is-end">Last run 2 min ago</small>
      </Panel>
      <Glass className="fr-runlog-glass">
        <RefreshCw size="1.1em" />
        <span>
          <b>3 retries, then alert</b>
          <small>Owner · Operations</small>
        </span>
      </Glass>
      <Tile icon={Workflow} className="fr-runlog-tile" />
    </div>
  );
}

function Pipeline() {
  return (
    <div className="fr fr-pipeline-board">
      <Panel className="fr-board-panel">
        <Bar>
          <b>Pipeline</b>
          <span className="fr-select fr-end">
            This month <ChevronDown size="1em" />
          </span>
        </Bar>
        <div className="fr-board">
          <div>
            <small>
              New <i>3</i>
            </small>
            <span className="fr-card">
              <b>Website enquiry</b>
              <small>Unassigned</small>
            </span>
            <span className="fr-card is-ghost" />
          </div>
          <div>
            <small>
              Qualified <i>2</i>
            </small>
            <span className="fr-card">
              <b>Referral</b>
              <small>Owner · Sales</small>
            </span>
          </div>
          <div>
            <small>
              Booked <i>1</i>
            </small>
            <span className="fr-card is-lifted">
              <b>Webinar sign-up</b>
              <small>
                <CalendarCheck size="1em" /> Intro call · Thu 10:30
              </small>
            </span>
          </div>
        </div>
      </Panel>
      <Glass className="fr-board-glass">
        <CalendarCheck size="1.1em" />
        <span>
          <b>Call booked</b>
          <small>Invite &amp; reminder sent</small>
        </span>
      </Glass>
      <Tile icon={Users} className="fr-board-tile" />
    </div>
  );
}

function Sync() {
  return (
    <div className="fr fr-sync">
      <div className="fr-nodes">
        <span className="fr-node">
          <BrandLogo name="HubSpot" size={22} />
          <small>CRM</small>
        </span>
        <span className="fr-link" aria-hidden="true">
          <i />
          <RefreshCw size="1em" />
          <i />
        </span>
        <span className="fr-node">
          <BrandLogo name="Xero" size={22} />
          <small>Accounts</small>
        </span>
      </div>
      <Panel className="fr-sync-panel">
        <Bar>
          <b>Field mapping</b>
          <Pill tone="ok">
            <Check size="1em" /> Synced
          </Pill>
        </Bar>
        <ul className="fr-map">
          {[
            ["company.name", "Contact.Name"],
            ["deal.amount", "Invoice.Total"],
            ["deal.stage", "Invoice.Status"],
          ].map(([from, to]) => (
            <li key={from}>
              <code>{from}</code>
              <ArrowRight size="1em" />
              <code>{to}</code>
            </li>
          ))}
        </ul>
        <small className="fr-foot">Last sync 2 min ago · 0 errors</small>
      </Panel>
      <Tile icon={Network} className="fr-sync-tile" />
    </div>
  );
}

function Chart() {
  const bars = [38, 52, 44, 61, 57, 72, 66, 84, 78, 92];
  return (
    <div className="fr fr-chart">
      <Panel className="fr-chart-panel">
        <Bar>
          <b>Weekly overview</b>
          <span className="fr-select fr-end">
            This quarter <ChevronDown size="1em" />
          </span>
        </Bar>
        <div className="fr-chart-head">
          <span>
            <small>Qualified leads</small>
            <b>46</b>
          </span>
          <Pill tone="ok">▲ 12%</Pill>
        </div>
        <div className="fr-bars">
          {bars.map((height, index) => (
            <i
              key={index}
              className={index === bars.length - 3 ? "is-hot" : ""}
              style={{ height: `${height}%` }}
            />
          ))}
          <span className="fr-tip">Week 8 · 41</span>
        </div>
      </Panel>
      <Glass className="fr-chart-glass">
        <Send size="1.1em" />
        <span>
          <b>Mondays, 08:00</b>
          <small>Sent to leadership</small>
        </span>
      </Glass>
      <Tile icon={LineChart} className="fr-chart-tile" />
    </div>
  );
}

function Audit() {
  return (
    <div className="fr fr-audit">
      <Panel className="fr-audit-panel">
        <div className="fr-approval">
          <Pill tone="accent">Approval required</Pill>
          <b>Refund above limit</b>
          <p>The agent drafted a refund that needs a manager’s sign-off.</p>
          <span className="fr-actions">
            <span className="fr-btn is-dark">
              <Check size="1em" /> Approve
            </span>
            <span className="fr-btn">Decline</span>
          </span>
        </div>
        <div className="fr-permissions">
          <small>Permissions · Agent</small>
          <span>
            Issue refunds <Toggle />
          </span>
          <span>
            Update CRM records <Toggle on />
          </span>
          <span>
            Email customers <Toggle on />
          </span>
        </div>
        <ol className="fr-trail">
          <small>Audit trail</small>
          {[
            ["10:42", "Agent drafted refund"],
            ["10:43", "Routed to Finance"],
            ["10:51", "Approved by manager"],
            ["10:51", "Customer notified"],
          ].map(([time, text]) => (
            <li key={text}>
              <code>{time}</code>
              {text}
            </li>
          ))}
        </ol>
      </Panel>
      <Tile icon={ShieldCheck} className="fr-audit-tile" />
    </div>
  );
}

/* ── Websites ────────────────────────────────────────── */

function Editor() {
  return (
    <div className="fr fr-editor">
      <Panel className="fr-editor-panel">
        <Bar className="fr-editor-bar">
          <span className="fr-mark" />
          <span className="fr-select">
            Home <ChevronDown size="1em" />
          </span>
          <span className="fr-devices">
            <Monitor size="1.1em" className="is-active" />
            <Tablet size="1.1em" />
            <Smartphone size="1.1em" />
          </span>
          <span className="fr-btn is-accent fr-end">Publish</span>
        </Bar>
        <div className="fr-site">
          <Photo name="arch-villa-dusk" position="50% 60%" />
          <span className="fr-site-nav">
            <i />
            <span>Projects</span>
            <span>Studio</span>
            <span>Journal</span>
          </span>
          <span className="fr-site-title">
            Designed around
            <br />
            the way you live.
          </span>
          <span className="fr-selection">
            <span className="fr-selection-tag">
              <PenLine size="1em" /> Edit section
            </span>
          </span>
        </div>
      </Panel>
      <Glass className="fr-type">
        <b>Aa</b>
        <small>Site typography</small>
      </Glass>
      <Swatches />
      <Tile icon={Palette} className="fr-editor-tile" />
    </div>
  );
}

function Outline() {
  const sections: [string, string][] = [
    ["Hero", "Promise"],
    ["Proof", "Trust"],
    ["Services", "Clarity"],
    ["Process", "Confidence"],
    ["Enquiry", "Action"],
  ];
  return (
    <div className="fr fr-outline">
      <Panel className="fr-outline-panel">
        <Bar>
          <b>Home · page plan</b>
          <span className="fr-muted fr-end">5 sections</span>
        </Bar>
        <ol className="fr-rows is-compact">
          {sections.map(([name, job], index) => (
            <li key={name} className={index === 1 ? "is-selected" : ""}>
              <GripVertical size="1em" className="fr-grip" />
              <code>0{index + 1}</code>
              <b>{name}</b>
              <Pill tone={index === 1 ? "dark" : "neutral"}>{job}</Pill>
            </li>
          ))}
        </ol>
        <small className="fr-foot is-end">Autosaved</small>
      </Panel>
      <Glass className="fr-outline-glass">
        <small>Answers</small>
        <b>“Have they done this before?”</b>
      </Glass>
      <Tile icon={Compass} className="fr-outline-tile" />
    </div>
  );
}

function Cms() {
  return (
    <div className="fr fr-cms">
      <Panel className="fr-cms-panel">
        <Bar>
          <span className="fr-muted">Pages /</span>
          <b>About</b>
          <Pill>Draft</Pill>
        </Bar>
        <div className="fr-fields">
          <label>
            <small>Headline</small>
            <span className="fr-field is-focus">
              A studio built on patience<i className="fr-caret" />
            </span>
          </label>
          <label>
            <small>Hero image</small>
            <span className="fr-field is-image">
              <span className="fr-thumb">
                <Photo name="arch-timber-curve" />
              </span>
              timber-hall.jpg
              <span className="fr-muted fr-end">Replace</span>
            </span>
          </label>
        </div>
        <div className="fr-cms-foot">
          <small>
            <Check size="1em" /> Saved just now
          </small>
          <span className="fr-btn is-dark">Publish</span>
        </div>
      </Panel>
      <Glass className="fr-cms-glass">
        <Lock size="1.1em" />
        <span>
          <b>Layout locked</b>
          <small>Content stays editable</small>
        </span>
      </Glass>
      <Tile icon={LayoutTemplate} className="fr-cms-tile" />
    </div>
  );
}

function Ring({ value, size = "big" }: { value: number; size?: "big" | "small" }) {
  const radius = 15.9155;
  return (
    <svg className={`fr-ring is-${size}`} viewBox="0 0 36 36">
      <circle cx="18" cy="18" r={radius} />
      <circle cx="18" cy="18" r={radius} strokeDasharray={`${value} ${100 - value}`} strokeDashoffset="25" />
      <text x="18" y="18" dominantBaseline="central" textAnchor="middle">
        {value}
      </text>
    </svg>
  );
}

function Speed() {
  return (
    <div className="fr fr-speed">
      <Panel className="fr-speed-panel">
        <Bar>
          <b>Performance report</b>
          <span className="fr-select fr-end">
            Mobile <ChevronDown size="1em" />
          </span>
        </Bar>
        <div className="fr-speed-body">
          <span className="fr-speed-main">
            <Ring value={98} />
            <small>Performance</small>
          </span>
          <ul className="fr-metrics">
            {[
              ["Largest paint", "1.1 s"],
              ["Layout shift", "0.01"],
              ["Interaction", "60 ms"],
            ].map(([label, value]) => (
              <li key={label}>
                <i className="fr-dot is-live" />
                {label}
                <b>{value}</b>
              </li>
            ))}
          </ul>
        </div>
        <small className="fr-foot is-end">Lab test · mobile profile</small>
      </Panel>
      <Glass className="fr-speed-glass">
        {[
          [100, "A11y"],
          [100, "SEO"],
        ].map(([value, label]) => (
          <span key={label}>
            <Ring value={value as number} size="small" />
            <small>{label}</small>
          </span>
        ))}
      </Glass>
      <Tile icon={Gauge} className="fr-speed-tile" />
    </div>
  );
}

function Serp() {
  return (
    <div className="fr fr-serp">
      <Panel className="fr-serp-panel">
        <div className="fr-serp-query">
          <Search size="1.1em" />
          bespoke joinery studio
        </div>
        <div className="fr-result">
          <span className="fr-result-site">
            <i />
            <span>
              <b>Your Brand</b>
              <small>yourbrand.com › services</small>
            </span>
          </span>
          <b className="fr-result-title">Bespoke Joinery &amp; Fitted Interiors | Your Brand</b>
          <p>Hand-built kitchens, libraries and storage, designed around the way each room is used…</p>
        </div>
        <div className="fr-schema">
          {["Organization", "Breadcrumbs", "FAQ"].map((item) => (
            <span key={item}>
              <Check size="1em" /> {item}
            </span>
          ))}
        </div>
      </Panel>
      <Glass className="fr-serp-glass">
        <b>sitemap.xml</b>
        <small>Submitted</small>
      </Glass>
      <Tile icon={Search} className="fr-serp-tile" />
    </div>
  );
}

function Enquiry() {
  return (
    <div className="fr fr-enquiry">
      <Panel className="fr-enquiry-form">
        <Bar>
          <b>New enquiry</b>
          <span className="fr-muted fr-end">Website form</span>
        </Bar>
        <div className="fr-fields">
          {[
            ["Service", "New website"],
            ["Timeline", "This quarter"],
            ["Budget", "To discuss"],
          ].map(([label, value]) => (
            <label key={label}>
              <small>{label}</small>
              <span className="fr-field">{value}</span>
            </label>
          ))}
        </div>
      </Panel>
      <span className="fr-flow is-a" aria-hidden="true">
        <Tick />
      </span>
      <Panel className="fr-enquiry-crm">
        <Bar>
          <b>Deal created</b>
          <Pill tone="ok">CRM</Pill>
        </Bar>
        <dl>
          <div>
            <dt>Source</dt>
            <dd>Organic search</dd>
          </div>
          <div>
            <dt>Stage</dt>
            <dd>New enquiry</dd>
          </div>
          <div>
            <dt>Owner</dt>
            <dd>Assigned</dd>
          </div>
        </dl>
      </Panel>
      <span className="fr-flow is-b" aria-hidden="true">
        <Tick />
      </span>
      <Panel className="fr-enquiry-cal">
        <Bar>
          <CalendarCheck size="1.1em" />
          <b>Intro call</b>
        </Bar>
        <span className="fr-date">
          <small>Thu</small>
          <b>10:30</b>
        </span>
        <Pill tone="ok">
          <Check size="1em" /> Invite sent
        </Pill>
      </Panel>
      <Tile icon={Network} className="fr-enquiry-tile" />
    </div>
  );
}

const fragments: Record<FragmentName, () => React.ReactElement> = {
  software: Software,
  members: Members,
  vault: Vault,
  kpi: Kpi,
  api: Api,
  mobile: Mobile,
  checks: Checks,
  agent: Agent,
  runlog: RunLog,
  pipeline: Pipeline,
  sync: Sync,
  chart: Chart,
  audit: Audit,
  editor: Editor,
  outline: Outline,
  cms: Cms,
  speed: Speed,
  serp: Serp,
  enquiry: Enquiry,
};

/**
 * Renders a named UI fragment. Decorative: always wrap in an aria-hidden container. On /bg
 * pages its text is translated after rendering (table in src/content/bg/ui.ts).
 */
export default function Fragment({ name }: { name: FragmentName }) {
  return <>{translateTree(fragments[name]())}</>;
}
