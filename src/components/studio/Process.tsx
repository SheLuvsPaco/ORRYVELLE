import Image from "next/image";
import {
  Bold,
  Check,
  Compass,
  FileText,
  Italic,
  LifeBuoy,
  Link2,
  Lock,
  MessageSquare,
  Monitor,
  PenTool,
  Play,
  Share2,
  Smartphone,
  Tablet,
} from "lucide-react";
import { processStepsIn } from "@/lib/studio/content";
import type { Locale } from "@/lib/studio/i18n";
import { tr } from "./tr";
import { Glass, Panel, Pill, Tile } from "./Fragments";
import { Corners, Icon, SectionIntro } from "./ui";
import "./styles/process.css";

/*
 * Process cards: three stages, each ending in an illustrative tool screen
 * cropped by the card edge. Screens are static and decorative.
 */

function Proposal() {
  return (
    <div className="fr fr-proposal">
      <Panel className="fr-doc">
        <div className="fr-bar">
          <FileText size="1.15em" strokeWidth={1.5} />
          <b>{tr("Proposal")}</b>
          <span className="fr-muted">/ {tr("Scope of work")}</span>
          <span className="fr-people fr-end">
            <i>YO</i>
            <i className="is-studio">SL</i>
          </span>
          <span className="fr-btn is-dark">{tr("Share")}</span>
        </div>
        <div className="fr-doc-body">
          <ol className="fr-doc-toc">
            <small>{tr("Contents")}</small>
            {["Goals", "Scope", "Deliverables", "Timeline", "Investment"].map((item, index) => (
              <li key={item} className={index === 1 ? "is-active" : ""}>
                <code>{index + 1}</code>
                {tr(item)}
              </li>
            ))}
          </ol>
          <div className="fr-doc-page">
            <b className="fr-doc-title">2 · {tr("Scope of work")}</b>
            <p>
              {tr("Phase one covers")} <mark>{tr("discovery workshops, user journeys")}</mark>{" "}
              {tr("and a technical plan for the first release.")}
            </p>
            <ul className="fr-doc-table">
              {[
                ["Design direction", "Review 1"],
                ["First working build", "Review 2"],
                ["Launch candidate", "Review 3"],
              ].map(([item, review]) => (
                <li key={item}>
                  <span>{tr(item!)}</span>
                  <small>{tr(review!)}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>
      <span className="fr-toolbar">
        <Bold size="1.05em" strokeWidth={2.25} />
        <Italic size="1.05em" />
        <Link2 size="1.05em" />
        <i />
        <MessageSquare size="1.05em" className="is-active" />
        <span>{tr("Suggest")}</span>
      </span>
      <Tile icon={Compass} className="fr-proposal-tile" />
    </div>
  );
}

function Review() {
  return (
    <div className="fr fr-review">
      <Panel className="fr-browser">
        <div className="fr-bar fr-browser-bar">
          <span className="fr-lights">
            <i />
            <i />
            <i />
          </span>
          <span className="fr-url">
            <Lock size="0.9em" /> {tr("staging · preview")}
          </span>
          <Pill>{tr("Milestone 2")}</Pill>
        </div>
        <div className="fr-site">
          <Image src="/images/studio/arch-concrete-stair.jpg" alt="" fill sizes="420px" style={{ objectPosition: "50% 45%" }} />
          <span className="fr-site-nav">
            <i />
            <span>{tr("Work")}</span>
            <span>{tr("Studio")}</span>
            <span>{tr("Contact")}</span>
          </span>
          <span className="fr-site-title">
            {tr("Quiet spaces,")}
            <br />
            {tr("carefully made.")}
          </span>
          <span className="fr-pin is-one">
            1<Corners />
          </span>
          <span className="fr-pin is-two">
            2<Corners />
          </span>
        </div>
      </Panel>
      <span className="fr-devicebar">
        <Monitor size="1.1em" className="is-active" />
        <Tablet size="1.1em" />
        <Smartphone size="1.1em" />
        <i />
        <MessageSquare size="1.1em" className="is-accent" />
        <Share2 size="1.1em" />
      </span>
      <div className="fr-comment">
        <span className="fr-comment-head">
          <i>YO</i>
          <b>{tr("You")}</b>
          <small>{tr("2 min")}</small>
        </span>
        <p>{tr("Could the headline sit a line higher on mobile?")}</p>
        <span className="fr-comment-reply">
          <Check size="1em" /> {tr("Resolved in next build")}
        </span>
      </div>
      <Tile icon={PenTool} className="fr-review-tile" />
    </div>
  );
}

function Handover() {
  return (
    <div className="fr fr-handover">
      <Panel className="fr-player">
        <div className="fr-bar">
          <Play size="1em" />
          <b>{tr("Handover walkthrough")}</b>
          <span className="fr-muted fr-end">{tr("Recorded for your team")}</span>
        </div>
        <div className="fr-video">
          <Image src="/images/studio/arch-skylight-timber.jpg" alt="" fill sizes="420px" />
          <span className="fr-play">
            <Play size="1.4em" fill="currentColor" />
            <Corners />
          </span>
          <span className="fr-chapter">{tr("Chapter 2 · Editing content")}</span>
          <span className="fr-scrub">
            <i className="is-done" />
            <i className="is-now" />
            <i />
            <i />
          </span>
        </div>
      </Panel>
      <Glass className="fr-pack">
        <small>{tr("Handover pack")}</small>
        {[
          ["Admin access", true],
          ["Documentation", true],
          ["Runbook", true],
          ["Training call", false],
        ].map(([label, done]) => (
          <span key={label as string} className={done ? "" : "is-pending"}>
            <span className={`fr-tick ${done ? "is-ok" : "is-pending"}`}>
              {done ? <Check size="0.85em" strokeWidth={3} /> : null}
            </span>
            {tr(label as string)}
          </span>
        ))}
      </Glass>
      <Tile icon={LifeBuoy} className="fr-handover-tile" />
    </div>
  );
}

export function ProcessArt({ step }: { step: string }) {
  return (
    <div className="process-ui" aria-hidden="true">
      {step === "01" ? <Proposal /> : step === "02" ? <Review /> : <Handover />}
    </div>
  );
}

const text = {
  en: {
    chip: "How we work",
    title: ["A clear process.", "No surprises."] as [string, string],
    text: "Every engagement follows the same three stages, so you always know what is happening, what we need from you, and what comes next.",
  },
  bg: {
    chip: "Как работим",
    title: ["Ясен процес.", "Без изненади."] as [string, string],
    text: "Всеки проект минава през едни и същи три етапа, така че винаги знаете какво се случва, какво ни трябва от вас и какво следва.",
  },
};

export function ProcessCards({ id = "process", locale = "en" }: { id?: string; locale?: Locale }) {
  const copy = text[locale];
  return (
    <section className="section" id={id}>
      <div className="container">
        <SectionIntro chip={copy.chip} title={copy.title} text={copy.text} />
        <div className="process-grid">
          {processStepsIn(locale).map((step, index) => (
            <article
              className="process-card"
              key={step.number}
              data-reveal
              data-spotlight
              style={{ "--d": index * 110 } as React.CSSProperties}
            >
              <span className="process-numeral" aria-hidden="true">
                {step.number}
              </span>
              <Icon name={step.icon} size={30} strokeWidth={1.25} />
              <h3>
                {step.titleParts[0]} <span className="tone">{step.titleParts[1]}</span>
              </h3>
              <p>{step.text}</p>
              <ProcessArt step={step.number} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
