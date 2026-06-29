<template>
  <!-- Page Header with Apply Leave button -->
  <div>
    <PageHeader
      title="My Leave Requests"
      btnName="APPLY LEAVE"
      @doAction="showDialog = true"
    />
    <EmptyStateVue
      v-if="!leaves.length"
      class="text-center mt-6"
      icon="mdi-alert-circle-outline"
      message="No data found for this period"
    />
    <LeaveRequestTable
      v-else
      :headers="headers"
      :items="leaves"
      :loading="false"
      :showActions="false"
    />

    <LeaveRequestForm
      :visible="showDialog"
      @close="showDialog = false"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import PageHeader from "@/components/common/PageBtn.vue";
import LeaveRequestTable from "@/components/leave/LeaveRequestTable.vue";
import LeaveRequestForm from "@/components/leave/LeaveRequestForm.vue";
import EmptyStateVue from "@/components/common/EmptyState.vue";
import { store } from "@/store/store.js";

export default {
  name: "LeaveView",
  components: {
    PageHeader,
    LeaveRequestTable,
    LeaveRequestForm,
    EmptyStateVue,
  },
  data() {
    return {
      showDialog: false,
      loading: true,
      headers: [
        { text: "Type", value: "type" },
        { text: "From", value: "fromDate" },
        { text: "To", value: "toDate" },
        { text: "Reason", value: "reason" },
        { text: "Status", value: "status" },
      ],
    };
  },

  computed: {
    leaves() {
      return store.leave;
    },
  },

  mounted() {
    store
      .initAuth()
      .then(() => {
        const userId = store.user?.id;
        if (userId) {
          return store.fetchLeaves(userId);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },

  methods: {
    handleSubmit(formData) {
      const payload = {
        type: formData.leaveType,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        reason: formData.reason,
      };

      store
        .applyLeave(payload)
        .then(() => {
          this.showDialog = false;
        })
        .catch(() => {});
    },
  },
};
</script>