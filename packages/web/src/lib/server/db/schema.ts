import { pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: uuid("id").primaryKey().defaultRandom(),
	email: text('email').notNull().unique(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	uco: text('uco').notNull().unique()
});

export const session = pgTable('session', {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const lectureStatus = pgEnum("lecture_status", ["inProgress", "completed"]);

export const studentLectureStatusTable = pgTable("student_lecture_status", {
  id: uuid("id").primaryKey().defaultRandom(),
  createAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  email: varchar("email", { length: 256 }).notNull(),
  course: varchar("course", { length: 256 }).notNull(),
  lecture: varchar("lecture", { length: 256 }).notNull(),
  status: lectureStatus("status").notNull(),
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type StudentLectureStatus = typeof studentLectureStatusTable.$inferSelect;
export type StudentLectureStatusCreate = typeof studentLectureStatusTable.$inferInsert;
