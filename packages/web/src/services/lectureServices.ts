import type { StudentLectureStatus, StudentLectureStatusCreate } from "../lib/server/db/schema";
import * as StudentLectureStatusRepo from "../lib/server/db/repository/studentLectureStatusRepo";
import type { TotalLecturesInStatuses } from "../lib/server/db/models/studentLectureStatus";

type LecturesInCourseStatuses = Record<StudentLectureStatus["status"], StudentLectureStatus["lecture"][]>;

const defaultLecture = (
  email: string,
  course: string,
  lecture: string,
  status?: StudentLectureStatus["status"]
): StudentLectureStatusCreate => ({
  email,
  course,
  lecture,
  status: status ?? "inProgress",
});

export async function lectureVisited(email: string, lectureId: string) {
  const [courseSlug, lectureSlug] = lectureId.split("/");
  const lecture = await StudentLectureStatusRepo.getSingle(email, courseSlug, lectureSlug);

  if (!lecture) {
    const newLectureRecord = defaultLecture(email, courseSlug, lectureSlug);
    try {
      const createdLectureStatus = await StudentLectureStatusRepo.create(newLectureRecord);
      return createdLectureStatus.status;
    } catch (e) {
      return null;
    }
  }

  return lecture.status;
}

export async function lectureStatus(email: string, lectureId: string) {
  const [courseSlug, lectureSlug] = lectureId.split("/");
  try {
    const lectureRecord = await StudentLectureStatusRepo.getSingle(email, courseSlug, lectureSlug);
    return lectureRecord ? lectureRecord.status : null;
  } catch (e) {
    return null;
  }
}

export async function markLectureAsCompleted(email: string, courseSlug: string, lectureSlug: string) {
  let lectureRecord;

  try {
    lectureRecord = await StudentLectureStatusRepo.getSingle(email, courseSlug, lectureSlug);

    if (!lectureRecord) {
      const newLectureRecord = defaultLecture(email, courseSlug, lectureSlug, "completed");
      return StudentLectureStatusRepo.create(newLectureRecord);
    }

    if (lectureRecord.status === "inProgress") {
      return StudentLectureStatusRepo.updateStatus(lectureRecord.id, "completed");
    }

    if (lectureRecord.status === "completed") {
      return lectureRecord;
    }

    return lectureRecord;
  } catch (e) {
    return null;
  }
}

export async function markLectureAsInProgress(email: string, courseSlug: string, lectureSlug: string) {
  let lectureRecord;

  try {
    lectureRecord = await StudentLectureStatusRepo.getSingle(email, courseSlug, lectureSlug);

    if (!lectureRecord) {
      const newLectureRecord = defaultLecture(email, courseSlug, lectureSlug, "inProgress");
      return StudentLectureStatusRepo.create(newLectureRecord);
    }

    if (lectureRecord.status === "completed") {
      return StudentLectureStatusRepo.updateStatus(lectureRecord.id, "inProgress");
    }

    if (lectureRecord.status === "inProgress") {
      return lectureRecord;
    }

    return lectureRecord;
  } catch (e) {
    return null;
  }
}

export async function allLecturesInCourseStatuses(email: string, course: string): Promise<LecturesInCourseStatuses> {
  const lecturesInStatuses: LecturesInCourseStatuses = { inProgress: [], completed: [] };
  let lectures;

  try {
    lectures = await StudentLectureStatusRepo.getAllStudentLecturesInCourse(email, course);
  } catch (e) {
    return lecturesInStatuses;
  }

  lectures.forEach((lecture) => lecturesInStatuses[lecture.status].push(lecture.lecture));
  return lecturesInStatuses;
}

export async function getTotalLecturesInStatuses(email: string): Promise<TotalLecturesInStatuses> {
  let totalInStatuses: TotalLecturesInStatuses = {};

  try {
    const dbInStatusesCount = await StudentLectureStatusRepo.getTotalLecturesInStatuses(email);
    dbInStatusesCount.map(({ course, status, count }) => {
      if (!Object.hasOwn(totalInStatuses, course)) totalInStatuses[course] = { completed: 0, inProgress: 0 };
      totalInStatuses[course][status] = count;
    });
  } catch (e) {
    return totalInStatuses;
  }

  return totalInStatuses;
}
