"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowUpRight, BadgeCheck, Pause, Play } from "lucide-react";
import type { Testimonial } from "@/lib/studio/proof";
import { href, type Locale } from "@/lib/studio/i18n";
import { ButtonLink } from "./ui";
import { useMotionActivity } from "./useMotionActivity";
import "./styles/reviews-wall.css";

const text = {
  en: {
    verified: "Verified review",
    reviews: "Client reviews",
    row: (n: number) => `Client reviews, row ${n}`,
    play: "Play reviews",
    pause: "Pause reviews",
    count: (n: number) => (n === 1 ? "client review" : "client reviews"),
    book: "Book a free call",
    source: (name: string) => `Read on ${name}`,
  },
  bg: {
    verified: "Потвърден отзив",
    reviews: "Отзиви от клиенти",
    row: (n: number) => `Отзиви от клиенти, ред ${n}`,
    play: "Пускане на отзивите",
    pause: "Пауза на отзивите",
    count: (n: number) => (n === 1 ? "отзив от клиент" : "отзива от клиенти"),
    book: "Запазете безплатен разговор",
    source: (name: string) => `Прочетете в ${name}`,
  },
};

/** Pixels per second; gentler (but still alive) when the visitor prefers reduced motion. */
const SPEED = 26;
const REDUCED_SPEED = 9;
/** How long a row takes to glide to a stop, or back up to speed. */
const EASE_MS = 700;
/** Each drifting group repeats its reviews until it is at least this many cards long. */
const MIN_CARDS = 5;

export function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1]![0] : "";
  return `${first}${last}`.toUpperCase();
}

export function sourceLabel(url: string) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const known: Record<string, string> = {
      google: "Google",
      clutch: "Clutch",
      linkedin: "LinkedIn",
      trustpilot: "Trustpilot",
      upwork: "Upwork",
      g2: "G2",
    };
    const key = Object.keys(known).find((name) => host.split(".").includes(name));
    return key ? known[key]! : host;
  } catch {
    return "source";
  }
}

export function Avatar({ item, size = 44 }: { item: Testimonial; size?: number }) {
  return (
    <span className="review-avatar" style={{ width: size, height: size }} aria-hidden="true">
      {item.photo ? (
        <Image src={item.photo} alt="" width={size} height={size} sizes={`${size}px`} />
      ) : (
        <span>{initials(item.name)}</span>
      )}
    </span>
  );
}

function ReviewCard({
  item,
  duplicate,
  locale,
}: {
  item: Testimonial;
  duplicate: boolean;
  locale: Locale;
}) {
  return (
    <li className="review-card" aria-hidden={duplicate || undefined} data-spotlight>
      <figure>
        <blockquote>
          <p>{item.quote}</p>
        </blockquote>
        <figcaption>
          <Avatar item={item} />
          <span className="review-person">
            <span className="review-name">
              {item.name}
              {item.source ? (
                <BadgeCheck size={15} strokeWidth={2} aria-label={text[locale].verified} role="img" />
              ) : null}
            </span>
            <span className="review-role">
              {[item.role, item.company].filter(Boolean).join(", ")}
            </span>
          </span>
        </figcaption>
        {item.source ? (
          <a
            className="review-source"
            href={item.source}
            target="_blank"
            rel="noreferrer"
            tabIndex={duplicate ? -1 : undefined}
          >
            {text[locale].source(sourceLabel(item.source))}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        ) : null}
        <span className="review-quote-mark" aria-hidden="true">
          “
        </span>
      </figure>
    </li>
  );
}

/** One infinite translate on the compositor per row; the playback rate glides between moving and stopped. */
function useDrift(
  track: RefObject<HTMLDivElement>,
  group: RefObject<HTMLUListElement>,
  { reverse, reduced, moving, available }: { reverse: boolean; reduced: boolean; moving: boolean; available: boolean },
) {
  const animation = useRef<Animation | null>(null);
  const ramp = useRef(0);

  useEffect(() => {
    const element = track.current;
    const first = group.current;
    if (!element || !first || typeof element.animate !== "function") return;
    const from = "translate3d(0, 0, 0)";
    const to = "translate3d(-50%, 0, 0)";
    const anim = element.animate(
      [{ transform: reverse ? to : from }, { transform: reverse ? from : to }],
      { duration: 60000, iterations: Infinity, easing: "linear" },
    );
    anim.pause();
    animation.current = anim;
    const measure = () => {
      const width = first.getBoundingClientRect().width;
      if (!width) return;
      const duration = (width / (reduced ? REDUCED_SPEED : SPEED)) * 1000;
      const previous = Number(anim.effect?.getTiming().duration) || duration;
      const progress = ((Number(anim.currentTime) || 0) % previous) / previous;
      anim.effect?.updateTiming({ duration });
      anim.currentTime = progress * duration;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(first);
    return () => {
      observer.disconnect();
      anim.cancel();
      animation.current = null;
    };
  }, [track, group, reverse, reduced]);

  useEffect(() => {
    const anim = animation.current;
    if (!anim) return;
    if (!available) {
      anim.pause();
      return;
    }
    const target = moving ? 1 : 0;
    if (target === 1 && anim.playState !== "running") {
      anim.playbackRate = 0.001;
      anim.play();
    }
    const start = performance.now();
    const initial = anim.playState === "running" ? anim.playbackRate : 0;
    cancelAnimationFrame(ramp.current);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / EASE_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      if (t >= 1 && target === 0) {
        anim.pause();
        return;
      }
      anim.playbackRate = Math.max(initial + (target - initial) * eased, 0.001);
      if (t < 1) ramp.current = requestAnimationFrame(tick);
    };
    ramp.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ramp.current);
  }, [moving, available, reduced]);
}

