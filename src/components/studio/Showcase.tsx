"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
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

/** The case-study preview: a scrolling laptop, or a line-up of screens for phone-only products. */
export function ScrollShowcase({ project, locale = "en" }: { project: Project; locale?: Locale }) {
  if (project.shots && !project.shots.screen) return <PhoneLineup project={project} />;
  return <LaptopShowcase project={project} locale={locale} />;
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
