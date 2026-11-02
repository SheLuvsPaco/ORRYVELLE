"use client";

import { useEffect, useRef } from "react";

/**
 * Slow light over charcoal: a warm key light, a cool fill, soft diagonal
 * beams and grain. Pure CSS; the drift pauses offscreen and in background tabs.
 */
export default function HeroAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let inView = true;
    const apply = () => {
      element.dataset["motion"] = inView && !document.hidden ? "on" : "off";
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      apply();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", apply);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", apply);
    };
  }, []);
  return (
    <div className="hero-atmos" ref={ref} aria-hidden="true">
      <span className="atmos-warm" />
      <span className="atmos-cool" />
      <span className="atmos-beam is-a" />
      <span className="atmos-beam is-b" />
      <span className="atmos-beam is-c" />
      <span className="atmos-beam is-d" />
      <span className="atmos-haze" />
      <span className="atmos-grain" />
    </div>
  );
}
