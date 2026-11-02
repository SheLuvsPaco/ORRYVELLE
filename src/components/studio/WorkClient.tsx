"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./styles/work-client.css";

/** Horizontal rail of work cards with a position counter and previous/next controls. */
export type RailLabels = { conceptNote: string; previous: string; next: string; position: string[] };

export function RailShell({
  label,
  count,
  hasConcepts,
  labels,
  children,
}: {
  label: string;
  count: number;
  hasConcepts: boolean;
  /** Interface text in the page's language; `position[i]` reads "first visible project i+1 of n". */
  labels: RailLabels;
  children: React.ReactNode;
}) {
  const id = useId();
  const [position, setPosition] = useState({ start: true, end: false, index: 1 });
  const track = useRef<HTMLUListElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const card = element.querySelector("li");
        const gap = parseFloat(getComputedStyle(element).columnGap) || 24;
        const step = (card?.getBoundingClientRect().width || 400) + gap;
        const max = element.scrollWidth - element.clientWidth;
        const next = {
          start: element.scrollLeft < 3,
          end: element.scrollLeft >= max - 3,
          index: Math.min(count, Math.round(element.scrollLeft / step) + 1),
        };
        if (progress.current) {
          const visible = max > 0 ? element.clientWidth / element.scrollWidth : 1;
          progress.current.style.width = `${Math.max(visible, 0.12) * 100}%`;
          progress.current.style.transform = `translateX(${
            max > 0 ? (element.scrollLeft / max) * ((1 - Math.max(visible, 0.12)) / Math.max(visible, 0.12)) * 100 : 0
          }%)`;
        }
        setPosition((current) =>
          current.start === next.start && current.end === next.end && current.index === next.index
            ? current
            : next,
        );
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  const move = (direction: 1 | -1) => {
    const element = track.current;
    if (!element) return;
    const card = element.querySelector("li");
    const gap = parseFloat(getComputedStyle(element).columnGap) || 24;
    const step = card ? card.getBoundingClientRect().width + gap : 400;
    element.scrollBy({
      left: direction * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <div className="work-rail">
      <ul id={id} ref={track} className="rail-track" aria-label={label}>
        {children}
      </ul>
      <div className="rail-position-track" aria-hidden="true">
        <span ref={progress} />
      </div>
      <div className="rail-controls">
        {hasConcepts ? (
          <p className="concept-note">{labels.conceptNote}</p>
        ) : null}
        <span className="rail-position" aria-label={labels.position[position.index - 1]}>
          {String(position.index).padStart(2, "0")} <span>/ {String(count).padStart(2, "0")}</span>
        </span>
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label={labels.previous}
          aria-controls={id}
          disabled={position.start}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label={labels.next}
          aria-controls={id}
          disabled={position.end}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export type FilterOption = { id: string; label: string; count: number };
export type FilterEntry = { id: string; tags: string[]; node: React.ReactNode };

/**
 * Filter cloud for the work index. Rows are rendered on the server and passed in; filtering
 * only hides rows (so scroll reveals stay attached). Without JavaScript every row shows.
 */
export type FilterLabels = { group: string; all: string; showingAll: string; showing: string };

export function WorkFilter({
  groups,
  entries,
  total,
  labels,
}: {
  groups: { label: string; options: FilterOption[] }[];
  entries: FilterEntry[];
  total: number;
  /** `showingAll` and `showing` use {total}, {count} and {label} placeholders. */
  labels: FilterLabels;
}) {
  const [active, setActive] = useState("all");
  const visible = entries.filter((entry) => active === "all" || entry.tags.includes(active));
  const activeLabel = groups.flatMap((group) => group.options).find((option) => option.id === active)?.label;
  return (
    <>
      <div className="filter-cloud" role="group" aria-label={labels.group}>
        <button
          type="button"
          className="filter-chip is-all"
          aria-pressed={active === "all"}
          onClick={() => setActive("all")}
        >
          {labels.all}
          <sup>{total}</sup>
        </button>
        {groups.map((group) => (
          <span className="filter-group" key={group.label}>
            <span className="filter-label" aria-hidden="true">
              {group.label}
            </span>
            {group.options.map((option) => (
              <button
                key={option.id}
                type="button"
                className="filter-chip"
                aria-pressed={active === option.id}
                onClick={() => setActive(active === option.id ? "all" : option.id)}
              >
                <span className="sr-only">{group.label}: </span>
                {option.label}
                <sup>{option.count}</sup>
              </button>
            ))}
          </span>
        ))}
      </div>
      <p className="filter-status" role="status">
        {(active === "all" ? labels.showingAll : labels.showing)
          .replace("{total}", String(total))
          .replace("{count}", String(visible.length))
          .replace("{label}", activeLabel ?? "")}
      </p>
      <ul className="work-rows" id="studies">
        {entries.map((entry) => (
          <li key={entry.id} data-reveal hidden={!visible.includes(entry)}>
            {entry.node}
          </li>
        ))}
      </ul>
    </>
  );
}
