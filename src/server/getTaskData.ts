import { API_ROUTES } from '@/constants';
import { apiFetch } from '@/lib/apiFetch';
import { applyRouteParams } from '@/lib/utils';
import { detailTaskSchema } from '@/schemas';

export const getTaskData = async (id: string) => {
    const res = await apiFetch(
        applyRouteParams(API_ROUTES.TASK.GET_BY_ID, {
            id,
        })
    );

    if (!res.ok) {
        throw new Error('Klaida gaunant užduoties informaciją');
    }

    const data = await res.json();
    const validatedData = detailTaskSchema.safeParse(data);

    if (!validatedData.success) {
        throw new Error('Klaida nuskaitant užduoties duomenis');
    }

    return validatedData.data;
};
