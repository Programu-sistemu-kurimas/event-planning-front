'use server';

import { ModalKeys } from '@/constants';
import BaseModal from '../BaseModal';
import { RemoveWorkerFromProjectForm } from '@/components/project';

const AddWorkerToProjectModal = () => {
    return (
        <BaseModal
            title="Panaikinti darbuotoją"
            modalKey={ModalKeys.RemoveWorkerFromProject}
        >
            <RemoveWorkerFromProjectForm />
        </BaseModal>
    );
};

export default AddWorkerToProjectModal;
