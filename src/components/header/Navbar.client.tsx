'use client';

import { Button } from '@/components/common/Button';
import { ROUTES } from '@/constants';
import Link from 'next/link';
import { signOut } from '@/lib/auth/helpers';
import { FunctionComponent } from 'react';
import { User } from 'next-auth';

interface NavbarProps {
    user?: User;
}

const Navbar: FunctionComponent<NavbarProps> = ({ user }) => {
    return (
        <nav className="flex items-center gap-4">
            {user && (
                <ul>
                    <Button
                        variant="link"
                        onClick={async () => {
                            signOut();
                        }}
                    >
                        Log out
                    </Button>
                </ul>
            )}
            {!user && (
                <>
                    <ul>
                        <Button asChild variant="link">
                            <Link href={ROUTES.AUTH.LOGIN}>Login</Link>
                        </Button>
                    </ul>
                    <ul>
                        <Button asChild variant="link">
                            <Link href={ROUTES.AUTH.REGISTER}>Register</Link>
                        </Button>
                    </ul>
                </>
            )}
        </nav>
    );
};

export default Navbar;
