import { auth } from '@/auth';
import { Button, Container } from '@/components/common';
import {
    AddWorkerToProjectModal,
    ArchiveProjectModal,
    ChangeProjectNameModal,
    DeleteGuestModal,
    DeleteProjectModal,
    DeleteTaskModal,
    SetWorkerRoleModal,
} from '@/components/modal';
import {
    GuestCreationForm,
    GuestsList,
    ProjectName,
    ProjectPurgeActions,
    WorkersList,
} from '@/components/project';
import { TasksList, QuickTaskCreationForm } from '@/components/task';
import { ModalKeys, ROUTES, Roles } from '@/constants';
import { getModalLink } from '@/lib/modalLink';
import { applyRouteParams } from '@/lib/utils';
import { getGuestsData, getProjectData } from '@/server';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface ProjectPageProps {
    params: {
        id: string;
    };
}

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
                        <ProjectName name={project.projectName} />
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
                            <TasksList tasks={project.tasks} projectId={id} />
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
            <ChangeProjectNameModal />
        </>
    );
};

export default ProjectPage;
