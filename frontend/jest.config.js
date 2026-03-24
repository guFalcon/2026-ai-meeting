module.exports = {
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  testEnvironment: 'jsdom',

  // ✅ Ensure Jest transpiles Vue, Vuetify, Axios, and Chroma.js
  transformIgnorePatterns: ['/node_modules/(?!axios|vuetify|chroma-js)'],

  // ✅ Explicitly map TypeScript files when imported in Vue components
  moduleNameMapper: {
    '^@/(.*)\\.ts$': '<rootDir>/src/$1.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vuetify/lib/util/colors$': '<rootDir>/mocks/empty.js',
    '^vuetify/dist/vuetify.min.css$': '<rootDir>/mocks/empty.css',
    '^material-design-icons-iconfont/dist/material-design-icons.css$':
      '<rootDir>/mocks/empty.css',
    '^vue-cli-plugin-vuetify-preset-basil/preset$': '<rootDir>/mocks/empty.js'
  },

  // ✅ Ensure Jest searches `src/` when resolving modules
  moduleDirectories: ['node_modules', 'src']
}
