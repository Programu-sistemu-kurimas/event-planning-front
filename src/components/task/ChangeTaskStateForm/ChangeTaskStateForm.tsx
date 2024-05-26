'use client';

import { HiddenInput } from '@/components/form';
import { TaskStates } from '@/constants';
import { useChangeTaskState } from '@/lib/task';
import { useParams } from 'next/navigation';
import { FormEvent, FunctionComponent, useRef } from 'react';
import { FormProvider } from 'react-hook-form';
import { z } from 'zod';

const RADIO_INPUT_STYLE = 'h-6 w-6 accent-secondary bg-secondaryLight';
const RADIO_LABEL_STYLE = 'text-2xl';

interface ChangeTaskStateFormProps {
    currentState: z.infer<typeof TaskStates>;
}

const ChangeTaskStateForm: FunctionComponent<ChangeTaskStateFormProps> = ({
    currentState,
}) => {
    const { id, taskId } = useParams();

    const projectId = String(id);
    const parsedTaskId = String(taskId);

    const { formAction, form } = useChangeTaskState({
        projectId,
        taskId: parsedTaskId,
        currentState,
    });

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        return form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
        })(e);
    };

    return (
        <div className="flex flex-col gap-8">
            <p className="text-xl lg:text-3xl font-normal text-secondaryLight">
                Statusas
            </p>
            <FormProvider {...form}>
                <form
                    onSubmit={onSubmit}
                    action={formAction}
                    ref={formRef}
                    className="flex flex-col items-start gap-2"
                    noValidate
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            className={RADIO_INPUT_STYLE}
                            id={TaskStates.Enum.ToDo}
                            value={TaskStates.Enum.ToDo}
                            {...form.register('state')}
                            onChange={() => formRef.current?.requestSubmit()}
                        />
                        <label className={RADIO_LABEL_STYLE}>Padaryti</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            className={RADIO_INPUT_STYLE}
                            id={TaskStates.Enum.InProgress}
                            value={TaskStates.Enum.InProgress}
                            {...form.register('state')}
                            onChange={() => formRef.current?.requestSubmit()}
                        />
                        <label className={RADIO_LABEL_STYLE}>Vykdoma</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            className={RADIO_INPUT_STYLE}
                            id={TaskStates.Enum.Done}
                            value={TaskStates.Enum.Done}
                            {...form.register('state')}
                            onChange={() => formRef.current?.requestSubmit()}
                        />
                        <label className={RADIO_LABEL_STYLE}>Atlikta</label>
                    </div>
                    <HiddenInput name="projectId" value={projectId} />
                    <HiddenInput name="taskId" value={parsedTaskId} />
                </form>
            </FormProvider>
        </div>
    );
};

export default ChangeTaskStateForm;
