import type { Solution } from "@/lib/studio/solutions";

const ownership =
  "You do, outright. On payment you receive full rights to the website, including its design and code, and the domain and hosting are registered in your name. If we manage them for you on a retainer, ownership doesn’t change.";

export const websiteSolutions: Solution[] = [
  {
    slug: "web-design",
    kind: "service",
    service: "websites",
    name: "Custom Web Design",
    seo: {
      title: "Custom Website Design for Small Businesses",
      description:
        "Custom websites designed from scratch, fast, easy to find on Google and built to turn visitors into enquiries. Fully yours on payment. Book a free call.",
    },
    heading: "Custom website design for small businesses",
    headline: ["A website that", "brings in customers."],
    lead: "Most small business websites look fine and do nothing. We design yours from scratch around what your customers want to know before they book, make it fast and easy to find on Google, and put a clear way to get in touch on every section.",
    answer:
      "Custom website design for small businesses: sites designed from scratch, fast and search-ready, built to turn visitors into enquiries and fully owned by the client.",
    pains: [
      { title: "A template that looks like everyone else", body: "Visitors can’t tell you apart from competitors, so they choose on price or leave." },
      { title: "Slow pages, lost visitors", body: "Heavy themes and plugins make pages slow, and people give up before they see your work." },
      { title: "Traffic that never turns into calls", body: "If visitors can’t quickly see what you do, what it costs and how to book, they don’t get in touch." },
    ],
    features: [
      { icon: "craft", title: "Designed from scratch", body: "A look built around your brand and your buyers, not a theme with your logo dropped in." },
      { icon: "performance", title: "Fast on every device", body: "Built in modern code for quick loading, especially on phones." },
      { icon: "search", title: "Search-ready from launch", body: "Clean structure, metadata, structured data and a sitemap, so Google and AI assistants understand your business." },
      { icon: "website", title: "Built to convert", body: "Every section leads to a clear next step: a booking, a call or a quote request." },
      { icon: "cms", title: "Easy to update", body: "Content management that lets your team change text, services and images without touching code." },
      { icon: "brand", title: "Copy written for you", body: "We write the first version of your website copy, based on what we learn about your business." },
    ],
    steps: [
      { title: "Free consultation", body: "We learn what you sell, who buys it and what your website needs to make them do." },
      { title: "Design and build", body: "We design and build the site, and write the copy. With your content and details ready, a fully built website with its domain can be live in about 48 hours." },
      { title: "Live, with 30 days of oversight", body: "We launch and stay close for 30 days, checking that everything works and enquiries come through." },
    ],
    proof: [
      { slug: "pet-grooming", note: "A warm, playful site for a dog-grooming studio: services with photography, prices by dog size, a story-led gallery and booking in two steps." },
      { slug: "varna-royal", note: "A premium site for a window and door repair company in Varna: interior-led photography, a three-step process and a free-quote form." },
      { slug: "grooming-salon", note: "A calm, editorial site for a premium grooming salon in Sofia, with booking built around a date and time picker." },
    ],
    faqs: [
      { question: "How long does it take to build a website?", answer: "With your content and details provided up front and quick replies, we deliver a fully built website with its domain in around 48 hours. Larger sites and complex integrations take longer and are scheduled in your proposal." },
      { question: "Do you use templates or WordPress?", answer: "No. Every site is designed from scratch and built in code, which makes it faster and more distinctive than a template. Your team still edits content through a simple content management setup." },
      { question: "Who owns the website?", answer: ownership },
      { question: "Do you write the content?", answer: "Yes. We write the initial copy for your website, and on a retainer we keep optimising it over time." },
      { question: "Will the site show up on Google?", answer: "Every site we build is search-ready, with fast pages, clean structure, metadata, structured data and a sitemap. Ongoing SEO campaigns aren’t a standard service, though we can discuss them for the right project." },
    ],
  },
  {
    slug: "shopify-development",
    kind: "service",
    service: "websites",
    name: "Shopify Development",
    seo: {
      title: "Shopify Website Design & Development",
      description:
        "Custom Shopify stores designed from scratch: product pages that sell, simple checkout and an easy-to-run back office. Book a free 30-minute call.",
    },
    heading: "Shopify website design and development",
    headline: ["A Shopify store", "that feels like you."],
    lead: "Shopify handles payments, stock and checkout brilliantly, but stock themes make every store look the same. We design your Shopify store from scratch around your products and your customers, so it feels like your brand and makes buying effortless.",
    answer:
      "Shopify website design and development: custom-designed Shopify stores with product pages, collections and checkout built around the brand.",
    pains: [
      { title: "A theme that looks like every other store", body: "Customers can’t remember where they saw your products, because your store looks like a thousand others." },
      { title: "Products buried in menus", body: "When categories and best-sellers are hard to find, shoppers leave before they add anything to the cart." },
      { title: "More than one way to buy", body: "Online orders, enquiries and bookings all squeezed into a checkout that was built for only one of them." },
    ],
    features: [
      { icon: "craft", title: "Designed around your products", body: "Large, bright product photography and a layout that feels like a boutique, not a catalogue." },
      { icon: "website", title: "Clear paths to buy", body: "Category tiles, product rows with add to cart and best-sellers right where shoppers look." },
      { icon: "workflow", title: "More than products", body: "Enquiry forms, workshops, bookings and gift paths alongside the shop, each with its own place." },
      { icon: "mobile", title: "One-thumb shopping", body: "Every row restacked for phones, where most shoppers browse." },
      { icon: "search", title: "Search-ready", body: "Structured product pages, metadata and fast loading, so your products can be found." },
      { icon: "cms", title: "Easy to run", body: "You manage products, prices and stock in Shopify’s familiar admin." },
    ],
    steps: [
      { title: "Free consultation", body: "We learn what you sell, how people buy it and what makes your brand different." },
      { title: "Design and build", body: "We design the store from scratch, build it on Shopify and set up your collections and key pages." },
      { title: "Live, with 30 days of oversight", body: "We launch and stay close for 30 days, checking orders, checkout and every page in production." },
    ],
    proof: [
      { slug: "magnolia-blooms", note: "A Shopify storefront for a boutique florist in Bendigo: fresh and preserved blooms and gifts to buy online, with weddings and workshops given their own place." },
    ],
    faqs: [
      { question: "Why Shopify instead of WordPress or a custom store?", answer: "Shopify bundles payments, inventory, shipping, taxes and checkout, which WordPress needs several plugins to match, and it’s simple to run day to day. For most product businesses it’s the right base; we make it look and work like your brand." },
      { question: "Can you move our existing store to Shopify?", answer: "Yes. Products, collections and content can be migrated, and we set up redirects so existing links and search rankings carry over." },
      { question: "Will we be able to manage it ourselves?", answer: "Yes. Products, prices, stock and orders are managed in Shopify’s admin, and we show your team how everything works at handover." },
      { question: "Who owns the store?", answer: "You do. The Shopify account is yours, and on payment you receive full rights to the design and code we build for it." },
      { question: "How does pricing work?", answer: "There’s no fixed price list. After a free consultation you get a written proposal with the scope, what it includes and the price, before any work begins. Shopify’s own plan and payment fees are paid directly to Shopify." },
    ],
  },
  {
    slug: "website-redesign",
    kind: "service",
    service: "websites",
    name: "Website Redesign",
    seo: {
      title: "Website Redesign Without Losing Your Rankings",
      description:
        "A website redesign that keeps what already works, fixes what doesn’t and protects your Google rankings with careful redirects. Book a free call.",
    },
    heading: "Website redesign",
    headline: ["Keep what works,", "fix what doesn’t."],
    lead: "Your current site might be slow, dated or just not bringing in enquiries. A redesign shouldn’t mean starting from nothing or losing the rankings you’ve earned. We keep what already works, rebuild what doesn’t and move everything across carefully.",
    answer:
      "Website redesign: a new design and build that keeps what already works, improves speed and conversions, and protects search rankings with redirects.",
    pains: [
      { title: "A site that no longer represents you", body: "The business has moved on, but the website still looks like it did years ago." },
      { title: "Fear of losing Google rankings", body: "You know a redesign can hurt search traffic, so the old site stays up longer than it should." },
      { title: "Visitors who don’t get in touch", body: "Traffic arrives, but the site doesn’t make it easy to take the next step." },
    ],
    features: [
      { icon: "clarity", title: "Review before redesign", body: "We look at your content, performance and what already ranks before anything changes." },
      { icon: "search", title: "Rankings protected", body: "Every existing page is mapped to its new address with permanent redirects, and indexing is checked after launch." },
      { icon: "craft", title: "A design that fits today", body: "A fresh look built around your business as it is now, and the customers you want next." },
      { icon: "performance", title: "Faster pages", body: "Rebuilt in modern code, so pages load quickly on every device." },
      { icon: "website", title: "Clearer paths to enquire", body: "Every section leads to a call, a booking or a quote request." },
      { icon: "cms", title: "Easier to update", body: "Content management your team can use, so the new site stays current." },
    ],
    steps: [
      { title: "Free consultation and review", body: "We look at your current site with you and agree what to keep, improve and replace." },
      { title: "Design, build and migrate", body: "We design and build the new site, move your content across and map every redirect." },
      { title: "Live, with 30 days of oversight", body: "We launch, watch indexing and enquiries, and fix anything that needs it for 30 days." },
    ],
    proof: [
      { slug: "varna-royal", note: "A trade business given the voice of an interiors brand: full photography for every service, a three-step process and a short free-quote form." },
      { slug: "grooming-salon", note: "An editorial site for a premium salon, leading with the standards dog owners care about most." },
    ],
    faqs: [
      { question: "Will a redesign hurt our Google rankings?", answer: "Not if it’s done properly. We map every existing page to its new address with permanent redirects, keep the content that already ranks and check indexing after launch. A brief dip while Google re-crawls is normal; a lasting drop usually means broken redirects, which is exactly what we prevent." },
      { question: "Can you keep our existing content?", answer: "Yes. We review what you have, keep what works and rewrite or replace what doesn’t, in agreement with you." },
      { question: "How long does a redesign take?", answer: "It depends on the size of the site and how much content moves across. Your proposal sets out a dated plan before work begins." },
      { question: "Who owns the new website?", answer: ownership },
      { question: "Should we redesign or start from scratch?", answer: "We decide that together after reviewing your site. If the structure and content are strong, a redesign keeps that value; if not, a fresh build is often faster." },
    ],
  },
];
