import { Button } from '@/components/common';
import { ModalKeys } from '@/constants';
import { getModalLink } from '@/lib/modalLink';
import Link from 'next/link';

const ProjectPurgeActions = () => {
    return (
        <div className="flex items-center gap-4">
            <Button size="sm" variant="darkGreen">
                Archyvuoti
            </Button>
            <Link href={getModalLink(ModalKeys.DeleteProject)}>
                <Button size="sm" variant="red">
                    Ištrinti
                </Button>
            </Link>
        </div>
    );
};

export default ProjectPurgeActions;
