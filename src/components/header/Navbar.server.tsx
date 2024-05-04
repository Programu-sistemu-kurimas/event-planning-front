import { auth } from '@/auth';
import NavbarClient from './Navbar.client';

const Navbar = async () => {
    const session = await auth();

    if (session?.user) {
        session.user = {
            name: session.user.name,
            email: session.user.email,
        };
    }

    return <NavbarClient user={session?.user} />;
};

export default Navbar;
