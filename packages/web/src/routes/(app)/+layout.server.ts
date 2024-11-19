import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { parse } from 'yaml';

export const load: LayoutServerLoad = async (event: { locals: { user: any }; url: URL }) => {
	if (!event.locals.user) {
		throw redirect(302, `/login?redirectTo=${event.url.pathname}`);
	}

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

	return { user: event.locals.user, courses };
};
