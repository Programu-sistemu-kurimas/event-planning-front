import { Container } from '@/components/common';
import { FunctionComponent } from 'react';

interface ProjectPageProps {
    params: {
        id: string;
    };
}

const ProjectPage: FunctionComponent<ProjectPageProps> = ({
    params: { id },
}) => {
    return <Container>{id}</Container>;
};

export default ProjectPage;
