import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { ROUTES } from './constants';

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const PUBLIC_ROUTES = [ROUTES.ABOUT_PAGE];
const NOT_AUTHORIZED_ONLY_ROUTES = [
    ROUTES.HOME,
    ROUTES.AUTH.LOGIN,
    ROUTES.AUTH.REGISTER,
];

export default auth((req) => {
    const reqUrl = new URL(req.url);

    if (
        !req.auth &&
        !PUBLIC_ROUTES.includes(reqUrl.pathname) &&
        !NOT_AUTHORIZED_ONLY_ROUTES.includes(reqUrl.pathname)
    ) {
        return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, reqUrl));
    }

    if (req.auth && NOT_AUTHORIZED_ONLY_ROUTES.includes(reqUrl.pathname)) {
        return NextResponse.redirect(new URL(ROUTES.PROJECTS.BASE, reqUrl));
    }
});
