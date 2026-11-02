import { cloneElement, isValidElement, type ReactNode } from "react";
import { bgUi } from "@/content/bg/ui";
import { requestLocale } from "@/lib/studio/localize";

/**
 * Text inside the illustrative UI fragments (service cards, process cards, hero notes):
 * English is written inline and looked up in the Bulgarian table on /bg pages. Server
 * components only; the page sets the language (see localize.ts).
 */
export const tr = (text: string) => (requestLocale() === "bg" ? (bgUi[text] ?? text) : text);

/** Translates every text child in an already rendered fragment tree (keys are trimmed text). */
export function translateTree(node: ReactNode): ReactNode {
  if (requestLocale() !== "bg") return node;
  return walk(node);
}

function walk(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    const key = node.trim();
    const value = key ? bgUi[key] : undefined;
    return value ? node.replace(key, value) : node;
  }
  if (Array.isArray(node)) return node.map(walk);
  if (isValidElement<{ children?: ReactNode }>(node) && node.props.children !== undefined) {
    return cloneElement(node, { children: walk(node.props.children) });
  }
  return node;
}
