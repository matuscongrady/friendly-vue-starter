<template>
  <div class="app">
    <router-link class="nav-link" to="/home">Home</router-link>
    <router-link class="nav-link" to="/counter">Counter</router-link>
    <router-link class="nav-link" to="/posts">Posts</router-link>
    <h2>{{ appName }}</h2>
    <router-view></router-view>
  </div>
</template>

<script>import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  appName = APP_NAME;
}
</script>

<style lang="scss" scoped>
.app-message {
  color: gray;
}

.nav-link {
  padding: 5px;
  color: gray;
  text-decoration: none;
}

.nav-link.router-link-active {
  font-weight: bold;
  color: blueviolet;
}
</style>
