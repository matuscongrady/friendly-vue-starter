<template>
  <div>
    <div v-if="loading">Loading</div>
    <div v-else>
      <h3>{{ $t('postsFromGraphCoolApi') }}: </h3>
      <ul>
        <li v-for="post in allPosts" :key="post.id">{{ post.description }}</li>
      </ul>
    </div>
  </div>
</template>

<script>import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({
  apollo: {
    allPosts: {
      query: gql`
        {
          allPosts {
            id
            description
          }
        }
      `,
      loadingKey: 'loading'
    }
  }
})
export default class App extends Vue {
  loading = false;
}
</script>

<style lang="scss" scoped>
.hello-message {
  color: green;
}
</style>
