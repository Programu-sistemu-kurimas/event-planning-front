import type { Worker } from '@/types/worker';
import { FunctionComponent } from 'react';

interface WorkersListProps {
    workers: Worker[];
}

const WorkersList: FunctionComponent<WorkersListProps> = ({ workers }) => {
    return (
        <div className="flex flex-col gap-2.5 max-w-xl">
            <div className="grid grid-cols-2 text-xl lg:text-3xl font-normal gap-6">
                <p>Darbuotojai</p>
                <p>Rolė</p>
            </div>
            {workers.map(({ id, name, surname, role }) => (
                <div
                    className="grid grid-cols-2 text-lg lg:text-2xl font-normal gap-6"
                    key={`worker-${id}`}
                >
                    <p className="truncate">
                        {name} {surname}
                    </p>
                    <p>{role}</p>
                </div>
            ))}
        </div>
    );
};

export default WorkersList;
