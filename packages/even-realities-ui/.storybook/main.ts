import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.stories.@(ts|tsx)', '../src/lib/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    if (!config.module) return config;
    config.module.rules = config.module.rules ?? [];
    const libraryPath = path.resolve(__dirname, '../src/lib');
    const cssRule = {
      test: /\.css$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: { importLoaders: 1 },
        },
        require.resolve('postcss-loader'),
      ],
      include: [libraryPath],
    };
    config.module.rules.push({
      test: /\.[tj]sx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              require.resolve('@nx/react/babel'),
              require.resolve('@babel/preset-typescript'),
            ],
          },
        },
      ],
    });
    const oneOfRule = config.module.rules.find(
      (rule) => typeof rule === 'object' && Array.isArray(rule.oneOf)
    ) as { oneOf?: unknown[] } | undefined;

    if (oneOfRule?.oneOf) {
      oneOfRule.oneOf.unshift(cssRule);
    }
    config.module.rules.unshift(cssRule);
    config.module.rules = config.module.rules.map((rule) => {
      if (rule === cssRule) return rule;
      if (
        typeof rule === 'object' &&
        rule?.test instanceof RegExp &&
        rule.test.test('.css')
      ) {
        const existingExclude = Array.isArray(rule.exclude)
          ? rule.exclude
          : rule.exclude
            ? [rule.exclude]
            : [];
        return {
          ...rule,
          exclude: [...existingExclude, libraryPath],
        };
      }
      return rule;
    });
    return config;
  },
};

export default config;
