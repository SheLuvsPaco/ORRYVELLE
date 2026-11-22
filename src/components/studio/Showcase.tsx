"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Maximize2, MousePointer2, Play, X } from "lucide-react";
import { href, serviceLinksIn, type Locale } from "@/lib/studio/i18n";
import type { Project } from "@/lib/studio/projects";
import LazyStageVisual from "./LazyStageVisual";
import "./styles/showcase.css";

const Laptop = dynamic(
  () => import("./Mockups").then((module) => module.Laptop),
  { ssr: false },
);

const Phone = dynamic(
  () => import("./Mockups").then((module) => module.Phone),
  { ssr: false },
);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const text = {
  en: {
    preview: (title: string, concept: boolean) => `Scrollable preview of ${title}${concept ? " (concept)" : ""}`,
    hintPointer: "Scroll inside the screen to explore the full page",
    hintTouch: "Swipe inside the screen to explore the full page",
    stageLabel: "Our work, up close",
    kicker: "Crafted to the pixel",
    title: ["Every screen,", "considered."],
    tabs: "Disciplines",
    concept: "Concept study",
    viewStudy: "View the study",
    viewProject: "View the project",
  },
  bg: {
    preview: (title: string, concept: boolean) => `Превъртащ се преглед на ${title}${concept ? " (концепция)" : ""}`,
    hintPointer: "Превъртете в екрана, за да разгледате цялата страница",
    hintTouch: "Плъзнете в екрана, за да разгледате цялата страница",
    stageLabel: "Нашата работа отблизо",
    kicker: "Изпипано до пиксел",
    title: ["Всеки екран,", "премислен."],
    tabs: "Направления",
    concept: "Концептуален проект",
    viewStudy: "Вижте проекта",
    viewProject: "Вижте проекта",
  },
};

/** The case-study preview: a film, a scrolling laptop, or a line-up of screens for phone-only products. */
export function ScrollShowcase({ project, locale = "en" }: { project: Project; locale?: Locale }) {
  if (project.film) return <FilmShowcase project={project} film={project.film} locale={locale} />;
  if (project.shots && !project.shots.screen) return <PhoneLineup project={project} />;
  return <LaptopShowcase project={project} locale={locale} />;
}

const filmText = {
  en: {
    title: (name: string) => `Film: how ${name} works`,
    hintPointer: "Scroll inside the screen to play the film",
    hintTouch: "Swipe inside the screen to play the film",
    full: "Watch full screen",
    play: "Play the film",
    close: "Close",
  },
  bg: {
    title: (name: string) => `Филм: как работи ${name}`,
    hintPointer: "Превъртете в екрана, за да пуснете филма",
    hintTouch: "Плъзнете в екрана, за да пуснете филма",
    full: "Гледайте на цял екран",
    play: "Пуснете филма",
    close: "Затвори",
  },
};

/** Films with a Bulgarian edition; the others play in English on Bulgarian pages. */
const BULGARIAN_FILMS = new Set<string>(["ai-receptionist", "no-lead-left-behind", "ai-cold-caller", "ai-amazon-store-manager"]);

/** The film's own landscape layout starts here; narrower screens show it scaled down. */
const FILM_WIDTH = 960;

/** How far through the film an iframe is scrolled, from 0 to 1. */
const filmProgress = (frame: HTMLIFrameElement | null) => {
  const doc = frame?.contentDocument?.documentElement;
  if (!doc) return 0;
  const max = doc.scrollHeight - doc.clientHeight;
  return max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
};

/** Moves an iframe's film to a point between 0 and 1. */
const seekFilm = (frame: HTMLIFrameElement | null, at: number) => {
  const doc = frame?.contentDocument?.documentElement;
  if (!doc || at <= 0) return;
  doc.scrollTop = at * (doc.scrollHeight - doc.clientHeight);
};

/**
 * A laptop playing the system's film. The film is its own page, driven by its own scroll, so
 * it plays by scrolling inside the screen. It always uses its landscape layout: narrower
 * screens scale it down, and "Watch full screen" opens it at the device's own size, where
 * phones get the layout the film was designed for.
 */
