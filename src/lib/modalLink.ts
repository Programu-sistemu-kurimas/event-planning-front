import { ModalKeys } from '@/constants';

export const getModalLink = (
    modalKey: ModalKeys,
    params?: Record<string, string>
) => {
    const queryParams =
        params &&
        Object.entries(params).map(([key, value]) => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        });

    const queryParamsString = queryParams?.length
        ? `&${queryParams.join('&')}`
        : '';

    return `?${modalKey}=true${queryParamsString}`;
};
