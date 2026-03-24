module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          },
          useBuiltIns: 'entry',
          corejs: 3
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-class-properties',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src'
          }
        }
      ]
    ]
  }
}
