import { EditIcon } from '@/components/icon';
import { ModalKeys } from '@/constants';
import { getModalLink } from '@/lib/modalLink';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface ProjectNameProps {
    name: string;
}

const ProjectName: FunctionComponent<ProjectNameProps> = ({ name }) => {
    return (
        <div className="flex items-center gap-2">
            <h1 className="text-2xl xl:text-4xl font-bold truncate">{name}</h1>
            <Link
                href={getModalLink(ModalKeys.ChangeProjectName, {
                    currentProjectName: name,
                })}
                scroll={false}
            >
                <EditIcon width={24} height={24} />
            </Link>
        </div>
    );
};

export default ProjectName;
