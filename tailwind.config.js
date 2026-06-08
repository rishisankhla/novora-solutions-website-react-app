/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '88rem',
        prose: '65ch',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        ink: {
          DEFAULT: '#0f172a',
          muted: '#475569',
          subtle: '#64748b',
          faint: '#94a3b8',
        },
        surface: {
          DEFAULT: '#ffffff',
          soft: '#f8fafc',
          muted: '#f1f5f9',
          border: '#e2e8f0',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)',
        card: '0 1px 1px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.06)',
        elevated: '0 4px 6px rgba(15, 23, 42, 0.04), 0 20px 48px rgba(15, 23, 42, 0.1)',
        glow: '0 0 0 1px rgba(37, 99, 235, 0.08), 0 20px 40px rgba(37, 99, 235, 0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'mesh-hero':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.18), transparent), radial-gradient(ellipse 50% 40% at 100% 0%, rgba(99,102,241,0.12), transparent), radial-gradient(ellipse 40% 30% at 0% 100%, rgba(59,130,246,0.08), transparent)',
        'mesh-dark':
          'radial-gradient(ellipse 60% 50% at 20% 0%, rgba(59,130,246,0.25), transparent), radial-gradient(ellipse 50% 40% at 80% 100%, rgba(99,102,241,0.15), transparent)',
      },
    },
  },
  plugins: [],
};
