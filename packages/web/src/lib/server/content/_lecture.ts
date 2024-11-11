import { z, type CollectionEntry, type ImageFunction } from "astro:content";
import { multipleChoiceQuestionSchema, singleChoiceQuestionSchema } from "./_question";
import type { ReplaceWith } from "@/utils/ReplaceWith";

const textLectureSchema = (image: ImageFunction) =>
  z
    .object({
      type: z.literal("text"),
      title: z.string(),
      description: z.string(),
      cover: image(),
      badges: z.array(z.string()),
    })
    .strict();

export type TextLecture = ReplaceWith<
  CollectionEntry<"lecture">,
  "data",
  z.infer<ReturnType<typeof textLectureSchema>>
>;

const videoLectureSchema = (image: ImageFunction) =>
  z
    .object({
      type: z.literal("video"),
      title: z.string(),
      description: z.string(),
      cover: image(),
      badges: z.array(z.string()),
      sources: z.array(
        z.object({
          src: z.string().url(),
        })
      ),
    })
    .strict();

export type VideoLecture = ReplaceWith<
  CollectionEntry<"lecture">,
  "data",
  z.infer<ReturnType<typeof videoLectureSchema>>
>;

const codeLectureSchema = (image: ImageFunction) =>
  z
    .object({
      type: z.literal("code"),
      title: z.string(),
      description: z.string(),
      cover: image(),
      badges: z.array(z.string()),
    })
    .strict();

export type CodeLecture = ReplaceWith<
  CollectionEntry<"lecture">,
  "data",
  z.infer<ReturnType<typeof codeLectureSchema>>
>;

const checkpointLectureSchema = (image: ImageFunction) =>
  z
    .object({
      type: z.literal("checkpoint"),
      title: z.string(),
      description: z.string(),
      cover: image(),
      badges: z.array(z.string()),
      questions: z.array(z.union([singleChoiceQuestionSchema, multipleChoiceQuestionSchema])),
    })
    .strict();

export type CheckpointLecture = ReplaceWith<
  CollectionEntry<"lecture">,
  "data",
  z.infer<ReturnType<typeof checkpointLectureSchema>>
>;

export type CheckpointSingleChoiceQuestion = z.infer<typeof singleChoiceQuestionSchema>;
export type CheckpointMultipleChoiceQuestion = z.infer<typeof multipleChoiceQuestionSchema>;

export const lectureSchema = (image: ImageFunction) =>
  z.union([
    textLectureSchema(image),
    videoLectureSchema(image),
    checkpointLectureSchema(image),
    codeLectureSchema(image),
  ]);
