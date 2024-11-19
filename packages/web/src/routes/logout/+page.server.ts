import * as auth from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		if (event.locals.session) {
			await auth.invalidateSession(event.locals.session.id);
			auth.deleteSessionTokenCookie(event);
		}
		
		throw redirect(302, '/login');
	}
};
