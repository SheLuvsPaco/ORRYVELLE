// Bulgarian films live under /films/bg/; shared components pick their words from the page's URL.
export const isBg = (url: URL) => url.pathname.includes('/bg/');
export const pick = <T>(url: URL, en: T, bg: T) => (isBg(url) ? bg : en);
