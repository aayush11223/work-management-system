<template>
  <div>
    <v-icon size="64" class="mb-4">
      {{ icon }}
    </v-icon>

    <h2 class="text-h5 font-weight-medium mb-6">
      {{ message }}
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },

    icon: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>