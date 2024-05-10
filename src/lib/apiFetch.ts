import { auth } from '@/auth';

export const apiFetch = async (url: string, init: RequestInit) => {
    const session = await auth();

    const defaultHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(session?.accessToken
            ? { Cookie: `AuthToken=${session.accessToken}` }
            : {}),
    };

    return fetch(`${process.env.BASE_URL}/${url}`, {
        ...init,
        credentials: 'include',
        headers: {
            ...defaultHeaders,
            ...init.headers,
        },
    });
};
