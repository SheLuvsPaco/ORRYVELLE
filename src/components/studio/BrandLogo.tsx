import Image from "next/image";
import "./styles/brand-logo.css";

const brands: Record<string, { file: string; label?: string; scale?: number }> =
  {
    Salesforce: { file: "salesforce", scale: 1.12 },
    HubSpot: { file: "hubspot" },
    Stripe: { file: "stripe" },
    Shopify: { file: "shopify" },
    Xero: { file: "xero" },
    Airtable: { file: "airtable" },
    Slack: { file: "slack" },
    "Google Workspace": { file: "google" },
    "Microsoft 365": { file: "microsoft" },
    Notion: { file: "notion" },
    Twilio: { file: "twilio" },
    OpenAI: { file: "openai", scale: 1.2 },
    "Next.js": { file: "nextjs" },
    React: { file: "react" },
    TypeScript: { file: "typescript" },
    "Node.js": { file: "nodejs" },
    PostgreSQL: { file: "postgresql" },
    Vercel: { file: "vercel" },
    AWS: { file: "aws", scale: 1.2 },
    Anthropic: { file: "anthropic" },
    n8n: { file: "n8n", scale: 1.15 },
  };

/** Local vector marks; adjacent visible brand names provide their accessible labels. */
export default function BrandLogo({
  name,
  size = 28,
}: {
  name: string;
  size?: number;
}) {
  const brand = brands[name];
  if (!brand) throw new Error(`Missing brand asset: ${name}`);
  return (
    <span
      className="brand-logo"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image
        src={`/images/brands/${brand.file}.svg`}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        unoptimized
        style={{ transform: `scale(${brand.scale || 1})` }}
      />
    </span>
  );
}