function FilmShowcase({ project, film, locale }: { project: Project; film: string; locale: Locale }) {
  const copy = filmText[locale];
  const src = `/films/${locale === "bg" && BULGARIAN_FILMS.has(film) ? "bg" : "en"}/${film}.html`;
  // A callback ref: the laptop is loaded lazily, so the screen appears after the first render.
  const [screen, setScreen] = useState<HTMLDivElement | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const overlayFrame = useRef<HTMLIFrameElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const resume = useRef(0);
  const [scale, setScale] = useState(1);
  const [progress, setProgress] = useState(0);
  const [touched, setTouched] = useState(false);
  const [open, setOpen] = useState(false);
  // Full screen on a short landscape screen (a phone turned sideways) has no room for the
  // film's own phone layout: it shows the landscape layout, scaled to fit, like the laptop.
  const [stage, setStage] = useState<HTMLDivElement | null>(null);
  const [stageScale, setStageScale] = useState<number | null>(null);
  useEffect(() => {
    if (!stage) return;
    const fit = () => {
      const { clientWidth: w, clientHeight: h } = stage;
      setStageScale(h < 520 && w > h ? Math.min(w / FILM_WIDTH, h / (FILM_WIDTH * 0.625)) : null);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [stage]);

  // Fit the film's landscape layout to the screen.
  useEffect(() => {
    if (!screen) return;
    const fit = () => setScale(Math.min(1, screen.clientWidth / FILM_WIDTH));
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(screen);
    return () => observer.disconnect();
  }, [screen]);

  // Follow the film's own scroll for the progress rail and the hint.
  const onFrameLoad = () => {
    const win = frame.current?.contentWindow;
    if (!win) return;
    // The first scroll inside a laptop that is partly off screen (or under the header) brings
    // the whole device into view first, so the film is never watched half hidden.
    const center = () => {
      const device = screen?.closest(".scroll-device");
      if (!device) return;
      const rect = device.getBoundingClientRect();
      const top = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
      const room = window.innerHeight - top;
      if (rect.top >= top - 1 && rect.bottom <= window.innerHeight + 1) return;
      const target = window.scrollY + rect.top - top - Math.max(0, (room - rect.height) / 2);
      window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    };
    win.addEventListener("wheel", center, { passive: true, once: true });
    win.addEventListener("keydown", center, { once: true });
    win.addEventListener(
      "scroll",
      () => {
        const at = filmProgress(frame.current);
        setProgress(at);
        if (at > 0.01) setTouched(true);
      },
      { passive: true },
    );
  };

  // Full screen: lock the page behind, close on Escape, carry the position both ways.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openFull = () => {
    resume.current = filmProgress(frame.current);
    setOpen(true);
  };
  const closeFull = () => {
    const at = filmProgress(overlayFrame.current);
    setOpen(false);
    seekFilm(frame.current, at);
    openButton.current?.focus();
  };

  const width = FILM_WIDTH;
  return (
    <div className="scroll-showcase film-showcase">
      <div className="scroll-device">
        <Laptop tone="black">
          <div className="film-screen" ref={setScreen}>
            <iframe
              ref={frame}
              src={src}
              title={copy.title(project.title)}
              loading="lazy"
              onLoad={onFrameLoad}
              style={
                scale < 1
                  ? { width: `${width}px`, height: `${width * 0.625}px`, transform: `scale(${scale})` }
                  : undefined
              }
            />
            {/* Phones: the laptop is a picture (no scroll trap); tapping it plays the film full screen. */}
            <button type="button" className="film-play" onClick={openFull} aria-label={copy.full}>
              <span>
                <Play size={18} aria-hidden="true" />
                {copy.play}
              </span>
            </button>
          </div>
        </Laptop>
      </div>
      <div className="scroll-rail" aria-hidden="true">
        <span style={{ transform: `scaleY(${Math.max(progress, 0.04)})` }} />
      </div>
      <div className="film-controls">
        <p className={`scroll-hint ${touched ? "is-hidden" : ""}`}>
          <MousePointer2 size={14} aria-hidden="true" />
          <span className="hint-pointer">{copy.hintPointer}</span>
          <span className="hint-touch">{copy.hintTouch}</span>
        </p>
        <button ref={openButton} type="button" className="film-full" onClick={openFull}>
          <Maximize2 size={15} aria-hidden="true" />
          {copy.full}
        </button>
      </div>
      {open ? (
        <div className="film-overlay" role="dialog" aria-modal="true" aria-label={copy.title(project.title)}>
          <div className="film-overlay-bar">
            <span>{project.title}</span>
            <button ref={closeButton} type="button" onClick={closeFull}>
              <X size={18} aria-hidden="true" />
              {copy.close}
            </button>
          </div>
          <div className="film-overlay-stage" ref={setStage}>
            <iframe
              ref={overlayFrame}
              src={src}
              title={copy.title(project.title)}
              style={
                stageScale
                  ? {
                      width: `${FILM_WIDTH}px`,
                      height: `${FILM_WIDTH * 0.625}px`,
                      transform: `translate(-50%, -50%) scale(${stageScale})`,
                    }
                  : undefined
              }
              className={stageScale ? "is-scaled" : undefined}
              onLoad={() => {
                const at = resume.current;
                // Let the film measure itself before jumping to where the laptop was.
                window.setTimeout(() => seekFilm(overlayFrame.current, at), 120);
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** The phone screen in the middle, `shots.lineup` fanning out either side. */
function PhoneLineup({ project }: { project: Project }) {
  const shots = project.shots!;
  const [a, b, c, d] = shots.lineup ?? [];
  const order = [c, a, undefined, b, d];
  return (
    <div className="phone-lineup">
      {order.map((key, index) => {
        const distance = Math.abs(index - 2);
        if (distance && (!key || !shots.more[key])) return null;
        return (
          <div key={key ?? "phone"} className={`lineup-phone is-d${distance}`}>
            <Phone project={project} k={1} shot={key ? shots.more[key] : undefined} />
          </div>
        );
      })}
    </div>
  );
}

/** A laptop whose screen scrolls through the full page. */
function LaptopShowcase({ project, locale }: { project: Project; locale: Locale }) {
  const copy = text[locale];
  const wrap = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const scroller = wrap.current?.querySelector<HTMLElement>(".mk-scroller");
    if (!scroller) return;
    scroller.tabIndex = 0;
    scroller.setAttribute("role", "region");
    scroller.setAttribute("aria-label", copy.preview(project.title, project.status === "concept"));
    // Only the visitor's own scrolling dismisses the hint, not the automatic peek.
    let interacted = false;
    const onScroll = () => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      setProgress(max > 0 ? scroller.scrollTop / max : 0);
      if (interacted && scroller.scrollTop > 40) setTouched(true);
    };
    const markInteracted = () => (interacted = true);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("wheel", markInteracted, { passive: true });
    scroller.addEventListener("touchstart", markInteracted, { passive: true });
    scroller.addEventListener("keydown", markInteracted);

    // One gentle peek when the device first comes into view, so it reads as scrollable.
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || prefersReducedMotion()) return;
        observer.disconnect();
        timers.push(
          window.setTimeout(() => {
            if (!interacted) scroller.scrollTo({ top: scroller.clientHeight * 0.45, behavior: "smooth" });
          }, 700),
          window.setTimeout(() => {
            if (!interacted) scroller.scrollTo({ top: 0, behavior: "smooth" });
          }, 1900),
        );
      },
      { threshold: 0.6 },
    );
    observer.observe(scroller);
    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("wheel", markInteracted);
      scroller.removeEventListener("touchstart", markInteracted);
      scroller.removeEventListener("keydown", markInteracted);
    };
  }, [project.title, project.status, copy]);

  return (
    <div className="scroll-showcase" ref={wrap}>
      <div className="scroll-device">
        <Laptop project={project} scroll tone="black" />
      </div>
      <div className="scroll-rail" aria-hidden="true">
        <span style={{ transform: `scaleY(${Math.max(progress, 0.04)})` }} />
      </div>
      <p className={`scroll-hint ${touched ? "is-hidden" : ""}`}>
        <MousePointer2 size={14} aria-hidden="true" />
        <span className="hint-pointer">{copy.hintPointer}</span>
        <span className="hint-touch">{copy.hintTouch}</span>
      </p>
    </div>
  );
}

