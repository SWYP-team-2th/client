const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        h1: [
          '32px',
          { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: 'bold' },
        ],
        h2: [
          '28px',
          { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: 'bold' },
        ],
        h3: [
          '24px',
          { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: 'bold' },
        ],
        tl: [
          '22px',
          { lineHeight: '1.36', letterSpacing: '-0.02em', fontWeight: 'bold' },
        ],
        tm: [
          '20px',
          { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' },
        ],
        ts: [
          '18px',
          { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' },
        ],
        body_1_long: ['16px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        body_1_normal: [
          '16px',
          { lineHeight: '1.25', letterSpacing: '-0.01em' },
        ],
        body_2_long: [
          '14px',
          { lineHeight: '1.25', letterSpacing: '-0.005em' },
        ],
        body_2_normal: [
          '14px',
          { lineHeight: '1.2', letterSpacing: '-0.005em' },
        ],
        caption: ['12px', { lineHeight: '1.28', letterSpacing: '0.005em' }],
        label_1: [
          '14px',
          { lineHeight: '1.25', letterSpacing: '0.005em', fontWeight: 'bold' },
        ],
        label_2: [
          '12px',
          { lineHeight: '1.3', letterSpacing: '0.005em', fontWeight: 'bold' },
        ],
      },
    },
  },
  plugins: [],
};
