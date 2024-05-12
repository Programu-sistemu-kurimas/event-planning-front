import { ModalKeys } from '@/constants';

export const getModalLink = (modalKey: ModalKeys) => {
    return `?${modalKey}=true`;
};
