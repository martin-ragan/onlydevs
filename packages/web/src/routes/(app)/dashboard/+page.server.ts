import type { Course } from '../../../models/types';
import { getTotalLecturesInStatuses } from '../../../services/lectureServices';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, parent }) => {
    const { courses }: { courses: Course[] } = await parent();
    

    const totalLecturesInStatuses = await getTotalLecturesInStatuses(locals.user.email);

    const coursesInProgress = courses.filter((course) => {
        const totalLectures = course.sections.reduce((acc, section) => acc + section.lectures.length, 0);

        return totalLecturesInStatuses[course.slug].inProgress > 0
            || (totalLecturesInStatuses[course.slug].completed > 0
                && totalLectures > totalLecturesInStatuses[course.slug].completed);
    }).map((course) => {
        const totalLectures = course.sections.reduce((acc, section) => acc + section.lectures.length, 0);

        return {
            ...course,
            progress: Math.round((totalLecturesInStatuses[course.slug].completed / totalLectures) * 100)
        }
    });

    return {
        user: locals.user,
        coursesInProgress,
    };
};
