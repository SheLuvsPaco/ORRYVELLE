import type { Insight } from "@/lib/studio/insights";

const insight: Insight = {
  slug: "get-recommended-by-chatgpt",
  title: "How do you get your business recommended by ChatGPT and other AI assistants?",
  seoTitle: "How to Get Your Business Recommended by ChatGPT (2026)",
  titleParts: ["How to get recommended", "by ChatGPT"],
  description:
    "What actually influences whether ChatGPT, Google’s AI Overviews and Perplexity mention your business, and the practical steps that help, without the myths.",
  service: "websites",
  published: "2026-10-25",
  updated: "2026-10-25",
  answer:
    "AI assistants recommend businesses that are easy to find, easy to understand and widely mentioned. Let AI crawlers reach your site, get indexed in both Google and Bing, state clearly who you serve and how, answer real customer questions directly, and earn genuine mentions on trusted third-party sites. There is no switch to flip, and no guarantee.",
  takeaways: [
    "In an Ahrefs study of 75,000 brands, branded web mentions correlated with AI Overview visibility at 0.664, against 0.218 for backlinks.",
    "Google says a page only needs to be indexed and eligible for a snippet to appear in its AI features, with no special optimisation or schema required.",
    "OpenAI’s documentation states that sites blocking OAI-SearchBot won’t be shown in ChatGPT search answers.",
    "Google’s AI optimisation guide says Google Search ignores llms.txt files; some other AI tools and browser agents read them.",
  ],
  body: `## How AI assistants decide what to mention

When someone asks ChatGPT, Perplexity or Google’s AI Mode for a recommendation, the assistant typically does two things: it searches the web for current pages, and it draws on what it already knows from training. Then it writes an answer and, often, cites the sources it relied on.

That gives you two ways in:

1. **Be a page the assistant retrieves and trusts** when it searches.
2. **Be a business that is talked about widely enough** that the assistant already knows you.

The audience is large: OpenAI announced [900 million weekly ChatGPT users in February 2026](https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users), as reported by TechCrunch, and AI answers now sit at the top of many Google results.

## Step 1: Let AI crawlers reach your site

Check your robots.txt. If it blocks AI crawlers, assistants can’t read your pages. Each company documents its own:

- **OpenAI**: [its crawler documentation](https://developers.openai.com/api/docs/bots) states that sites which opt out of **OAI-SearchBot** "will not be shown in ChatGPT search answers". **ChatGPT-User** fetches pages when a user asks, and **GPTBot** collects content that may be used for training.
- **Anthropic**: [its help centre](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) describes **Claude-SearchBot** (search quality), **Claude-User** (user requests) and **ClaudeBot** (training).
- **Perplexity**: [its documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) says **PerplexityBot** surfaces and links websites in Perplexity’s search results and is not used to train foundation models.

Allow Googlebot and Bingbot too. Training crawlers such as GPTBot are a separate choice: allowing them helps assistants learn about you over time.

Make sure your important content is in the page’s HTML, not only loaded by JavaScript after the page opens. Many crawlers don’t run JavaScript.

## Step 2: Get indexed in Google and Bing

AI features build on search indexes. [Google states](https://developers.google.com/search/docs/appearance/ai-features) that to appear in AI Overviews or AI Mode, a page must be indexed and eligible to be shown with a snippet, and that "there are no additional technical requirements."

For ChatGPT, OpenAI runs its own search crawler, and ChatGPT search also draws on third-party search providers; OpenAI doesn’t publish how they are weighted, as [MaxAEO’s review of OpenAI’s statements](https://maxaeo.ai/blog/does-chatgpt-use-bing/) notes. That is why practitioners widely recommend making sure you are in Bing’s index as well as Google’s.

So:

- verify your site in **Google Search Console** and **Bing Webmaster Tools**
- submit your sitemap to both
- fix pages that are excluded or not indexed

## Step 3: Say clearly who you are, what you do and where

AI assistants match businesses to questions like "best accountant for small businesses in Leeds" or "who builds AI receptionists". If your site only says "excellence, delivered", there is nothing to match.

Make sure your homepage and service pages state plainly:

- **what you do**, in the words customers use
- **who you serve**, by industry, size or need
- **where you work**: a city, a country or "worldwide, remotely"
- **how it works**: process, timelines, how pricing is set

Keep your name, description and location consistent everywhere: your site, social profiles and directory listings. Structured data (schema.org) describing your organisation and services helps machines read the page, but treat it as a description, not a trick. [Google says](https://developers.google.com/search/docs/appearance/ai-features) there is no special schema needed for its AI features, and that structured data should match the visible text on the page.

## Step 4: Answer the questions your customers actually ask

Assistants quote passages that answer a question directly. The pages most likely to be cited:

- open with a **short, direct answer**, then explain
- use **specific facts**: numbers, timelines, comparisons, named examples
- are honest about trade-offs, including when you are not the right choice
- cite their sources

An FAQ on each service page and a set of in-depth guides, like the one you are reading, give assistants exactly those passages.

## Step 5: Earn genuine mentions on trusted third-party sites

This is the step most businesses skip, and the one the data supports most. In an [Ahrefs study of 75,000 brands](https://ahrefs.com/blog/ai-overview-brand-correlation/), **branded web mentions** showed the strongest correlation with visibility in Google’s AI Overviews (0.664), well ahead of backlinks (0.218). A [later Ahrefs analysis](https://ahrefs.com/blog/ai-brand-visibility-correlations) across ChatGPT, AI Mode and AI Overviews found that mentions on YouTube correlated even more strongly, at about 0.737.

These are correlations, not proof of cause, and the mentions have to be real: [Google’s AI optimisation guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) warns that seeking inauthentic mentions "isn’t as helpful as it might seem". Practical ways to earn genuine ones:

- complete profiles on the directories and review sites your buyers use
- ask happy clients for reviews that describe the work in their own words
- contribute expert comments, guest articles and talks in your industry
- publish useful material others want to reference

## What doesn’t work, or isn’t proven

[Google’s guide to optimising for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) (last updated July 2026) lists tactics site owners don’t need for Google Search: llms.txt files, which Google Search ignores; splitting content into tiny "chunks" for AI; writing specially for AI; and special schema markup. Add to that the older shortcuts that never worked: buying links, keyword stuffing and fake reviews.

And be wary of anyone who promises a guaranteed AI recommendation. Answers vary by question, by user and by day.

## How to measure it

- **Ask the assistants** the questions your customers would ask, every month, in a fresh chat, and note who appears. Repeat each question a few times; answers vary.
- **Check your analytics** for visits from chatgpt.com, perplexity.ai and similar sources.
- **Watch Search Console and Bing Webmaster Tools** for indexing problems and impressions.

## What we did on our own site

We applied all of this to orryvelle.com: AI crawlers are welcome in robots.txt, every page carries structured data that matches its content, the service pages open with plain answers and researched FAQs, and an llms.txt file summarises the site for the AI tools that read it. Insights like this one are the next layer. If you want the same groundwork on your website, see our [websites](/services/websites) service.`,
  faqs: [
    {
      question: "Can I pay to be recommended by ChatGPT?",
      answer:
        "There is no way to buy an organic recommendation. Assistants mention businesses based on what they find and know from the web, so the reliable route is a clear, crawlable website and genuine mentions on trusted third-party sites.",
    },
    {
      question: "Does ChatGPT use Google or Bing?",
      answer:
        "ChatGPT search uses OpenAI’s own crawler, OAI-SearchBot, alongside third-party search providers, and OpenAI doesn’t publish the mix. OpenAI’s documentation says sites that block OAI-SearchBot won’t appear in ChatGPT search answers, and practitioners widely recommend verifying your site in Bing Webmaster Tools.",
    },
    {
      question: "Does structured data help with AI search?",
      answer:
        "It helps machines understand your organisation, services and FAQs, but Google says no special schema is needed for its AI features. Google’s guidance is that structured data should match the visible text on the page.",
    },
    {
      question: "Should I add an llms.txt file?",
      answer:
        "It’s optional. Google’s AI optimisation guide says Google Search ignores llms.txt files, though some other AI tools and browser agents read them. It’s cheap to add, but don’t expect it to change your visibility on its own.",
    },
    {
      question: "How long does it take to show up in AI answers?",
      answer:
        "There’s no fixed timeline. New pages must first be crawled and indexed, which can take days to weeks, and brand mentions build over months. OpenAI notes that robots.txt changes for its search crawler can take about 24 hours to take effect. Measure monthly by asking assistants the questions your customers ask.",
    },
  ],
  sources: [
    { title: "TechCrunch: ChatGPT reaches 900M weekly active users (27 February 2026)", url: "https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users" },
    { title: "OpenAI: Overview of OpenAI crawlers", url: "https://developers.openai.com/api/docs/bots" },
    { title: "Anthropic: Does Anthropic crawl data from the web, and how can site owners block the crawler?", url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler" },
    { title: "Perplexity: Perplexity crawlers", url: "https://docs.perplexity.ai/docs/resources/perplexity-crawlers" },
    { title: "Google Search Central: AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features" },
    { title: "Google Search Central: Optimizing for generative AI features on Google Search", url: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" },
    { title: "Ahrefs: An analysis of AI Overview brand visibility factors (75K brands)", url: "https://ahrefs.com/blog/ai-overview-brand-correlation/" },
    { title: "Ahrefs: AI brand visibility correlations across ChatGPT, AI Mode and AI Overviews", url: "https://ahrefs.com/blog/ai-brand-visibility-correlations" },
    { title: "MaxAEO: Does ChatGPT use Bing? What OpenAI says", url: "https://maxaeo.ai/blog/does-chatgpt-use-bing/" },
  ],
};

export default insight;
