import { generalFaqsIn, processStepsIn, services, servicesIn, site, valuesIn } from "./content";
import { feedPath } from "./feed";
import { href, inSentence, t, type Locale } from "./i18n";
import { insights, insightsIn } from "./insights";
import { projectBySlug, projectsIn, type Project } from "./projects";
import { solutionPath, solutions, solutionsIn } from "./solutions";

/**
 * Plain-text guides for AI assistants and answer engines (llmstxt.org convention), built from
 * the same content as the pages so they never drift apart. Keep claims to what the site shows.
 * llms.txt indexes every page in both languages; llms-full.txt (English) and /bg/llms-full.txt
 * (Bulgarian) carry the full text.
 */

const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;
const clientWorkIn = (locale: Locale) => projectsIn(locale).filter((project) => project.status === "client");
const conceptsIn = (locale: Locale) => projectsIn(locale).filter((project) => project.status === "concept");
const serviceName = (project: Project, locale: Locale) =>
  servicesIn(locale).find((service) => service.slug === project.service)?.name ?? "";

const facts: Record<Locale, string> = {
  en: `- ${site.location}. All work is delivered remotely.
- Company: ${site.company.name.en}, registered in ${site.company.address.city.en}, Bulgaria.
- Three equal disciplines: custom software, enterprise solutions (AI agents, automation, integrations) and premium websites.
- Pricing and engagement: Every system is specific, so there is no fixed price list. Each project starts with a free 30-minute consultation; scope, deliverables, pricing and timeline are then agreed in a written proposal before any work begins.
- Ownership: websites belong to the client outright on payment, including design, code, domain and hosting. Software and automations come in three models: build and hand over, managed on a monthly retainer (hosting, maintenance, updates, monthly performance reports), or a full IP buyout. In every model the client can use and adapt the system; only a buyout includes the right to resell it.
- Support: every delivery includes 30 days of oversight in production; ongoing work is available on a monthly retainer.
- Speed: a fully built website with its domain can be live in around 48 hours when content is provided up front.
- AI voice agents disclose that they are AI where the law requires it (including the EU). Work follows GDPR.
- How we build: automations and AI agents are built entirely by hand in n8n; software and websites are built with AI-powered tools, with developers reviewing and testing everything that ships.
- Languages: English and Bulgarian.
- Contact: ${site.email} · Book a free consultation: ${url("/contact")}`,
  bg: `- ${t("bg").footer.location}. Цялата работа се извършва дистанционно.
- Дружество: ${site.company.name.bg}, регистрирано в ${site.company.address.city.bg}.
- Три равностойни направления: софтуер по поръчка, AI и автоматизация (AI агенти, автоматизация, интеграции) и премиум уебсайтове.
- Цена и начин на работа: всяка система е различна, затова няма фиксиран ценоразпис. Всеки проект започва с безплатна 30-минутна консултация; обхватът, резултатите, цената и сроковете се уговарят в писмена оферта, преди да започне работа.
- Собственост: уебсайтовете стават изцяло собственост на клиента след плащане, включително дизайнът, кодът, домейнът и хостингът. Софтуерът и автоматизациите се предлагат в три модела: изработка и предаване, месечна поддръжка (хостинг, поддръжка, обновления, месечни отчети) или пълно изкупуване на правата. При всеки модел клиентът може да ползва и променя системата; само изкупуването включва правото да я препродава.
- Поддръжка: всяко предаване включва 30 дни наблюдение в реална работа; след това е възможна месечна поддръжка.
- Бързина: напълно завършен уебсайт с домейн може да е онлайн за около 48 часа, когато съдържанието е предоставено предварително.
- Гласовите AI агенти казват на обаждащите се, че говорят с AI, където законът го изисква (включително в ЕС). Работата е съобразена с GDPR.
- Как работим: автоматизациите и AI агентите се проектират и изграждат изцяло на ръка в n8n; софтуерът и уебсайтовете се изработват с AI инструменти, а разработчиците преглеждат и тестват всичко, което се пуска.
- Езици: български и английски.
- Контакт: ${site.email} · Безплатна консултация: ${url(href("bg", "/contact"))}`,
};

