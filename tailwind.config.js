/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    950: '#07090E',
                    900: '#0B0F17',
                    850: '#101623',
                    800: '#161F30',
                    700: '#222F47',
                    600: '#334466',
                },
                brand: {
                    50: '#EEF2FF',
                    100: '#E0E7FF',
                    200: '#C7D2FE',
                    300: '#A5B4FC',
                    400: '#818CF8',
                    500: '#6366F1',
                    600: '#4F46E5',
                    700: '#4338CA',
                    accent: '#8B5CF6',
                },
                gold: {
                    400: '#FBBF24',
                    500: '#F59E0B',
                    600: '#D97706',
                },
                coral: {
                    500: '#F43F5E',
                },
                mint: {
                    500: '#10B981',
                },
                cyan: {
                    500: '#06B6D4',
                },
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'glow-brand': '0 0 25px -5px rgba(99, 102, 241, 0.35)',
                'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
                'glow-mint': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
                'glow-coral': '0 0 25px -5px rgba(244, 63, 94, 0.35)',
                'card': '0 8px 30px rgba(0, 0, 0, 0.35)',
            },
            animation: {
                'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'progress': 'progress 1.5s ease-in-out infinite',
            },
            keyframes: {
                pulseSubtle: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.6 },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                progress: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(250%)' },
                },
            },
        },
    },
    plugins: [],
}