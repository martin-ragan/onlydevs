import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event: { locals: { user: any }; url: URL }) => {
	if (!event.locals.user) {
		throw redirect(302, `/login?redirectTo=${event.url.pathname}`);
	}

	return { user: event.locals.user };
};
