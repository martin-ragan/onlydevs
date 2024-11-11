import { Configuration, FrontendApi } from "@ory/client";
import { serverEnv } from "../env/server";


const oryConfig = new Configuration({
  basePath: serverEnv.KRATOS_URL,
});

export const feApiOry = new FrontendApi(oryConfig);

export const browserUrls = {
  registration: `${oryConfig.basePath}/self-service/registration/browser`,
  recovery: `${oryConfig.basePath}/self-service/recovery/browser`,
  verification: `${oryConfig.basePath}/self-service/verification/browser`,
  login: `${oryConfig.basePath}/self-service/login/browser`,
  settings: `${oryConfig.basePath}/self-service/settings/browser`,
};
