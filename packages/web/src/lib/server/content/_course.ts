import { z, type ImageFunction, reference } from "astro:content";

export const buildCourseSchema = (image: ImageFunction) =>
  z
    .object({
      title: z.string(),
      faculty: z.string(),
      cover: image(),
      isDraft: z.boolean(),
      description: z.string(),
      sections: z.array(
        z.object({
          title: z.string(),
          lectures: z.array(reference("lecture")),
        })
      ),
    })
    .strict();
