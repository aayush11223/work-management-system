<template>
  <v-card flat>
    <v-card-title class="pl-4">
      {{ title }}
    </v-card-title>
    <v-card-subtitle class="pl-4">
      {{ subtitle }}
    </v-card-subtitle>

    <v-divider></v-divider>
  </v-card>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
  },
};
</script>

<style scoped>
</style>