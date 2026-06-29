<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import { store } from "@/store/store.js";

export default {
  name: "App",

  data() {
    return {};
  },

  mounted() {
    store.initAuth();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  margin: 0;
  padding: 0;
}
</style>