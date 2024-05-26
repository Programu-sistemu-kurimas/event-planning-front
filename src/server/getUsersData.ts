import { API_ROUTES } from '@/constants';
import { apiFetch } from '@/lib/apiFetch';
import { usersSchema } from '@/schemas';

export const getUsersData = async () => {
    const res = await apiFetch(API_ROUTES.USER.INFO);

    if (!res.ok) {
        throw new Error('Klaida gaunant profilio informaciją');
    }

    const data = await res.json();
    const validatedData = usersSchema.safeParse(data);

    if (!validatedData.success) {
        throw new Error('Klaida nuskaitant profilio duomenis');
    }

    return validatedData.data;
};
