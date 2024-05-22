'use server';

import { ModalKeys } from '@/constants';
import BaseModal from '../BaseModal';
import { DeleteTaskForm } from '@/components/task';

const DeleteTaskModal = () => {
    return (
        <BaseModal title="Ištrinti užduotį" modalKey={ModalKeys.RemoveTask}>
            <DeleteTaskForm />
        </BaseModal>
    );
};

export default DeleteTaskModal;
