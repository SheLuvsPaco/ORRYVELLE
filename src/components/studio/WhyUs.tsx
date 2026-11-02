"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/studio/i18n";
import { serviceLinks, stack, type IconName } from "@/lib/studio/site";
import { Chip, Corners, IconTile } from "./ui";
import "./styles/why-us.css";

type Stat = { value: string; unit?: string; label: string };
type Reason = {
  icon: IconName;
  title: string;
  body: string;
  stat?: Stat;
  image?: { src: string; alt: string };
};

const pad = (value: number) => String(value).padStart(2, "0");

/** Defaults by position. Every figure is counted from the site's own content. */
const text = {
  en: {
    chip: "Why Orryvelle",
    title: ["Premium isn’t a look.", "It’s a standard."] as [string, string],
    text: "What you can expect when you work with us, whichever discipline you need.",
    labels: { previous: "Previous reason", next: "Next reason", of: "of", reason: "Reason" },
    stats: [
      { value: pad(serviceLinks.length), label: "Disciplines under one roof" },
      { value: pad(stack.length), label: "Core technologies we build on" },
      { value: "30", unit: "min", label: "Free intro call to start" },
    ] as Stat[],
    alts: [
      "A detailed architectural model lit against a dark background.",
      "A compact mechanical keyboard on a dark desk.",
      "An open notebook with hand-drawn interface wireframes.",
    ],
  },
  bg: {
    chip: "Защо Orryvelle",
    title: ["Премиум не е визия.", "Премиум е стандарт."] as [string, string],
    text: "Какво да очаквате, когато работите с нас, каквото и направление да ви трябва.",
    labels: { previous: "Предишна причина", next: "Следваща причина", of: "от", reason: "Причина" },
    stats: [
      { value: pad(serviceLinks.length), label: "Направления под един покрив" },
      { value: pad(stack.length), label: "Основни технологии, с които работим" },
      { value: "30", unit: "мин", label: "Безплатен първи разговор" },
    ] as Stat[],
    alts: [
      "Детайлен архитектурен макет, осветен на тъмен фон.",
      "Компактна механична клавиатура на тъмно бюро.",
      "Отворен тефтер с ръчно скицирани интерфейси.",
    ],
  },
};
const imageFiles = ["workspace-arch-model", "workspace-keyboard", "workspace-wireframes"];

/** Splits a title so its closing words render in the muted tone. */
function twoTone(title: string) {
  const words = title.split(" ");
  const cut = Math.max(1, Math.ceil(words.length / 2));
  return [words.slice(0, cut).join(" "), words.slice(cut).join(" ")] as const;
}

/**
 * "Why us" as a dark panel carousel: photograph with glass tiles on the left,
 * reason on the right, previous/next controls in the heading. Built on native
 * horizontal scroll-snap, so it can still be swiped or scrolled without JavaScript.
 * Never auto-advances.
 */
export default function WhyUs({
  chip: chipProp,
  title: titleProp,
  text: textProp,
  items,
  locale = "en",
}: {
  chip?: string;
  title?: [string, string];
  text?: string;
  items: Reason[];
  locale?: Locale;
}) {
  const copy = text[locale];
  const chip = chipProp ?? copy.chip;
  const title = titleProp ?? copy.title;
  const intro = textProp ?? copy.text;
  const labels = copy.labels;
  const defaultStats = copy.stats;
  const defaultImages = imageFiles.map((name, index) => ({ src: `/images/studio/${name}.jpg`, alt: copy.alts[index]! }));
  const id = useId();
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = items.length;

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = element.clientWidth || 1;
        setActive(Math.max(0, Math.min(total - 1, Math.round(element.scrollLeft / width))));
      });
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [total]);

  const go = (next: number) => {
    const element = track.current;
    if (!element) return;
    const index = Math.max(0, Math.min(total - 1, next));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({ left: index * element.clientWidth, behavior: reduced ? "auto" : "smooth" });
    setActive(index);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
    }
  };

  return (
    <section className="section section-pale why-section">
      <div
        className="container"
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={`${id}-title`}
        onKeyDown={onKeyDown}
      >
        <div className="why-head">
          <div className="why-head-copy" data-reveal>
            <Chip>{chip}</Chip>
            <h2 id={`${id}-title`}>
              {title[0]}
              <br />
              <span className="tone">{title[1]}</span>
            </h2>
            {intro ? <p>{intro}</p> : null}
          </div>
          <div className="why-controls" data-reveal style={{ "--d": 120 } as React.CSSProperties}>
            <span className="why-counter" aria-hidden="true">
              <b>{pad(active + 1)}</b> / {pad(total)}
            </span>
            <button
              type="button"
              aria-controls={`${id}-track`}
              aria-label={labels.previous}
              disabled={active === 0}
              onClick={() => go(active - 1)}
            >
              <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-controls={`${id}-track`}
              aria-label={labels.next}
              disabled={active === total - 1}
              onClick={() => go(active + 1)}
            >
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="why-panel" data-reveal="image">
          <div className="why-track" id={`${id}-track`} ref={track}>
            {items.map((item, index) => {
              const stat = item.stat ?? defaultStats[index % defaultStats.length]!;
              const image = item.image ?? defaultImages[index % defaultImages.length]!;
              const [lead, rest] = twoTone(item.title);
              return (
                <div
                  key={item.title}
                  className="why-slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} ${labels.of} ${total}: ${item.title}`}
                  data-active={index === active}
                >
                  <div className="why-media">
                    <div className="why-photo">
                      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 92vw, 620px" />
                    </div>
                    <span className="why-tag" aria-hidden="true">
                      {pad(index + 1)}
                      <i />
                      {pad(total)}
                    </span>
                    <span className="why-stat">
                      <b>
                        {stat.value}
                        {stat.unit ? <small>{stat.unit}</small> : null}
                      </b>
                      <span>{stat.label}</span>
                      <Corners />
                    </span>
                  </div>
                  <div className="why-copy">
                    <IconTile name={item.icon} size={22} className="is-dark" />
                    <h3>
                      {lead} {rest ? <span className="tone">{rest}</span> : null}
                    </h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="why-progress" aria-hidden="true">
            {items.map((item, index) => (
              <i key={item.title} data-active={index === active} />
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {labels.reason} {active + 1} {labels.of} {total}: {items[active]?.title}
          </p>
        </div>
      </div>
    </section>
  );
}
