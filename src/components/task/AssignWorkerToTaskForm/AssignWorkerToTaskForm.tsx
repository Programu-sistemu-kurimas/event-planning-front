'use client';

import { FormSelect, HiddenInput } from '@/components/form';
import { useAssignWorkerToTask } from '@/lib/task';
import { Option } from '@/types/form';
import { Worker } from '@/types/worker';
import { useParams } from 'next/navigation';
import { FormEvent, FunctionComponent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';

interface AssignWorkerToTaskFormProps {
    availableWorkers: Worker[];
}

const AssignWorkerToTaskForm: FunctionComponent<
    AssignWorkerToTaskFormProps
> = ({ availableWorkers }) => {
    const { taskId } = useParams();

    const parsedTaskId = String(taskId);

    const { formAction, form } = useAssignWorkerToTask({
        taskId: parsedTaskId,
    });

    const formRef = useRef<HTMLFormElement>(null);

    const options = [
        {
            label: 'Pasirinkite darbuotoją',
            value: '',
        },
    ].concat(
        availableWorkers.map(
            (worker) =>
                ({
                    label: `${worker.name} ${worker.surname}`,
                    value: worker.id,
                } satisfies Option)
        )
    );

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        return form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
        })(e);
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={onSubmit}
                action={formAction}
                ref={formRef}
                noValidate
            >
                <FormSelect
                    name="userId"
                    options={options}
                    onChange={() => formRef.current?.requestSubmit()}
                    classNames={{
                        container: 'lg:w-1/2 w-full',
                    }}
                />
                <HiddenInput name="taskId" value={parsedTaskId} />
            </form>
        </FormProvider>
    );
};

export default AssignWorkerToTaskForm;
