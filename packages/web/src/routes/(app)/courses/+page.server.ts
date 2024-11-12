import { parse } from 'yaml';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const courses = await Promise.all(
        Object.entries(import.meta.glob('$lib/server/content/course/*.yaml', { 
            as: 'raw',  // Get raw content instead of parsed module
            eager: true 
        }))
            .map(([path, content]) => {
                const slug = path.split('/').pop()?.replace('.yaml', '');

                return { ...parse(content), slug };
            })
    );

    return {
        tabs: [
            {label: 'Browse', id: 'browse'},
            {label: 'My Courses', id: 'courses'},
        ],
        courses
    };
}