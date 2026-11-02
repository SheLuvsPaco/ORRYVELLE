export default function OrryvelleMark({
  size = 44,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={`orryvelle-mark ${className}`}
      viewBox="0 0 72 72"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="2.15" strokeLinecap="square">
        <circle cx="29" cy="29" r="20.5" />
        <circle cx="29" cy="29" r="15" />
        <circle cx="29" cy="29" r="9.5" />
        <path d="M13 57 31.5 38.5 43 57 62 10" />
        <path d="M21 57 32.5 45.5 41 60 57 10" />
        <path d="M29 57 34 52 39 62 52 10" />
      </g>
    </svg>
  );
}
