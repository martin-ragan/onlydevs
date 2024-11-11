import { error } from '@sveltejs/kit';
import { parse } from 'yaml';
import type { Course, Lecture } from '../../../../models/types.js';
import parseMD from 'parse-md';


/** @type {impCourse, ort('./$types').RequestHandler} */
export async function load({ params }) {
    try {
        const courses = await import.meta.glob(`$lib/server/content/course/*.yaml`, {
            as: 'raw',
            eager: true
        });
        const courseFile = courses[`/src/lib/server/content/course/${params.slug}.yaml`];
        const course = parse(courseFile) as Course;

        // get lectures of the course
        const lectures = await import.meta.glob(`$lib/server/content/lecture/*/*.md`, {
            as: 'raw',
            eager: true
        });

        const courseLectures = Object.entries(lectures).filter(([path, lecture]) => {
            return path.split('/')[6] === params.slug;
        }).map(([, lecture]) => {
            const parsedLecture = parseMD(lecture) as { metadata: Lecture, content: string };
            
            return {
                ...parsedLecture.metadata,
                cover: parsedLecture.metadata.cover,
                badges: parsedLecture.metadata.badges,
                title: parsedLecture.metadata.title,
                description: parsedLecture.metadata.description,
                type: parsedLecture.metadata.type,
                content: parsedLecture.content,
                completed: false
            } as Lecture;
        });

        console.log(courseLectures.filter(lecture => lecture.type === 'checkpoint').map(lecture => lecture.questions));

        return {
            course,
            lectures: courseLectures
        };
    } catch (e) {
        throw error(404, 'Course not found');
    }
}
