import { Button, Container } from '@/components/common';
import { API_ROUTES, ROUTES } from '@/constants';
import { apiFetch } from '@/lib/apiFetch';
import { projectsSchema } from '@/schemas';
import Link from 'next/link';

const ProjectsPage = async () => {
    const res = await apiFetch(API_ROUTES.USER.PROJECTS);

    if (!res.ok) {
        throw new Error('Klaida gaunant projektus');
    }

    const data = await res.json();
    const validatedData = projectsSchema.safeParse(data);

    if (!validatedData.success) {
        throw new Error('Klaida nuskaitant projektų duomenimis');
    }

    const projects = validatedData.data;

    return (
        <Container>
            <div className="flex flex-col gap-32 mt-24">
                <div className="flex flex-col gap-10">
                    <h1 className="text-2xl xl:text-4xl font-bold">
                        Jūsų valdomi projektai:
                    </h1>
                    <ul className="flex flex-col items-start gap-3 h-56 overflow-y-auto overflow-x-hidden">
                        {projects.map(({ projectId, name }) => (
                            <li
                                key={`project-${projectId}`}
                                className="text-xl xl:text-3xl hover:underline"
                            >
                                <Link
                                    href={`${ROUTES.PROJECTS.BASE}/${projectId}`}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link href={ROUTES.PROJECTS.CREATE}>
                    <Button variant="secondary" className="w-full sm:w-auto">
                        Sukurti naują projektą
                    </Button>
                </Link>
            </div>
        </Container>
    );
};

export default ProjectsPage;
