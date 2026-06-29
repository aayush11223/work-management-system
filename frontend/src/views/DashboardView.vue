<template>
  <div>
    <PageHeader :title="title" />

    <v-row class="mt-2">
      <v-col
        v-for="(stat, index) in stats"
        :key="index"
        cols="12"
        sm="6"
        md="3"
      >
        <StatCard
          :icon="stat.icon"
          :label="stat.label"
          :value="stat.value"
          :color="stat.color"
        />
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col>
        <v-card outlined class="pa-4" min-height="300">
          <v-card-title class="text-h6 font-weight-bold pa-0 mb-4">
            Recent Work Logs & Activity
          </v-card-title>

          <v-list two-line class="pa-0">
            <v-list-item class="px-0">
              <v-list-item-avatar color="primary lighten-5">
                <v-icon color="primary">mdi-file-document-edit</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium"
                  >Task #4102 - Frontend Integration</v-list-item-title
                >
                <v-list-item-subtitle
                  >Submitted 2 hours ago • 4.5 hours
                  logged</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-chip small color="success" label>Approved</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item class="px-0">
              <v-list-item-avatar color="warning lighten-5">
                <v-icon color="warning">mdi-clock-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium"
                  >Task #4098 - Bug Fixing</v-list-item-title
                >
                <v-list-item-subtitle
                  >Submitted yesterday • 3 hours logged</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-chip small color="warning" label>Pending</v-chip>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col v-if="!this.isAdmin" cols="12" md="4">
        <v-card outlined class="pa-4" min-height="300">
          <v-card-title class="text-h6 font-weight-bold pa-0 mb-4">
            Quick Actions
          </v-card-title>

          <v-btn block color="primary" class="mb-3" to="/attendance" large>
            <v-icon left>mdi-calendar-check</v-icon>
            Clock In / Out
          </v-btn>

          <v-btn
            block
            color="secondary"
            class="mb-3"
            to="/worklog"
            large
            outlined
          >
            <v-icon left>mdi-plus</v-icon>
            Log Daily Work
          </v-btn>

          <v-btn block color="error" to="/leave" large outlined>
            <v-icon left>mdi-briefcase-remove</v-icon>
            Request Leave
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageHeader from "@/components/common/PageHeader.vue";
import StatCard from "@/components/common/StatCard.vue";
// import AppLoader from "@/components/common/AppLoader.vue";

export default {
  data() {
    return {
      loading: true,
    };
  },

  components: {
    StatCard,
    PageHeader,
    // AppLoader,
  },

  computed: {
    isAdmin() {
      return this.$route.name === "admin-dashboard";
    },

    title() {
      return this.isAdmin ? "Admin Dashboard" : "My Workspace";
    },

    stats() {
      if (this.isAdmin) {
        return [
          {
            label: "Total Employees",
            value: 24,
            icon: "mdi-account-group",
            color: "primary",
          },
          {
            label: "Present Today",
            value: 18,
            icon: "mdi-account-check",
            color: "success",
          },
          {
            label: "Pending Leave Requests",
            value: 5,
            icon: "mdi-account-clock",
            color: "warning",
          },
          {
            label: "Departments",
            value: 6,
            icon: "mdi-office-building",
            color: "info",
          },
        ];
      } else {
        return [
          {
            label: "Total Present",
            value: 42,
            icon: "mdi-account-check",
            color: "success",
          },
          {
            label: "Leaves Taken",
            value: 3,
            icon: "mdi-account-arrow-right",
            color: "warning",
          },
          {
            label: "Pending Leaves",
            value: 5,
            icon: "mdi-account-clock",
            color: "info",
          },
          {
            label: "Work Logs Submitted",
            value: 38,
            icon: "mdi-file-document-check",
            color: "primary",
          },
        ];
      }
    },
  },
};
</script>