import { Button } from '@/components/common';
import { ModalKeys } from '@/constants';
import { getModalLink } from '@/lib/modalLink';
import Link from 'next/link';

const WorkerManagementActions = () => {
    return (
        <div className="flex gap-8 items-center">
            <Link
                href={getModalLink(ModalKeys.AddWorkerToProject)}
                scroll={false}
            >
                <Button className="self-start" variant="secondary">
                    Pridėti darbuotoją
                </Button>
            </Link>
            <Link
                href={getModalLink(ModalKeys.RemoveWorkerFromProject)}
                scroll={false}
            >
                <Button className="self-start" variant="red">
                    Panaikinti darbuotoją
                </Button>
            </Link>
        </div>
    );
};

export default WorkerManagementActions;