function DriftRow({
  items,
  reverse,
  motion,
  label,
  locale,
}: {
  items: Testimonial[];
  reverse: boolean;
  motion: { reduced: boolean; moving: boolean; available: boolean };
  label: string;
  locale: Locale;
}) {
  const track = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLUListElement>(null);
  useDrift(track, group, { reverse, ...motion });
  const repeats = Math.max(1, Math.ceil(MIN_CARDS / items.length));
  const filled = Array.from({ length: repeats }, () => items).flat();
  return (
    <div className="reviews-row">
      <div className="reviews-track" ref={track}>
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            ref={copy === 0 ? group : undefined}
            className="reviews-group"
            aria-hidden={copy === 1 || undefined}
            aria-label={copy === 0 ? label : undefined}
          >
            {filled.map((item, index) => (
              <ReviewCard
                key={`${item.name}-${index}`}
                item={item}
                duplicate={copy === 1 || index >= items.length}
                locale={locale}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/**
 * Two rows of review cards drifting in opposite directions with faded edges.
 * Pauses on hover, on keyboard focus, offscreen, and with an explicit control.
 * With fewer than three reviews it lays them out statically instead.
 */
export default function ReviewsWall({
  items,
  locale = "en",
}: {
  items: Testimonial[];
  locale?: Locale;
}) {
  const { ref, available, reduced } = useMotionActivity<HTMLDivElement>();
  const [paused, setPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const release = useRef<number>();
  const hold = (on: boolean, delay = 0) => {
    window.clearTimeout(release.current);
    if (on) setHolding(true);
    else release.current = window.setTimeout(() => setHolding(false), delay);
  };
  useEffect(() => () => window.clearTimeout(release.current), []);

  const drifting = items.length >= 3;
  const rows =
    items.length >= 6
      ? [items.filter((_, index) => index % 2 === 0), items.filter((_, index) => index % 2 === 1)]
      : [items];
  const motion = { reduced, available, moving: available && !paused && !holding };
  const count = items.length;

  return (
    <div className="reviews-wall" ref={ref} data-moving={drifting ? motion.moving : undefined}>
      {drifting ? (
        <div
          className="reviews-rows"
          onPointerEnter={(event) => event.pointerType === "mouse" && hold(true)}
          onPointerLeave={(event) => event.pointerType === "mouse" && hold(false)}
          onTouchStart={() => hold(true)}
          onTouchEnd={() => hold(false, 1600)}
          onTouchCancel={() => hold(false, 1600)}
          onFocus={() => hold(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) hold(false);
          }}
        >
          {rows.map((row, index) => (
            <DriftRow
              key={index}
              items={row}
              reverse={index === 1}
              motion={motion}
              locale={locale}
              label={rows.length > 1 ? text[locale].row(index + 1) : text[locale].reviews}
            />
          ))}
        </div>
      ) : (
        <ul className="reviews-static" aria-label={text[locale].reviews}>
          {items.map((item, index) => (
            <ReviewCard key={`${item.name}-${index}`} item={item} duplicate={false} locale={locale} />
          ))}
        </ul>
      )}

      <div className="reviews-bar">
        {drifting ? (
          <button
            type="button"
            className="reviews-toggle"
            aria-pressed={paused}
            aria-label={paused ? text[locale].play : text[locale].pause}
            onClick={() => setPaused(!paused)}
          >
            <span className="tech-toggle-icon" data-paused={paused} aria-hidden="true">
              <Pause size={13} strokeWidth={2} />
              <Play size={13} strokeWidth={2} />
            </span>
          </button>
        ) : null}
        <span className="reviews-stack" aria-hidden="true">
          {items.slice(0, 4).map((item, index) => (
            <Avatar key={`${item.name}-${index}`} item={item} size={32} />
          ))}
        </span>
        <span className="reviews-count">
          <b>{count}</b> {text[locale].count(count)}
        </span>
        <ButtonLink href={href(locale, "/contact")} variant="light" className="btn-small">
          {text[locale].book}
        </ButtonLink>
      </div>
    </div>
  );
}
