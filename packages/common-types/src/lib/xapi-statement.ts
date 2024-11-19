import { XApiActor } from "./xapi-actor";
import { XApiObject } from "./xapi-objects";
import { XApiResult } from "./xapi-result";
import { XApiVerb } from "./xapi-verbs";

export type XApiStatement = {
  object: XApiObject;
  verb: XApiVerb;
  actor: XApiActor;
  result?: XApiResult;
};
