"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Locale } from "@/lib/studio/i18n";
import { stack } from "@/lib/studio/site";
import BrandLogo from "./BrandLogo";
import { useMotionActivity } from "./useMotionActivity";
import "./styles/technology-carousel.css";

/** Pixels per second. Constant speed at every width; gentler when the visitor prefers reduced motion. */
const SPEED = 34;
const REDUCED_SPEED = 16;
/** How long the strip takes to glide to a stop (or back up to speed). */
const EASE_MS = 650;

const text = {
  en: { label: ["Built on proven,", "modern technology."], list: "Technologies we build with", play: "Play technology logos", pause: "Pause technology logos" },
  bg: { label: ["Изградено с доказани,", "съвременни технологии."], list: "Технологии, с които работим", play: "Пусни логата на технологиите", pause: "Спри логата на технологиите" },
};

export default function TechnologyCarousel({ locale = "en" }: { locale?: Locale }) {
  const copy = text[locale];
  const { ref, available, reduced } = useMotionActivity<HTMLElement>();
  const track = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLUListElement>(null);
  const animation = useRef<Animation | null>(null);
  const ramp = useRef(0);
  const [paused, setPaused] = useState(false);
  const [holding, setHolding] = useState(false);

  // One infinite translate on the compositor; duration follows the measured width.
  useEffect(() => {
    const element = track.current;
    const first = group.current;
    if (!element || !first || typeof element.animate !== "function") return;
    const anim = element.animate(
      [{ transform: "translate3d(0, 0, 0)" }, { transform: "translate3d(-50%, 0, 0)" }],
      { duration: 60000, iterations: Infinity, easing: "linear" },
    );
    anim.pause();
    animation.current = anim;
    const measure = () => {
      const width = first.getBoundingClientRect().width;
      if (!width) return;
      const duration = (width / (reduced ? REDUCED_SPEED : SPEED)) * 1000;
      const timing = anim.effect?.getTiming();
      const previous = Number(timing?.duration) || duration;
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
  }, [reduced]);

  // Glide the playback rate instead of snapping between moving and stopped.
  const moving = available && !paused && !holding;
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
    const from = anim.playState === "running" ? anim.playbackRate : 0;
    const start = performance.now();
    cancelAnimationFrame(ramp.current);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / EASE_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      const rate = from + (target - from) * eased;
      if (t >= 1 && target === 0) {
        anim.pause();
        return;
      }
      anim.playbackRate = Math.max(rate, 0.001);
      if (t < 1) ramp.current = requestAnimationFrame(tick);
    };
    ramp.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ramp.current);
  }, [moving, available, reduced]);

  const release = useRef<number>();
  const hold = (on: boolean, delay = 0) => {
    window.clearTimeout(release.current);
    if (on) setHolding(true);
    else release.current = window.setTimeout(() => setHolding(false), delay);
  };

  return (
    <section
      ref={ref}
      id="technology"
      className="tech-band"
      aria-labelledby="tech-band-title"
      data-moving={moving}
    >
      <div className="container tech-band-inner">
        <p className="tech-band-label" id="tech-band-title">
          {copy.label[0]}{" "}
          <br />
          <strong>{copy.label[1]}</strong>
        </p>
        <div
          className="tech-marquee"
          onPointerEnter={(event) => event.pointerType === "mouse" && hold(true)}
          onPointerLeave={(event) => event.pointerType === "mouse" && hold(false)}
          onTouchStart={() => hold(true)}
          onTouchEnd={() => hold(false, 1400)}
          onTouchCancel={() => hold(false, 1400)}
        >
          <div className="tech-marquee-track" ref={track}>
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                ref={copy === 0 ? group : undefined}
                className="tech-marquee-group"
                aria-hidden={copy === 1 ? true : undefined}
                aria-label={copy === 0 ? text[locale].list : undefined}
              >
                {stack.map((name) => (
                  <li key={name}>
                    <BrandLogo name={name} size={26} />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="tech-toggle"
          aria-pressed={paused}
          aria-label={paused ? copy.play : copy.pause}
          onClick={() => setPaused(!paused)}
        >
          <span className="tech-toggle-icon" data-paused={paused} aria-hidden="true">
            <Pause size={13} strokeWidth={2} />
            <Play size={13} strokeWidth={2} />
          </span>
        </button>
      </div>
    </section>
  );
}
