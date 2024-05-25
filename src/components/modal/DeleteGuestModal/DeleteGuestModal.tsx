'use server';

import { ModalKeys } from '@/constants';
import BaseModal from '../BaseModal';
import { DeleteGuestForm } from '@/components/project';

const DeleteGuestModal = () => {
    return (
        <BaseModal title="Ištrinti svečią" modalKey={ModalKeys.RemoveGuest}>
            <DeleteGuestForm />
        </BaseModal>
    );
};

export default DeleteGuestModal;
