import NextAuth, { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import { API_ROUTES } from '@/constants';
import { apiFetch } from '@/lib/apiFetch';
import { userSchema } from '@/schemas';

// eslint-disable-next-line no-unused-vars
import { JWT } from 'next-auth/jwt';

export const BASE_PATH = '/api/auth';

declare module 'next-auth' {
    // eslint-disable-next-line no-unused-vars
    interface Session {
        accessToken?: string;
    }

    // eslint-disable-next-line no-unused-vars
    interface User {
        token?: string;
    }
}

declare module 'next-auth/jwt' {
    // eslint-disable-next-line no-unused-vars
    interface JWT {
        accessToken?: string;
    }
}

const providers: Provider[] = [
    Credentials({
        name: 'Credentials',
        credentials: {
            email: {
                label: 'Email',
                type: 'text',
            },
            password: {
                label: 'Password',
                type: 'password',
            },
        },
        async authorize(credentials): Promise<User> {
            const res = await apiFetch(API_ROUTES.AUTH.LOGIN, {
                method: 'POST',
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            if (!res.ok) {
                throw new Error('Neteisingi prisijungimo duomenys');
            }

            const user = await res.json();
            const validatedUser = userSchema.safeParse(user);

            if (!validatedUser.success) {
                throw new Error('Klaida grąžinant vartotojo duomenis');
            }

            return {
                id: validatedUser.data.id,
                email: validatedUser.data.email,
                name: validatedUser.data.name,
                token: validatedUser.data.token,
            };
        },
    }),
];

const authOptions: NextAuthConfig = {
    providers,
    callbacks: {
        async jwt({ token, user }) {
            if (user?.token) {
                token.accessToken = user.token;
            }

            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken;

            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    basePath: BASE_PATH,
    secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
