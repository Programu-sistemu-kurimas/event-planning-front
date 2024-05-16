'use server';

import { ModalKeys } from '@/constants';
import BaseModal from '../BaseModal';
import { DeleteProjectForm } from '@/components/project';

const DeleteProjectModal = () => {
    return (
        <BaseModal title="Ištrinti projektą" modalKey={ModalKeys.DeleteProject}>
            <DeleteProjectForm />
        </BaseModal>
    );
};

export default DeleteProjectModal;
