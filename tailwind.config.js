const defaultTheme = require('tailwindcss/defaultTheme');

export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

    theme: {
        extend: {
            colors: {
                blue: {
                    bg1: '#011326',
                    bg2: '#002952',
                    midnight: '#00141e',
                    twilight: '#032846',
                    basic: '#002f60',
                    medium: '#006299',
                    light: '#15b0d0',
                    active: '#22d2e6',
                    highlight: '#26e9ff',
                    'xxx-22': '#1f3039',
                    'xxx-24': '#04223e',
                    'xxx-45': '#1f4873',
                    'xxx-56': '#54718e',
                },
                green: {
                    success: '#62ff98',
                },
                red: {
                    alert: '#ff6262',
                },
                gray: 'rgba(255, 255, 255, 0.5)',
                'gray-90': '#e6e6e6',
                white: '#ffffff',
            },

            fontFamily: {
                sans: ['Titillium Web', ...defaultTheme.fontFamily.sans],
            },
        },
    },
};
