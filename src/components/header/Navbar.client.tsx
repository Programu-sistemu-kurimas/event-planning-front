'use client';

import { ROUTES } from '@/constants';
import Link from 'next/link';
import { signOut } from '@/lib/auth/helpers';
import { FunctionComponent } from 'react';
import { User } from 'next-auth';

interface NavbarProps {
    user?: User;
}

const baseNavbarItemStyle = 'text-xl xl:text-3xl font-normal hover:underline';

const Navbar: FunctionComponent<NavbarProps> = ({ user }) => {
    return (
        <nav className="flex items-center gap-8">
            {user && (
                <>
                    <ul>
                        <Link
                            href={ROUTES.MY_PROFILE}
                            className={baseNavbarItemStyle}
                        >
                            Mano profilis
                        </Link>
                    </ul>
                    <ul>
                        <Link
                            href={ROUTES.PROJECTS.BASE}
                            className={baseNavbarItemStyle}
                        >
                            Projektai
                        </Link>
                    </ul>
                    <ul>
                        <button
                            className={baseNavbarItemStyle}
                            onClick={async () => {
                                signOut();
                            }}
                        >
                            Atsijungti
                        </button>
                    </ul>
                </>
            )}
            {!user && (
                <ul>
                    <Link
                        href={ROUTES.AUTH.LOGIN}
                        className={baseNavbarItemStyle}
                    >
                        Prisijungti
                    </Link>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
