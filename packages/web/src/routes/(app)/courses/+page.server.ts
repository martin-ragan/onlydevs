import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
    const { courses } = await parent();

    return {
        tabs: [
            {label: 'Browse', id: 'browse'},
            {label: 'My Courses', id: 'courses'},
        ],
        courses
    };
}