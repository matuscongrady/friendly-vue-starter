import 'babel-polyfill';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueApollo from 'vue-apollo';
import { Component } from 'vue-property-decorator';
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { sync } from 'vuex-router-sync';

import './index.scss';
import store from './store/_index';
import messages from './locales/messages';
import App from './App.vue';
import router from './router';
import { getCurrentUserLanguage } from './services/locale-service';

Vue.use(VueI18n);
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave']);

const client = new ApolloClient({
  link: new HttpLink({ uri: 'API_ENDPOINT' }),
  cache: new InMemoryCache()
})
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: client
})
const i18n = new VueI18n({ locale: getCurrentUserLanguage(), messages });

if (module.hot) {
  module.hot.accept(['./locales/messages.js'], () => {
    const newMessages = require('./locales/messages').default;
    Object.keys(newMessages).forEach(locale => {
      i18n.setLocaleMessage(locale, newMessages[locale]);
    });
  });
}

sync(store, router);

new Vue({
  el: document.getElementById('app'),
  apolloProvider,
  store,
  router,
  i18n,
  render: h => h(App)
});
