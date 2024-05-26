import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Worker } from '@/types/worker';
import AssignWorkerToTaskForm from '../AssignWorkerToTaskForm';

interface TasksListProps {
    assignedWorkers: Worker[];
    projectWorkers: Worker[];
}

const AssignedUsersList: FunctionComponent<TasksListProps> = ({
    assignedWorkers,
    projectWorkers,
}) => {
    const availableWorkers = projectWorkers.filter(
        (projectWorker) =>
            !assignedWorkers.some(
                (assignedWorker) => assignedWorker.id === projectWorker.id
            )
    );

    return (
        <div className="flex flex-col gap-8">
            <span className="text-xl lg:text-3xl font-normal text-secondaryLight">
                Darbuotojai
            </span>
            <div className="flex flex-col gap-4 max-w-3xl">
                <div>
                    {assignedWorkers.map(({ id, name, surname }) => (
                        <div
                            className="flex items-center gap-2"
                            key={`task-worker-${id}`}
                        >
                            <p className="text-lg lg:text-2xl font-normal first-letter:capitalize">
                                {name} {surname}
                            </p>
                            {/* TODO: implement assigned user removal */}
                            <Link
                                href="/"
                                scroll={false}
                                className="hover:bg-transparent/20 rounded px-2"
                            >
                                -
                            </Link>
                        </div>
                    ))}
                </div>
                {availableWorkers.length ? (
                    <AssignWorkerToTaskForm
                        availableWorkers={availableWorkers}
                    />
                ) : (
                    <p className="text-2xl text-error">
                        Nėra daugiau galimų darbuotojų projekte, kuriuos būtų
                        galima priskirti
                    </p>
                )}
            </div>
        </div>
    );
};

export default AssignedUsersList;
