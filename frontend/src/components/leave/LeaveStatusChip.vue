<template>
  <div>
    <v-chip small :color="chipColor">{{ status }} </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
    },
  },
  computed: {
    chipColor() {
      const currentStatus = this.status;

      switch (currentStatus) {
        case "approved":
          return "success";

        case "pending":
          return "warning";

        case "rejected":
          return "error";

        default:
          return "grey";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>