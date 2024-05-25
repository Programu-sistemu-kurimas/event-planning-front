import { Container } from '@/components/common';
import { ChangeTaskInformationForm } from '@/components/task';
import { API_ROUTES } from '@/constants';
import { apiFetch } from '@/lib/apiFetch';
import { applyRouteParams } from '@/lib/utils';
import { detailTaskSchema } from '@/schemas';
import { FunctionComponent } from 'react';

const getTaskData = async (id: string) => {
    const res = await apiFetch(
        applyRouteParams(API_ROUTES.TASK.GET_BY_ID, {
            id,
        })
    );

    if (!res.ok) {
        throw new Error('Klaida gaunant užduoties informaciją');
    }

    const data = await res.json();
    const validatedData = detailTaskSchema.safeParse(data);

    if (!validatedData.success) {
        throw new Error('Klaida nuskaitant užduoties duomenis');
    }

    return validatedData.data;
};

interface TaskPageProps {
    params: {
        id: string;
        taskId: string;
    };
}

const TaskPage: FunctionComponent<TaskPageProps> = async ({
    params: { taskId },
}) => {
    const task = await getTaskData(taskId);

    return (
        <Container>
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
                </div>
            </div>
        </Container>
    );
};

export default TaskPage;
