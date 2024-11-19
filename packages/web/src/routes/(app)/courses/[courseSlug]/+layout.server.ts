import { error } from '@sveltejs/kit';
import { parse } from 'yaml';
import type { Course, Lecture } from '../../../../models/types.js';
import parseMD from 'parse-md';
import { marked } from "marked";
import { allLecturesInCourseStatuses, markLectureAsCompleted } from '../../../../services/lectureServices.js';


/** @type {impCourse, ort('./$types').RequestHandler} */
export async function load({ params, locals }) {
    try {
        const courses = await import.meta.glob(`$lib/server/content/course/*.yaml`, {
            as: 'raw',
            eager: true
        });
        const courseFile = courses[`/src/lib/server/content/course/${params.courseSlug}.yaml`];
        const course = parse(courseFile) as Course;

        // get lectures of the course
        const lectures = await import.meta.glob(`$lib/server/content/lecture/*/*.md`, {
            as: 'raw',
            eager: true
        });

        const lectureStatuses = await allLecturesInCourseStatuses(locals.user.email, params.courseSlug);

        const courseLectures = Object
            .entries(lectures)
            .filter(([path, lecture]) => path.split('/')[6] === params.courseSlug)
            .map(([path, lecture]) => {
                const parsedLecture = parseMD(lecture) as { metadata: Lecture, content: string };
                const nameWithoutExtension = path.split('/').pop()?.split('.').shift();

                return {
                    ...parsedLecture.metadata,
                    cover: parsedLecture.metadata.cover,
                    badges: parsedLecture.metadata.badges,
                    title: parsedLecture.metadata.title,
                    description: parsedLecture.metadata.description,
                    type: parsedLecture.metadata.type,
                    content: parsedLecture.content,
                    completed: lectureStatuses.completed.includes(nameWithoutExtension || ''),
                    slug: `${params.courseSlug}/${nameWithoutExtension}`,
                    ...(parsedLecture.metadata.type === 'code' ? { content: marked.lexer(parsedLecture.content) } : {})
                } as Lecture;
            });

        return {
            course,
            lectures: courseLectures,
            user: locals.user
        };
    } catch (e) {
        throw error(404, 'Course not found');
    }
}