import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./**/*.{js,ts}",],
    theme: {
        extend: {
            keyframes: {
                'slide-up-enter': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-down-enter': {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-up-exit': {
                    '0%': { transform: 'translateY(0)', opacity: '1' },
                    '100%': { transform: 'translateY(-20px)', opacity: '0' },
                },
                'slide-down-exit': {
                    '0%': { transform: 'translateY(0)', opacity: '1' },
                    '100%': { transform: 'translateY(20px)', opacity: '0' },
                },
                'fade-out': {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(-10px)' },
                },
                'opacity-enter': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'opacity-exit': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                }
            },
            animation: {
                'slide-up-enter': 'slide-up-enter 150ms ease-out forwards',
                'slide-down-enter': 'slide-down-enter 150ms ease-in forwards',
                'slide-up-exit': 'slide-up-exit 150ms ease-in forwards',
                'slide-down-exit': 'slide-down-exit 150ms ease-in forwards',
                'fade-out': 'fade-out 10ms ease-in forwards',
                'opacity-enter': 'opacity-enter 100ms ease-in forwards',
                'opacity-exit': 'opacity-exit 100ms ease-out forwards'
            }
        },
        fontFamily: {
            'sans': ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
        }
    },
    plugins: [],
};

export default config;
