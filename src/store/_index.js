import Vuex from 'vuex';
import Vue from 'vue';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

if (module.hot) {
  module.hot.accept(['./mutations', './actions', './getters.js'], () => {
    store.hotUpdate({
      mutations: require('./mutations').default,
      actions: require('./actions').default,
      getters: require('./getters').default
    });
  });
}

export default store;
