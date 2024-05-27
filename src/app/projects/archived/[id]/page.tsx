import { Button, Container } from '@/components/common';
import { UnarchiveProjectModal } from '@/components/modal';

import { GuestsList, WorkersList } from '@/components/project';
import { TasksList } from '@/components/task';
import { ModalKeys } from '@/constants';
import { getModalLink } from '@/lib/modalLink';
import { getGuestsData, getProjectData } from '@/server';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface ProjectPageProps {
    params: {
        id: string;
    };
}

const ArchivedProjectPage: FunctionComponent<ProjectPageProps> = async ({
    params: { id },
}) => {
    const projectData = getProjectData(id);
    const guestData = getGuestsData(id);

    const [project, guests] = await Promise.all([projectData, guestData]);

    return (
        <>
            <Container className="pb-16">
                <div className="flex flex-col gap-16">
                    <div className="flex justify-between items-center gap-56">
                        <h1 className="text-2xl xl:text-4xl font-bold truncate">
                            {project.projectName}
                        </h1>
                        <Link
                            href={getModalLink(ModalKeys.UnarchiveProject)}
                            scroll={false}
                        >
                            <Button size="sm" variant="darkGreen">
                                Atkurti
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-16">
                        <div className="flex flex-col gap-8">
                            <WorkersList
                                workers={project.workers}
                                isEditable={false}
                            />
                        </div>
                        <div className="flex flex-col gap-8">
                            <TasksList
                                tasks={project.tasks}
                                projectId={id}
                                isLink={false}
                                isEditable={false}
                            />
                        </div>
                        <div className="flex flex-col gap-8">
                            <GuestsList guests={guests} isEditable={false} />
                        </div>
                    </div>
                </div>
            </Container>
            <UnarchiveProjectModal />
        </>
    );
};

export default ArchivedProjectPage;
