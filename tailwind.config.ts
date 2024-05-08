import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        extend: {
            colors: {
                background: '#33334D',
                primary: '#CEB0B0',
                secondary: '#6D5C6A',
                secondaryLight: '#D9D9D9',
                success: '#8ACEA9',
                error: '#B00020',
            },
        },
    },
} satisfies Config;

export default config;
