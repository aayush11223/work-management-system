<template>
  <div>
    <PageHeader
      title="My Work Logs"
      btnName="LOG WORK"
      @doAction="showDialog = true"
    />

    <EmptyStateVue
      v-if="!logs.length"
      class="text-center mt-6"
      icon="mdi-alert-circle-outline"
      message="No data found for this period"
    />

    <TaBle v-else :headers="headers" :items="logs" :loading="loading" />

    <WorkLogForm
      :visible="showDialog"
      @close="showDialog = false"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import PageHeader from "@/components/common/PageBtn.vue";
import TaBle from "@/components/common/TaBle.vue";
import WorkLogForm from "@/components/worklog/WorkLogForm.vue";
import EmptyStateVue from "@/components/common/EmptyState.vue";
import { store } from "@/store/store.js";

export default {
  components: {
    PageHeader,
    TaBle,
    WorkLogForm,
    EmptyStateVue,
  },

  data() {
    return {
      headers: [
        { text: "Date", value: "date", align: "start" },
        { text: "Description", value: "description" },
        { text: "Units", value: "units" },
        { text: "Hours", value: "hours" },
      ],

      loading: true,
      showDialog: false,
    };
  },

  mounted() {
    store
      .initAuth()
      .then(() => {
        const userId = store.user?.id;
        if (userId) {
          return store.fetchWorklogs(userId);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },

  computed: {
    logs() {
      return store.logs;
    },
  },

  methods: {
    handleSubmit(newLog) {
      store.logWork(newLog).then(() => {
        this.showDialog = false;
      });
    },
  },
};
</script>