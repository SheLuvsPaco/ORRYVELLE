"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { counterpart, t as dictionary, type Dictionary, type Locale } from "@/lib/studio/i18n";
import { site } from "@/lib/studio/site";
import { Corners, IconTile } from "./ui";
import OrryvelleMark from "./OrryvelleMark";

/** A language picked by hand overrides the country redirect in middleware.ts for a year. */
function rememberLocale(locale: Locale) {
  document.cookie = `lang=${locale}; path=/; max-age=31536000; samesite=lax`;
}

function Announcement({ copy }: { copy: Dictionary }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    try {
      setHidden(sessionStorage.getItem("announcement-dismissed") === "1");
    } catch {}
  }, []);
  if (hidden) return null;
  return (
    <div className="announcement">
      <p>
        <span className="status-dot" aria-hidden="true" />
        {copy.announcement}
        <Link href={copy.contact}>{copy.announcementCta}</Link>
      </p>
      <button
        type="button"
        aria-label={copy.dismiss}
        onClick={() => {
          setHidden(true);
          try {
            sessionStorage.setItem("announcement-dismissed", "1");
          } catch {}
        }}
      >
        <X size={15} />
      </button>
    </div>
  );
}

export default function SiteHeader({ locale = "en" }: { locale?: Locale }) {
  const copy = dictionary(locale);
  const { links } = copy;
  const pathname = usePathname();
  // On the homepage the header floats over the dark hero and takes its tone from what is beneath it.
  const isHome = pathname === copy.home;
  const header = useRef<HTMLElement>(null);
  const [overDark, setOverDark] = useState(isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const servicesButton = useRef<HTMLButtonElement>(null);
  const servicesWrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>();
  const navGroup = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number; on: boolean }>({
    left: 0,
    width: 0,
    on: false,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dark while the bar sits over a [data-header-dark] zone (minus any [data-header-light] part).
  useEffect(() => {
    const element = header.current;
    if (!isHome || !element) {
      setOverDark(false);
      return;
    }
    let frame = 0;
    const covers = (selector: string, y: number) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).some((zone) => {
        const rect = zone.getBoundingClientRect();
        return rect.top <= y && rect.bottom > y;
      });
    const update = () => {
      frame = 0;
      const bar = element.querySelector<HTMLElement>(".header-inner")?.getBoundingClientRect();
      if (!bar) return;
      const y = (bar.top + bar.bottom) / 2;
      setOverDark(covers("[data-header-dark]", y) && !covers("[data-header-light]", y));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  // A single highlight glides between nav items instead of each item flashing on hover.
  const track = (event: React.MouseEvent | React.FocusEvent) => {
    const item = (event.target as HTMLElement).closest<HTMLElement>("a, button");
    const group = navGroup.current;
    if (!item || !group || !group.contains(item) || item.closest(".mega-menu")) return;
    const a = item.getBoundingClientRect();
    const b = group.getBoundingClientRect();
    setIndicator({ left: a.left - b.left, width: a.width, on: true });
  };

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (servicesOpen) {
        setServicesOpen(false);
        servicesButton.current?.focus();
      }
      if (menuOpen) {
        setMenuOpen(false);
        toggle.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!servicesWrap.current?.contains(event.target as Node))
        setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen, servicesOpen]);

  const hoverOpenedAt = useRef(0);
  const hoverOpen = () => {
    window.clearTimeout(closeTimer.current);
    if (!servicesOpen) hoverOpenedAt.current = Date.now();
    setServicesOpen(true);
  };
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 160);
  };
  const isServices = copy.menu.some((item) => pathname.startsWith(item.href));
  const otherLocale: Locale = locale === "bg" ? "en" : "bg";
  const tone = isHome && overDark && !menuOpen ? "dark" : "paper";

  return (
    <header
      ref={header}
      className="site-header"
      data-scrolled={scrolled}
      data-overlay={isHome || undefined}
      data-tone={tone}
    >
      <Announcement copy={copy} />
      <div className="container header-inner">
        <Link href={copy.home} className="wordmark" aria-label={copy.homeLabel}>
          <span className="brand-symbol" aria-hidden="true">
            <OrryvelleMark size={39} />
          </span>
          <span className="wordmark-name">ORRYVELLE</span>
        </Link>

        <nav
          aria-label={copy.mainNav}
          className="nav-group"
          ref={navGroup}
          onMouseOver={track}
          onFocus={track}
          onMouseLeave={() => setIndicator((current) => ({ ...current, on: false }))}
        >
          <span
            className="nav-indicator"
            aria-hidden="true"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
              opacity: indicator.on ? 1 : 0,
            }}
          />
          <div
            className="nav-dropdown"
            ref={servicesWrap}
            onMouseEnter={hoverOpen}
            onMouseLeave={hoverClose}
            onBlur={(event) => {
              // Tabbing out of the menu closes it, like pointer-leave does.
              if (!event.currentTarget.contains(event.relatedTarget as Node | null))
                setServicesOpen(false);
            }}
          >
            <button
              ref={servicesButton}
              type="button"
              className={isServices ? "is-current" : ""}
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={() => {
                // A click right after hover-opening should not immediately close it.
                if (Date.now() - hoverOpenedAt.current < 500) return;
                setServicesOpen((open) => !open);
              }}
            >
              {copy.servicesLabel} <ChevronDown size={14} aria-hidden="true" />
            </button>
            {/* Always rendered so it can ease in and out; visibility keeps it out of the tab order while closed. */}
            <div id="services-menu" className="mega-menu" data-open={servicesOpen}>
              <ul>
                {copy.menu.map((service, index) => (
                  <li key={service.href} style={{ "--i": index } as React.CSSProperties}>
                    <Link href={service.href}>
                      <IconTile name={service.icon} size={20} />
                      <span>
                        <b>
                          {service.title[0]} <span className="tone">{service.title[1]}</span>
                        </b>
                        <small>{service.line}</small>
                      </span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mega-aside">
                <Corners />
                <small>
                  {copy.asideTitle[0]} <span className="tone">{copy.asideTitle[1]}</span>
                </small>
                <p>{copy.asideText}</p>
                <Link href={copy.contact}>
                  {copy.asideCta} <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          {/* A plain link: each language has its own root layout, so switching is a full page load
              and a prefetch would only download a page most visitors never open. */}
          <a
            className="lang-switch"
            href={counterpart(pathname, otherLocale)}
            hrefLang={otherLocale}
            lang={otherLocale}
            title={copy.switchTitle}
            onClick={() => rememberLocale(otherLocale)}
          >
            {copy.switchLabel}
          </a>
          <Link className="btn btn-primary btn-small header-cta" href={copy.contact}>
            <span>{copy.bookCall}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label={copy.mobileNav}
        hidden={!menuOpen}
      >
        <div className="container">
          <small className="mobile-nav-label">{copy.servicesLabel}</small>
          {copy.menu.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="mobile-service"
              onClick={() => setMenuOpen(false)}
            >
              <IconTile name={service.icon} size={18} />
              <span>
                <b>{service.name}</b>
                <small>{service.line}</small>
              </span>
            </Link>
          ))}
          <small className="mobile-nav-label">{copy.studioLabel}</small>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          ))}
          <div className="mobile-nav-foot">
            <Link
              className="btn btn-primary"
              href={copy.contact}
              onClick={() => setMenuOpen(false)}
            >
              <span>{copy.bookCall}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a
              href={counterpart(pathname, otherLocale)}
              hrefLang={otherLocale}
              lang={otherLocale}
              onClick={() => rememberLocale(otherLocale)}
            >
              {copy.switchTitle}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
