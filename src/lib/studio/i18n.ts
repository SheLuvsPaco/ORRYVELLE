import { serviceLinks, type IconName, type ServiceLink, type ServiceSlug } from "./site";

/**
 * Interface text and addresses for the two languages. English pages live in app/(en),
 * Bulgarian pages mirror them one to one in app/(bg)/bg. Client components and the
 * middleware import this file, so it must stay lean: no page copy, no content.ts or
 * projects.ts imports. Bulgarian uses the polite plural ("вие").
 */
export type Locale = "en" | "bg";
export const locales: Locale[] = ["en", "bg"];

/*
 * Bulgarian addresses. Every English page has a Bulgarian twin at the same position in the
 * tree, with each segment translated by these tables (project slugs are names and stay as
 * they are). Content keeps its English slug as its id; only the URL changes.
 */
const bgSections: Record<string, string> = {
  services: "uslugi",
  work: "proekti",
  about: "za-nas",
  insights: "statii",
  industries: "industrii",
  contact: "kontakti",
  "software-development-bulgaria": "softuerna-firma-v-bulgaria",
  privacy: "poveritelnost",
  cookies: "biskvitki",
};
const bgChildren: Record<string, Record<string, string>> = {
  services: {
    "custom-software": "softuer-po-porachka",
    "enterprise-solutions": "ai-i-avtomatizatsiya",
    websites: "uebsaitove",
    "web-design": "izrabotka-na-uebsait",
    "shopify-development": "izrabotka-na-onlain-magazin",
    "website-redesign": "redizain-na-uebsait",
    "custom-crm-development": "crm-sistema-po-porachka",
    "client-portal-development": "klientski-portal",
    "internal-tools": "vatreshni-sistemi",
    "mobile-app-development": "izrabotka-na-mobilno-prilozhenie",
    "ai-receptionist": "ai-asistent",
    "ai-cold-calling": "ai-za-studeni-obazhdaniya",
    "n8n-automation": "n8n-avtomatizatsiya",
    "crm-automation": "crm-avtomatizatsiya",
    "business-process-automation": "avtomatizatsiya-na-biznes-protsesi",
  },
  industries: {
    "salons-and-groomers": "saloni-i-gruming",
    "home-services": "domashni-uslugi-i-remonti",
    "event-rental": "naem-za-subitiya",
    "florists-and-retail": "tsvetarski-i-butikovi-magazini",
  },
  insights: {
    "ai-receptionist-vs-answering-service": "ai-asistent-ili-call-tsentar",
    "n8n-vs-zapier-vs-make": "n8n-zapier-ili-make",
    "custom-software-vs-off-the-shelf": "softuer-po-porachka-ili-gotov",
    "custom-website-vs-wordpress-webflow-shopify": "uebsait-po-porachka-ili-wordpress",
    "get-recommended-by-chatgpt": "kak-da-vi-preporachva-chatgpt",
  },
};
const invert = (table: Record<string, string>) => Object.fromEntries(Object.entries(table).map(([key, value]) => [value, key]));
const enSections = invert(bgSections);
const enChildren = Object.fromEntries(Object.entries(bgChildren).map(([section, table]) => [section, invert(table)]));

const split = (path: string) => {
  const [pathname = "/", hash] = path.split("#");
  return { segments: pathname.split("/").filter(Boolean), hash: hash === undefined ? "" : `#${hash}` };
};

/** The address of an English page in the given language: `href(locale, "/contact")`. */
export function href(locale: Locale, path: string) {
  if (locale === "en") return path;
  const { segments, hash } = split(path);
  const [section, ...rest] = segments;
  if (!section) return `/bg${hash}`;
  const children = bgChildren[section] ?? {};
  const translated = [bgSections[section] ?? section, ...rest.map((segment) => children[segment] ?? segment)];
  return `/bg/${translated.join("/")}${hash}`;
}

/** The English address behind any page address (identity for English pages). */
export function englishPath(path: string) {
  const { segments, hash } = split(path);
  if (segments[0] !== "bg") return path;
  const [, section, ...rest] = segments;
  if (!section) return `/${hash}`;
  const english = enSections[section] ?? section;
  const children = enChildren[english] ?? {};
  return `/${[english, ...rest.map((segment) => children[segment] ?? segment)].join("/")}${hash}`;
}

export const localeOf = (path: string): Locale => (path === "/bg" || path.startsWith("/bg/") ? "bg" : "en");

/** The same page in the other language. */
export const counterpart = (path: string, to: Locale) => href(to, englishPath(path.replace(/(.)\/$/, "$1")));

/** Translates a single route segment of a section, for Bulgarian dynamic routes. */
export const bgSlug = (section: string, slug: string) => bgChildren[section]?.[slug] ?? slug;
export const enSlug = (section: string, slug: string) => enChildren[section]?.[slug] ?? slug;

