import z, { type ZodFormattedError } from "zod";

export const clientSchema = z.object({
  PUBLIC_XAPI_SERVICE_URL: z.string().url().optional(),
});

export const clientEnvTemplate = {
  PUBLIC_XAPI_SERVICE_URL: import.meta.env["PUBLIC_XAPI_SERVICE_URL"],
};

const _clientEnv = clientSchema.safeParse(clientEnvTemplate);

export const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value) {
        return `${name}: ${value._errors.join(", ")}\n`;
      }
      return null;
    })
    .filter(Boolean);

if (_clientEnv.success === false) {
  console.error("❌ Invalid environment variables:\n", ...formatErrors(_clientEnv.error.format()));
  throw new Error("Invalid environment variables");
}

//  Validate that client-side environment variables are exposed to the client.
// (`vite` will prevent this if they're not prefixed with `PUBLIC_`)
for (const key of Object.keys(_clientEnv.data)) {
  if (!key.startsWith("PUBLIC_")) {
    console.warn("❌ Invalid public environment variable name:", key);

    throw new Error("Invalid public environment variable name");
  }
}

export const clientEnv = _clientEnv.data;
