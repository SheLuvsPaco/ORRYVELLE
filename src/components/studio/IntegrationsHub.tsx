"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import type { Locale } from "@/lib/studio/i18n";
import { integrations } from "@/lib/studio/site";
import { Corners, SectionIntro } from "./ui";
import BrandLogo from "./BrandLogo";
import { useMotionActivity } from "./useMotionActivity";
import OrryvelleMark from "./OrryvelleMark";
import "./styles/integrations-hub.css";

const text = {
  en: {
    examples: [
      ["Opportunity updated", "Team notified", "Keep the right people informed when a deal moves forward."],
      ["Lead qualified", "Meeting arranged", "Bring lead context into the calendar your team already uses."],
      ["Payment received", "Finance notified", "Pass payment details to your team’s Microsoft 365 workflow."],
      ["Order placed", "Work record created", "Give the fulfilment team a shared record of what needs to happen."],
      ["Invoice due", "Reminder prepared", "Connect invoice status to your agreed customer reminder sequence."],
      ["Brief received", "Draft prepared", "Use structured information to prepare a draft for human review."],
    ],
    chip: "Integrations",
    title: ["Connected to the tools", "you already run."] as [string, string],
    text: "Your software, systems, and website should share information cleanly. We integrate with the platforms your teams depend on, and build the connections that don’t exist yet.",
    explore: (from: string, to: string) => `Explore ${from} to ${to}`,
    pair: (from: string, to: string) => `${from} to ${to}`,
    sources: "Source platforms",
    targets: "Destination platforms",
    core: "Orryvelle integration layer",
    picker: "Choose an example connection",
    eyebrow: "EXAMPLE CONNECTION",
    play: "Play connection examples",
    pause: "Pause connection examples",
    playShort: "Play examples",
    pauseShort: "Pause examples",
    footnote: "Select a platform to trace a connection. Illustrative workflows; scope depends on your tools and permissions.",
  },
  bg: {
    examples: [
      ["Сделката е обновена", "Екипът е уведомен", "Правилните хора научават веднага, когато сделка напредне."],
      ["Контактът е квалифициран", "Срещата е насрочена", "Информацията за клиента влиза в календара, който екипът ви вече ползва."],
      ["Плащането е получено", "Финансите са уведомени", "Данните за плащането стигат до процесите на екипа ви в Microsoft 365."],
      ["Поръчката е направена", "Задачата е създадена", "Екипът по изпълнението получава общ запис какво трябва да се случи."],
      ["Фактурата е с падеж", "Напомнянето е готово", "Статусът на фактурата се свързва с уговорените напомняния към клиента."],
      ["Заданието е получено", "Черновата е готова", "Подредената информация се използва за чернова, която човек преглежда."],
    ],
    chip: "Интеграции",
    title: ["Свързано с инструментите,", "които вече ползвате."] as [string, string],
    text: "Софтуерът, системите и уебсайтът ви трябва да споделят информация безпроблемно. Свързваме платформите, от които зависи екипът ви, и изграждаме връзките, които още не съществуват.",
    explore: (from: string, to: string) => `Разгледайте връзката ${from} към ${to}`,
    pair: (from: string, to: string) => `${from} към ${to}`,
    sources: "Платформи източници",
    targets: "Платформи получатели",
    core: "Интеграционният слой на Orryvelle",
    picker: "Изберете примерна връзка",
    eyebrow: "ПРИМЕРНА ВРЪЗКА",
    play: "Пусни примерите за връзки",
    pause: "Спри примерите за връзки",
    playShort: "Пусни примерите",
    pauseShort: "Спри примерите",
    footnote: "Изберете платформа, за да проследите връзката. Процесите са илюстративни; обхватът зависи от инструментите и правата ви.",
  },
};
const CYCLE = 5600;
type Connection = { source: string; target: string };

