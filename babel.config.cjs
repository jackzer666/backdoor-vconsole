module.exports = {
  plugins: [
    ['@babel/plugin-transform-runtime', {
      corejs: 3,
      helpers: true,
      regenerator: true
    }]
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'ie >= 8',
            'last 2 versions',
            '> 1%'
          ]
        },
        useBuiltIns: false,
        modules: false
      }
    ]
  ]
};