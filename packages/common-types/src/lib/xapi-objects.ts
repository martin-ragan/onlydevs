import { XApiTranslation } from "./xapi-common";

export type XApiObject = {
  id: string;
  definition: {
    name?: XApiTranslation;
    description?: XApiTranslation;
    type?: string;
  };
};
