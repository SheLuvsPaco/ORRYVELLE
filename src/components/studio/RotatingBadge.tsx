import { Plus } from "lucide-react";
import "./styles/rotating-badge.css";

/**
 * Circular text badge that slowly turns around a centre mark, set on the corner
 * of a form or card. Shared by the hero and enquiry sections.
 */
export default function RotatingBadge({
  text = "Start a project",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const label = `${text} · ${text} · `.toUpperCase();
  return (
    <span className={`rotating-badge ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <defs>
          <path id="rotating-badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text>
          <textPath href="#rotating-badge-circle" textLength="228">
            {label}
          </textPath>
        </text>
      </svg>
      <Plus size={16} strokeWidth={1.75} />
    </span>
  );
}