export function llmsTxt() {
  const bgClientWork = clientWorkIn("bg");
  const bgConcepts = conceptsIn("bg");
  return `# ${site.name}

> ${site.name} is a design and engineering studio based in ${site.base.country}, working with clients worldwide. It builds custom software, enterprise solutions (AI agents, automation and integrations) and premium websites for businesses that want to stop losing time and leads to manual work and weak websites.

${facts.en}

## Services
${services.map((service) => `- [${service.name}](${url(`/services/${service.slug}`)}): ${service.answer}`).join("\n")}

## Services in detail
${solutions.filter((s) => s.kind === "service").map((s) => `- [${s.name}](${url(solutionPath(s))}): ${s.answer}`).join("\n")}

## Industries
- [All industries](${url("/industries")}): the sectors the studio already builds for.
${solutions.filter((s) => s.kind !== "service").map((s) => `- [${s.name}](${url(solutionPath(s))}): ${s.answer}`).join("\n")}

## Work
- [All work](${url("/work")}): every case study, filterable by discipline.
${clientWorkIn("en").map((project) => `- [${project.title}](${url(`/work/${project.slug}`)}): ${project.summary} (${project.sector}; ${serviceName(project, "en")})`).join("\n")}
${conceptsIn("en").length ? `\nConcept studies (illustrative, not client projects):\n${conceptsIn("en").map((project) => `- [${project.title}](${url(`/work/${project.slug}`)}): ${project.summary}`).join("\n")}\n` : ""}
## Insights
- [All insights](${url("/insights")}): sourced guides, each starting with the short answer.
${insights.map((insight) => `- [${insight.title}](${url(`/insights/${insight.slug}`)}): ${insight.answer}`).join("\n")}

## Studio
- [Home](${url("/")}): the three disciplines, selected work and how a project runs.
- [About](${url("/about")}): who the studio is and how it works.
- [Contact](${url("/contact")}): book a free 30-minute consultation or send a project brief.

## In Bulgarian
Every page above also exists in Bulgarian under /bg, with Bulgarian URLs:
- [Начало](${url("/bg")}): началната страница на студиото.
${servicesIn("bg").map((service) => `- [${service.name}](${url(href("bg", `/services/${service.slug}`))}): ${service.answer}`).join("\n")}
${solutionsIn("bg").map((s) => `- [${s.name}](${url(solutionPath(s))}): ${s.answer}`).join("\n")}
- [Индустрии](${url(href("bg", "/industries"))}): секторите, за които студиото вече изгражда решения.
- [Проекти](${url(href("bg", "/work"))}): всички проекти, с филтър по направление.
${bgClientWork.map((project) => `- [${project.title}](${url(href("bg", `/work/${project.slug}`))}): ${project.summary}`).join("\n")}
${bgConcepts.map((project) => `- [${project.title}](${url(href("bg", `/work/${project.slug}`))}) (концептуален проект): ${project.summary}`).join("\n")}
- [Статии](${url(href("bg", "/insights"))}): статии с източници, всяка започва с краткия отговор.
${insightsIn("bg").map((insight) => `- [${insight.title}](${url(href("bg", `/insights/${insight.slug}`))}): ${insight.answer}`).join("\n")}
- [За нас](${url(href("bg", "/about"))}), [Контакти](${url(href("bg", "/contact"))}).

## Optional
- [Full content in English](${url("/llms-full.txt")}): every service, focused page, project, guide, process step and FAQ in one file.
- [Full content in Bulgarian](${url("/bg/llms-full.txt")}): the same in Bulgarian.
- [Sitemap](${url("/sitemap.xml")}): every page in both languages.
- [Insights feed](${url(feedPath("en"))}) and [Bulgarian feed](${url(feedPath("bg"))}): new guides as RSS.
- [Privacy policy](${url("/privacy")}) and [cookie policy](${url("/cookies")}), also in Bulgarian: [Поверителност](${url(href("bg", "/privacy"))}), [Бисквитки](${url(href("bg", "/cookies"))}).
`;
}

const words = {
  en: {
    title: `${site.name}: full content`,
    services: "Services",
    detail: "Services in detail",
    industries: "Industries",
    work: "Client work",
    insights: "Insights",
    process: "How a project works",
    values: "What the studio values",
    faq: "Frequently asked questions",
    offer: "What we build",
    why: "Why clients choose us",
    engagements: "How engagements run",
    includes: "Includes",
    questionsAbout: (name: string) => `Questions about ${inSentence(name)}`,
    questions: "Questions",
    audience: "For",
    pains: "Problems it solves",
    features: "What's included",
    steps: "How it works",
    proof: "Related work",
    sector: "Sector",
    discipline: "Discipline",
    platforms: "Platforms",
    delivered: "Delivered",
    updated: "updated",
    short: "Short answer",
  },
  bg: {
    title: `${site.name}: пълно съдържание`,
    services: "Услуги",
    detail: "Услуги в детайли",
    industries: "Индустрии",
    work: "Клиентски проекти",
    insights: "Статии",
    process: "Как протича един проект",
    values: "Какво цени студиото",
    faq: "Често задавани въпроси",
    offer: "Какво изграждаме",
    why: "Защо клиентите ни избират",
    engagements: "Формати на работа",
    includes: "Включва",
    questionsAbout: (name: string) => `Въпроси: ${name}`,
    questions: "Въпроси",
    audience: "За",
    pains: "Проблеми, които решава",
    features: "Какво включва",
    steps: "Как работим",
    proof: "Свързани проекти",
    sector: "Сектор",
    discipline: "Направление",
    platforms: "Платформи",
    delivered: "Предадено",
    updated: "обновено",
    short: "Кратък отговор",
  },
};