/** Discipline names and menu lines, for client components that can't import content.ts. */
const bgServiceText: Record<ServiceSlug, Pick<ServiceLink, "name" | "title" | "menuLine">> = {
  "custom-software": {
    name: "Софтуер по поръчка",
    title: ["Софтуер", "по поръчка"],
    menuLine: "Платформи, портали и вътрешни системи, създадени да издържат.",
  },
  "enterprise-solutions": {
    name: "AI и автоматизация",
    title: ["AI и", "автоматизация"],
    menuLine: "AI агенти, автоматизация и свързани процеси.",
  },
  websites: {
    name: "Уебсайтове",
    title: ["Премиум", "уебсайтове"],
    menuLine: "Премислени уебсайтове, които представят марката ви.",
  },
};
export const serviceLinksIn = (locale: Locale): ServiceLink[] =>
  locale === "en" ? serviceLinks : serviceLinks.map((link) => ({ ...link, ...bgServiceText[link.slug] }));

type MenuItem = { href: string; icon: IconName; title: [string, string]; name: string; line: string };

const menu = (locale: Locale) =>
  serviceLinksIn(locale).map(
    (service): MenuItem => ({
      href: href(locale, `/services/${service.slug}`),
      icon: service.icon,
      title: service.title,
      name: service.name,
      line: service.menuLine,
    }),
  );

/** Header links: the same pages in both languages. */
const studioLinks = (locale: Locale, labels: [string, string, string, string, string]) =>
  ["/work", "/about", "/insights", "/#process", "/contact"].map((path, index) => ({ label: labels[index]!, href: href(locale, path) }));

const en = {
  htmlLang: "en",
  dateLocale: "en-GB",
  home: "/",
  contact: "/contact",
  enquiry: "/contact#enquiry",
  homeLabel: "Orryvelle home",
  insightsFeed: "Orryvelle Insights",
  skip: "Skip to content",
  breadcrumb: "Breadcrumb",
  announcement: "Now taking on new software, systems & website projects",
  announcementCta: "Get in touch",
  dismiss: "Dismiss announcement",
  mainNav: "Main navigation",
  mobileNav: "Mobile navigation",
  servicesLabel: "Services",
  studioLabel: "Studio",
  menu: menu("en"),
  asideTitle: ["Not sure", "which fits?"] as [string, string],
  asideText: "Many projects span more than one discipline. Tell us the outcome you need and we’ll shape the right team around it.",
  asideCta: "Book a free 30-minute call",
  links: studioLinks("en", ["Work", "About", "Insights", "Process", "Contact"]),
  bookCall: "Book a free call",
  freeIntro: "Free 30-minute call",
  menuTitle: "Menu",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  switchLabel: "BG",
  switchTitle: "Български",
  badge: "Start a project",
  enquirySection: {
    chip: "Start your project",
    title: ["Have something", "worth building?"] as [string, string],
    text: "Book a free 30-minute call and leave with a clear next step. Prefer to write first? Send a short brief and we’ll reply with questions and times to talk.",
    assureTitle: "Free 30-minute call · No obligation",
    assureText: "Or send a brief and we’ll reply by email",
    preferWrite: "Prefer to write?",
  },
  form: {
    label: "Project enquiry",
    name: "Name",
    namePh: "Enter full name",
    email: "Email",
    emailPh: "Enter email",
    company: "Company",
    companyPh: "Company name",
    service: "Service",
    select: "Select one",
    options: [...serviceLinks.map((service) => service.name), "More than one"],
    /** Option preselected when the form sits on a service page. */
    byService: Object.fromEntries(serviceLinks.map((service) => [service.slug, service.name])) as Record<ServiceSlug, string>,
    message: "Message",
    messagePh: "What do you want to fix or build?",
    honeypot: "Leave this field empty",
    error: "We couldn’t send your enquiry. Check the required fields and try again, or",
    errorLink: "email us directly",
    submit: "Send my enquiry",
    sending: "Sending",
    note: "Your details are only used to reply to this enquiry.",
    privacy: "Privacy policy",
    successTitle: "Thank you. We’ve got it.",
    successText: "We’ll read your brief carefully and reply to the email you provided, usually with a few questions and suggested times to talk.",
    again: "Send another enquiry",
  },
  faq: {
    chip: "FAQs",
    title: ["Frequently", "asked questions"] as [string, string],
    footTitle: "Still have a question?",
    footText: "Ask us directly. We’re happy to talk it through.",
  },
  contactPanel: {
    tabsLabel: "How would you like to get in touch?",
    bookTab: "Book a free call",
    bookMeta: "30 min · Free",
    briefTab: "Send a brief",
    briefMeta: "In your own time",
    findTime: "Find a time that works for you.",
    openCalendar: "Open calendar",
    slowTitle: "Let’s find a time.",
    loadingTitle: "Getting the calendar ready…",
    slowText: "Open the calendar to see available times and book your conversation.",
    loadingText: "You can also open the booking calendar directly.",
    chooseTime: "Choose a time",
    notLoading: "Calendar not loading?",
    chooseOnCal: "Choose a time on Cal.com",
    or: "or",
    emailUs: "email us",
    bookingPrivacy: "The calendar is provided by Cal.com. How we handle booking details:",
    privacy: "privacy policy",
  },
  solution: {
    home: "Home",
    industries: "Industries",
    bookFreeCall: "Book a free call",
    seeWork: "See the work",
    trust: ["Free 30-minute consultation", "Written, scoped proposal", "30 days of oversight after launch"],
    painsChip: "Sound familiar?",
    painsTitle: ["The problems", "we fix"] as [string, string],
    featuresChip: "What you get",
    featuresTitle: ["What we", "build for you"] as [string, string],
    stepsChip: "How it works",
    stepsTitle: ["Three steps", "to launch"] as [string, string],
    pricingLabel: "How pricing works",
    pricingWebsites:
      "Every website is scoped in a free 30-minute consultation, then you get a written proposal with what’s included and the price before any work begins. On payment the website is yours outright: design, code, domain and hosting.",
    pricingOther:
      "Every system is scoped in a free 30-minute consultation, then you get a written proposal with what’s included and the price before any work begins. You choose how to own it: build and hand over, a managed monthly retainer, or a full IP buyout. Running costs such as hosting and AI usage are paid directly by you.",
    proofChip: "Real work",
    proofTitle: ["The work", "behind it"] as [string, string],
    seeCase: "See the case study",
    faqTitle: "Questions about",
    moreFrom: "More from",
    all: "All",
  },
  footer: {
    title: ["Got a project", "in mind?"] as [string, string],
    text: "Book a free 30-minute call and leave with a clear next step. No obligation, and a written proposal before any work begins.",
    sendBrief: "Send a brief",
    footerNav: "Footer",
    solutions: "Solutions",
    industries: "Industries",
    contactLabel: "Contact",
    location: "Based in Bulgaria, working with clients worldwide",
    disciplines: serviceLinks.map((service) => service.name),
    backToTop: "Back to top",
    legalNav: "Legal",
    privacy: "Privacy",
    cookies: "Cookies",
    cookieSettings: "Cookie settings",
    eik: "Company no.",
  },
};

