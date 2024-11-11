import z, { type ZodFormattedError } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.string().default("development"),
  HOST: z.string().ip(),
  // TODO: remove optional
  XAPI_SERVICE_URL: z.string().url().optional(),
  WEB_DB: z.string(),
  KRATOS_URL: z.string().url(),
  PORT: z.string(),
} satisfies Record<keyof NodeJS.ProcessEnv, any>);

const serverEnvTemplate = {
  NODE_ENV: process.env["NODE_ENV"],
  HOST: process.env["HOST"],
  XAPI_SERVICE_URL: process.env["XAPI_SERVICE_URL"],
  WEB_DB: process.env["WEB_DB"],
  KRATOS_URL: process.env["KRATOS_URL"],
  PORT: process.env["PORT"],
};

const _serverEnv = serverSchema.safeParse(serverEnvTemplate);

export const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value) {
        return `${name}: ${value._errors.join(", ")}\n`;
      }
      return null;
    })
    .filter(Boolean);

if (_serverEnv.success === false) {
  console.error("❌ Invalid environment variables:\n", ...formatErrors(_serverEnv.error.format()));
  throw new Error("Invalid environment variables");
}

export const serverEnv = _serverEnv.data;
