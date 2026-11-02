/*
 * Real social proof only. Every entry must be supplied and approved by the
 * business (quote, name, role, company, photo permission, logo permission).
 * Sections that read these arrays render nothing while they are empty.
 * Do NOT add invented testimonials, client logos, awards, or statistics.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Path under /public, only with the person's permission. */
  photo?: string;
  /** Where the review can be verified, e.g. a Google or Clutch URL. */
  source?: string;
};

export type ClientLogo = {
  name: string;
  /** Path under /public to an SVG/PNG the client has approved for use. */
  logo: string;
  href?: string;
};

export const testimonials: Testimonial[] = [];
export const clientLogos: ClientLogo[] = [];
