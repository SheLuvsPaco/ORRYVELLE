"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, MessageSquare } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import Cal, { getCalApi } from "@calcom/embed-react";
import { track } from "@/lib/studio/consent";
import { t as dictionary, href, type Locale } from "@/lib/studio/i18n";
import { site } from "@/lib/studio/site";
import "./styles/contact-experience.css";

export default function ContactExperience({ locale = "en" }: { locale?: Locale }) {
  const copy = dictionary(locale).contactPanel;
  const [tab, setTab] = useState<"book" | "enquiry">("book");
  const [calendarReady, setCalendarReady] = useState(false);
  const [calendarSlow, setCalendarSlow] = useState(false);
  useEffect(() => {
    let active = true;
    const timeout = window.setTimeout(() => setCalendarSlow(true), 12000);
    const ready = () => {
      if (active) {
        setCalendarReady(true);
        window.clearTimeout(timeout);
      }
    };
    const failed = () => {
      if (active) setCalendarSlow(true);
    };
    void getCalApi({ namespace: "studio-conversation" }).then((cal) => {
      if (!active) return;
      cal("on", { action: "linkReady", callback: ready });
      cal("on", { action: "linkFailed", callback: failed });
      cal("on", { action: "bookingSuccessfulV2", callback: () => track("call_booked") });
    });
    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, []);
  const tabs = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sync = () =>
      setTab(window.location.hash === "#enquiry" ? "enquiry" : "book");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  function choose(next: "book" | "enquiry") {
    setTab(next);
    window.history.replaceState(null, "", `#${next}`);
  }
  return (
    <div className="contact-experience">
      <div
        className="contact-tabs"
        role="tablist"
        aria-label={copy.tabsLabel}
        ref={tabs}
        onKeyDown={(event) => {
          if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "Home" ||
            event.key === "End"
          ) {
            event.preventDefault();
            const next =
              event.key === "Home"
                ? "book"
                : event.key === "End"
                  ? "enquiry"
                  : tab === "book"
                    ? "enquiry"
                    : "book";
            choose(next);
            tabs.current
              ?.querySelector<HTMLButtonElement>(`#tab-${next}`)
              ?.focus();
          }
        }}
      >
        <button
          id="tab-book"
          type="button"
          role="tab"
          aria-selected={tab === "book"}
          aria-controls="panel-book"
          tabIndex={tab === "book" ? 0 : -1}
          onClick={() => choose("book")}
        >
          <CalendarDays size={17} aria-hidden="true" />
          {copy.bookTab}<span>{copy.bookMeta}</span>
        </button>
        <button
          id="tab-enquiry"
          type="button"
          role="tab"
          aria-selected={tab === "enquiry"}
          aria-controls="panel-enquiry"
          tabIndex={tab === "enquiry" ? 0 : -1}
          onClick={() => choose("enquiry")}
        >
          <MessageSquare size={17} aria-hidden="true" />
          {copy.briefTab}<span>{copy.briefMeta}</span>
        </button>
      </div>
      <div
        id="panel-book"
        role="tabpanel"
        aria-labelledby="tab-book"
        hidden={tab !== "book"}
        tabIndex={0}
        className="booking-panel"
      >
        <div className="booking-caption">
          <span>{copy.findTime}</span>
          <a href={site.booking} target="_blank" rel="noreferrer">
            {copy.openCalendar} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="booking-frame">
          {!calendarReady && (
            <div className="calendar-status" role="status">
              <CalendarDays size={32} aria-hidden="true" />
              <h3>
                {calendarSlow ? copy.slowTitle : copy.loadingTitle}
              </h3>
              <p>
                {calendarSlow ? copy.slowText : copy.loadingText}
              </p>
              <a
                className="studio-button"
                href={site.booking}
                target="_blank"
                rel="noreferrer"
              >
                {copy.chooseTime} <ArrowUpRight size={17} />
              </a>
            </div>
          )}

          <Cal
            namespace="studio-conversation"
            calLink={site.calLink}
            config={{ layout: "month_view", theme: "light" }}
            style={{ width: "100%", height: "100%", overflow: "auto" }}
          />
        </div>
        <p className="booking-help">
          {copy.notLoading}{" "}
          <a href={site.booking} target="_blank" rel="noreferrer">
            {copy.chooseOnCal}
          </a>{" "}
          {copy.or} <a href={`mailto:${site.email}`}>{copy.emailUs}</a>.{" "}
          {copy.bookingPrivacy} <a href={href(locale, "/privacy")}>{copy.privacy}</a>.
        </p>
      </div>
      <div
        id="panel-enquiry"
        role="tabpanel"
        aria-labelledby="tab-enquiry"
        hidden={tab !== "enquiry"}
        tabIndex={0}
      >
        <EnquiryForm locale={locale} />
      </div>
    </div>
  );
}
