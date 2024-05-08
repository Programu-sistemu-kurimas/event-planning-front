import '@/app/globals.css';

import { Header } from '@/components/header';
import { Red_Hat_Display as FontRedHatDisplay } from 'next/font/google';
import { FunctionComponent, ReactNode } from 'react';
import backgroundImage from '../../public/background.png';

const fontRedHatDisplay = FontRedHatDisplay({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-red-hat-display',
});

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout: FunctionComponent<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en" className={fontRedHatDisplay.className}>
            <head />
            <body suppressHydrationWarning={true}>
                <main
                    className="min-h-screen bg-background text-white"
                    style={{
                        backgroundImage: `url(${backgroundImage.src})`,
                        backgroundSize: 'cover',
                        backgroundAttachment: 'fixed',
                    }}
                >
                    <Header />
                    {children}
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
