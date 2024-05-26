import { Container } from '@/components/common';
import {
    AssignedUsersList,
    ChangeTaskInformationForm,
    ChangeTaskStateForm,
} from '@/components/task';
import { getProjectData, getTaskData } from '@/server';
import { FunctionComponent } from 'react';

interface TaskPageProps {
    params: {
        id: string;
        taskId: string;
    };
}

const TaskPage: FunctionComponent<TaskPageProps> = async ({
    params: { id, taskId },
}) => {
    const projectData = getProjectData(id);
    const taskData = getTaskData(taskId);

    const [project, task] = await Promise.all([projectData, taskData]);

    return (
        <Container className="pb-16">
            <div className="flex flex-col gap-32 mt-24">
                <div className="flex flex-col gap-10">
                    <h1 className="text-2xl xl:text-4xl font-bold">
                        Užduotis{' '}
                        <span className="first-letter:capitalize">
                            &quot;{task.taskName}&quot;
                        </span>
                    </h1>
                    <ChangeTaskInformationForm
                        currentTaskDescription={task.taskDescription}
                        currentTaskName={task.taskName}
                    />
                    <AssignedUsersList
                        assignedWorkers={task.assignedUsers}
                        projectWorkers={project.workers}
                    />
                    <ChangeTaskStateForm currentState={task.state} />
                </div>
            </div>
        </Container>
    );
};

export default TaskPage;
