import { notFound } from "next/navigation";

// Two root layouts leave no shared one for Next's default 404, so unknown URLs land here
// and render (en)/not-found.tsx inside the site shell.
export default function Missing() {
  notFound();
}
