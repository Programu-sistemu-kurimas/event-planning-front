import '@/app/globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { FunctionComponent, ReactNode } from 'react';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <head />
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
