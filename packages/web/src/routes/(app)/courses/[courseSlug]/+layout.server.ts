import { error } from '@sveltejs/kit';
import type { Course, Lecture } from '../../../../models/types.js';
import parseMD from 'parse-md';
import { marked } from "marked";
import { allLecturesInCourseStatuses } from '../../../../services/lectureServices.js';

// Map where key is course slug and value is array of parsed lectures
const cachedLectures: Map<string, Lecture[]> = new Map();
let lectureFiles: Record<string, string> | null = null;

/** @type {impCourse, ort('./$types').RequestHandler} */
export async function load({ params, locals, parent, depends }) {
    try {
        const {courses} = await parent() as {courses: Course[]};
        const course = courses.find(c => c.slug === params.courseSlug);

        // get lectures of the course
        if(!lectureFiles) {
            lectureFiles = await import.meta.glob(`$lib/server/content/lecture/*/*.md`, {
                as: 'raw',
                eager: true
            });
        }


        const lectureStatuses = await allLecturesInCourseStatuses(locals.user.email, params.courseSlug);

        depends('courses:lectureMarkedComplete');

        let lectures: Lecture [] = parseLectures(
            lectureFiles,
            params.courseSlug,
            (lectureName: string) => lectureStatuses.completed.includes(lectureName)
        );

        return {
            course,
            lectures: lectures,
            user: locals.user
        };
    } catch (e) {
        throw error(404, 'Course not found');
    }
}

const parseLectures = (lectures: Record<string, string>, courseSlug: string, isLectureCompletedFn: (lectureName: string) => boolean) => {
    return Object
            .entries(lectures)
            .filter(([path, lecture]) => path.split('/')[6] === courseSlug)
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
                    completed: isLectureCompletedFn(nameWithoutExtension || ''),
                    slug: `${courseSlug}/${nameWithoutExtension}`,
                    ...(parsedLecture.metadata.type === 'code' ? { content: marked.lexer(parsedLecture.content) } : {})
                } as Lecture;
            });
}