import { Task } from '@/types/task';
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
                        <p
                            className="text-lg lg:text-2xl font-normal"
                            key={`task-${id}`}
                        >
                            {taskName}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TasksList;
