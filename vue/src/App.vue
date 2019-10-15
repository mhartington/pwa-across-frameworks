<template>
  <div class="app">
    <nav>
      <router-link to="/browse">Browse</router-link>&nbsp;|
      <router-link to="/search">Search</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>
<style>
* {
  font-family: sans-serif;
}
a {
  text-decoration: none;
  color: unset;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
