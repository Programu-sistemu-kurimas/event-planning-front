import { Container } from '@/components/common/Container';
import { FunctionComponent, ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
    return (
        <Container>
            <div className="flex justify-center mt-24 w-full">{children}</div>
        </Container>
    );
};

export default AuthLayout;
