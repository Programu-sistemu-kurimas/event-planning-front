'use server';

import { ModalKeys } from '@/constants';
import BaseModal from '../BaseModal';
import { AddWorkerToProjectForm } from '@/components/project';
import { FunctionComponent } from 'react';

interface AddWorkerToProjectModalProps {
    projectId: string;
}

const AddWorkerToProjectModal: FunctionComponent<
    AddWorkerToProjectModalProps
> = ({ projectId }) => {
    return (
        <BaseModal
            title="Pridėti darbuotoją"
            modalKey={ModalKeys.AddWorkerToProject}
        >
            <AddWorkerToProjectForm projectId={projectId} />
        </BaseModal>
    );
};

export default AddWorkerToProjectModal;
