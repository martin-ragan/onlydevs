import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
    const { courses } = await parent();

    return {
        tabs: [
            {label: 'Browse', id: 'browse'},
            {label: 'My Courses', id: 'courses'},
        ],
        courses
    };
}