import { auth } from '@/auth';
import { Button, Container } from '@/components/common';
import {
    AddWorkerToProjectModal,
    ArchiveProjectModal,
    ChangeProjectNameModal,
    DeleteGuestModal,
    DeleteProjectModal,
    DeleteTaskModal,
    RemoveWorkerFromProjectModal,
    SetWorkerRoleModal,
} from '@/components/modal';
import {
    GuestCreationForm,
    GuestsList,
    ProjectName,
    ProjectPurgeActions,
    WorkerManagementActions,
    WorkersList,
} from '@/components/project';
import { TasksList, QuickTaskCreationForm } from '@/components/task';
import { ROUTES } from '@/constants';
import { applyRouteParams, isAdmin, isOwner } from '@/lib/utils';
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

    const loggedInWorker = project.workers.find(
        (worker) => worker.email === session?.user?.email
    );

    const isUserOwner = Boolean(loggedInWorker && isOwner(loggedInWorker.role));
    const isUserAdmin = Boolean(loggedInWorker && isAdmin(loggedInWorker.role));

    return (
        <>
            <Container className="pb-16">
                <div className="flex flex-col gap-16">
                    <div className="flex justify-between items-center gap-56">
                        <ProjectName
                            name={project.projectName}
                            isEditable={isUserOwner || isUserAdmin}
                        />
                        {isUserOwner && <ProjectPurgeActions />}
                    </div>
                    <div className="flex flex-col gap-16">
                        <div className="flex flex-col gap-8">
                            <WorkersList
                                workers={project.workers}
                                isEditable={isUserAdmin || isUserOwner}
                            />
                            {(isUserOwner || isUserAdmin) && (
                                <WorkerManagementActions />
                            )}
                        </div>
                        <div className="flex flex-col gap-8">
                            <TasksList
                                tasks={project.tasks}
                                projectId={id}
                                isEditable={isUserAdmin || isUserOwner}
                            />
                            {(isUserAdmin || isUserOwner) && (
                                <>
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
                                </>
                            )}
                        </div>
                        <div className="flex flex-col gap-8">
                            <GuestsList
                                guests={guests}
                                isEditable={isUserAdmin || isUserOwner}
                            />
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
            <RemoveWorkerFromProjectModal />
        </>
    );
};

export default ProjectPage;
