# CMS-gui

## Project setup

```
npm install
```

##### Compiles and hot-reloads for development

```
npm run serve
```

##### Compiles and minifies for production

```
npm run build
```

##### Lints and fixes files

```
npm run lint
```

### List of installed packages and their respective versions

```bash
npm list
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Runtime Environment Configuration

Webpack, or any other packer for that matter, minifies and packs files while compiling.
That is somewhat troublesome if you'd like to load configuration AFTER compiling (remember that the build-step is done BEFORE deploying and that it makes no sense to bake the configuration into the image for every deployment, since you'd have to change images...).

# Installation as of 2022-07

This project runs on NodeJS v14.15.0 and we cannot update it.
So chances are that you already have some newer version of NodeJS installed on your development machine.
To be able to switch between NodeJS versions you'll have to install a manager like [NVM (Node Version Manager)](https://github.com/coreybutler/nvm-windows).
Install that and restart all your IDEs, since they hold consoles that were started before you've installed the new program.
Then you can then enter your installation directory (of this project) and type:

```bash
# Install node v18.20.4
nvm install 18.20.4
# Get the list of installed NodeJS versions.
nvm list
# Switch the current NodeJS version to a particular one
nvm use 18
# When you want to run the other version, you can switch to that any time in a similar way.

# Install npm v8.3.0
npm install
npm install -g npm@8.3.0
npm install vue@2.6.14
npm install @vue/cli
npm install -D jest
npm install -D jest-environment-jsdom
npm install sass@1.32

# jest - retry often. Don't know how many of those are required :)
npm i -D jest@17.5.1
npm i -D ts-jest@27.1.5
npm i -D @types/jest@27.5.1
npm i -D babel-jest@29.6.2
npm i -D babel-plugin-module-resolver@5.0.0
npm i -D @babel/plugin-proposal-nullish-coalescing-operator@7.18.6
npm i -D @babel/plugin-proposal-optional-chaining@7.21.0
npm i -D google-charts

# npm install vue-template-complier@2.6.14
npm install typeface-roboto

# Run it
npm run serve

