import { LoginForm } from '@/components/auth';
import { Container } from '@/components/common';
import { ROUTES } from '@/constants';
import Link from 'next/link';

const LoginPage = () => {
    return (
        <Container className="flex items-center flex-col gap-32 text-5xl">
            <h1>Prisijungimas</h1>
            <div className="flex flex-col gap-4 items-center">
                <LoginForm />
                <p className="text-xl">
                    Dar neturite paskyros?{' '}
                    <Link
                        href={ROUTES.AUTH.REGISTER}
                        className="hover:underline font-bold"
                    >
                        Užsiregistruokite
                    </Link>
                </p>
            </div>
        </Container>
    );
};

export default LoginPage;
