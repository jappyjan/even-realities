import type { Meta, StoryObj } from '@storybook/react-webpack5';

const colorGroups = [
  {
    title: 'Text Colors',
    items: [
      { name: 'tc-highlight', variable: '--color-tc-highlight' },
      { name: 'tc-1', variable: '--color-tc-1' },
      { name: 'tc-2', variable: '--color-tc-2' },
      { name: 'tc-accent', variable: '--color-tc-accent' },
      { name: 'tc-red', variable: '--color-tc-red' },
      { name: 'tc-green', variable: '--color-tc-green' },
    ],
  },
  {
    title: 'Background Colors',
    items: [
      { name: 'bc-highlight', variable: '--color-bc-highlight' },
      { name: 'bc-1', variable: '--color-bc-1' },
      { name: 'bc-2', variable: '--color-bc-2' },
      { name: 'bc-3', variable: '--color-bc-3' },
      { name: 'bc-4', variable: '--color-bc-4' },
      { name: 'bc-accent', variable: '--color-bc-accent' },
    ],
  },
  {
    title: 'Shaded Colors',
    items: [
      { name: 'sc-1', variable: '--color-sc-1' },
      { name: 'sc-2', variable: '--color-sc-2' },
    ],
  },
];

const typography = [
  { name: 'App Title XL', className: 'text-app-title-xl' },
  { name: 'App Title LG', className: 'text-app-title-lg' },
  { name: 'App Title 1', className: 'text-app-title-1' },
  { name: 'App Body 1', className: 'text-app-body-1' },
  { name: 'App Title 2', className: 'text-app-title-2' },
  { name: 'App Body 2', className: 'text-app-body-2' },
  { name: 'App Subtitle', className: 'text-app-subtitle' },
  { name: 'App Detail', className: 'text-app-detail' },
];

const spacing = [0, 8, 12, 16, 20, 24, 28, 32];

const TokensContent = () => (
  <div style={{ display: 'grid', gap: '32px' }}>
    <div style={{ display: 'grid', gap: '8px' }}>
      <h1>Tokens / Guidelines</h1>
      <p>
        Design system tokens for Even OS. This page lists the foundational
        tokens used in the component library, derived from the Figma
        foundations. Use these utilities and variables to keep spacing,
        typography, and color consistent.
      </p>
    </div>

    <section>
      <h2>Colors</h2>
      <div style={{ display: 'grid', gap: '24px', marginTop: '12px' }}>
        {colorGroups.map((group) => (
          <div key={group.title}>
            <h3 style={{ marginBottom: '12px' }}>{group.title}</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {group.items.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr 1fr',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      backgroundColor: `var(${item.variable})`,
                      border: '1px solid var(--color-bc-4)',
                    }}
                  />
                  <code>{item.name}</code>
                  <code>{item.variable}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2>Typography</h2>
      <div
        className="tokens-typography"
        style={{ display: 'grid', gap: '12px', marginTop: '12px' }}
      >
        {typography.map((item) => (
          <div
            key={item.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              alignItems: 'baseline',
              gap: '16px',
            }}
          >
            <code>{item.className}</code>
            <span className={item.className}>
              {item.name} - The quick brown fox jumps over the lazy dog
            </span>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2>Copy/Paste</h2>
      <pre>
        <code>{copyPasteSnippet}</code>
      </pre>
    </section>

    <section>
      <h2>Spacing</h2>
      <div style={{ display: 'grid', gap: '12px', marginTop: '12px' }}>
        {spacing.map((value) => (
          <div
            key={value}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: '16px',
            }}
          >
            <code>{value}px</code>
            <div
              style={{
                width: `var(--space-${value})`,
                height: '16px',
                backgroundColor: 'var(--color-bc-3)',
                borderRadius: '999px',
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '16px', display: 'grid', gap: '8px' }}>
        <div>
          <code>--layout-page-padding</code>:{' '}
          <code>var(--layout-page-padding)</code>
        </div>
        <div>
          <code>--layout-section-gap</code>:{' '}
          <code>var(--layout-section-gap)</code>
        </div>
        <div>
          <code>--layout-card-margin</code>:{' '}
          <code>var(--layout-card-margin)</code>
        </div>
      </div>
    </section>

    <section>
      <h2>Radii</h2>
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
        <div
          className="rounded-sm"
          style={{
            width: '96px',
            height: '96px',
            backgroundColor: 'var(--color-bc-2)',
            border: '1px solid var(--color-bc-4)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <code>sm</code>
        </div>
        <div
          className="rounded-md"
          style={{
            width: '96px',
            height: '96px',
            backgroundColor: 'var(--color-bc-2)',
            border: '1px solid var(--color-bc-4)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <code>md</code>
        </div>
      </div>
    </section>

    <section>
      <h2>Borders</h2>
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
        <div
          className="border"
          style={{
            width: '120px',
            height: '80px',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <code>border</code>
        </div>
        <div
          className="border-2"
          style={{
            width: '120px',
            height: '80px',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <code>border-2</code>
        </div>
      </div>
    </section>

    <section>
      <h2>Shadows</h2>
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
        <div
          className="shadow-1"
          style={{
            width: '140px',
            height: '80px',
            backgroundColor: 'var(--color-bc-1)',
            borderRadius: '12px',
            border: '1px solid var(--color-bc-4)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <code>shadow-1</code>
        </div>
        <div
          className="shadow-2"
          style={{
            width: '140px',
            height: '80px',
            backgroundColor: 'var(--color-bc-1)',
            borderRadius: '12px',
            border: '1px solid var(--color-bc-4)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <code>shadow-2</code>
        </div>
      </div>
    </section>
  </div>
);

const meta = {
  title: 'Foundations/Tokens',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => <TokensContent />,
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const copyPasteSnippet = `<div className="bg-bc-1 text-tc-1">
  <h1 className="text-app-title-xl">Tokens in action</h1>
  <p className="text-app-body-1 text-tc-2">
    Use tokenized classes for consistent UI.
  </p>
  <div className="mt-24 flex gap-12">
    <button className="rounded-sm border px-16 py-12">Primary</button>
    <button className="rounded-sm border-2 px-16 py-12">Secondary</button>
  </div>
</div>`;

export const Overview: Story = {
  render: () => <TokensContent />,
};

export const Docs: Story = {
  parameters: {
    docsOnly: true,
  },
};
