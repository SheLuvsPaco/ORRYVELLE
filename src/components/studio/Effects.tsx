"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide motion details:
 * - [data-reveal] elements below the opening viewport ease in once as they enter it
 *   (see .is-pending in studio.css); content already on screen is never hidden.
 * - [data-spotlight] surfaces track the pointer with a soft light.
 */
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only elements that start below the viewport are hidden and eased in; anything already on
    // screen stays painted, so the opening view (and its LCP) never waits for this script.
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")].filter(
      (element) => element.getBoundingClientRect().top > window.innerHeight,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("is-pending");
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    elements.forEach((element) => {
      element.classList.add("is-pending");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      frame = 0;
      if (!last) return;
      const target = (last.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${last.clientX - rect.left}px`);
      target.style.setProperty("--my", `${last.clientY - rect.top}px`);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
