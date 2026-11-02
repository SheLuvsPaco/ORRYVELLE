import { cache } from "react";
import type { Locale } from "./i18n";

/**
 * Bulgarian content is written as text overlays on the English data (same shape, text fields
 * only), so visuals, slugs and settings stay defined once. Arrays merge by position: an
 * overlay must keep the English order and length, which the parity check verifies.
 */
export type Overlay<T> = T extends string
  ? string
  : T extends (infer U)[]
    ? Overlay<U>[]
    : T extends object
      ? { [K in keyof T]?: Overlay<T[K]> }
      : T;

export function overlay<T>(base: T, text: Overlay<T> | undefined): T {
  if (text === undefined || text === null) return base;
  if (typeof base === "string" || typeof text !== "object") return text as T;
  if (Array.isArray(base)) {
    const items = text as unknown[];
    return base.map((item, index) => overlay(item, items[index] as Overlay<typeof item>)) as T;
  }
  const result = { ...(base as object) } as Record<string, unknown>;
  for (const [key, value] of Object.entries(text as object)) {
    result[key] = key in result ? overlay(result[key], value as never) : value;
  }
  return result as T;
}

/*
 * The page's language for deeply nested, purely decorative server components (the
 * illustrative UI fragments), so it doesn't have to be passed through every layer. Each
 * shared page sets it first; anything that renders real content takes `locale` as a prop.
 */
const store = cache(() => ({ current: "en" as Locale }));
export const setRequestLocale = (locale: Locale) => {
  store().current = locale;
};
export const requestLocale = () => store().current;
