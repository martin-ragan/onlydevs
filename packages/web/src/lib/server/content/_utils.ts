import type { CollectionEntry } from "astro:content";

type ParsedLectureSlug = {
  course: CollectionEntry<"course">["id"];
  lecture: CollectionEntry<"lecture">["id"];
};

export const parseLectureSlug = (lectureSlug: string): ParsedLectureSlug => {
  const [course, lecture] = lectureSlug.split("/");
  return { course, lecture } as ParsedLectureSlug;
};

export const parseSectionSlug = (slug: string) => {
  const [course, section] = slug.split("/");

  return {
    course,
    section,
  };
};

export type CourseTree = {
  courses: (CollectionEntry<"course"> & {
    sections: {
      lectures: CollectionEntry<"lecture">[];
    }[];
  })[];
};

export function buildCourseTree(
  courseEntries: CollectionEntry<"course">[],
  lectureEntries: CollectionEntry<"lecture">[]
) {
  const tree: CourseTree = { courses: [] };

  //   Yes this is O(n^2) and I don't care
  for (const course of courseEntries) {
    tree.courses.push({
      ...course,
      sections: [],
    });

    const courseLectures = lectureEntries.filter(({ id }) => id.startsWith(course.id));

    for (const lectures of courseLectures) {
      const { course, lecture } = parseLectureSlug(lectures.slug);

      tree.courses.at(-1)?.sections.push({
        lectures: courseLectures.filter(({ id }) => id.startsWith(`${course}/${lecture}`)),
      });
    }
  }
  return tree;
}

export type Collection = any extends CollectionEntry<infer TCollection> ? TCollection : never;
