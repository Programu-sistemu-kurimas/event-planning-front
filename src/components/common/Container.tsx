import { cn } from '@/lib/utils';
import { FunctionComponent, ReactNode } from 'react';

interface ContainerProps {
    className?: string;
    children: ReactNode;
}

export const Container: FunctionComponent<ContainerProps> = ({
    className,
    children,
}) => (
    <div className={cn('max-w-7xl w-full mx-auto lg:px-16 px-4', className)}>
        {children}
    </div>
);
