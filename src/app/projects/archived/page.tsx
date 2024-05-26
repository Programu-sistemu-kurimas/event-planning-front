import { Container } from '@/components/common';
import { ROUTES } from '@/constants';
import { applyRouteParams } from '@/lib/utils';
import { getArchivedProjectsData } from '@/server';
import Link from 'next/link';

const ArchivedProjectsPage = async () => {
    const archivedProjects = await getArchivedProjectsData();

    return (
        <Container>
            <div className="flex flex-col gap-32 mt-24">
                <div className="flex flex-col gap-10">
                    <h1 className="text-2xl xl:text-4xl font-bold">
                        Jūsų archyvuoti projektai:
                    </h1>
                    <ul className="flex flex-col items-start gap-3 h-56 overflow-y-auto overflow-x-hidden">
                        {archivedProjects.map(({ projectId, name }) => (
                            <li
                                key={`archived-project-${projectId}`}
                                className="text-xl xl:text-3xl hover:underline"
                            >
                                <Link
                                    href={applyRouteParams(
                                        ROUTES.PROJECTS.SINGLE_ARCHIVED_PROJECT,
                                        {
                                            id: projectId,
                                        }
                                    )}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default ArchivedProjectsPage;
