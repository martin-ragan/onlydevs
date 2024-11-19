import { XApiTranslation } from "./xapi-common";

export type XApiVerb = {
  id: string;
  display: XApiTranslation;
};

export type XApiVerbCode = "Opened" | "Experienced" | "Viewed" | "Showed" | "Hid" | "Reset" | "Achieved";

export const xApiVerbDisplay: Record<XApiVerbCode, XApiTranslation> = {
  Opened: { "en-US": "opened" },
  Experienced: { "en-US": "experienced" },
  Viewed: { "en-US": "viewed" },
  Showed: { "en-US": "showed" },
  Hid: { "en-US": "hid" },
  Reset: { "en-US": "reset" },
  Achieved: { "en-US": "achieved" },
} as const;

export const xApiVerbURI: Record<XApiVerbCode, string> = {
  Opened: "http://activitystrea.ms/schema/1.0/open",
  Experienced: "http://adlnet.gov/expapi/verbs/experienced",
  Viewed: "http://adlnet.gov/expapi/verbs/viewed",
  Showed: "http://adlnet.gov/expapi/verbs/showed",
  Hid: "http://adlnet.gov/expapi/verbs/hid",
  Reset: "http://adlnet.gov/expapi/verbs/reset",
  Achieved: "http://activitystrea.ms/schema/1.0/archive",
} as const;
