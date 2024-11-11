import { z } from "astro:content";

export const singleChoiceQuestionSchema = z
  .object({
    type: z.literal("single-choice"),
    title: z.string(),
    code: z.string(),
    correct: z.string(),
    answers: z.array(
      z.object({
        label: z.string(),
        code: z.string(),
        explanation: z.string().nullable(),
      })
    ),
  })
  .strict();

export const multipleChoiceQuestionSchema = z
  .object({
    type: z.literal("multiple-choice"),
    code: z.string(),
    title: z.string(),
    correct: z.array(z.string()).min(1),
    answers: z.array(
      z.object({
        label: z.string(),
        code: z.string(),
        explanation: z.string().nullable(),
      })
    ),
  })
  .strict();
