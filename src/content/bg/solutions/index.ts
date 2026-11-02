import type { Overlay } from "@/lib/studio/localize";
import type { Solution } from "@/lib/studio/solutions";
import { bgEnterprise } from "./enterprise";
import { bgIndustries } from "./industries";
import { bgSoftware } from "./software";
import { bgWebsites } from "./websites";

/** Bulgarian text for every focused page, keyed by the English slug. */
export const bgSolutions: Record<string, Overlay<Solution>> = {
  ...bgEnterprise,
  ...bgSoftware,
  ...bgWebsites,
  ...bgIndustries,
};
