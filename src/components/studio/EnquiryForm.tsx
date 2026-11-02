"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, ChevronDown, Loader2, Lock } from "lucide-react";
import { track } from "@/lib/studio/consent";
import { t as dictionary, href, type Locale } from "@/lib/studio/i18n";
import { site, type ServiceSlug } from "@/lib/studio/site";
import "./styles/enquiry-form.css";

export default function EnquiryForm({
  tone = "light",
  defaultService = "",
  heading,
  locale = "en",
}: {
  tone?: "light" | "dark" | "card";
  defaultService?: ServiceSlug | "";
  heading?: string;
  locale?: Locale;
}) {
  const copy = dictionary(locale).form;
  const id = useId();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) || "").trim();
    const payload = {
      name: field("name"),
      email: field("email"),
      company: field("company"),
      service: field("service"),
      message: field("message"),
      enquiry_ref: field("enquiry_ref"),
    };
    if (!payload.name || !payload.email || !payload.company || !payload.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      // Our API route validates the enquiry and forwards it to the CRM webhook.
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Enquiry was not accepted");
      setStatus("success");
      // Only which service was picked; nothing the visitor typed.
      track("enquiry_sent", { service: payload.service || "not_sure" });
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }
  if (status === "success")
    return (
      <div className={`enquiry enquiry-${tone} enquiry-success`} role="status">
        <span className="success-icon">
          <Check size={26} />
        </span>
        <h3>{copy.successTitle}</h3>
        <p>{copy.successText}</p>
        <button
          type="button"
          className="text-link"
          onClick={() => setStatus("idle")}
        >
          {copy.again} <ArrowUpRight size={16} />
        </button>
      </div>
    );
  const defaultName = defaultService ? copy.byService[defaultService] : "";
  return (
    <form
      onSubmit={submit}
      className={`enquiry enquiry-${tone}`}
      aria-label={copy.label}
    >
      {heading ? <h2 className="enquiry-heading">{heading}</h2> : null}
      <fieldset disabled={status === "sending"}>
        <div className="form-row">
          <div className="field">
            <label htmlFor={`${id}-name`}>
              {copy.name} <span aria-hidden="true">*</span>
            </label>
            <input
              id={`${id}-name`}
              name="name"
              autoComplete="name"
              placeholder={copy.namePh}
              required
              maxLength={120}
            />
          </div>
          <div className="field">
            <label htmlFor={`${id}-email`}>
              {copy.email} <span aria-hidden="true">*</span>
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder={copy.emailPh}
              required
              maxLength={200}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor={`${id}-company`}>
              {copy.company} <span aria-hidden="true">*</span>
            </label>
            <input
              id={`${id}-company`}
              name="company"
              autoComplete="organization"
              placeholder={copy.companyPh}
              required
              maxLength={200}
            />
          </div>
          <div className="field">
            <label htmlFor={`${id}-service`}>{copy.service}</label>
            <span className="select">
              <select
                id={`${id}-service`}
                name="service"
                defaultValue={defaultName}
              >
                <option value="">{copy.select}</option>
                {copy.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </span>
          </div>
        </div>
        <div className="field">
          <label htmlFor={`${id}-message`}>
            {copy.message} <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            placeholder={copy.messagePh}
            required
            rows={4}
            maxLength={5000}
          />
        </div>
        {/* Honeypot: hidden from people and assistive tech, filled in by bots. */}
        <div className="sr-only" aria-hidden="true">
          {/* A name and label autofill never matches, so real visitors can't trip it. */}
          <label htmlFor={`${id}-ref`}>{copy.honeypot}</label>
          <input id={`${id}-ref`} name="enquiry_ref" tabIndex={-1} autoComplete="off" />
        </div>
        {status === "error" ? (
          <p className="form-error" role="alert">
            {copy.error} <a href={`mailto:${site.email}`}>{copy.errorLink}</a>.
          </p>
        ) : null}
        <button className="btn btn-primary form-submit" type="submit">
          {status === "sending" ? (
            <>
              <span>{copy.sending}</span>
              <Loader2 className="spin" size={18} aria-hidden="true" />
            </>
          ) : (
            <>
              <span>{copy.submit}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="form-note">
          <Lock size={12} strokeWidth={2} aria-hidden="true" />
          <span>
            {copy.note} <a href={href(locale, "/privacy")}>{copy.privacy}</a>
          </span>
        </p>
      </fieldset>
    </form>
  );
}
