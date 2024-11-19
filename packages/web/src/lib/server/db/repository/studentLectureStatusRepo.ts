import { and, eq, sql } from "drizzle-orm";
import { db } from "../index";
import { studentLectureStatusTable, type StudentLectureStatus, type StudentLectureStatusCreate } from "../schema";
import { DbError } from "../models/dbError";
import postgres from "postgres";

export const create = async (entity: StudentLectureStatusCreate) => {
  try {
    const records = await db.insert(studentLectureStatusTable).values(entity).returning();
    return records[0];
  } catch (e) {
    // logger.child({ err: e }).error("[DB] Create student lecture status");

    if (e instanceof postgres.PostgresError) throw DbError.fromPostgresError(e);
    throw DbError.fromUnknownError();
  }
};

export const getSingle = async (email: string, course: string, lecture: string) => {
  try {
    const record = await db
      .select()
      .from(studentLectureStatusTable)
      .where(
        and(
          eq(studentLectureStatusTable.email, email),
          eq(studentLectureStatusTable.course, course),
          eq(studentLectureStatusTable.lecture, lecture)
        )
      );
    return record.at(0) ?? null;
  } catch (e) {
    // logger.child({ err: e }).error("[DB] Get student lecture");

    if (e instanceof postgres.PostgresError) throw DbError.fromPostgresError(e);
    throw DbError.fromUnknownError();
  }
};

export const updateStatus = async (id: string, status: StudentLectureStatus["status"]) => {
  try {
    const record = await db
      .update(studentLectureStatusTable)
      .set({ status })
      .where(eq(studentLectureStatusTable.id, id))
      .returning();
    return record.at(0) ?? null;
  } catch (e) {
    // logger.child({ err: e }).error("[DB] Update student lecture status");

    if (e instanceof postgres.PostgresError) throw DbError.fromPostgresError(e);
    throw DbError.fromUnknownError();
  }
};

export const getAllStudentLecturesInCourse = async (email: string, course: string) => {
  try {
    return db
      .select()
      .from(studentLectureStatusTable)
      .where(and(eq(studentLectureStatusTable.email, email), eq(studentLectureStatusTable.course, course)));
  } catch (e) {
    // logger.child({ err: e }).error("[DB] Get all student lectures in course");

    if (e instanceof postgres.PostgresError) throw DbError.fromPostgresError(e);
    throw DbError.fromUnknownError();
  }
};

export const getTotalLecturesInStatuses = async (email: string) => {
  try {
    return db
      .select({
        status: studentLectureStatusTable.status,
        course: studentLectureStatusTable.course,
        count: sql<number>`cast(count(${studentLectureStatusTable.id}) as int)`,
      })
      .from(studentLectureStatusTable)
      .where(and(eq(studentLectureStatusTable.email, email)))
      .groupBy(studentLectureStatusTable.status, studentLectureStatusTable.course);
  } catch (e) {
    // logger.child({ err: e }).error("[DB] Get total lectures in statuses");

    if (e instanceof postgres.PostgresError) throw DbError.fromPostgresError(e);
    throw DbError.fromUnknownError();
  }
};
