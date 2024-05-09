import { Button, Container } from '@/components/common';
import { ROUTES } from '@/constants';
import Link from 'next/link';

const ProjectsPage = () => {
    // TODO: replace hardcoded projects
    const projects = [
        {
            name: '1 projektas',
            id: '23232312',
        },
        {
            name: '2 projektas',
            id: '2312311',
        },
    ];

    return (
        <Container>
            <div className="flex flex-col gap-32 mt-24">
                <div className="flex flex-col gap-10">
                    <h1 className="text-2xl xl:text-4xl font-bold">
                        Jūsų valdomi projektai:
                    </h1>
                    <ul className="flex flex-col gap-3">
                        {projects.map((project) => (
                            <li
                                key={`project-${project.id}`}
                                className="text-xl xl:text-3xl hover:underline"
                            >
                                <Link
                                    href={`${ROUTES.PROJECTS.BASE}/${project.id}`}
                                >
                                    {project.name}
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
