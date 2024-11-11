import { error } from '@sveltejs/kit';
import { parse } from 'yaml';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const courses = await Promise.all(
        Object.entries(import.meta.glob('$lib/server/content/course/*.yaml', { 
            as: 'raw',  // Get raw content instead of parsed module
            eager: true 
        }))
            .map(([path, content]) => {
                return parse(content);
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