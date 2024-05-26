'use server';

import { ModalKeys } from '@/constants';
import BaseModal from '../BaseModal';
import { UnarchiveProjectForm } from '@/components/project';

const ArchiveProjectModal = () => {
    return (
        <BaseModal
            title="Atkurti projektą"
            modalKey={ModalKeys.UnarchiveProject}
        >
            <UnarchiveProjectForm />
        </BaseModal>
    );
};

export default ArchiveProjectModal;