# here are the versions of a running system, for reference:
PS C:\source\js\js-cms-gui> npm list
cms-gui@0.10.3 C:\source\js\js-cms-gui
├── @babel/cli@7.24.8
├── @babel/core@7.25.2
├── @babel/plugin-proposal-class-properties@7.18.6
├── @babel/plugin-proposal-nullish-coalescing-operator@7.18.6
├── @babel/plugin-proposal-optional-chaining@7.21.0
├── @babel/plugin-proposal-private-methods@7.18.6
├── @babel/polyfill@7.12.1
├── @babel/preset-env@7.25.4
├── @babel/preset-typescript@7.24.7
├── @fortawesome/fontawesome-svg-core@1.2.36
├── @fortawesome/free-brands-svg-icons@5.15.4
├── @fortawesome/free-regular-svg-icons@5.15.4
├── @fortawesome/free-solid-svg-icons@5.15.4
├── @fortawesome/vue-fontawesome@0.1.10
├── @jest/globals@29.7.0
├── @types/jest@26.0.24
├── @typescript-eslint/eslint-plugin@2.34.0
├── @typescript-eslint/parser@2.34.0
├── @vue/cli-plugin-babel@4.5.19
├── @vue/cli-plugin-eslint@4.5.19
├── @vue/cli-plugin-router@4.5.19
├── @vue/cli-plugin-typescript@4.5.19
├── @vue/cli-service@4.5.19
├── @vue/cli@5.0.8
├── @vue/eslint-config-standard@5.1.2
├── @vue/eslint-config-typescript@5.1.0
├── @vue/test-utils@1.3.6
├── axios@1.7.5
├── babel-jest@26.6.3
├── babel-loader@8.3.0
├── babel-plugin-module-resolver@4.1.0
├── chroma-js@2.6.0
├── cms-gui@0.10.3 -> .\
├── compression@1.7.4
├── core-js@3.38.1
├── css-loader@3.6.0
├── deepmerge@4.3.1
├── eslint-plugin-import@2.29.1
├── eslint-plugin-node@11.1.0
├── eslint-plugin-promise@4.3.1
├── eslint-plugin-standard@4.1.0
├── eslint-plugin-vue@6.2.2
├── eslint@6.8.0
├── gmap-vue@3.5.4
├── google-charts@2.0.0
├── jest-environment-jsdom@26.6.2
├── jest-serializer-vue@2.0.2
├── jest@26.6.3
├── keycloak-js@25.0.4
├── lodash@4.17.21
├── material-design-icons-iconfont@6.7.0
├── minimatch@3.1.2
├── nan@2.20.0 extraneous
├── npm@8.19.4
├── sass-loader@7.3.1
├── sass@1.32.13
├── ts-jest@26.5.4
├── typeface-roboto@1.1.13
├── typescript@3.9.10
├── vue-axios@2.1.5
├── vue-class-component@7.2.6
├── vue-cli-plugin-vuetify-preset-basil@1.0.4
├── vue-google-charts@1.1.0
├── vue-i18n@8.28.2
├── css-loader@3.6.0
├── deepmerge@4.3.1
├── eslint-plugin-import@2.29.1
├── eslint-plugin-node@11.1.0
├── eslint-plugin-promise@4.3.1
├── eslint-plugin-standard@4.1.0
├── eslint-plugin-vue@6.2.2
├── eslint@6.8.0
├── gmap-vue@3.5.4
├── google-charts@2.0.0
├── jest-environment-jsdom@26.6.2
├── jest-serializer-vue@2.0.2
├── jest@26.6.3
├── keycloak-js@25.0.4
├── lodash@4.17.21
├── material-design-icons-iconfont@6.7.0
├── minimatch@3.1.2
├── nan@2.20.0 extraneous
├── npm@8.19.4
├── sass-loader@7.3.1
├── sass@1.32.13
├── ts-jest@26.5.4
├── typeface-roboto@1.1.13
├── typescript@3.9.10
├── vue-axios@2.1.5
├── vue-class-component@7.2.6
├── vue-cli-plugin-vuetify-preset-basil@1.0.4
├── vue-google-charts@1.1.0
├── vue-i18n@8.28.2
├── eslint@6.8.0
├── gmap-vue@3.5.4
├── google-charts@2.0.0
├── jest-environment-jsdom@26.6.2
├── jest-serializer-vue@2.0.2
├── jest@26.6.3
├── keycloak-js@25.0.4
├── lodash@4.17.21
├── material-design-icons-iconfont@6.7.0
├── minimatch@3.1.2
├── nan@2.20.0 extraneous
├── npm@8.19.4
├── sass-loader@7.3.1
├── sass@1.32.13
├── ts-jest@26.5.4
├── typeface-roboto@1.1.13
├── typescript@3.9.10
├── vue-axios@2.1.5
├── vue-class-component@7.2.6
├── vue-cli-plugin-vuetify-preset-basil@1.0.4
├── vue-google-charts@1.1.0
├── vue-i18n@8.28.2
├── typeface-roboto@1.1.13
├── typescript@3.9.10
├── vue-axios@2.1.5
├── vue-class-component@7.2.6
├── vue-cli-plugin-vuetify-preset-basil@1.0.4
├── vue-google-charts@1.1.0
├── vue-i18n@8.28.2
├── vue-cli-plugin-vuetify-preset-basil@1.0.4
├── vue-google-charts@1.1.0
├── vue-i18n@8.28.2
├── vue-i18n@8.28.2
├── vue-jest@3.0.7
├── vue-json-csv@1.2.12
├── vue-json-csv@1.2.12
├── vue-keyframes@1.0.1
├── vue-keyframes@1.0.1
├── vue-loader@15.11.1
├── vue-property-decorator@8.5.1
├── vue-router@3.6.5
├── vue-template-compiler@2.7.16
├── vue-weather-widget@4.4.0
├── vue@2.7.16
├── vuetify@2.7.2
├── vuex-router-sync@5.0.0
├── vuex@3.6.2
├── webpack-cli@3.3.12
├── webpack-dev-server@3.11.3
└── webpack@4.47.0
google-charts
```

# Debugging

`launch.json` for adding a new launch-config.
Uses the standard Microsoft JavaScript Debugging Plugin, that should be already installed by default.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:8080",
      // 'old' way of connecting allowing you to actually login to google, albeit in another window.
      // "port": 12345,
      "webRoot": "${workspaceFolder}/src",
      "runtimeExecutable": "C:/Program Files/Google/Chrome/Application/chrome.exe",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```
