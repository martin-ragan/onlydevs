import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { parse } from 'yaml';

// Cache variable to store parsed courses
let coursesCache: Array<any> | null = null;

async function loadCourses() {
	if (coursesCache) return coursesCache;

	coursesCache = await Promise.all(
		Object.entries(import.meta.glob('$lib/server/content/course/*.yaml', { 
			as: 'raw',
			eager: true 
		}))
			.map(([path, content]) => {
				const slug = path.split('/').pop()?.replace('.yaml', '');
				return { ...parse(content), slug };
			})
	);

	return coursesCache;
}

export const load: LayoutServerLoad = async (event: { locals: { user: any }; url: URL }) => {
	if (!event.locals.user) {
		throw redirect(302, `/login?redirectTo=${event.url.pathname}`);
	}

	const courses = await loadCourses();
	return { user: event.locals.user, courses };
};
