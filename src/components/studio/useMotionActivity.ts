"use client";
import { useEffect, useRef, useState } from "react";

/** Suspend optional motion offscreen, in background tabs, and for motion-sensitive visitors. */
export function useMotionActivity<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => setReduced(media.matches);
    const onVisibility = () => setVisible(!document.hidden);
    onPreference();
    onVisibility();
    media.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.12 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return { ref, available: inView && visible, reduced };
}