export type Dictionary = typeof en;

const bgLinks = serviceLinksIn("bg");

const bg: Dictionary = {
  htmlLang: "bg",
  dateLocale: "bg-BG",
  home: "/bg",
  contact: "/bg/kontakti",
  enquiry: "/bg/kontakti#enquiry",
  homeLabel: "Orryvelle, начало",
  insightsFeed: "Статии от Orryvelle",
  skip: "Към съдържанието",
  breadcrumb: "Навигационна пътека",
  announcement: "Приемаме нови проекти за софтуер, автоматизация и уебсайтове",
  announcementCta: "Свържете се",
  dismiss: "Скрий съобщението",
  mainNav: "Основна навигация",
  mobileNav: "Мобилна навигация",
  servicesLabel: "Услуги",
  studioLabel: "Студио",
  menu: menu("bg"),
  asideTitle: ["Не сте сигурни", "кое ви трябва?"],
  asideText: "Много проекти обхващат повече от едно направление. Кажете ни какъв резултат търсите и ще съберем подходящия екип за него.",
  asideCta: "Запазете безплатен 30-минутен разговор",
  links: studioLinks("bg", ["Проекти", "За нас", "Статии", "Процес", "Контакти"]),
  bookCall: "Запазете безплатен разговор",
  freeIntro: "Безплатен 30-минутен разговор",
  menuTitle: "Меню",
  openMenu: "Отвори менюто",
  closeMenu: "Затвори менюто",
  switchLabel: "EN",
  switchTitle: "English",
  badge: "Започнете проект",
  enquirySection: {
    chip: "Започнете проект",
    title: ["Имате нещо,", "което си струва да изградим?"],
    text: "Запазете безплатен 30-минутен разговор и си тръгнете с ясна следваща стъпка. Предпочитате първо да пишете? Изпратете кратко запитване и ще ви отговорим с въпроси и удобни часове за разговор.",
    assureTitle: "Безплатен 30-минутен разговор · Без ангажимент",
    assureText: "Или изпратете запитване и ще ви отговорим по имейл",
    preferWrite: "Предпочитате да пишете?",
  },
  form: {
    label: "Запитване за проект",
    name: "Име",
    namePh: "Вашето име",
    email: "Имейл",
    emailPh: "Вашият имейл",
    company: "Фирма",
    companyPh: "Име на фирмата",
    service: "Услуга",
    select: "Изберете",
    options: [...bgLinks.map((service) => service.name), "Повече от една"],
    byService: Object.fromEntries(bgLinks.map((service) => [service.slug, service.name])) as Record<ServiceSlug, string>,
    message: "Съобщение",
    messagePh: "Какво трябва да решим или да изградим за вас?",
    honeypot: "Оставете това поле празно",
    error: "Не успяхме да изпратим запитването. Проверете задължителните полета и опитайте отново или",
    errorLink: "ни пишете директно",
    submit: "Изпращам запитването",
    sending: "Изпращане",
    note: "Данните ви се използват само за отговор на това запитване.",
    privacy: "Политика за поверителност",
    successTitle: "Благодарим ви. Получихме запитването.",
    successText: "Ще прочетем запитването внимателно и ще ви отговорим на посочения имейл, обикновено с няколко въпроса и предложение за час за разговор.",
    again: "Изпратете ново запитване",
  },
  faq: {
    chip: "Въпроси",
    title: ["Често задавани", "въпроси"],
    footTitle: "Имате друг въпрос?",
    footText: "Попитайте ни директно. С удоволствие ще го обсъдим.",
  },
  contactPanel: {
    tabsLabel: "Как предпочитате да се свържете?",
    bookTab: "Безплатен разговор",
    bookMeta: "30 мин · Безплатно",
    briefTab: "Изпратете запитване",
    briefMeta: "Когато ви е удобно",
    findTime: "Изберете удобен за вас час.",
    openCalendar: "Отвори календара",
    slowTitle: "Да намерим час.",
    loadingTitle: "Календарът се зарежда…",
    slowText: "Отворете календара, за да видите свободните часове и да запазите разговор.",
    loadingText: "Можете да отворите и календара директно.",
    chooseTime: "Изберете час",
    notLoading: "Календарът не се зарежда?",
    chooseOnCal: "Изберете час в Cal.com",
    or: "или",
    emailUs: "ни пишете",
    bookingPrivacy: "Календарът се предоставя от Cal.com. Как обработваме данните от резервацията:",
    privacy: "политика за поверителност",
  },
  solution: {
    home: "Начало",
    industries: "Индустрии",
    bookFreeCall: "Запазете безплатен разговор",
    seeWork: "Вижте проектите",
    trust: ["Безплатна 30-минутна консултация", "Писмена оферта с ясен обхват", "30 дни наблюдение след старта"],
    painsChip: "Звучи ли ви познато?",
    painsTitle: ["Проблемите,", "които решаваме"],
    featuresChip: "Какво получавате",
    featuresTitle: ["Какво", "изграждаме за вас"],
    stepsChip: "Как работим",
    stepsTitle: ["Три стъпки", "до старта"],
    pricingLabel: "Как се формира цената",
    pricingWebsites:
      "Всеки уебсайт се обсъжда на безплатна 30-минутна консултация, след което получавате писмена оферта с обхвата и цената, преди да започне работа. След плащане уебсайтът е изцяло ваш: дизайн, код, домейн и хостинг.",
    pricingOther:
      "Всяка система се обсъжда на безплатна 30-минутна консултация, след което получавате писмена оферта с обхвата и цената, преди да започне работа. Вие избирате модела на собственост: изработка и предаване, месечна поддръжка или пълно изкупуване на правата. Текущите разходи на системата, като хостинг и AI услуги, се плащат директно от вас.",
    proofChip: "Реални проекти",
    proofTitle: ["Проектите", "зад думите"],
    seeCase: "Вижте проекта",
    faqTitle: "Въпроси за",
    moreFrom: "Още от",
    all: "Всичко за",
  },
  footer: {
    title: ["Имате проект", "наум?"],
    text: "Запазете безплатен 30-минутен разговор и си тръгнете с ясна следваща стъпка. Без ангажимент, с писмена оферта, преди да започне каквато и да е работа.",
    sendBrief: "Изпратете запитване",
    footerNav: "Долна навигация",
    solutions: "Решения",
    industries: "Индустрии",
    contactLabel: "Контакт",
    location: "Базирани в България, работим с клиенти по целия свят",
    disciplines: bgLinks.map((service) => service.name),
    backToTop: "Към началото",
    legalNav: "Правна информация",
    privacy: "Поверителност",
    cookies: "Бисквитки",
    cookieSettings: "Настройки за бисквитките",
    eik: "ЕИК",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, bg };
export const t = (locale: Locale) => dictionaries[locale];

/** A name used mid-sentence: lower-cases its first letter unless it starts with an acronym ("AI и…"). */
export const inSentence = (name: string) =>
  /^\p{Lu}{2}/u.test(name) ? name : name.charAt(0).toLowerCase() + name.slice(1);
