'use server';

import { ModalKeys } from '@/constants';
import BaseModal from '../BaseModal';
import { ArchiveProjectForm } from '@/components/project';

const ArchiveProjectModal = () => {
    return (
        <BaseModal
            title="Archyvuoti projektą"
            modalKey={ModalKeys.ArchiveProject}
        >
            <ArchiveProjectForm />
        </BaseModal>
    );
};

export default ArchiveProjectModal;
