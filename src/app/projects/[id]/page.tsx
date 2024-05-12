import { Button, Container } from '@/components/common';
import {
    AddWorkerToProjectModal,
    SetWorkerRoleModal,
} from '@/components/modal';
import { WorkersList } from '@/components/project';
import { API_ROUTES, ModalKeys } from '@/constants';
import { apiFetch } from '@/lib/apiFetch';
import { getModalLink } from '@/lib/modalLink';
import { detailedProjectSchema } from '@/schemas';
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
    const res = await apiFetch(`${API_ROUTES.PROJECT.BASE}/${id}`);

    if (!res.ok) {
        throw new Error('Klaida gaunant projekto informaciją');
    }

    const data = await res.json();
    const validatedData = detailedProjectSchema.safeParse(data);

    if (!validatedData.success) {
        throw new Error('Klaida nuskaitant projekto duomenis');
    }

    const project = validatedData.data;

    return (
        <>
            <Container>
                <div className="flex flex-col gap-8">
                    <h1 className="text-2xl xl:text-4xl font-bold">
                        {project.projectName}
                    </h1>
                    <div className="flex flex-col gap-32">
                        <WorkersList workers={project.workers} />
                        <Link href={getModalLink(ModalKeys.AddWorkerToProject)}>
                            <Button className="self-start" variant="secondary">
                                Pridėti darbuotoją
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
            <AddWorkerToProjectModal />
            <SetWorkerRoleModal />
        </>
    );
};

export default ProjectPage;
