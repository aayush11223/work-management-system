<template >
  <v-app>
    <AppBar
      :drawer="drawer"
      @enable="enableDrawer"
      :title="title"
      :name="name"
    />
    <NavigationDrawer
      :drawer="drawer"
      :group="group"
      :menuItems="menuItems"
      @toggle="enableDrawer"
    />

    <v-main class="mt-5">
      <v-container>
        <v-card>
          <router-view />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/common/AppBar.vue";
import NavigationDrawer from "@/components/common/NavigationDrawer.vue";
export default {
  components: {
    AppBar,
    NavigationDrawer,
  },

  data() {
    return {
      //AppBar data
      title: "Work Management System - Admin",
      name: "Aayush Basnet",

      //NavigationDrawer data
      drawer: true,
      group: null,

      menuItems: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          route: "/admin/dashboard",
        },

        {
          title: "Employees",
          icon: "mdi-account-group",
          route: "/admin/employees",
        },

        {
          title: "Attendance",
          icon: "mdi-calendar-account",
          route: "/admin/attendance",
        },

        {
          title: "Leaves",
          icon: "mdi-briefcase-account-outline",
          route: "/admin/leavemanagement",
        },

        { title: "Work Logs", icon: "mdi-clock", route: "/admin/worklogs" },
      ],
    };
  },

  methods: {
    enableDrawer(value) {
      this.drawer = value;
    },
  },
};
</script>
