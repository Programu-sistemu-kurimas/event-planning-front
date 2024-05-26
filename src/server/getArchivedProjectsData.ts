import { API_ROUTES } from '@/constants';
import { apiFetch } from '@/lib/apiFetch';
import { projectsSchema } from '@/schemas';

export const getArchivedProjectsData = async () => {
    const res = await apiFetch(API_ROUTES.USER.ARCHIVED_PROJECTS);

    if (!res.ok) {
        throw new Error('Klaida gaunant archyvuotus projektus');
    }

    const data = await res.json();
    const validatedData = projectsSchema.safeParse(data);

    if (!validatedData.success) {
        throw new Error('Klaida nuskaitant projektų duomenis');
    }

    return validatedData.data;
};
