import { xApiVerbURI, type XApiVerbCode, xApiVerbDisplay, type XApiVerb } from "@onlydevs/types";

export function getXApiVerb(verb: XApiVerbCode): XApiVerb {
  return {
    id: xApiVerbURI[verb],
    display: xApiVerbDisplay[verb],
  };
}
