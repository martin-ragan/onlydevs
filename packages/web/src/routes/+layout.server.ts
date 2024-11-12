import type { LayoutServerData } from './$types';

export const load = async ({ locals }: { locals: { user: any } }): Promise<LayoutServerData> => {
	return { user: locals.user };
};
