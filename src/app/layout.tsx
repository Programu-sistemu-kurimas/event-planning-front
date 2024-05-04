import '@/app/globals.css';
import { Header } from '@/components/header';

import { Inter as FontInter } from 'next/font/google';
import { FunctionComponent, ReactNode } from 'react';

const fontInter = FontInter({
    subsets: ['latin'],
    variable: '--font-inter',
});

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en" className={fontInter.className}>
            <head />
            <body suppressHydrationWarning={true}>
                <main className="min-h-screen">
                    <Header />
                    {children}
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