export default function IntegrationsHub({ locale = "en" }: { locale?: Locale }) {
  const copy = text[locale];
  const examples = copy.examples;
  const { ref, available, reduced } = useMotionActivity<HTMLElement>();
  const diagram = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLDivElement>(null);
  const sources = useRef<(HTMLButtonElement | null)[]>([]);
  const targets = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [paths, setPaths] = useState<Connection[]>([]);
  const current = preview ?? active;
  const intent = userPlaying ?? !reduced;
  const running = intent && available && preview === null;
  const example = examples[current]!;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % examples.length),
      CYCLE,
    );
    return () => window.clearInterval(timer);
  }, [running, examples.length]);

  useEffect(() => {
    const element = diagram.current,
      center = core.current;
    if (!element || !center) return;
    let frame = 0;
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = element.getBoundingClientRect(),
          hub = center.getBoundingClientRect();
        const vertical = window.matchMedia("(max-width: 680px)").matches;
        const relative = (x: number, y: number) => [x - box.left, y - box.top];
        const curve = (start: number[], end: number[]) =>
          vertical
            ? `M${start[0]},${start[1]} C${start[0]},${(start[1]! + end[1]!) / 2} ${end[0]},${(start[1]! + end[1]!) / 2} ${end[0]},${end[1]}`
            : `M${start[0]},${start[1]} C${(start[0]! + end[0]!) / 2},${start[1]} ${(start[0]! + end[0]!) / 2},${end[1]} ${end[0]},${end[1]}`;
        setPaths(
          examples.map((_, index) => {
            const source = sources.current[index]?.getBoundingClientRect(),
              target = targets.current[index]?.getBoundingClientRect();
            if (!source?.width || !target?.width)
              return { source: "", target: "" };
            return {
              source: curve(
                vertical
                  ? relative(source.left + source.width / 2, source.bottom)
                  : relative(source.right, source.top + source.height / 2),
                vertical
                  ? relative(hub.left + hub.width / 2, hub.top)
                  : relative(hub.left, hub.top + hub.height / 2),
              ),
              target: curve(
                vertical
                  ? relative(hub.left + hub.width / 2, hub.bottom)
                  : relative(hub.right, hub.top + hub.height / 2),
                vertical
                  ? relative(target.left + target.width / 2, target.top)
                  : relative(target.left, target.top + target.height / 2),
              ),
            };
          }),
        );
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    observer.observe(center);
    [...sources.current, ...targets.current].forEach((node) => {
      if (node) observer.observe(node);
    });
    document.fonts.ready.then(measure);
    measure();
    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [current, examples]);

  function select(index: number) {
    setActive(index);
    setUserPlaying(false);
  }
  function node(name: string, index: number, side: "source" | "target") {
    return (
      <li key={name} data-selected={current === index}>
        <button
          type="button"
          ref={(el) => {
            (side === "source" ? sources : targets).current[index] = el;
          }}
          className="integration-node"
          aria-pressed={current === index}
          aria-label={copy.explore(integrations.left[index]!, integrations.right[index]!)}
          onMouseEnter={() => setPreview(index)}
          onMouseLeave={() => setPreview(null)}
          onFocus={() => setPreview(index)}
          onBlur={() => setPreview(null)}
          onClick={() => select(index)}
        >
          <BrandLogo name={name} size={25} />
          <span>{name}</span>
          <span className="node-port" aria-hidden="true" />
        </button>
      </li>
    );
  }
  return (
    <section
      data-float-hide
      className="section section-dots integration-section"
      ref={ref}
      data-manual-play={userPlaying === true}
      data-running={running}
      id="integrations"
    >
      <div className="container">
        <SectionIntro
          center
          chip={copy.chip}
          title={copy.title}
          text={copy.text}
        />
        <div className="integration-diagram" ref={diagram}>
          <svg className="connection-lines" aria-hidden="true">
            <g>
              {paths.map((pair, index) => (
                <g
                  key={index}
                  className={current === index ? "is-selected" : ""}
                >
                  <path d={pair.source} />
                  <path d={pair.target} />
                </g>
              ))}
            </g>
            {paths[current]?.source && (
              <g key={current} className="connection-packets">
                <path
                  d={paths[current]?.source}
                  pathLength={100}
                  className="connection-packet is-inbound"
                />
                <path
                  d={paths[current]?.target}
                  pathLength={100}
                  className="connection-packet is-outbound"
                />
              </g>
            )}
          </svg>
          <ul
            className="integration-side is-source"
            aria-label={copy.sources}
          >
            {integrations.left.map((name, index) =>
              node(name, index, "source"),
            )}
          </ul>
          <div
            className="integration-core"
            ref={core}
            role="img"
            aria-label={copy.core}
          >
            <span className="core-monogram"><OrryvelleMark size={48} /></span>
            <Corners />
            <div key={current} className="core-receipt" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
          <ul
            className="integration-side is-target"
            aria-label={copy.targets}
          >
            {integrations.right.map((name, index) =>
              node(name, index, "target"),
            )}
          </ul>
        </div>
        <div
          className="integration-mobile-picker"
          role="group"
          aria-label={copy.picker}
        >
          {integrations.left.map((name, index) => (
            <button
              key={name}
              type="button"
              aria-label={copy.pair(name, integrations.right[index]!)}
              aria-pressed={current === index}
              onClick={() => select(index)}
            >
              <BrandLogo name={name} size={21} />
              <ArrowRight size={12} aria-hidden="true" />
              <BrandLogo name={integrations.right[index]!} size={21} />
            </button>
          ))}
        </div>
        <div className="connection-caption">
          <div className="connection-copy" id="connection-description">
            <span className="connection-eyebrow">
              {copy.eyebrow}{" "}
              <span>{String(current + 1).padStart(2, "0")} / 06</span>
            </span>
            <p key={current}>
              <strong>{example[0]}</strong>
              <ArrowRight size={16} aria-hidden="true" />
              <strong>{example[1]}</strong>
            </p>
            <span className="connection-explanation">{example[2]}</span>
          </div>
          <button
            type="button"
            className="connection-control"
            aria-label={
              intent ? copy.pause : copy.play
            }
            aria-pressed={intent}
            onClick={() => {
              setPreview(null);
              setUserPlaying(!intent);
            }}
          >
            {intent ? <Pause size={14} /> : <Play size={14} />}
            <span>{intent ? copy.pauseShort : copy.playShort}</span>
          </button>
        </div>
        <p className="integration-footnote">
          {copy.footnote}
        </p>
      </div>
    </section>
  );
}
