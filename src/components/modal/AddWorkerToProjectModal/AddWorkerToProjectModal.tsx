'use server';

import { ModalKeys } from '@/constants';
import BaseModal from '../BaseModal';
import { AddWorkerToProjectForm } from '@/components/project';

const AddWorkerToProjectModal = () => {
    return (
        <BaseModal
            title="Pridėti darbuotoją"
            modalKey={ModalKeys.AddWorkerToProject}
        >
            <AddWorkerToProjectForm />
        </BaseModal>
    );
};

export default AddWorkerToProjectModal;
