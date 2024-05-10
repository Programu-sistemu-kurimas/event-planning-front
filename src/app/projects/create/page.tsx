import { Container } from '@/components/common';
import { CreateProjectForm } from '@/components/project';

const ProjectCreationPage = () => {
    return (
        <Container>
            <div className="flex flex-col mt-24 gap-12">
                <h1 className="text-2xl xl:text-4xl font-bold">
                    Naujo projekto kūrimas
                </h1>
                <CreateProjectForm />
            </div>
        </Container>
    );
};

export default ProjectCreationPage;
