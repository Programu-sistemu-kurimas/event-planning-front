import { Container } from '@/components/common';
import { WorkersList } from '@/components/project';
import { API_ROUTES } from '@/constants';
import { apiFetch } from '@/lib/apiFetch';
import { detailedProjectSchema } from '@/schemas';
import { FunctionComponent } from 'react';

interface ProjectPageProps {
    params: {
        id: string;
    };
}

const ProjectPage: FunctionComponent<ProjectPageProps> = async ({
    params: { id },
}) => {
    const res = await apiFetch(`${API_ROUTES.PROJECT.GET_BY_ID}/${id}`);

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
        <Container>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl xl:text-4xl font-bold">
                    {project.projectName}
                </h1>
                <WorkersList workers={project.workers} />
            </div>
        </Container>
    );
};

export default ProjectPage;
