<template>
  <div class="pa-4">
    <PageHeader title="Employee Work Logs" />

    <EmptyStateVue
      v-if="!adminLogs.length"
      class="text-center mt-6"
      icon="mdi-alert-circle-outline"
      message="No data found for this period"
    />

    <TaBle v-else :headers="tableHeaders" :items="adminLogs" />
  </div>
</template>

<script>
import PageHeader from "@/components/common/PageHeader.vue";
import TaBle from "@/components/common/TaBle.vue";
import EmptyStateVue from "@/components/common/EmptyState.vue";
import { store } from "@/store/store.js";

export default {
  components: {
    PageHeader,
    TaBle,
    EmptyStateVue,
  },
  data() {
    return {
      tableHeaders: [
        { text: "Employee Name", value: "user.name" },
        { text: "Date", value: "date" },
        { text: "Units", value: "units" },
        { text: "Hours", value: "hours" },
      ],
    };
  },

  mounted() {
    store.fetchAllLogs();
  },

  computed: {
    adminLogs() {
      return store.adminLogs;
    },
  },
};
</script>

<style scoped>
</style>