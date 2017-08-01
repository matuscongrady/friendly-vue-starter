<template>
  <div>
    <div>
      <h3>Counter using Vuex store:</h3>
      <p>{{ $store.state.counter }}</p>
      <p>Counter times two: {{ $store.getters.counterTimesTwo }}</p>
    </div>
    <button @click="$store.commit('incrementCounter')">+</button>
    <button @click="$store.commit('decrementCounter')">-</button>
  </div>
</template>

<script>export default {};
</script>