const qa = (faqs: { question: string; answer: string }[]) => faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n");

export function llmsFullTxt(locale: Locale = "en") {
  const w = words[locale];
  const serviceSections = servicesIn(locale).map((service) => `## ${service.name}
${url(href(locale, `/services/${service.slug}`))}

${service.answer} ${service.summary}

${w.offer}:
${service.offer.map((offer) => `- ${offer.title.join(" ")}: ${offer.body}`).join("\n")}

${w.why}:
${service.why.map((item) => `- ${item.title}: ${item.body}`).join("\n")}

${w.engagements}:
${service.engagement.map((stage) => `- ${stage.name} (${stage.lead}): ${stage.body} ${w.includes}: ${stage.includes.join(", ")}.`).join("\n")}

${w.questionsAbout(service.name)}:
${qa(service.faqs)}`);

  const solutionSection = (solution: ReturnType<typeof solutionsIn>[number]) => `## ${solution.name}
${url(solutionPath(solution))}
${solution.audience ? `${w.audience}: ${solution.audience}\n` : ""}
${solution.answer} ${solution.lead}

${w.pains}:
${solution.pains.map((pain) => `- ${pain.title}: ${pain.body}`).join("\n")}

${w.features}:
${solution.features.map((feature) => `- ${feature.title}: ${feature.body}`).join("\n")}

${w.steps}:
${solution.steps.map((step, index) => `${index + 1}. ${step.title}: ${step.body}`).join("\n")}

${w.proof}:
${solution.proof
  .map((item) => {
    const project = projectBySlug(item.slug, locale);
    return project ? `- [${project.title}](${url(href(locale, `/work/${project.slug}`))}): ${item.note}` : "";
  })
  .filter(Boolean)
  .join("\n")}

${w.questions}:
${qa(solution.faqs)}`;

  const projectSections = clientWorkIn(locale).map((project) => `## ${project.title}
${url(href(locale, `/work/${project.slug}`))}
${w.sector}: ${project.sector} · ${w.discipline}: ${serviceName(project, locale)}${project.platforms ? ` · ${w.platforms}: ${project.platforms}` : ""}

${project.summary}

${project.overview}

${project.approach}

${w.delivered}: ${project.deliverables.join("; ")}.`);

  const all = solutionsIn(locale);
  return `# ${w.title}

> ${locale === "bg" ? `${site.name} е студио за дизайн и разработка в България, което изработва софтуер по поръчка, AI автоматизация и премиум уебсайтове за клиенти по целия свят.` : `${site.description} ${site.location}.`}

${facts[locale]}

# ${w.services}

${serviceSections.join("\n\n")}

# ${w.detail}

${all.filter((s) => s.kind === "service").map(solutionSection).join("\n\n")}

# ${w.industries}

${all.filter((s) => s.kind !== "service").map(solutionSection).join("\n\n")}

# ${w.work}

${projectSections.join("\n\n")}

# ${w.insights}

${insightsIn(locale).map((insight) => `## ${insight.title}
${url(href(locale, `/insights/${insight.slug}`))} (${w.updated} ${insight.updated})

${w.short}: ${insight.answer}

${insight.body.replace(/^## /gm, "### ")}

${w.questions}:
${qa(insight.faqs)}`).join("\n\n")}

# ${w.process}
${url(href(locale, "/"))}

${processStepsIn(locale).map((step) => `${step.number}. ${step.title}: ${step.text}`).join("\n")}

# ${w.values}
${url(href(locale, "/about"))}

${valuesIn(locale).map((value) => `- ${value.title}: ${value.body}`).join("\n")}

# ${w.faq}
${url(href(locale, "/"))}

${qa(generalFaqsIn(locale))}
`;
}
