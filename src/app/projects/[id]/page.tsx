import { auth } from '@/auth';
import { Button, Container } from '@/components/common';
import {
    AddWorkerToProjectModal,
    ArchiveProjectModal,
    DeleteGuestModal,
    DeleteProjectModal,
    DeleteTaskModal,
    SetWorkerRoleModal,
} from '@/components/modal';
import {
    GuestCreationForm,
    GuestsList,
    ProjectPurgeActions,
    WorkersList,
} from '@/components/project';
import { TasksList, QuickTaskCreationForm } from '@/components/task';
import { API_ROUTES, ModalKeys, ROUTES, Roles } from '@/constants';
import { apiFetch } from '@/lib/apiFetch';
import { getModalLink } from '@/lib/modalLink';
import { applyRouteParams } from '@/lib/utils';
import { detailedProjectSchema, guestsSchema } from '@/schemas';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface ProjectPageProps {
    params: {
        id: string;
    };
}

const getProjectData = async (id: string) => {
    const res = await apiFetch(
        applyRouteParams(API_ROUTES.PROJECT.GET_BY_ID, {
            id,
        })
    );

    if (!res.ok) {
        throw new Error('Klaida gaunant projekto informaciją');
    }

    const data = await res.json();
    const validatedData = detailedProjectSchema.safeParse(data);

    if (!validatedData.success) {
        throw new Error('Klaida nuskaitant projekto duomenis');
    }

    return validatedData.data;
};

const getGuestsData = async (id: string) => {
    const res = await apiFetch(
        applyRouteParams(API_ROUTES.PROJECT.GUESTS, {
            id,
        })
    );

    if (!res.ok) {
        throw new Error('Klaida gaunant projekto svečius');
    }

    const data = await res.json();
    const validatedData = guestsSchema.safeParse(data);

    if (!validatedData.success) {
        throw new Error('Klaida nuskaitant projekto svečius');
    }

    return validatedData.data;
};

const ProjectPage: FunctionComponent<ProjectPageProps> = async ({
    params: { id },
}) => {
    const projectData = getProjectData(id);
    const guestData = getGuestsData(id);

    const [project, guests] = await Promise.all([projectData, guestData]);

    const session = await auth();

    const isOwner =
        project.workers.find((worker) => worker.email === session?.user?.email)
            ?.role === Roles.Enum.Owner;

    return (
        <>
            <Container className="pb-16">
                <div className="flex flex-col gap-16">
                    <div className="flex justify-between items-center gap-56">
                        <h1 className="text-2xl xl:text-4xl font-bold truncate">
                            {project.projectName}
                        </h1>
                        {isOwner && <ProjectPurgeActions />}
                    </div>
                    <div className="flex flex-col gap-16">
                        <div className="flex flex-col gap-8">
                            <WorkersList workers={project.workers} />
                            <Link
                                href={getModalLink(
                                    ModalKeys.AddWorkerToProject
                                )}
                                scroll={false}
                            >
                                <Button
                                    className="self-start"
                                    variant="secondary"
                                >
                                    Pridėti darbuotoją
                                </Button>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-8">
                            <TasksList tasks={project.tasks} />
                            <QuickTaskCreationForm />
                            <Link
                                href={applyRouteParams(
                                    ROUTES.PROJECTS.CREATE_TASK,
                                    {
                                        id,
                                    }
                                )}
                            >
                                <Button
                                    className="self-start"
                                    variant="secondary"
                                >
                                    Sukurti užduotį
                                </Button>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-8">
                            <GuestsList guests={guests} />
                            <GuestCreationForm />
                        </div>
                    </div>
                </div>
            </Container>
            <AddWorkerToProjectModal />
            <SetWorkerRoleModal />
            <DeleteProjectModal />
            <ArchiveProjectModal />
            <DeleteTaskModal />
            <DeleteGuestModal />
        </>
    );
};

export default ProjectPage;
