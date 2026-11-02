declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Environment variables the site reads (documented in .env.example).
declare namespace NodeJS {
  interface ProcessEnv {
    /** n8n webhook that receives enquiries; server only. */
    ENQUIRY_WEBHOOK_URL?: string;
    /** Google Analytics measurement ID; set in production only. */
    NEXT_PUBLIC_GA_ID?: string;
    /** Optional Search Console ownership tag (not needed when verified by DNS). */
    GOOGLE_SITE_VERIFICATION?: string;
    /** Optional Bing Webmaster Tools ownership tag (msvalidate.01). */
    BING_SITE_VERIFICATION?: string;
  }
}
