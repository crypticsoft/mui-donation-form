export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  stories: ['../src/**/*.stories.@(js|mdx)'],
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
