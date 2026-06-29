<template>
  <div>
    <v-overlay :value="loading" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

