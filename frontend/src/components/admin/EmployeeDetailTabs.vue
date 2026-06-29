<template>
  <div class="fill-height">
    <v-container fluid class="pa-0">
      <v-row justify="center">
        <v-col cols="12" xl="10" lg="11">
          <v-tabs
            v-model="activeTab"
            class="rounded-sm"
            dark
            center-active
            grow
          >
            <v-tab>Attendance</v-tab>
            <v-tab>Leaves</v-tab>
            <v-tab>Work Logs</v-tab>
            <v-tab>Paycheck</v-tab>
          </v-tabs>

          <v-tabs-items v-model="activeTab">
            <!-- Attendance Tab -->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <TaBle
                    :headers="headers"
                    :items="attendanceRecords"
                    :loading="loadingAttendance"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Leaves Tab -->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <TaBle
                    :headers="leaveHeaders"
                    :items="leaveRecords"
                    :loading="loadingLeaves"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Work Logs Tab -->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <TaBle
                    :headers="logHeaders"
                    :items="logRecords"
                    :loading="loadingLogs"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Paycheck -->
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <MonthPicker
                    :value="{ month: selectedMonth, year: selectedYear }"
                    @change="handleMonthChange"
                  />
                  <v-row class="align-center mt-3">
                    <v-col cols="12" sm="8" md="9">
                      <v-text-field
                        v-model="newSalary"
                        label="Enter a Salary"
                        type="number"
                        min="0"
                        :rules="[
                          (v) => v > 0 || 'Salary must be a positive number',
                        ]"
                      />
                    </v-col>
                    <v-col cols="12" sm="4" md="3" class="text-sm-right">
                      <v-btn color="primary" @click="saveSalary">
                        Calculate
                      </v-btn>
                    </v-col>
                  </v-row>
                  <PaycheckSummaryCard :summary="summary" class="mt-4" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TaBle from "@/components/common/TaBle.vue";
import MonthPicker from "../paycheck/MonthPicker.vue";
import PaycheckSummaryCard from "@/components/paycheck/PaycheckSummaryCard.vue";
import api from "@/api/index.js";
import { store } from "@/store/store.js";

export default {
  name: "EmployeeDetailTabs",
  components: {
    TaBle,
    MonthPicker,
    PaycheckSummaryCard,
  },
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeTab: null,
      // Attendance Tab
      headers: [
        { text: "Date", value: "date" },
        { text: "Check In", value: "checkIn" },
        { text: "Check Out", value: "checkOut" },
        { text: "Status", value: "status" },
      ],
      attendanceRecords: [],
      loadingAttendance: true,

      // Leaves Tab
      leaveHeaders: [
        { text: "Leave Type", value: "type" },
        { text: "From", value: "fromDate" },
        { text: "To", value: "toDate" },
        { text: "Status", value: "status" },
      ],
      leaveRecords: [],
      loadingLeaves: true,

      // Work Logs Tab
      logHeaders: [
        { text: "Date", value: "date" },
        { text: "Description", value: "description" },
        { text: "Units", value: "units" },
        { text: "Hours", value: "hours" },
      ],
      logRecords: [],
      loadingLogs: true,

      // Paycheck Tab
      selectedMonth: new Date().getMonth() + 1,
      selectedYear: new Date().getFullYear(),
      summary: {},
      newSalary: null,
    };
  },

  watch: {
    "employee.userId": {
      immediate: true,
      handler(userId) {
        if (userId) {
          this.fetchTabData(userId);
          this.fetchPaycheck();
          this.newSalary = this.employee.salary;
        }
      },
    },
  },
  methods: {
    fetchTabData(userId) {
      api
        .get("/attendance", { params: { userId } })
        .then((response) => {
          this.attendanceRecords = response.data;
        })
        .finally(() => {
          this.loadingAttendance = false;
        });

      api
        .get("/leaves", { params: { userId } })
        .then((response) => {
          this.leaveRecords = response.data;
        })
        .finally(() => {
          this.loadingLeaves = false;
        });

      api
        .get("/worklogs", { params: { userId } })
        .then((response) => {
          this.logRecords = response.data;
        })
        .finally(() => {
          this.loadingLogs = false;
        });
    },
    fetchPaycheck() {
      if (!this.employee.userId) return;
      api
        .get("/paycheck", {
          params: {
            userId: this.employee.userId,
            month: this.selectedMonth,
            year: this.selectedYear,
          },
        })
        .then((response) => {
          this.summary = response.data;
        });
    },
    saveSalary() {
      store.updateSalary(this.employee.id, this.newSalary).then(() => {
        this.fetchPaycheck();
      });
    },
    handleMonthChange(value) {
      this.selectedMonth = value.month;
      this.selectedYear = value.year;
      this.fetchPaycheck();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
