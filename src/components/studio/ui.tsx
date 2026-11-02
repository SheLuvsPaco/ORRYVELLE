import Link from "next/link";
import {
  ArrowUpRight,
  Blocks,
  Bot,
  Building2,
  Code2,
  Compass,
  Database,
  Gauge,
  Handshake,
  KeyRound,
  LayoutTemplate,
  LifeBuoy,
  LineChart,
  MonitorSmartphone,
  Network,
  Palette,
  PenTool,
  Plug,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/studio/content";

const icons: Record<IconName, LucideIcon> = {
  software: Code2,
  enterprise: Building2,
  website: MonitorSmartphone,
  platform: Blocks,
  portal: KeyRound,
  mobile: Smartphone,
  api: Plug,
  data: Database,
  security: ShieldCheck,
  agent: Bot,
  workflow: Workflow,
  integration: Network,
  crm: Users,
  reporting: LineChart,
  brand: Palette,
  cms: LayoutTemplate,
  performance: Gauge,
  search: Search,
  craft: PenTool,
  partner: Handshake,
  clarity: Compass,
  support: LifeBuoy,
};

export function Icon({
  name,
  size = 22,
  strokeWidth = 1.5,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  const Component = icons[name];
  return <Component size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}

/** Crosshair marks on the four corners of the nearest positioned parent. */
export function Corners({ className = "" }: { className?: string }) {
  return (
    <span className={`corners ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function IconTile({
  name,
  size = 22,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`icon-tile ${className}`}>
      <Icon name={name} size={size} />
      <Corners />
    </span>
  );
}

export function Chip({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span className={`chip ${dark ? "chip-dark" : ""}`}>
      <span aria-hidden="true" className="chip-dot" />
      {children}
    </span>
  );
}

/** Heading text whose second half renders in the muted tone. */
export function TwoTone({ parts }: { parts: [string, string] }) {
  return (
    <>
      {parts[0]} <span className="tone">{parts[1]}</span>
    </>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light" | "ghost";
  className?: string;
}) {
  const external = href.startsWith("http");
  const classes = `btn btn-${variant} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <span className="btn-icon" aria-hidden="true">
        <ArrowUpRight size={17} />
        <ArrowUpRight size={17} />
      </span>
    </>
  );
  return external ? (
    <a href={href} className={classes} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function SectionIntro({
  chip,
  title,
  text,
  action,
  dark = false,
  center = false,
  as: Heading = "h2",
}: {
  chip: string;
  title: [string, string];
  text?: React.ReactNode;
  action?: React.ReactNode;
  dark?: boolean;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`section-intro ${center ? "is-center" : ""}`}>
      <div className="section-intro-copy" data-reveal>
        <Chip dark={dark}>{chip}</Chip>
        <Heading>
          {title[0]}
          <br />
          <span className="tone">{title[1]}</span>
        </Heading>
        {text ? <p>{text}</p> : null}
      </div>
      {action ? (
        <div className="section-intro-action" data-reveal style={{ "--d": 120 } as React.CSSProperties}>
          {action}
        </div>
      ) : null}
    </div>
  );
}
