/** Structured data for search and answer engines (see src/lib/studio/seo.ts). */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // `<` is escaped so content can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
