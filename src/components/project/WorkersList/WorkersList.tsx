import { EditIcon } from '@/components/icon';
import { ModalKeys } from '@/constants';
import { getModalLink } from '@/lib/modalLink';
import type { Worker } from '@/types/worker';
import Link from 'next/link';
import { Fragment, FunctionComponent } from 'react';

interface WorkersListProps {
    workers: Worker[];
    isEditable?: boolean;
}

const WorkersList: FunctionComponent<WorkersListProps> = ({
    workers,
    isEditable = true,
}) => {
    return (
        <div className="flex flex-col gap-8 max-w-xl">
            <div className="grid grid-cols-2 text-xl lg:text-3xl font-normal gap-6">
                <p>Darbuotojai</p>
                <p>Rolė</p>
            </div>
            <div className="min-h-28 max-h-56 overflow-y-auto">
                <div className="grid grid-cols-2 text-lg lg:text-2xl font-normal gap-y-4 gap-x-6">
                    {workers.map(({ id, name, surname, role }) => (
                        <Fragment key={`worker-${id}`}>
                            <p className="truncate capitalize">
                                {name} {surname}
                            </p>
                            <div className="flex items-center gap-2">
                                <p>{role}</p>
                                {isEditable && (
                                    <Link
                                        href={getModalLink(
                                            ModalKeys.SetWorkerRole,
                                            {
                                                userId: id,
                                            }
                                        )}
                                        scroll={false}
                                    >
                                        <EditIcon />
                                    </Link>
                                )}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkersList;
