<template>
  <div>
    <PageHeader title="Employee Attendance" />

    <TaBle
      :headers="headers"
      :items="records"
      :showEdit="true"
      @edit="openEditDialog"
    />

    <EditAttendanceForm
      :visible="showDialog"
      :record="selectedRecord"
      @close="showDialog = false"
      @save="handleSave"
    />
  </div>
</template>

<script>
import PageHeader from "@/components/common/PageHeader.vue";
import TaBle from "@/components/common/TaBle.vue";
import EditAttendanceForm from "@/components/attendance/EditAttendanceForm.vue";
import { store } from "@/store/store.js";

export default {
  components: {
    PageHeader,
    TaBle,
    EditAttendanceForm,
  },

  data() {
    return {
      showDialog: false,
      selectedRecord: {},
      headers: [
        { text: "Employee", value: "user.name" },
        { text: "Date", value: "date" },
        { text: "Check In", value: "checkIn" },
        { text: "Check Out", value: "checkOut" },
        { text: "Status", value: "status" },
      ],
    };
  },

  computed: {
    records() {
      return store.adminAttendance;
    },
  },

  methods: {
    openEditDialog(record) {
      this.selectedRecord = { ...record };
      this.showDialog = true;
    },

    handleSave(updatedRecord) {
      store
        .updateAttendance(updatedRecord.id, {
          checkIn: updatedRecord.checkIn,
          checkOut: updatedRecord.checkOut,
          status: updatedRecord.status,
        })
        .then(() => {
          this.showDialog = false;
          store.getAllAttendance();
        });
    },
  },

  mounted() {
    store.getAllAttendance();
  },
};
</script>

<style lang="scss" scoped></style>