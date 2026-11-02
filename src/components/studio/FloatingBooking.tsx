"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { t as dictionary, type Locale } from "@/lib/studio/i18n";
import OrryvelleMark from "./OrryvelleMark";

/** Persistent booking shortcut; steps aside near the footer and enquiry forms. */
export default function FloatingBooking({ locale = "en" }: { locale?: Locale }) {
  const copy = dictionary(locale);
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const blockers = new Set<Element>();
    let scrolled = false;
    const update = () => setVisible(scrolled && blockers.size === 0);
    const onScroll = () => {
      scrolled = window.scrollY > 480;
      update();
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) blockers.add(entry.target);
        else blockers.delete(entry.target);
      }
      update();
    });
    document
      .querySelectorAll("[data-float-hide]")
      .forEach((element) => observer.observe(element));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  if (pathname.startsWith(copy.contact)) return null;
  return (
    <Link
      href={copy.contact}
      className="floating-booking"
      data-visible={visible}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span className="floating-mark" aria-hidden="true">
        <OrryvelleMark size={32} />
      </span>
      <span className="floating-copy">
        <b>{copy.bookCall}</b>
        <small>{copy.freeIntro}</small>
      </span>
      <span className="floating-arrow" aria-hidden="true">
        {ARROW.map((on, index) => (
          <i
            key={index}
            data-on={on || undefined}
            style={{ "--c": index % 5 } as React.CSSProperties}
          />
        ))}
      </span>
    </Link>
  );
}

/** A 5 × 5 dot matrix; the lit dots draw a right-pointing arrow. */
const ARROW = [
  0, 0, 1, 0, 0,
  0, 0, 0, 1, 0,
  1, 1, 1, 1, 1,
  0, 0, 0, 1, 0,
  0, 0, 1, 0, 0,
].map(Boolean);
