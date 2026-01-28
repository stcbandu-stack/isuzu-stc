/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'isuzu-red': '#C8102E',
                'isuzu-dark': '#1a1a2e',
                'isuzu-gray': '#4a4a5a',
            },
            fontFamily: {
                sans: ['Inter', 'Noto Sans Thai', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
