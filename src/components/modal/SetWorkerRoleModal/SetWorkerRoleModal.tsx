'use server';

import { ModalKeys } from '@/constants';
import BaseModal from '../BaseModal';
import { SetWorkerRoleForm } from '@/components/project';

const SetWorkerRoleModal = () => {
    return (
        <BaseModal title="Pakeisti rolę" modalKey={ModalKeys.SetWorkerRole}>
            <SetWorkerRoleForm />
        </BaseModal>
    );
};

export default SetWorkerRoleModal;
