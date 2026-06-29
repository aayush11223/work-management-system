<template>
  <div>
    <PageHeader
      :title="title"
      :btnName="btnName"
      @doAction="showDialog = true"
    />

    <TaBle :headers="headers" :items="attendance" :loading="loading" />

    <MarkAttendanceForm
      :visible="showDialog"
      @close="showDialog = false"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import PageHeader from "@/components/common/PageBtn.vue";
import TaBle from "@/components/common/TaBle.vue";
import MarkAttendanceForm from "@/components/attendance/MarkAttendanceForm.vue";
import { store } from "@/store/store.js";

export default {
  name: "AttendanceView",
  components: {
    PageHeader,
    TaBle,
    MarkAttendanceForm,
  },
  data() {
    return {
      title: "My Attendance",
      btnName: "MARK ATTENDANCE",
      showDialog: false,
      loading: true,
      headers: [
        { text: "Date", value: "date" },
        { text: "Check In", value: "checkIn" },
        { text: "Check Out", value: "checkOut" },
        { text: "Status", value: "status" },
      ],
    };
  },

  computed: {
    attendance() {
      return store.attendance;
    },
  },

  mounted() {
    store
      .initAuth()
      .then(() => {
        const userId = store.user?.id;
        if (userId) {
          return store.getUserAttendance(userId);
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },

  methods: {
    handleSubmit(newAttendance) {
      const payload = {
        userId: store.user.id,
        date: newAttendance.date,
        checkIn: newAttendance.checkIn,
        checkOut: newAttendance.checkOut,
        status: newAttendance.status,
      };

      store.createAttendance(payload).then(() => {
        this.showDialog = false;
      });
    },
  },
};
</script>


