<template>
  <div>
    <h2 class="hello-message">{{ $t('hello') }}</h2>
     <p class="app-version">{{ $t('applicationVersion') }}: {{ version }}</p>
  </div>
</template>

<script>import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  version = APP_VERSION;
}
</script>

<style lang="scss" scoped>
.hello-message {
  color: green;
}
.app-version {
  color: blue;
}
</style>
