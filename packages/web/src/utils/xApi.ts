import { xApiVerbURI, type XApiVerbCode, xApiVerbDisplay, type XApiVerb } from "@onlydevs/common-types/src";

export function getXApiVerb(verb: XApiVerbCode): XApiVerb {
  return {
    id: xApiVerbURI[verb],
    display: xApiVerbDisplay[verb],
  };
}
