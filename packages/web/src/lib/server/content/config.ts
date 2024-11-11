import { defineCollection } from "astro:content";
import { buildCourseSchema } from "./_course";
import { lectureSchema } from "./_lecture";

export const collections = {
  //! This key must match a collection directory name in "src/content"
  course: defineCollection({
    type: "data",
    schema: ({ image }) => buildCourseSchema(image),
  }),
  lecture: defineCollection({
    type: "content",
    schema: ({ image }) => lectureSchema(image),
  }),
};
