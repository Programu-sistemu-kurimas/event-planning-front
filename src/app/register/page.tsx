import { RegisterForm } from '@/components/auth';
import { Container } from '@/components/common';
import { ROUTES } from '@/constants';
import Link from 'next/link';

const RegisterPage = async () => {
    return (
        <Container className="flex items-center flex-col gap-16 text-5xl">
            <h1>Registracija</h1>
            <div className="flex flex-col gap-4 items-center">
                <RegisterForm />
                <p className="text-xl">
                    Jau turite paskyrą?{' '}
                    <Link
                        href={ROUTES.AUTH.LOGIN}
                        className="hover:underline font-bold"
                    >
                        Prisijunkite
                    </Link>
                </p>
            </div>
        </Container>
    );
};

export default RegisterPage;
