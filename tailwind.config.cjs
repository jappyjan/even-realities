module.exports = {
  content: [
    './packages/**/src/**/*.{ts,tsx,mdx}',
    './packages/**/.storybook/**/*.{ts,tsx}',
  ],
  safelist: [
    'text-app-title-xl',
    'text-app-title-lg',
    'text-app-title-1',
    'text-app-body-1',
    'text-app-title-2',
    'text-app-body-2',
    'text-app-subtitle',
    'text-app-detail',
    'text-tc-highlight',
    'text-tc-highlight-pressed',
    'text-tc-red',
    'text-tc-red-muted',
    'text-tc-1',
    'text-tc-2',
    'bg-bc-1',
    'bg-bc-2',
    'bg-bc-3',
    'bg-bc-highlight',
    'bg-bc-accent',
    'bg-bc-accent-pressed',
    'bg-bc-accent-muted',
  ],
  theme: {
    extend: {
      colors: {
        tc: {
          highlight: 'var(--color-tc-highlight)',
          'highlight-pressed': 'var(--color-tc-highlight-pressed)',
          1: 'var(--color-tc-1)',
          2: 'var(--color-tc-2)',
          accent: 'var(--color-tc-accent)',
          red: 'var(--color-tc-red)',
          'red-muted': 'var(--color-tc-red-muted)',
          green: 'var(--color-tc-green)',
        },
        bc: {
          highlight: 'var(--color-bc-highlight)',
          1: 'var(--color-bc-1)',
          2: 'var(--color-bc-2)',
          3: 'var(--color-bc-3)',
          4: 'var(--color-bc-4)',
          accent: 'var(--color-bc-accent)',
          'accent-pressed': 'var(--color-bc-accent-pressed)',
          'accent-muted': 'var(--color-bc-accent-muted)',
        },
        sc: {
          1: 'var(--color-sc-1)',
          2: 'var(--color-sc-2)',
        },
      },
      fontFamily: {
        sans: ['var(--font-family-sans)'],
      },
      fontWeight: {
        light: 'var(--font-weight-light)',
        regular: 'var(--font-weight-regular)',
      },
      fontSize: {
        'app-title-xl': [
          'var(--font-size-app-title-xl)',
          {
            lineHeight: 'normal',
            letterSpacing: 'var(--letter-spacing-tight)',
            fontWeight: 'var(--font-weight-regular)',
          },
        ],
        'app-title-lg': [
          'var(--font-size-app-title-lg)',
          {
            lineHeight: 'normal',
            letterSpacing: 'var(--letter-spacing-tight)',
            fontWeight: 'var(--font-weight-regular)',
          },
        ],
        'app-title-1': [
          'var(--font-size-app-title-1)',
          {
            lineHeight: 'normal',
            letterSpacing: 'var(--letter-spacing-tight)',
            fontWeight: 'var(--font-weight-regular)',
          },
        ],
        'app-body-1': [
          'var(--font-size-app-body-1)',
          {
            lineHeight: 'normal',
            letterSpacing: 'var(--letter-spacing-tight)',
            fontWeight: 'var(--font-weight-light)',
          },
        ],
        'app-title-2': [
          'var(--font-size-app-title-2)',
          {
            lineHeight: 'normal',
            letterSpacing: 'var(--letter-spacing-tight)',
            fontWeight: 'var(--font-weight-regular)',
          },
        ],
        'app-body-2': [
          'var(--font-size-app-body-2)',
          {
            lineHeight: 'normal',
            letterSpacing: 'var(--letter-spacing-tight)',
            fontWeight: 'var(--font-weight-light)',
          },
        ],
        'app-subtitle': [
          'var(--font-size-app-subtitle)',
          {
            lineHeight: 'normal',
            letterSpacing: 'var(--letter-spacing-tight)',
            fontWeight: 'var(--font-weight-regular)',
          },
        ],
        'app-detail': [
          'var(--font-size-app-detail)',
          {
            lineHeight: 'normal',
            letterSpacing: 'var(--letter-spacing-tight)',
            fontWeight: 'var(--font-weight-regular)',
          },
        ],
      },
      spacing: {
        0: 'var(--space-0)',
        8: 'var(--space-8)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        28: 'var(--space-28)',
        32: 'var(--space-32)',
        'layout-page': 'var(--layout-page-padding)',
        'layout-section': 'var(--layout-section-gap)',
        'layout-card': 'var(--layout-card-margin)',
      },
      gap: {
        8: 'var(--space-8)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        28: 'var(--space-28)',
        32: 'var(--space-32)',
        'layout-section': 'var(--layout-section-gap)',
      },
      letterSpacing: {
        tight: 'var(--letter-spacing-tight)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
      },
      borderWidth: {
        1: 'var(--border-width-1)',
        2: 'var(--border-width-2)',
      },
      boxShadow: {
        1: 'var(--shadow-1)',
        2: 'var(--shadow-2)',
      },
    },
  },
  plugins: [],
};