const CYCLE_MS = 6500;

/** Home stage: one device, three disciplines, Apple-style tabbed crossfade. */
export function DisciplineStage({ projects, locale = "en" }: { projects: Project[]; locale?: Locale }) {
  const copy = text[locale];
  const serviceLinks = serviceLinksIn(locale);
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  // Scroll-linked entrance: the device tilts upright and settles as it arrives.
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    if (prefersReducedMotion()) {
      element.style.setProperty("--p", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.85)));
      element.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.35,
    });
    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, []);

  const running = inView && !paused && !prefersReducedMotion();
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % projects.length), CYCLE_MS);
    return () => window.clearTimeout(timer);
  }, [running, active, projects.length]);

  const current = projects[active]!;
  const service = serviceLinks.find((item) => item.slug === current.service)!;

  return (
    <section
      ref={section}
      className="stage"
      aria-label={copy.stageLabel}
      data-header-dark
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container stage-inner">
        <div className="stage-head" data-reveal>
          <div className="stage-title">
            <span className="stage-kicker">{copy.kicker}</span>
            <h2>
              {copy.title[0]} <span className="tone">{copy.title[1]}</span>
            </h2>
          </div>
          <div className="stage-tabs" role="tablist" aria-label={copy.tabs}>
            {projects.map((project, index) => {
              const item = serviceLinks.find((entry) => entry.slug === project.service)!;
              return (
                <button
                  key={project.slug}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  onClick={() => setActive(index)}
                  data-running={index === active && running}
                  style={{ "--cycle": `${CYCLE_MS}ms` } as React.CSSProperties}
                >
                  <small>/{item.number}</small>
                  {item.name}
                  <span className="tab-progress" key={`${active}-${index}`} />
                </button>
              );
            })}
          </div>
        </div>
        <div className="stage-device" aria-hidden="true">
          <LazyStageVisual project={current} />
          <span className="stage-paper" data-header-light />
        </div>
        {/* The page turns to paper behind the lower half of the device, so it straddles the edge. */}
        <div className="stage-floor" data-header-light>
          <p className="stage-caption" aria-live="polite">
            <span>
              {current.title} · {current.sector}
              {current.status === "concept" ? <em>{copy.concept}</em> : null}
            </span>
            <Link href={href(locale, `/work/${current.slug}`)}>
              {current.status === "concept" ? copy.viewStudy : copy.viewProject} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href={href(locale, `/services/${service.slug}`)}>
              {service.name} <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
