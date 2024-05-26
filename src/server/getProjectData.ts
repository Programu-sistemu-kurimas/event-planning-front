import { API_ROUTES } from '@/constants';
import { apiFetch } from '@/lib/apiFetch';
import { applyRouteParams } from '@/lib/utils';
import { detailedProjectSchema } from '@/schemas';

export const getProjectData = async (id: string) => {
    const res = await apiFetch(
        applyRouteParams(API_ROUTES.PROJECT.GET_BY_ID, {
            id,
        })
    );

    if (!res.ok) {
        throw new Error('Klaida gaunant projekto informaciją');
    }

    const data = await res.json();
    const validatedData = detailedProjectSchema.safeParse(data);

    if (!validatedData.success) {
        throw new Error('Klaida nuskaitant projekto duomenis');
    }

    return validatedData.data;
};
