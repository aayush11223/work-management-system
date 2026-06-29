<template>
  <div>
    <PageHeader title="Employees Leave" />

    <EmptyStateVue
      v-if="!allLeaves.length"
      class="text-center mt-6"
      icon="mdi-alert-circle-outline"
      message="No data found for this period"
    />

    <div v-else>
      <LeaveRequestTable
        :headers="headers"
        :items="allLeaves"
        :loading="false"
        :showActions="true"
        @approve="handleApprove"
        @reject="handleReject"
        @edit="openEditDialog"
      />
    </div>

    <ConfirmDialog
      :visible="confirmDialog.visible"
      :title="confirmDialog.title"
      :message="confirmDialog.message"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import PageHeader from "@/components/common/PageHeader.vue";
import LeaveRequestTable from "@/components/leave/LeaveRequestTable.vue";
import EmptyStateVue from "@/components/common/EmptyState.vue";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import { store } from "@/store/store.js";

export default {
  name: "LeaveManagementView",
  components: {
    PageHeader,
    LeaveRequestTable,
    EmptyStateVue,
    ConfirmDialog,
  },
  data() {
    return {
      confirmDialog: {
        visible: false,
        title: "",
        message: "",
        pendingLeaveItem: null,
        pendingStatus: null,
      },
      headers: [
        { text: "Name", value: "user.name" },
        { text: "Type", value: "type" },
        { text: "From", value: "fromDate" },
        { text: "To", value: "toDate" },
        { text: "Reason", value: "reason" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    allLeaves() {
      return store.allLeaves;
    },
  },
  mounted() {
    store.fetchAllLeaves();
  },
  methods: {
    handleApprove(leaveItem) {
      this.confirmDialog.pendingLeaveItem = leaveItem;
      this.confirmDialog.pendingStatus = "approved";
      this.confirmDialog.title = "Approve Leave Request";
      this.confirmDialog.message = `Are you sure you want to approve this ${leaveItem.type} leave?`;
      this.confirmDialog.visible = true;
    },
    handleReject(leaveItem) {
      this.confirmDialog.pendingLeaveItem = leaveItem;
      this.confirmDialog.pendingStatus = "rejected";
      this.confirmDialog.title = "Reject Leave Request";
      this.confirmDialog.message = `Are you sure you want to reject this ${leaveItem.type} leave?`;
      this.confirmDialog.visible = true;
    },
    onConfirm() {
      store
        .updateLeaveStatus(
          this.confirmDialog.pendingLeaveItem.id,
          this.confirmDialog.pendingStatus
        )
        .finally(() => {
          this.closeConfirmDialog();
        });
    },
    onCancel() {
      this.closeConfirmDialog();
    },
    closeConfirmDialog() {
      this.confirmDialog.visible = false;
      this.confirmDialog.pendingLeaveItem = null;
      this.confirmDialog.pendingStatus = null;
      this.confirmDialog.title = "";
      this.confirmDialog.message = "";
    },
  },
};
</script>
