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
                'fade-out': {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(-10px)' },
                },
            },
            animation: {
                'slide-up-enter': 'slide-up-enter 150ms ease-out forwards',
                'slide-down-exit': 'slide-down-enter 150ms ease-in backwards',
                'slide-up-exit': 'slide-up-enter 150ms ease-out backwards',
                'slide-down-enter': 'slide-down-enter 150ms ease-in forwards',
                'fade-out': 'fadeOut 10ms ease-in forwards',
            }
        },
    },
    plugins: [],
};

export default config;
