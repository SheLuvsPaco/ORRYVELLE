import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Mail } from "lucide-react";
import { servicesIn, site } from "@/lib/studio/content";
import { href, type Locale } from "@/lib/studio/i18n";
import { projects } from "@/lib/studio/projects";
import { ButtonLink, Chip, Corners } from "./ui";
import OrryvelleMark from "./OrryvelleMark";
import "./styles/studio-intro.css";

const pad = (value: number) => String(value).padStart(2, "0");

const text = {
  en: {
    chip: "Meet the studio",
    title: ["One team from", "first call to launch."],
    lead: "Orryvelle is a design and engineering studio. We build the software, automations and websites that established and growing businesses run on, and we stay accountable for them after launch.",
    body: "You work directly with the people designing and building your project: no account managers relaying messages and no hand-off to a team you’ve never met. Strategy, design and engineering stay in one conversation from first call to launch.",
    more: "More about us",
    work: "See the work",
    contactLabel: "Contact the studio",
    book: "Book a free 30-minute call",
    photo: "A quiet studio desk in the evening: a monitor, keyboard and lamp.",
    disciplines: "Core disciplines",
    concepts: "Concept studies",
    shown: "Projects shown",
    call: "Free intro call",
    min: "min",
  },
  bg: {
    chip: "Запознайте се със студиото",
    title: ["Един екип от", "първия разговор до старта."],
    lead: "Orryvelle е студио за дизайн и разработка. Изграждаме софтуера, автоматизациите и уебсайтовете, на които разчитат утвърдени и растящи бизнеси, и носим отговорност за тях и след старта.",
    body: "Работите директно с хората, които проектират и изграждат проекта ви: без акаунт мениджъри, които предават съобщения, и без прехвърляне към екип, който не познавате. Стратегията, дизайнът и разработката вървят ръка за ръка от първия разговор до старта.",
    more: "Повече за нас",
    work: "Вижте проектите",
    contactLabel: "Свържете се със студиото",
    book: "Запазете безплатен 30-минутен разговор",
    photo: "Тихо работно бюро в студиото вечер: монитор, клавиатура и лампа.",
    disciplines: "Основни направления",
    concepts: "Концептуални проекта",
    shown: "Показани проекта",
    call: "Безплатен първи разговор",
    min: "мин",
  },
};

/** Home "Meet the studio": copy beside a framed studio photograph with a glass stats strip. */
export default function StudioIntro({ locale = "en" }: { locale?: Locale }) {
  const copy = text[locale];
  const allConcepts = projects.every((project) => project.status === "concept");
  // Every figure here is true by construction: counted from the site's own content.
  const stats = [
    { value: pad(servicesIn(locale).length), label: copy.disciplines },
    { value: pad(projects.length), label: allConcepts ? copy.concepts : copy.shown },
    { value: "30", unit: copy.min, label: copy.call },
  ];
  return (
    <section className="section studio-section" id="studio">
      <div className="container studio-intro">
        <div className="studio-copy" data-reveal>
          <Chip>{copy.chip}</Chip>
          <h2>
            {copy.title[0]}
            <br />
            <span className="tone">{copy.title[1]}</span>
          </h2>
          <p className="lead">{copy.lead}</p>
          <p>{copy.body}</p>
          <div className="studio-actions">
            <ButtonLink href={href(locale, "/about")} variant="outline">
              {copy.more}
            </ButtonLink>
            <Link href={href(locale, "/work")} className="text-link">
              {copy.work} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="studio-contact" aria-label={copy.contactLabel}>
            <li>
              <a href={`mailto:${site.email}`}>
                <span className="studio-contact-icon" aria-hidden="true">
                  <Mail size={16} strokeWidth={1.6} />
                </span>
                {site.email}
              </a>
            </li>
            <li>
              <Link href={href(locale, "/contact")}>
                <span className="studio-contact-icon" aria-hidden="true">
                  <CalendarDays size={16} strokeWidth={1.6} />
                </span>
                {copy.book}
              </Link>
            </li>
          </ul>
        </div>

        <div className="si-visual" data-reveal="image">
          <div className="si-frame">
            <div className="si-photo">
              <Image
                src="/images/studio/workspace-desk-evening.jpg"
                alt={copy.photo}
                fill
                sizes="(max-width: 1080px) 92vw, 660px"
                fetchPriority="low"
              />
            </div>
            <span className="si-mark" aria-hidden="true">
              <OrryvelleMark size={40} />
              <Corners />
            </span>
            <div className="si-stats">
              <dl>
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt>
                      {stat.value}
                      {stat.unit ? <small>{stat.unit}</small> : null}
                    </dt>
                    <dd>{stat.label}</dd>
                  </div>
                ))}
              </dl>
              <Corners />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
