## Friendly-vue-starter

Full featured Vue.js starter project for browser apps.
Main focus:
  * Developer experience
  * Performance
  * Future-proofness

### Features

  * Vue.js 2 with single file components, Sass(Scss) and [vue-class-component](https://github.com/vuejs/vue-class-component) / [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
  * GraphQL (via [apollo-client](https://github.com/apollographql/apollo-client))
  * [Vuex](https://vuex.vuejs.org/en/getting-started.html) state management
  * [Vue-router](https://router.vuejs.org/en/essentials/getting-started.html)
  * [Vue-i18n](http://kazupon.github.io/vue-i18n/en/)
  * Webpack 3
  * Hot-module-replacement for Vue-components, Vuex store and intl-messages!
  * Critical-path css extraction via [critical](https://github.com/addyosmani/critical)
  * Full ES6/ES7 support and automatic polyfilling based on browsers you wish to support, via [babel-preset-env](https://github.com/babel/babel-preset-env)
  * Eslint with [airbnb config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) and [Prettier](https://github.com/prettier/prettier) integration
  * Route-based code splitting
  * Bundle-analyzer, bundle size optimization, friendly and beautiful webpack messages, and more

### Usage

```git clone```

```npm run dev``` to start the webpack-dev-servcer in development mode with hot-reloading

```npm run build``` to build and optimize the application for production use

```npm run analyze``` to build and analyze the production bundle via webpack-bundle-analyzer

```npm run clean``` to remove node_modules, package.lock, yarn.lock and dist folder

```npm run lint``` to run Eslint on whole project

```npm run check``` to check for outdated packages

There's also a husky pre-commit hook included, that will run ```eslint``` before commiting and possibly abort the operation if there are any errors.
You can also add things like flow-typechecking and unit/e2e testing here, to ensure quality of your git repository

### Roadmap

- [ ] Add unit-tests (propably via [vue-test-utils](https://github.com/vuejs/vue-test-utils) when it's finished)
- [ ] Add e2e tests (probably via [testcafe](https://github.com/DevExpress/testcafe) and [testcafe-vue-selectors](https://github.com/devexpress/testcafe-vue-selectors))
- [ ] Possibly integrated Typescript (there's and ongoing work to improve typescript experience in Vue.js)
- [ ] Possibly integrate Flow-type (currently there are a bit of problems and bugs that make flow-type (in my opinion) not-worth to use with Vue.js, but this might change in the future)

### Caveats
* Prettier will format first line of script tags in .vue files badly. There is an ongoing work on better Vue.js integration (even for templates!)

### Backend
Friendly-vue-starter is configured to use GraphQL. You can use any GraphQL backend, your custom backend or BaaS solution like [graph.cool](https://www.graph.cool/) or [scaphold.io](https://scaphold.io/)<br />
If you do not want or can't use a GraphQL backend, you can simply remove apollo-client and fetch your data using any HTTP client (I recommend using [axios](https://github.com/mzabriskie/axios))

### Contributors
<p><img src="https://cdn.pbrd.co/images/GBXxXB1.png" height="105" width="78"></p>
<p>Matúš Čongrády</p>


