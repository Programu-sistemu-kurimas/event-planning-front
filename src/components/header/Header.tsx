import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { ROUTES } from '@/constants';
import Navbar from './Navbar.server';

export const Header = () => {
    return (
        <header className="h-16 w-full">
            <Container className="h-full">
                <div className="flex justify-between items-center h-full">
                    <Link href={ROUTES.HOME} className="text-lg">
                        Event planner app
                    </Link>
                    <Navbar />
                </div>
            </Container>
        </header>
    );
};
