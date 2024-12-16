import { verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';

// Add Zod schemas
const loginSchema = z.object({
	username: z.string().min(3).max(20),
	password: z.string().min(8).max(100)
});

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/dashboard');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const redirectTo = event.url.searchParams.get('redirectTo');
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		// Replace individual validations with Zod validation
		const result = loginSchema.safeParse({ username, password });
		if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            const singleErrors: Record<string, string> = {};
            
            // Take only the first error message for each field
            for (const [field, errors] of Object.entries(fieldErrors)) {
                if (errors && errors.length > 0) {
                    singleErrors[field] = errors[0];
                }
            }
            
            return fail(400, {
                errors: singleErrors
            });
        }

		const [existingUser] = await db.select().from(table.user).where(eq(table.user.username, username));

		if (!existingUser) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const session = await auth.createSession(existingUser.id);
		auth.setSessionTokenCookie(event, session.id, session.expiresAt);

		if (redirectTo) {
			return redirect(302, redirectTo);
		}

		return redirect(302, '/dashboard');
	},
};