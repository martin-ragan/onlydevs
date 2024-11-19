import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

export const load: PageServerLoad = async ({ locals }) => {
    return {
        user: locals.user
    };
};

const updateProfileSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    firstName: z.string()
        .min(1, "First name is required"),
    lastName: z.string()
        .min(1, "Last name is required"),
    uco: z.string()
        .min(1, "UCO is required")
        .regex(/^\d+$/, "UCO must contain only numbers")
});

export const actions: Actions = {
    updateProfile: async ({ request, locals }) => {
        const data = await request.formData();
        const result = updateProfileSchema.safeParse({
            email: data.get('email'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            uco: data.get('uco')
        });

        console.log(result);

        if (!result.success) {
            return fail(400, { error: result.error.flatten().fieldErrors });
        }
    },

    updatePassword: async ({ request, locals }) => {
        const data = await request.formData();
        const newPassword = data.get('newPassword');

        console.log(newPassword);
    }
};


