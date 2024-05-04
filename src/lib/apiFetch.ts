export const apiFetch = (url: string, init: RequestInit) => {
    const defaultHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    return fetch(`${process.env.BASE_URL}/${url}`, {
        ...init,
        headers: {
            ...defaultHeaders,
            ...init.headers,
        },
    });
};
