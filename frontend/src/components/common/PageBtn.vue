<template>
  <v-card flat>
    <div class="d-flex align-center justify-space-between">
      <div>
        <v-card-title class="pl-4">
          {{ title }}
        </v-card-title>
        <v-card-subtitle class="pl-4">
          {{ subtitle }}
        </v-card-subtitle>
      </div>

      <v-btn
        small
        depressed
        color="primary"
        class="ma-4"
        @click="$emit('doAction')"
      >
        {{ btnName }}
      </v-btn>
    </div>

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
    btnName: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },
};
</script>

<style scoped>
</style>