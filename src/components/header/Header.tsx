import Link from 'next/link';
import { Container } from '@/components/common';
import { ROUTES } from '@/constants';
import Navbar from './Navbar.server';

export const Header = () => {
    return (
        <header className="py-14 w-full">
            <Container className="h-12">
                <div className="flex justify-between items-center h-full">
                    <Link
                        href={ROUTES.HOME}
                        className="text-2xl xl:text-4xl font-bold"
                    >
                        Renginių planavimas
                    </Link>
                    <Navbar />
                </div>
            </Container>
        </header>
    );
};
