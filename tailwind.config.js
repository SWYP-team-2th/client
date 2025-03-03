export const content = ['./src/**/*.{html,js,ts,jsx,tsx}'];
export const theme = {
  screens: {
    desktop: '480px',
  },
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
      'title-large': [
        '22px',
        { lineHeight: '1.36', letterSpacing: '-0.02em', fontWeight: 'bold' },
      ],
      'title-medium': [
        '20px',
        { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' },
      ],
      'title-small-1': [
        '18px',
        { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' },
      ],
      'title-small-2': [
        '18px',
        { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '400' },
      ],
      'title-x-small': [
        '16px',
        { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' },
      ],
      'body-1-long': [
        '16px',
        { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '400' },
      ],
      'body-1-normal': [
        '16px',
        { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '500' },
      ],
      'body-2-long': [
        '14px',
        { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '400' },
      ],
      'body-2-normal': [
        '14px',
        { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' },
      ],
      caption: [
        '12px',
        { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '400' },
      ],
      'label-large': [
        '16px',
        { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: 'bold' },
      ],
      'label-medium': [
        '14px',
        { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: 'bold' },
      ],
      'label-small': [
        '12px',
        { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: 'bold' },
      ],
      'label-x-small-1': [
        '11px',
        { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: 'bold' },
      ],
      'label-x-small-2': [
        '11px',
        { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '400' },
      ],
    },
  },
};
