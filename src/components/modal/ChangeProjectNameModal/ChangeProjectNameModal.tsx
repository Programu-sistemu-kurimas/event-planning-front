'use server';

import { ModalKeys } from '@/constants';
import BaseModal from '../BaseModal';
import { ChangeProjectNameForm } from '@/components/project';

const ChangeProjectNameModal = () => {
    return (
        <BaseModal
            title="Pakeisti projekto pavadinimą"
            modalKey={ModalKeys.ChangeProjectName}
        >
            <ChangeProjectNameForm />
        </BaseModal>
    );
};

export default ChangeProjectNameModal;
