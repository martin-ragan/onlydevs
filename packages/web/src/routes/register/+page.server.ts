import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { generateUserId } from '$lib/server/helpers/validators';
import { hash } from '@node-rs/argon2';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import * as auth from '$lib/server/auth';
import { z } from 'zod';

const registerSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    username: z.string()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
    firstName: z.string()
        .min(1, "First name is required"),
    lastName: z.string()
        .min(1, "Last name is required"),
    uco: z.string()
        .min(1, "UCO is required")
        .regex(/^\d+$/, "UCO must contain only numbers")
});

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/dashboard');
	}
	return {};
};

export const actions = {
    register: async (event) => {
        const formData = await event.request.formData();
        
        const result = registerSchema.safeParse({
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            uco: formData.get('uco')
        });
        

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

        const validatedData = result.data;
        const userId = generateUserId();
        const passwordHash = await hash(validatedData.password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        try {
            await db.insert(table.user).values({ 
                id: userId, 
                username: validatedData.username, 
                passwordHash,
                email: validatedData.email,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                uco: validatedData.uco
            });

            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, userId);
            auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
        } catch (e) {
            return fail(500, { message: 'An error has occurred' });
        }
        return redirect(302, '/dashboard');
    }
} satisfies Actions; 