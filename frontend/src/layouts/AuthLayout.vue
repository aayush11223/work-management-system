<template>
  <v-container fluid ma-0 pa-0>
    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </v-container>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>