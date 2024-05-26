import { API_ROUTES } from '@/constants';
import { apiFetch } from '@/lib/apiFetch';
import { applyRouteParams } from '@/lib/utils';
import { guestsSchema } from '@/schemas';

export const getGuestsData = async (id: string) => {
    const res = await apiFetch(
        applyRouteParams(API_ROUTES.PROJECT.GUESTS, {
            id,
        })
    );

    if (!res.ok) {
        throw new Error('Klaida gaunant projekto svečius');
    }

    const data = await res.json();
    const validatedData = guestsSchema.safeParse(data);

    if (!validatedData.success) {
        throw new Error('Klaida nuskaitant projekto svečius');
    }

    return validatedData.data;
};
