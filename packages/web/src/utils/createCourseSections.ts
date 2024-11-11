import type { StudentLectureStatus } from "@/db/models/studentLectureStatus";
import type { CourseSection } from "@/models/courseSections";
import type { LecturePreview } from "@/models/lecturePreview";
import type { CollectionEntry } from "astro:content";

type LecturesInCourseStatuses = Record<StudentLectureStatus["status"], StudentLectureStatus["lecture"][]>;
type Course = CollectionEntry<"course">;
type Lecture = CollectionEntry<"lecture">;

function getStatus(statuses: LecturesInCourseStatuses, lecture: Lecture): "completed" | "inProgress" | null {
  const [, lectureId] = lecture.slug.split("/");
  if (statuses.completed.includes(lectureId)) return "completed";
  if (statuses.inProgress.includes(lectureId)) return "inProgress";
  return null;
}

export function createCourseSections(course: Course, lectures: Lecture[], statuses: LecturesInCourseStatuses) {
  const sections: CourseSection[] = course.data.sections.map((section) => {
    const sectionLectures = section.lectures.map((lecture) => lectures.find((l) => l.slug === lecture.slug)!);
    const lectursesPreviw: LecturePreview[] = sectionLectures
      .filter((lecture) => lecture !== undefined)
      .map((lecture) => ({
        id: lecture.id,
        slug: lecture.slug,
        status: getStatus(statuses, lecture),
        data: {
          title: lecture.data.title,
          description: lecture.data.description,
          badges: lecture.data.badges,
          cover: lecture.data.cover,
        },
      }));

    return {
      title: section.title,
      lectures: lectursesPreviw,
    };
  });

  return sections;
}
