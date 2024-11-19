import { serverEnv } from "../env/server";
import { getXApiVerb } from "../utils/xApi";
import type { XApiObject, XApiStatement, XApiVerbCode, XApiActor, XApiResult } from "@onlydevs/common-types/src";

const xApiHost = serverEnv.XAPI_SERVICE_URL;
const xApiEndpoint = `${xApiHost}/xapi/statements`;

async function createStatement(statement: XApiStatement) {
  const resp = await fetch(xApiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(statement),
  });
  return resp.json();
}

export async function sendXApiStatement(
  actor: XApiActor,
  verbCode: XApiVerbCode,
  object: XApiObject,
  result?: XApiResult
) {
  if (xApiEndpoint === undefined) return;

  const verb = getXApiVerb(verbCode);

  try {
    await createStatement({ actor, verb, object, result });
  } catch (e) {
    console.error("Storing analytics XAPI statement error: ", e);
  }
}
