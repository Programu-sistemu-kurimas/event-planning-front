import { ModalKeys } from '@/constants';
import { getModalLink } from '@/lib/modalLink';
import { Task } from '@/types/task';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface TasksListProps {
    tasks: Task[];
}

const TasksList: FunctionComponent<TasksListProps> = ({ tasks }) => {
    return (
        <div className="flex flex-col gap-8 max-w-xl">
            <span className="text-xl lg:text-3xl font-normal">Užduotys</span>
            <div className="min-h-28 max-h-56 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {tasks.map(({ id, taskName }) => (
                        <div
                            className="flex items-center gap-2"
                            key={`task-${id}`}
                        >
                            <p className="text-lg lg:text-2xl font-normal first-letter:capitalize">
                                {taskName}
                            </p>
                            <Link
                                href={getModalLink(ModalKeys.RemoveTask, {
                                    taskId: id,
                                })}
                                className="hover:bg-transparent/20 rounded px-2"
                            >
                                -
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TasksList;
