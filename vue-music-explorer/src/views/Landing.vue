<template>
  <div>
    <h3>Welcome to Star Track</h3>
    <p>Star Track is a simple way to interact with Apple Music.</p>
    <router-link to="/browse">Browse</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class LandingPage extends Vue {}
</script>
